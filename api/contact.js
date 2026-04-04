// Vercel Serverless Function — proxies contact form to Brevo SMTP API
// Environment variable required: BREVO_API_KEY (set in Vercel dashboard)

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY not configured');
    return res.status(500).json({ error: 'Mail service not configured' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: 'Vriddhi One Website', email: 'noreply@vriddhi-one.com' },
        to: [{ email: 'teams@vriddhi-one.com', name: 'Vriddhi One Team' }],
        replyTo: { email, name },
        subject: `New enquiry from ${name}`,
        htmlContent: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color:#888;font-size:12px;">Sent from vriddhi-one.com contact form</p>
        `,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Brevo API error:', err);
      return res.status(502).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
