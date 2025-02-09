const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "vandanrangani21@gmail.com",
    pass: "fvkljuzwjlwazrxb",
  },
});

module.exports = transporter;
