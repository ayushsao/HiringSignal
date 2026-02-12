import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const tips = [
  "Scanning for keyword optimization...",
  "Evaluating project depth and impact...",
  "Checking role alignment signals...",
  "Simulating recruiter screening logic...",
  "Analyzing skills matrix against role requirements...",
  "Running ATS compatibility check...",
  "Generating honest feedback...",
];

export default function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-8 max-w-md w-full mx-4 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4"
        >
          <Loader2 className="w-12 h-12 text-brand-500" />
        </motion.div>

        <h3 className="text-lg font-semibold mb-2">Analyzing your resume</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          This typically takes 15–30 seconds
        </p>

        <div className="space-y-2">
          {tips.map((tip, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 3, duration: 0.5 }}
              className="text-xs text-gray-400 dark:text-gray-500"
            >
              {tip}
            </motion.p>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "95%" }}
            transition={{ duration: 25, ease: "linear" }}
            className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
