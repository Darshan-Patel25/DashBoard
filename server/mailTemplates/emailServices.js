const transporter = require("../config/mailer"); // Ensure correct path to mailer configuration
const getPostSuccessEmailTemplate = require("./postSuccess"); // Correct template import
require("dotenv").config();

const sendPostSuccessEmail = async (recipientEmail, postContent, postTime) => {
  const mailOptions = {
    from: `"Social Analytics" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: "📢 Your Post has been Successfully Published!",
    html: getPostSuccessEmailTemplate(postContent, postTime), // Pass postContent and postTime to the template
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendPostSuccessEmail;
