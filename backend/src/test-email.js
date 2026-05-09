require('dotenv').config();
const { sendInquiryEmail } = require('./services/emailService');

const testInquiry = {
  name: 'Test Collector',
  email: 'test@example.com',
  phone: '+1 234 567 890',
  interest: 'This is a test inquiry to verify that the Resend email notification system is working perfectly for the Noorson Luxury Lookbook.'
};

console.log('Sending test email via Resend...');

sendInquiryEmail(testInquiry)
  .then(data => {
    console.log('✅ Success! Email sent successfully.');
    console.log('Resend Response:', data);
    console.log('\nCheck your inbox (and spam folder) for the notification.');
  })
  .catch(err => {
    console.error('❌ Failed to send email.');
    console.error('Error Details:', err);
  });
