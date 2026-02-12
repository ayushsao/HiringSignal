import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Send, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import ResumeUploader from "../components/ResumeUploader";
import LoadingOverlay from "../components/LoadingOverlay";
import { uploadResumePDF, analyzeResume } from "../api";

const ROLES = [
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
];

const COMPANY_TYPES = ["Startup", "MNC", "Product-based"];

export default function AnalyzePage() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [role, setRole] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = (file || resumeText.length > 50) && role && companyType;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      let text = resumeText;

      // If PDF uploaded, extract text first
      if (file) {
        toast("Extracting text from PDF...", { icon: "📄" });
        const uploaded = await uploadResumePDF(file);
        text = uploaded.text;
      }

      toast("AI is analyzing your resume...", { icon: "🧠" });
      const result = await analyzeResume(text, role, companyType);

      // Navigate to results with data
      navigate("/results", {
        state: {
          result,
          meta: { role, companyType },
        },
      });
    } catch (err) {
      console.error("Analysis error:", err);
      let errorMessage = "Analysis failed. Please try again.";
      
      if (err?.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (err?.code === 'ECONNABORTED') {
        errorMessage = "Request timeout. Server may be starting up.";
      } else if (err?.code === 'ERR_NETWORK') {
        errorMessage = "Cannot connect to server. Please try again.";
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Analyze Your Resume</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Upload your resume or paste the text, select your target role, and let AI evaluate it.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Resume */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 text-sm font-bold flex items-center justify-center">
                1
              </span>
              Your Resume
            </h2>
            <ResumeUploader
              file={file}
              setFile={setFile}
              resumeText={resumeText}
              setResumeText={setResumeText}
            />
          </motion.section>

          {/* Step 2: Role */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 text-sm font-bold flex items-center justify-center">
                2
              </span>
              Target Role
            </h2>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
              >
                <option value="" disabled>
                  Select a target role...
                </option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </motion.section>

          {/* Step 3: Company Type */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 text-sm font-bold flex items-center justify-center">
                3
              </span>
              Company Type
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {COMPANY_TYPES.map((ct) => (
                <motion.button
                  key={ct}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCompanyType(ct)}
                  className={`py-3 px-4 rounded-2xl border text-sm font-medium transition-all ${
                    companyType === ct
                      ? "border-brand-500 bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 shadow-md shadow-brand-500/10"
                      : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
                >
                  {ct}
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              type="submit"
              disabled={!canSubmit || loading}
              whileHover={canSubmit ? { scale: 1.02 } : {}}
              whileTap={canSubmit ? { scale: 0.98 } : {}}
              className={`w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
                canSubmit
                  ? "bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/30"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
              }`}
            >
              <Send className="w-5 h-5" />
              Run AI Analysis
            </motion.button>
          </motion.div>
        </form>
      </div>
    </>
  );
}
