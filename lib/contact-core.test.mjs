/**
 * Tests for the shared contact-form core.
 *
 * Uses Node's built-in test runner — no dependencies, no config:
 *   npm run test:api
 *
 * These cover the parts that matter if they regress: input validation bounds,
 * HTML escaping of submitted text, and CR/LF stripping on header-bound fields.
 */

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import {
  buildEmail,
  escapeHtml,
  handleContact,
  readConfig,
  validate
} from './contact-core.mjs';

const GOOD = {
  name: 'Ravindra Tambe',
  email: 'ravindra@vriddhione.com',
  message: 'We would like to discuss a retrieval system for document search.'
};

describe('validate', () => {
  it('accepts a well-formed submission', () => {
    const result = validate(GOOD);
    assert.equal(result.ok, true);
  });

  it('rejects a non-object body', () => {
    assert.equal(validate(null).ok, false);
    assert.equal(validate('string').ok, false);
  });

  it('requires name, email and message', () => {
    assert.equal(validate({ ...GOOD, name: '' }).ok, false);
    assert.equal(validate({ ...GOOD, email: '' }).ok, false);
    assert.equal(validate({ ...GOOD, message: '' }).ok, false);
  });

  it('rejects a malformed email address', () => {
    for (const email of ['nope', 'a@b', 'a b@c.co', '@b.co', 'a@.co']) {
      assert.equal(validate({ ...GOOD, email }).ok, false, email);
    }
  });

  it('enforces message length bounds', () => {
    assert.equal(validate({ ...GOOD, message: 'too short' }).ok, false);
    assert.equal(validate({ ...GOOD, message: 'x'.repeat(5001) }).ok, false);
    assert.equal(validate({ ...GOOD, message: 'x'.repeat(5000) }).ok, true);
  });

  it('enforces field length bounds', () => {
    assert.equal(validate({ ...GOOD, name: 'x'.repeat(121) }).ok, false);
    assert.equal(validate({ ...GOOD, company: 'x'.repeat(161) }).ok, false);
    assert.equal(validate({ ...GOOD, topic: 'x'.repeat(121) }).ok, false);
  });

  it('defaults the topic when none is supplied', () => {
    const result = validate({ ...GOOD, topic: undefined });
    assert.equal(result.ok, true);
    assert.equal(result.data.topic, 'General enquiry');
  });

  it('strips CR/LF from header-bound fields', () => {
    const result = validate({ ...GOOD, name: 'Real Name\r\nBcc: someone@example.com' });
    assert.equal(result.ok, true);
    assert.ok(!/[\r\n]/.test(result.data.name));
  });

  it('trims surrounding whitespace from the email', () => {
    const result = validate({ ...GOOD, email: '  ravindra@vriddhione.com  ' });
    assert.equal(result.data.email, 'ravindra@vriddhione.com');
  });
});

describe('escapeHtml', () => {
  it('escapes every HTML-significant character', () => {
    assert.equal(escapeHtml('<script>'), '&lt;script&gt;');
    assert.equal(escapeHtml('&'), '&amp;');
    assert.equal(escapeHtml('"'), '&quot;');
    assert.equal(escapeHtml("'"), '&#39;');
  });

  it('escapes the ampersand first, so entities are not double-broken', () => {
    assert.equal(escapeHtml('&lt;'), '&amp;lt;');
  });
});

describe('buildEmail', () => {
  const config = readConfig({});

  it('neutralises an injected tag in a submitted field', () => {
    const { data } = validate({
      ...GOOD,
      name: '<img src=x onerror=alert(1)>'
    });
    const { htmlContent } = buildEmail(data, config);

    // The payload must survive only as inert text. Escaping removes the tag
    // delimiters; it does not remove the word "onerror", so assert on the
    // absence of a real tag rather than on the absence of that substring.
    assert.ok(!/<\s*(img|script|svg|iframe)/i.test(htmlContent));
    assert.ok(htmlContent.includes('&lt;img src=x onerror=alert(1)&gt;'));
  });

  it('escapes markup in the message body', () => {
    const { data } = validate({ ...GOOD, message: '<b>bold</b> & "quoted" text here' });
    const { htmlContent } = buildEmail(data, config);
    assert.ok(htmlContent.includes('&lt;b&gt;bold&lt;/b&gt;'));
    assert.ok(!htmlContent.includes('<b>bold</b>'));
  });

  it('converts newlines in the message to line breaks', () => {
    const { data } = validate({ ...GOOD, message: 'First line\nSecond line, long enough' });
    assert.ok(buildEmail(data, config).htmlContent.includes('<br>'));
  });

  it('includes a plain-text alternative', () => {
    const { data } = validate(GOOD);
    const { textContent } = buildEmail(data, config);
    assert.ok(textContent.includes(GOOD.name));
    assert.ok(textContent.includes(GOOD.email));
  });

  it('sets replyTo to the submitted address', () => {
    const { data } = validate(GOOD);
    assert.equal(buildEmail(data, config).replyTo.email, GOOD.email);
  });
});

describe('readConfig', () => {
  it('defaults to the company mailbox and domain', () => {
    const config = readConfig({});
    assert.equal(config.toEmail, 'contact@vriddhione.com');
    assert.ok(config.senderEmail.endsWith('@vriddhione.com'));
    assert.equal(config.siteDomain, 'vriddhione.com');
  });

  it('lets the environment override every default', () => {
    const config = readConfig({
      CONTACT_TO_EMAIL: 'other@example.com',
      CONTACT_SENDER_EMAIL: 'from@example.com',
      CONTACT_SITE_DOMAIN: 'example.com'
    });
    assert.equal(config.toEmail, 'other@example.com');
    assert.equal(config.senderEmail, 'from@example.com');
    assert.equal(config.siteDomain, 'example.com');
  });
});

describe('handleContact', () => {
  it('answers 400 for invalid input', async () => {
    const result = await handleContact({ name: '', email: '', message: '' }, {});
    assert.equal(result.status, 400);
    assert.ok(result.body.error);
  });

  it('answers 500 and says so when the API key is absent', async () => {
    const result = await handleContact(GOOD, {});
    assert.equal(result.status, 500);
    assert.match(result.body.error, /not configured/i);
  });

  it('never leaks the provider error to the caller', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      new Response('provider said: invalid api key for account 12345', {
        status: 401
      });
    try {
      const result = await handleContact(GOOD, { BREVO_API_KEY: 'test-key' });
      assert.equal(result.status, 502);
      assert.equal(result.body.error, 'Failed to send message');
      assert.ok(!JSON.stringify(result.body).includes('12345'));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it('answers 200 when the provider accepts the message', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ messageId: 'abc' }), { status: 201 });
    try {
      const result = await handleContact(GOOD, { BREVO_API_KEY: 'test-key' });
      assert.equal(result.status, 200);
      assert.equal(result.body.success, true);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
