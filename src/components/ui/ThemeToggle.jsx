"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

function getSystemTheme() {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function getStoredTheme() {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("albos-theme");
  if (stored === "light" || stored === "dark") return stored;
  return null;
}

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.remove("light");
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read initial theme from localStorage or system preference
    const stored = getStoredTheme();
    const initial = stored ?? getSystemTheme();
    applyTheme(initial);

    // Defer setState to avoid synchronous setState in effect
    const frameId = requestAnimationFrame(() => {
      setTheme(initial);
      setMounted(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("albos-theme", next);
      applyTheme(next);
      return next;
    });
  }, []);

  // Avoid hydration mismatch — render placeholder until mounted
  if (!mounted) {
    return <div className="w-10 h-10 rounded-full" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full glass-card border-white/[0.08] hover:border-[#F97316]/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)] cursor-pointer"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <Sun className="size-[18px] text-[#18181B]" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <Moon className="size-[18px] text-[#FAFAFA]" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default ThemeToggle;
