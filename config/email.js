// server/config/email.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use false for port 587 (it will use STARTTLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // This is critical for cloud hosting to avoid certificate handshake timeouts
    rejectUnauthorized: false,
    minVersion: "TLSv1.2"
  },
});

// Verify connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
  } else {
    console.log("✅ Email transporter ready - Connection Established!");
  }
});

module.exports = transporter;