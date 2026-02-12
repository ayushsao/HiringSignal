const mongoose = require("mongoose");

const resumeAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
    resumeText: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Data Scientist",
        "DevOps Engineer",
        "Mobile Developer",
        "UI/UX Designer",
        "Product Manager",
        "Machine Learning Engineer",
        "Cloud Architect",
        "QA Engineer",
        "Cybersecurity Analyst",
        "Legal Intern",
        "Legal Associate",
      ],
    },
    companyType: {
      type: String,
      required: true,
      enum: ["Startup", "MNC", "Product-based"],
    },
    atsScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    skillRelevanceScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    projectDepthScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    roleAlignmentScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    strengths: [String],
    weaknesses: [String],
    rejectionReason: {
      type: String,
    },
    roleAlignmentFeedback: {
      type: String,
    },
    projectDepthFeedback: {
      type: String,
    },
    improvementSuggestion: {
      type: String,
    },
    overallVerdict: {
      type: String,
      enum: ["Shortlisted", "On the Fence", "Rejected"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);
