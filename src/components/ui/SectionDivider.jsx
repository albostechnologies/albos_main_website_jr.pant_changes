"use client";

import { motion } from "framer-motion";

export function SectionDivider({ variant = "gradient", className = "" }) {
  if (variant === "gradient") {
    return (
      <div className={`relative h-px w-full ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
      </div>
    );
  }

  if (variant === "accent") {
    return (
      <div className={`relative h-px w-full ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent" />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`flex items-center justify-center gap-3 py-8 ${className}`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-black/[0.08]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#F97316]/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-black/[0.08]" />
      </motion.div>
    );
  }

  if (variant === "wave") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`relative w-full overflow-hidden ${className}`}
        style={{ height: "40px" }}
      >
        <svg
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.15">
                <animate
                  attributeName="offset"
                  values="0%;50%;0%"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="#FB923C" stopOpacity="0.25">
                <animate
                  attributeName="offset"
                  values="50%;100%;50%"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.1">
                <animate
                  attributeName="offset"
                  values="100%;0%;100%"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <path
            d="M0,20 C240,35 480,5 720,20 C960,35 1200,5 1440,20 L1440,40 L0,40 Z"
            fill="url(#waveGradient)"
          />

          <path
            d="M0,25 C240,10 480,35 720,18 C960,5 1200,30 1440,18 L1440,40 L0,40 Z"
            fill="url(#waveGradient)"
            opacity="0.5"
          />
        </svg>
      </motion.div>
    );
  }

  if (variant === "diagonal") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`relative w-full overflow-hidden ${className}`}
        style={{ height: "24px" }}
      >
        <svg
          viewBox="0 0 1440 24"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="diagonalGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#F97316" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <motion.line
            x1="0"
            y1="24"
            x2="1440"
            y2="0"
            stroke="url(#diagonalGradient)"
            strokeWidth="1"
          />
        </svg>
        {/* Animated accent dot traveling along the diagonal */}
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-[#F97316]/40"
          animate={{
            x: ["0%", "100%"],
            y: ["100%", "0%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "-3px", left: "-3px" }}
        />
      </motion.div>
    );
  }

  // line variant
  return <div className={`h-px w-full bg-black/[0.04] ${className}`} />;
}
