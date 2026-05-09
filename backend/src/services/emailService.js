const { Resend } = require('resend');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Sends an email notification about a new inquiry
 * @param {Object} inquiryData - Data from the inquiry form
 */
const sendInquiryEmail = async (inquiryData) => {
  if (!resend) {
    console.warn('Resend API key missing. Email not sent.');
    return;
  }

  const { name, email, phone, interest } = inquiryData;

  try {
    const data = await resend.emails.send({
      from: 'Noorson Lookbook <onboarding@resend.dev>', // Update this after domain verification
      to: [process.env.NOTIFICATION_EMAIL],
      subject: `New Inquiry from ${name} - Noorson Luxury Lookbook`,
      html: `
        <div style="font-family: serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5;">
          <h1 style="color: #000; border-bottom: 1px solid #000; padding-bottom: 10px;">New Luxury Inquiry</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message/Interest:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #000;">
            ${interest}
          </div>
          <p style="margin-top: 20px; font-size: 0.8em; color: #666;">
            This inquiry was captured from the Noorson Luxury Lookbook Website.
          </p>
        </div>
      `,
    });

    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendInquiryEmail };
