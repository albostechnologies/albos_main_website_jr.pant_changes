"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useMediaQuery";

export function SplitText({ text, className, delay = 0.03 }) {
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersection]);

  // If reduced motion, just show text
  if (reducedMotion) {
    return (
      <div ref={ref} className={cn("overflow-hidden", className)}>
        <span>{text}</span>
      </div>
    );
  }

  const chars = text.split("");

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.span
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        aria-label={text}
        className="inline-flex flex-wrap"
      >
        {chars.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            custom={i}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: i * delay,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
}
