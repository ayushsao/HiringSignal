import { motion } from "framer-motion";
import { useGsapCounter } from "../hooks/useGsapCounter";

const COLOR_MAP = {
  high: { stroke: "#22c55e", bg: "text-green-500" },
  mid: { stroke: "#f59e0b", bg: "text-amber-500" },
  low: { stroke: "#ef4444", bg: "text-red-500" },
};

function getColor(score) {
  if (score >= 70) return COLOR_MAP.high;
  if (score >= 40) return COLOR_MAP.mid;
  return COLOR_MAP.low;
}

export default function ScoreRing({ score, label, size = 120, strokeWidth = 8 }) {
  const animatedScore = useGsapCounter(score, 1.5, "power2.out");
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;
  const color = getColor(score);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-800"
          />
          {/* Score circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        {/* Center score */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${color.bg}`}>{animatedScore}</span>
        </div>
      </div>
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}
