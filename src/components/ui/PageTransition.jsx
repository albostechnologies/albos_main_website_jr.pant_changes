"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransition({ children, pageKey }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLoadingText, setShowLoadingText] = useState(false);
  const prevPageKeyRef = useRef(pageKey);

  useEffect(() => {
    if (prevPageKeyRef.current !== pageKey) {
      prevPageKeyRef.current = pageKey;

      // Defer state update to avoid synchronous setState in effect
      const rafId = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });

      // Show loading text after a brief delay
      const textTimeout = setTimeout(() => setShowLoadingText(true), 150);

      // End transition after 500ms total
      const endTimeout = setTimeout(() => {
        setIsTransitioning(false);
        setShowLoadingText(false);
      }, 500);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(textTimeout);
        clearTimeout(endTimeout);
      };
    }
  }, [pageKey]);

  return (
    <>
      {/* Transition overlay with clip-path reveal from center */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key={`transition-${pageKey}`}
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
            initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
            animate={{
              clipPath: "inset(0% 0% 0% 0%)",
              transition: {
                duration: 0.3,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            exit={{
              clipPath: "inset(50% 50% 50% 50%)",
              transition: {
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15,
              },
            }}
          >
            {/* Accent background */}
            <div className="absolute inset-0 bg-[#F97316]" />

            {/* Loading text */}
            <AnimatePresence>
              {showLoadingText && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="relative font-[family-name:var(--font-plus-jakarta)] text-white text-lg font-bold tracking-widest uppercase"
                >
                  Loading...
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
