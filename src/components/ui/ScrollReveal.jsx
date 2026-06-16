"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.8,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };

  const offset = directionMap[direction];

  return (
    // data-reveal lets a global CSS rule force content visible for users who
    // prefer reduced motion (overrides the inline opacity:0 set by Framer).
    <motion.div
      ref={ref}
      data-reveal
      className={cn(className)}
      initial={{
        opacity: 0,
        y: offset.y,
        x: offset.x,
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, y: offset.y, x: offset.x }
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
