import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Trash2,
  ChevronRight,
  ShieldCheck,
  Shield,
  ShieldX,
  Inbox,
} from "lucide-react";
import toast from "react-hot-toast";
import { getHistory, deleteAnalysis, getAnalysisById } from "../api";

const verdictIcon = {
  Shortlisted: <ShieldCheck className="w-4 h-4 text-green-500" />,
  "On the Fence": <Shield className="w-4 h-4 text-amber-500" />,
  Rejected: <ShieldX className="w-4 h-4 text-red-500" />,
};

const verdictColor = {
  Shortlisted: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30",
  "On the Fence": "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30",
  Rejected: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30",
};

export default function HistoryPage() {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const data = await getHistory();
      setAnalyses(data);
    } catch {
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id, e) {
    e.stopPropagation();
    try {
      await deleteAnalysis(id);
      setAnalyses((prev) => prev.filter((a) => a._id !== id));
      toast.success("Analysis deleted");
    } catch {
      toast.error("Failed to delete");
    }
  }

  async function handleView(id) {
    try {
      const full = await getAnalysisById(id);
      navigate("/results", {
        state: {
          result: full,
          meta: { role: full.role, companyType: full.companyType },
        },
      });
    } catch {
      toast.error("Failed to load analysis");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Clock className="w-8 h-8 text-brand-500" />
          Analysis History
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Review your past resume evaluations • {analyses.length} total
        </p>
      </motion.div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-5 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-3" />
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : analyses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 text-center"
        >
          <Inbox className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No analyses yet</h3>
          <p className="text-sm text-gray-400 mb-6">
            Run your first resume analysis to see results here.
          </p>
          <button
            onClick={() => navigate("/analyze")}
            className="px-6 py-2.5 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors"
          >
            Analyze Resume
          </button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {analyses.map((a, i) => (
              <motion.div
                key={a._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleView(a._id)}
                className="glass-card p-5 cursor-pointer hover:shadow-xl transition-shadow group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{a.role}</h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          verdictColor[a.overallVerdict] || ""
                        }`}
                      >
                        {verdictIcon[a.overallVerdict]}
                        {a.overallVerdict}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{a.companyType}</span>
                      <span>ATS: {a.atsScore}/100</span>
                      <span>{new Date(a.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDelete(a._id, e)}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-brand-500 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
