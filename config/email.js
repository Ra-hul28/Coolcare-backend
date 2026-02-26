// server/config/email.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Switching to 465 with "secure: true" for the aggressive setup
  secure: true, 
  pool: true, // Uses a pool of connections rather than creating new ones every time
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Aggressive timeout settings to prevent the "ETIMEDOUT" you are seeing in logs
  connectionTimeout: 20000, // 20 seconds
  greetingTimeout: 20000,
  socketTimeout: 25000,
  dnsTimeout: 10000,
  tls: {
    // Prevents Render from failing the handshake if the certificate isn't perfectly matched
    rejectUnauthorized: false,
    minVersion: "TLSv1.2"
  },
});

// Verify connection on startup with detailed error logging
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
    console.log("👉 Tip: Check if 'eptnflxskfumcamm' is still your active App Password in Render settings.");
  } else {
    console.log("✅ SUCCESS: Email transporter is live and connected!");
  }
});

module.exports = transporter;