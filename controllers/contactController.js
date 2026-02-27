// server/controllers/contactController.js
const { Resend } = require("resend");

// Initialize Resend with your API Key from Render Environment Variables
const resend = new Resend(process.env.RESEND_API_KEY);

exports.submitContactForm = async (req, res) => {
  try {
    const { name, phone, email, address, message } = req.body;

    // 1. Validate required fields
    if (!name || !phone || !email || !address || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Send Email via Resend API (Bypasses SMTP timeout issues)
    const { data, error } = await resend.emails.send({
      from: 'CoolCare <onboarding@resend.dev>', // Keep this as onboarding@resend.dev for free tier
      to: 'rahul28200428@gmail.com', // Your verified email
      reply_to: email,
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
          <p><small>Sent on: ${new Date().toLocaleString("en-IN")}</small></p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      throw new Error(error.message);
    }

    // 3. Success Response
    res.status(201).json({
      success: true,
      message: "Thank you! Your enquiry has been submitted. We'll contact you shortly.",
    });

  } catch (error) {
    console.error("Contact Form Submission Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit form. Please try again later.",
    });
  }
};