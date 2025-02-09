const nodemailer = require("nodemailer");
const transporter = require("../config/mailer");
const getPostSuccessEmailTemplate = require("./postSuccess");

const sendPostSuccessEmail = async (
  recipientEmail,
  userName,
  postContent,
  postDate
) => {
  const mailOptions = {
    from: `"Social Analytics" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: "🎉 Post Successfully Published!",
    html: getPostSuccessEmailTemplate(userName, postContent, postDate),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendPostSuccessEmail;
