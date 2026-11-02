/**
 * Shared contact-form logic for both deployment targets.
 *
 * The Vercel function (`api/contact.js`) and the Netlify function
 * (`netlify/functions/contact.js`) are thin adapters over this, so the
 * validation, escaping and mail payload exist in exactly one place.
 */

const MAX = {
  name: 120,
  email: 200,
  company: 160,
  topic: 120,
  message: 5000
};

/**
 * Escapes HTML so submitted text cannot inject markup into the email we send
 * ourselves. Without this, a message containing a tag or an attribute break
 * ends up as live HTML in our own inbox.
 */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Strips CR/LF, which could otherwise be used for header injection. */
function oneLine(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());
}

/**
 * Validates and normalises the submitted body.
 * @returns {{ ok: true, data: object } | { ok: false, error: string }}
 */
function validate(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Request body must be a JSON object' };
  }

  const name = oneLine(body.name ?? '');
  const email = oneLine(body.email ?? '');
  const company = oneLine(body.company ?? '');
  const topic = oneLine(body.topic ?? 'General enquiry');
  const message = String(body.message ?? '').trim();

  if (!name || !email || !message) {
    return { ok: false, error: 'Name, email and message are required' };
  }
  if (name.length > MAX.name) {
    return { ok: false, error: 'Name is too long' };
  }
  if (!isEmail(email) || email.length > MAX.email) {
    return { ok: false, error: 'A valid email address is required' };
  }
  if (company.length > MAX.company) {
    return { ok: false, error: 'Company is too long' };
  }
  if (topic.length > MAX.topic) {
    return { ok: false, error: 'Topic is too long' };
  }
  if (message.length < 10) {
    return { ok: false, error: 'Message is too short' };
  }
  if (message.length > MAX.message) {
    return { ok: false, error: 'Message is too long' };
  }

  return {
    ok: true,
    data: { name, email, company, topic, message }
  };
}

/** Builds the Brevo request payload. */
function buildEmail(data, config) {
  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Company', data.company || '—'],
    ['Topic', data.topic]
  ]
    .map(
      ([key, value]) =>
        `<tr>
           <td style="padding:6px 14px 6px 0;color:#6b6e78;font-size:13px;white-space:nowrap">${escapeHtml(key)}</td>
           <td style="padding:6px 0;color:#16181f;font-size:14px;font-weight:600">${escapeHtml(value)}</td>
         </tr>`
    )
    .join('');

  const messageHtml = escapeHtml(data.message).replace(/\n/g, '<br>');

  return {
    sender: { name: config.senderName, email: config.senderEmail },
    to: [{ email: config.toEmail, name: config.toName }],
    // Lets us reply straight from the notification. The address is validated
    // above, and CR/LF is stripped, so it is safe to use here.
    replyTo: { email: data.email, name: data.name },
    subject: `[Website] ${data.topic} — ${data.name}`,
    htmlContent: `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f4f5f8;font-family:system-ui,-apple-system,'Segoe UI',sans-serif">
    <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e4e6ec;border-radius:12px;overflow:hidden">
      <div style="padding:18px 24px;background:#070810">
        <p style="margin:0;color:#e3b341;font-size:12px;letter-spacing:2px;text-transform:uppercase">New website enquiry</p>
      </div>
      <div style="padding:24px">
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px">${rows}</table>
        <div style="padding-top:18px;border-top:1px solid #e4e6ec">
          <p style="margin:0 0 8px;color:#6b6e78;font-size:12px;letter-spacing:1px;text-transform:uppercase">Message</p>
          <p style="margin:0;color:#16181f;font-size:15px;line-height:1.65">${messageHtml}</p>
        </div>
      </div>
      <div style="padding:14px 24px;background:#f9fafc;border-top:1px solid #e4e6ec">
        <p style="margin:0;color:#8b8e99;font-size:11px">Sent from the contact form at ${escapeHtml(config.siteDomain)}</p>
      </div>
    </div>
  </body>
</html>`,
    textContent: [
      `New website enquiry`,
      ``,
      `Name:    ${data.name}`,
      `Email:   ${data.email}`,
      `Company: ${data.company || '—'}`,
      `Topic:   ${data.topic}`,
      ``,
      `Message:`,
      data.message,
      ``,
      `— sent from the contact form at ${config.siteDomain}`
    ].join('\n')
  };
}

/**
 * Reads configuration from the environment, with sensible defaults so a fresh
 * deployment only has to set BREVO_API_KEY.
 */
function readConfig(env) {
  return {
    apiKey: env.BREVO_API_KEY,
    senderName: env.CONTACT_SENDER_NAME || 'VriddhiOne Website',
    // Must be a sender identity verified in Brevo for the domain.
    senderEmail: env.CONTACT_SENDER_EMAIL || 'noreply@vriddhione.com',
    toEmail: env.CONTACT_TO_EMAIL || 'contact@vriddhione.com',
    toName: env.CONTACT_TO_NAME || 'VriddhiOne AI Systems',
    siteDomain: env.CONTACT_SITE_DOMAIN || 'vriddhione.com'
  };
}

/**
 * Host-agnostic handler.
 * @param {unknown} body Parsed request body.
 * @param {Record<string, string|undefined>} env Process environment.
 * @returns {Promise<{ status: number, body: object }>}
 */
async function handleContact(body, env) {
  const result = validate(body);
  if (!result.ok) {
    return { status: 400, body: { error: result.error } };
  }

  const config = readConfig(env);
  if (!config.apiKey) {
    console.error('BREVO_API_KEY is not configured for this deployment');
    return { status: 500, body: { error: 'Mail service not configured' } };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': config.apiKey
      },
      body: JSON.stringify(buildEmail(result.data, config))
    });

    if (!response.ok) {
      // Log the provider's reason for us; never return it to the caller.
      const detail = await response.text().catch(() => '');
      console.error('Brevo rejected the message', response.status, detail);
      return { status: 502, body: { error: 'Failed to send message' } };
    }

    return { status: 200, body: { success: true } };
  } catch (error) {
    console.error('Contact form error', error);
    return { status: 500, body: { error: 'Internal server error' } };
  }
}

export { handleContact, validate, escapeHtml, buildEmail, readConfig };
