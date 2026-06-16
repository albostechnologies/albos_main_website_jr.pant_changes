"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function VideoModal({ isOpen, onClose }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAFAFA]/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl mx-4 aspect-video bg-[#FFFFFF] rounded-2xl overflow-hidden border border-black/[0.06] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/[0.06] border border-black/[0.08] text-[#18181B] hover:bg-black/[0.12] hover:text-[#F97316] transition-all duration-300"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Video placeholder — Albos showreel */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#F5F5F0] to-[#FAFAFA]">
              {/* Decorative circle */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full border-2 border-[#F97316]/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#F97316]/10 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-[#F97316] ml-1"
                    >
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 w-24 h-24 rounded-full border border-[#F97316]/10 animate-pulse-ring" />
              </div>

              <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl md:text-2xl font-bold text-[#18181B] mb-2">
                Albos Technologies Pvt Ltd Showreel
              </h3>
              <p className="text-[#A1A1AA] text-sm font-[family-name:var(--font-inter)]">
                Coming Soon — 2025
              </p>

              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px),
                    repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
