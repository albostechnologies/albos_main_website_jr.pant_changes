"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const scaleX = useSpring(0, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) return;

      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
      scaleX.set(progress);
      setIsVisible(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scaleX]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left"
      style={{
        scaleX,
        backgroundColor: "#F97316",
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.2 } }}
    />
  );
}
