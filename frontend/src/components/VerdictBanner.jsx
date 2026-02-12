import { motion } from "framer-motion";
import { Shield, ShieldCheck, ShieldX } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const verdictConfig = {
  Shortlisted: {
    icon: ShieldCheck,
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-900",
    text: "text-green-700 dark:text-green-400",
    badge: "bg-green-500",
    label: "SHORTLISTED",
    description: "Your resume passed the initial screening. You would likely move to the interview round.",
  },
  "On the Fence": {
    icon: Shield,
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-900",
    text: "text-amber-700 dark:text-amber-400",
    badge: "bg-amber-500",
    label: "ON THE FENCE",
    description: "Your resume is borderline. Small improvements could push you into the shortlist.",
  },
  Rejected: {
    icon: ShieldX,
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-900",
    text: "text-red-700 dark:text-red-400",
    badge: "bg-red-500",
    label: "REJECTED",
    description: "Your resume would likely be filtered out during initial screening.",
  },
};

export default function VerdictBanner({ verdict }) {
  const config = verdictConfig[verdict] || verdictConfig.Rejected;
  const Icon = config.icon;
  const iconRef = useRef(null);

  useEffect(() => {
    if (!iconRef.current) return;

    // Pulsing glow effect
    gsap.to(iconRef.current, {
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`${config.bg} ${config.border} border rounded-2xl p-6 flex items-center gap-4`}
    >
      <div ref={iconRef} className={`${config.badge} p-3 rounded-xl shadow-lg`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div>
        <div className={`text-xs font-bold uppercase tracking-widest ${config.text} mb-1`}>
          {config.label}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{config.description}</p>
      </div>
    </motion.div>
  );
}
