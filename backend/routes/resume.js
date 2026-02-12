const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const ResumeAnalysis = require("../models/ResumeAnalysis");
const User = require("../models/User");
const { analyzeResume } = require("../services/openaiService");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Configure multer for PDF upload (store in memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});

/**
 * POST /api/upload
 * Upload a PDF resume and extract text
 */
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text.trim();

    if (!text || text.length < 50) {
      return res.status(400).json({
        error: "Could not extract enough text from the PDF. Please paste your resume text instead.",
      });
    }

    res.json({ text, pages: pdfData.numpages });
  } catch (err) {
    console.error("PDF parse error:", err);
    res.status(500).json({ error: "Failed to parse PDF file" });
  }
});

/**
 * POST /api/analyze-resume
 * Analyze resume text using AI (no authentication required)
 */
router.post("/analyze-resume", async (req, res) => {
  try {
    const { resumeText, role, companyType } = req.body;

    if (!resumeText || !role || !companyType) {
      return res.status(400).json({
        error: "resumeText, role, and companyType are all required",
      });
    }

    if (resumeText.length < 50) {
      return res.status(400).json({
        error: "Resume text is too short for meaningful analysis",
      });
    }

    // Call AI for analysis
    const analysis = await analyzeResume(resumeText, role, companyType);

    // Save to database (without user association)
    const record = new ResumeAnalysis({
      userId: null, // No user authentication
      resumeText: resumeText.substring(0, 10000), // cap stored text
      role,
      companyType,
      atsScore: analysis.atsScore,
      skillRelevanceScore: analysis.skillRelevanceScore,
      projectDepthScore: analysis.projectDepthScore,
      roleAlignmentScore: analysis.roleAlignmentScore,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      rejectionReason: analysis.rejectionReason,
      roleAlignmentFeedback: analysis.roleAlignmentFeedback,
      projectDepthFeedback: analysis.projectDepthFeedback,
      improvementSuggestion: analysis.improvementSuggestion,
      overallVerdict: analysis.overallVerdict,
    });

    await record.save();

    res.json({
      id: record._id,
      ...analysis,
    });
  } catch (err) {
    console.error("Analysis error:", err);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
});

/**
 * GET /api/history
 * Get past analyses (most recent first, no authentication required)
 */
router.get("/history", async (_req, res) => {
  try {
    const analyses = await ResumeAnalysis.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .select("-resumeText"); // exclude full resume text for list view

    res.json(analyses);
  } catch (err) {
    console.error("History fetch error:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

/**
 * GET /api/history/:id
 * Get a single analysis by ID (no authentication required)
 */
router.get("/history/:id", async (req, res) => {
  try {
    const analysis = await ResumeAnalysis.findById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ error: "Analysis not found" });
    }
    res.json(analysis);
  } catch (err) {
    console.error("History detail error:", err);
    res.status(500).json({ error: "Failed to fetch analysis" });
  }
});

/**
 * DELETE /api/history/:id
 * Delete an analysis (no authentication required)
 */
router.delete("/history/:id", async (req, res) => {
  try {
    const result = await ResumeAnalysis.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Analysis not found" });
    }

    res.json({ message: "Analysis deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete analysis" });
  }
});

module.exports = router;
