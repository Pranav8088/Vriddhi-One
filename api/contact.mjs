// Vercel serverless function — POST /api/contact
//
// Required environment variable:
//   BREVO_API_KEY            Brevo (Sendinblue) transactional API key
//
// Optional overrides (see lib/contact-core.mjs for defaults):
//   CONTACT_TO_EMAIL         where enquiries are delivered
//   CONTACT_SENDER_EMAIL     verified sender identity on the domain
//   CONTACT_SENDER_NAME, CONTACT_TO_NAME, CONTACT_SITE_DOMAIN
//
// The shared core deliberately lives outside api/, because every file in api/
// is a candidate endpoint and a helper module has no default export to serve.

import { handleContact } from '../lib/contact-core.mjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel parses JSON bodies automatically, but a string can still arrive if
  // the content-type was not set by the caller.
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  }

  const result = await handleContact(body, process.env);
  return res.status(result.status).json(result.body);
}
