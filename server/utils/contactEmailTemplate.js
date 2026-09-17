const contactEmailTemplate = ({ name, email, phone, subject, message }) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
    <div style="background:#2B1B14; padding: 20px; text-align:center;">
      <h2 style="color:#D9A441; margin:0;">New Contact Form Submission</h2>
    </div>
    <div style="padding: 24px;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Subject:</strong> ${subject || "Not provided"}</p>
      <hr style="border:none;border-top:1px solid #eee; margin:16px 0;" />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line; color:#333;">${message}</p>
    </div>
    <div style="background:#fff7f8; padding: 14px; text-align:center; font-size:12px; color:#999;">
      This message was sent from the Teyyar Cake website contact form.
    </div>
  </div>
  `;
};

export default contactEmailTemplate;