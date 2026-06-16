"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function TiltCard({ children, intensity = 0.5, className }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const maxTilt = 15 * intensity;

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [0, 1], [-maxTilt, maxTilt]);

  const springConfig = { stiffness: 300, damping: 30, mass: 1 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      x.set(px);
      y.set(py);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
    setIsHovered(false);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: "preserve-3d",
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        perspective: 1000,
      }}
      className={cn("relative", className)}
    >
      {children}
      {/* Subtle inner shadow effect on hover */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] transition-shadow duration-300",
          isHovered
            ? "shadow-[inset_0_0_60px_rgba(0,0,0,0.15)]"
            : "shadow-none",
        )}
      />
    </motion.div>
  );
}
