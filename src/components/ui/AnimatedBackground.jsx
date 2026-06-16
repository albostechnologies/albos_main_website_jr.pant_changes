"use client";

import { motion } from "framer-motion";

export function AnimatedBackground({ variant = "dots", className = "" }) {
  if (variant === "dots") {
    return (
      <div className={`absolute inset-0 pointer-events-none ${className}`}>
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={`absolute inset-0 pointer-events-none ${className}`}>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    );
  }

  if (variant === "mesh") {
    return (
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      >
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#F97316]/[0.03] rounded-full blur-[100px]"
        />

        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#F97316]/[0.02] rounded-full blur-[80px]"
        />
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#F97316]/[0.04] rounded-full blur-[120px]" />
      </div>
    );
  }

  return null;
}
