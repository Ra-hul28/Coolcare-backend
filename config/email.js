// server/config/email.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // Use direct host and port instead of 'service: gmail' for better reliability on Render
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Your 16-character App Password from Google
  },
  tls: {
    // Helps prevent connection rejection on hosted servers
    rejectUnauthorized: false,
  },
});

// Verify connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
    console.log("Check if your App Password in Render is current and has no spaces.");
  } else {
    console.log("✅ Email transporter ready - Your backend can send emails!");
  }
});

module.exports = transporter;