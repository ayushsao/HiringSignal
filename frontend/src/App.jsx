import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AnalyzePage from "./pages/AnalyzePage";
import ResultsPage from "./pages/ResultsPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("hs-dark") === "true";
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("hs-dark", dark);
  }, [dark]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <div className="min-h-screen flex flex-col">
            <Toaster
              position="top-right"
              toastOptions={{
                className: "!bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-gray-100 !shadow-lg",
              }}
            />
            <Navbar dark={dark} setDark={setDark} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/analyze" element={<AnalyzePage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/history" element={<HistoryPage />} />
              </Routes>
            </main>
            <footer className="text-center py-6 text-sm text-gray-400 dark:text-gray-600 border-t border-gray-200 dark:border-gray-800">
              <div className="max-w-6xl mx-auto px-4">
                <p>© 2026 HiringSignal — AI-powered resume analysis</p>
                <p className="mt-2 text-xs">
                  <a href="#" className="hover:text-brand-600 transition">Privacy Policy</a>
                  {" • "}
                  <a href="#" className="hover:text-brand-600 transition">Terms of Service</a>
                  {" • "}
                  <a href="#" className="hover:text-brand-600 transition">Contact Us</a>
                </p>
              </div>
            </footer>
          </div>
        </>
      )}
    </>
  );
}
