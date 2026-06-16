"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollRevealParallax({ children, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95],
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, y, scale }}>{children}</motion.div>
    </div>
  );
}
