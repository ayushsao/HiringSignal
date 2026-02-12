import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Target,
  Brain,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";
import { useGsapCounter } from "../hooks/useGsapCounter";
// import ThreeBackground from "../components/ThreeBackground";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: BarChart3,
    title: "ATS Compatibility Score",
    desc: "Get a 0–100 score based on real ATS parsing logic and keyword matching.",
  },
  {
    icon: Target,
    title: "Skill Relevance Analysis",
    desc: "See how well your skills match the specific role you're targeting.",
  },
  {
    icon: Brain,
    title: "Project Depth Evaluation",
    desc: "Understand whether your projects demonstrate real impact and ownership.",
  },
  {
    icon: ShieldCheck,
    title: "Rejection Simulation",
    desc: "Get realistic rejection reasons — not generic tips — so you can fix what matters.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    company: "Google",
    image: "👩‍💻",
    text: "HiringSignal helped me identify exactly what my resume was missing. After implementing their feedback, I got callbacks from 3 FAANG companies!",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    role: "Data Scientist",
    company: "Microsoft",
    image: "👨‍💼",
    text: "The AI feedback was brutally honest and incredibly specific. It's like having a senior recruiter review your resume for free.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Full Stack Developer",
    company: "Startup",
    image: "👩‍🔬",
    text: "I was skeptical at first, but the analysis pinpointed weak areas I never noticed. My interview callback rate doubled after fixing them.",
    rating: 5,
  },
];

const stats = [
  { icon: Users, number: "10K+", label: "Users" },
  { icon: BarChart3, number: "50K+", label: "Resumes Analyzed" },
  { icon: TrendingUp, number: "73%", label: "Success Rate" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  const navigate = useNavigate();
  const badgeRef = useRef(null);
  const statsRef = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);

  // Animated stat counters (triggered on scroll)
  const [stat1Visible, setstat1Visible] = useState(false);
  const stat1Count = useGsapCounter(stat1Visible ? 4 : 0, 1.2, "power2.out");
  const stat2Count = useGsapCounter(stat1Visible ? 12 : 0, 1.5, "power2.out");
  const stat3Count = useGsapCounter(stat1Visible ? 3 : 0, 1.0, "power2.out");

  useEffect(() => {
    // Parallax effect on hero badge
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        y: -20,
        scrollTrigger: {
          trigger: badgeRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Stats scroll trigger
    if (statsRef.current) {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => setstat1Visible(true),
        once: true,
      });
    }
  }, []);

  return (
    <>
      {/* <ThreeBackground /> */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.div
            ref={badgeRef}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 text-sm font-medium mb-6 border border-brand-200 dark:border-brand-800"
          >
            <Zap className="w-4 h-4" />
            AI-Powered Resume Intelligence
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              Stop guessing.
            </span>
            <br />
            <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              Start signaling.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your resume and get a realistic simulation of how an ATS and experienced recruiter
            would evaluate your profile — with specific, actionable feedback.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/analyze")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-2xl shadow-lg shadow-brand-600/30 hover:shadow-brand-600/50 transition-all text-lg"
          >
            Analyze My Resume
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <p className="mt-4 text-sm text-gray-500">
            Free AI-powered resume analysis • No sign-up required
          </p>
        </motion.div>

        {/* Social proof badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-8 mb-16 flex-wrap"
        >
          {stats.map(({ icon: Icon, number, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-brand-600" />
              <div>
                <div className="text-xl font-bold">{number}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={item}
              className="glass-card p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center mb-4 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/50 transition-colors">
                <Icon className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Trusted by Job Seekers</h2>
            <p className="text-gray-500 dark:text-gray-400">
              See what others are saying about HiringSignal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-3 gap-8 text-center"
        >
          <div ref={stat1Ref}>
            <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              {stat1Count}
            </div>
            <div className="text-sm text-gray-400 mt-1">Score Dimensions</div>
          </div>
          <div ref={stat2Ref}>
            <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              {stat2Count}+
            </div>
            <div className="text-sm text-gray-400 mt-1">Role Templates</div>
          </div>
          <div ref={stat3Ref}>
            <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              {stat3Count}
            </div>
            <div className="text-sm text-gray-400 mt-1">Company Profiles</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center glass-card p-12 rounded-3xl"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to level up your resume?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of job seekers who have improved their resumes with AI-powered insights
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/analyze")}
            className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-2xl shadow-lg shadow-brand-600/30 transition-all"
          >
            Start Analysis
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-3 gap-8 text-center"
        >
          <div ref={stat1Ref}>
            <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              {stat1Count}
            </div>
            <div className="text-sm text-gray-400 mt-1">Score Dimensions</div>
          </div>
          <div ref={stat2Ref}>
            <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              {stat2Count}+
            </div>
            <div className="text-sm text-gray-400 mt-1">Role Templates</div>
          </div>
          <div ref={stat3Ref}>
            <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              {stat3Count}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
