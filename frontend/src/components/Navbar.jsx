import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, BarChart3, Upload, Clock } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Navbar({ dark, setDark }) {
  const location = useLocation();
  const logoRef = useRef(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const logo = logoRef.current;

    const handleMouseEnter = () => {
      gsap.to(logo, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: "back.out(2)",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(logo, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    logo.addEventListener("mouseenter", handleMouseEnter);
    logo.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      logo.removeEventListener("mouseenter", handleMouseEnter);
      logo.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const links = [
    { to: "/", label: "Home", icon: BarChart3 },
    { to: "/analyze", label: "Analyze", icon: Upload },
    { to: "/history", label: "History", icon: Clock },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass-card !rounded-none border-x-0 border-t-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              ref={logoRef}
              className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-600/30 group-hover:shadow-brand-600/50 transition-shadow"
            >
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              HiringSignal
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors ${active
                    ? "text-brand-600 dark:text-brand-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-brand-50 dark:bg-brand-950/50 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Dark mode toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="ml-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.nav >
  );
}
