import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Lightbulb,
  Target,
  Layers,
  ArrowLeft,
  Download,
  RotateCcw,
} from "lucide-react";
import ScoreRing from "../components/ScoreRing";
import FeedbackCard from "../components/FeedbackCard";
import VerdictBanner from "../components/VerdictBanner";
import { useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const reportRef = useRef(null);
  const scoreRingsRef = useRef(null);
  const feedbackGridRef = useRef(null);

  const { result, meta } = location.state || {};

  useEffect(() => {
    if (!result) navigate("/analyze");
  }, [result, navigate]);

  // GSAP animations for results reveal
  useEffect(() => {
    if (!result) return;

    const ctx = gsap.context(() => {
      // Animate score rings in sequence
      if (scoreRingsRef.current) {
        gsap.from(scoreRingsRef.current.children, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.5,
        });
      }

      // Stagger feedback cards
      if (feedbackGridRef.current) {
        gsap.from(feedbackGridRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.8,
        });
      }
    });

    return () => ctx.revert();
  }, [result]);

  if (!result) return null;

  const {
    atsScore = 0,
    skillRelevanceScore = 0,
    projectDepthScore = 0,
    roleAlignmentScore = 0,
    strengths = [],
    weaknesses = [],
    rejectionReason,
    roleAlignmentFeedback,
    projectDepthFeedback,
    improvementSuggestion,
    overallVerdict,
  } = result;

  async function downloadPDF() {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`HiringSignal_Report_${meta?.role?.replace(/\s/g, "_") || "Resume"}.pdf`);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header actions */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <button
          onClick={() => navigate("/analyze")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          New Analysis
        </button>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/analyze")}
            className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Re-analyze
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadPDF}
            className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-md shadow-brand-600/20"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </motion.button>
        </div>
      </motion.div>

      <div ref={reportRef}>
        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-1">Analysis Results</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {meta?.role} · {meta?.companyType} company
          </p>
        </motion.div>

        {/* Verdict */}
        <div className="mb-8">
          <VerdictBanner verdict={overallVerdict} />
        </div>

        {/* Score rings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mb-8"
        >
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
            Score Breakdown
          </h2>
          <div ref={scoreRingsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <ScoreRing score={atsScore} label="ATS Score" />
            <ScoreRing score={skillRelevanceScore} label="Skill Relevance" />
            <ScoreRing score={projectDepthScore} label="Project Depth" />
            <ScoreRing score={roleAlignmentScore} label="Role Alignment" />
          </div>
        </motion.div>

        {/* Strengths & Weaknesses - Prominent Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 mb-8"
        >
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6">
            Key Insights
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <ThumbsUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-lg">Strengths</h3>
              </div>
              <ul className="space-y-3">
                {strengths.length > 0 ? (
                  strengths.map((s, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{s}</span>
                    </motion.li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No specific strengths identified</p>
                )}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <ThumbsDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-semibold text-lg">Areas for Improvement</h3>
              </div>
              <ul className="space-y-3">
                {weaknesses.length > 0 ? (
                  weaknesses.map((w, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{w}</span>
                    </motion.li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No specific weaknesses identified</p>
                )}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Detailed Feedback grid */}
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
          Detailed Analysis
        </h2>
        <div ref={feedbackGridRef} className="grid sm:grid-cols-2 gap-4 mb-8">
          <FeedbackCard title="Strengths" icon={ThumbsUp} index={0} variant="success">
            <ul className="space-y-2">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </FeedbackCard>

          <FeedbackCard title="Weaknesses" icon={ThumbsDown} index={1} variant="danger">
            <ul className="space-y-2">
              {weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </FeedbackCard>

          <FeedbackCard title="Role Alignment" icon={Target} index={2} variant="info">
            {roleAlignmentFeedback}
          </FeedbackCard>

          <FeedbackCard title="Project Depth" icon={Layers} index={3} variant="info">
            {projectDepthFeedback}
          </FeedbackCard>

          <FeedbackCard title="Rejection Reason" icon={AlertTriangle} index={4} variant="warning">
            {rejectionReason}
          </FeedbackCard>

          <FeedbackCard title="Top Improvement" icon={Lightbulb} index={5} variant="default">
            {improvementSuggestion}
          </FeedbackCard>
        </div>
      </div>
    </div>
  );
}
