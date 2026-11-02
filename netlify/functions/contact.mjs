// Netlify function — POST /api/contact
//
// netlify.toml redirects /api/contact here, so the frontend uses the same
// path on Netlify as it does on Vercel.
//
// Required environment variable:
//   BREVO_API_KEY            Brevo (Sendinblue) transactional API key
//
// Optional overrides (see lib/contact-core.mjs for defaults):
//   CONTACT_TO_EMAIL, CONTACT_SENDER_EMAIL, CONTACT_SENDER_NAME,
//   CONTACT_TO_NAME, CONTACT_SITE_DOMAIN

import { handleContact } from '../../lib/contact-core.mjs';

const JSON_HEADERS = { 'content-type': 'application/json' };

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...JSON_HEADERS, Allow: 'POST' }
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: JSON_HEADERS
    });
  }

  const result = await handleContact(body, process.env);
  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: JSON_HEADERS
  });
}
