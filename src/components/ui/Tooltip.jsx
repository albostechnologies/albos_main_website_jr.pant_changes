"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Tooltip({ content, children, position = "top" }) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const motionVariants = {
    top: { initial: { y: 4, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    bottom: { initial: { y: -4, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: 4, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: -4, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={motionVariants[position].initial}
            animate={motionVariants[position].animate}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 ${positionStyles[position]} pointer-events-none`}
          >
            <div className="whitespace-nowrap rounded-lg bg-[#18181B] border border-black/[0.08] px-3 py-1.5 text-xs font-[family-name:var(--font-inter)] text-white shadow-xl shadow-black/10">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
