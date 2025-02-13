const transporter = require("../config/mailer"); // Ensure correct path to mailer configuration
const getWelcomeEmailTemplate = require("./acccountCreation"); // Import the welcome email template
require("dotenv").config();

const sendWelcomeEmail = async (recipientEmail, userName) => {
  const mailOptions = {
    from: `"Social Analytics" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: "🎉 Welcome to Social Analytics!",
    html: getWelcomeEmailTemplate(userName), // Pass userName to the template
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

module.exports = sendWelcomeEmail;
