// server/config/email.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // This should be a Gmail App Password
  },
    tls: {
    rejectUnauthorized: false,
  },
});

// Optional: Verify connection on startup (helpful for debugging)
transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter error:", error);
  } else {
    console.log("Email transporter ready");
  }
});

module.exports = transporter;