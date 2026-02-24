// server/controllers/contactController.js
const transporter = require("../config/email");

exports.submitContactForm = async (req, res) => {
  try {
    const { name, phone, email, address, message } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !address || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Send Email Notification to Business Owner
    await transporter.sendMail({
      from: `"CoolCare Service" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "📩 New Service Enquiry - CoolCare",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #0ea5e9;">New Customer Enquiry</h2>
          <hr>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <small>Sent on: ${new Date().toLocaleString("en-IN")}</small>
        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Thank you! Your enquiry has been submitted. We'll contact you shortly.",
    });
  } catch (error) {
    console.error("Contact Form Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit form. Please try again later.",
    });
  }
};