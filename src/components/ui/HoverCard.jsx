"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function HoverCard({ children, className = "", glowColor = "#F97316" }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${className}`}
    >
      {/* Glow background on hover */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ backgroundColor: `${glowColor}15` }}
        animate={{ opacity: isHovered ? 0.15 : 0 }}
      />

      {/* Content */}
      <motion.div
        animate={{
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {children}
      </motion.div>

      {/* Bottom accent line on hover */}
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
        style={{ backgroundColor: glowColor }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isHovered ? 0.6 : 0,
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
