  require("dotenv").config();
  const express = require("express");
  const cors = require("cors");
  const mongoose = require("mongoose");
  const rateLimit = require("express-rate-limit");
  const resumeRoutes = require("./routes/resume");
  const authRoutes = require("./routes/auth");

  const app = express();

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  });

  // Trust proxy for Render deployment (fixes express-rate-limit warning)
  app.set('trust proxy', 1);

  // Middleware
  app.use(limiter);

  const allowedOrigins = [
    process.env.FRONTEND_URL,
    "https://hiring-signal-seven.vercel.app",
    "http://localhost:5173"
  ].filter(Boolean);

  console.log("Allowed CORS origins:", allowedOrigins);

  app.use(cors({
    origin: allowedOrigins,
    credentials: true
  }));
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api", resumeRoutes);

  // Health check
  app.get("/", (_req, res) => {
    res.json({ status: "HiringSignal API is running", version: "2.0.0" });
  });

  // MongoDB connection
  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI environment variable is not set!");
  } else {
    console.log("🔗 Attempting MongoDB connection...");
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("✅ MongoDB connected"))
      .catch((err) => console.error("❌ MongoDB connection error:", err));
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 HiringSignal backend running on port ${PORT}`);
  });

  module.exports = app;
