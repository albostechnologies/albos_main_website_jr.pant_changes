"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  // ─── Scroll listener ────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Scroll-to-top handler ──────────────────────────────────────────────
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          // Fixed bottom-right, z-40, circle
          className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#F97316] bg-white text-[#18181B] shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA]"
          // Fade + slide-up entrance/exit
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          // Hover: accent bg + slight scale-up
          whileHover={{
            backgroundColor: "#F97316",
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" style={{ color: "#F97316" }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
