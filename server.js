const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: "https://frontendcoolcare.vercel.app",
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/contact", require("./routes/contactRoutes"));

const PORT = process.env.PORT || 5000;

// Add this to server.js before app.listen
app.get("/", (req, res) => {
  res.send("CoolCare Backend is Running Successfully!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});