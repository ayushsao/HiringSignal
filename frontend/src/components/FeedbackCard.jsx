import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

export default function FeedbackCard({ title, icon: Icon, children, index = 0, variant = "default" }) {
  const borderColors = {
    success: "border-l-green-500",
    danger: "border-l-red-500",
    warning: "border-l-amber-500",
    info: "border-l-blue-500",
    default: "border-l-brand-500",
  };

  const iconColors = {
    success: "text-green-500",
    danger: "text-red-500",
    warning: "text-amber-500",
    info: "text-blue-500",
    default: "text-brand-500",
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={variants}
      className={`glass-card p-5 border-l-4 ${borderColors[variant]}`}
    >
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className={`w-5 h-5 ${iconColors[variant]}`} />}
        <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-700 dark:text-gray-300">
          {title}
        </h3>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{children}</div>
    </motion.div>
  );
}
