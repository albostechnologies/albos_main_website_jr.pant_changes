"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";

export function CountUp({ value, suffix = "", duration = 2, className }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const animationRef = useRef(0);
  const reducedMotion = useReducedMotion();

  const handleIntersection = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      });
    },
    [isVisible],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersection]);

  useEffect(() => {
    if (!isVisible) return;
    if (reducedMotion) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(eased * value);

      setCount(currentCount);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, value, duration, reducedMotion]);

  // Show final value immediately if reduced motion is preferred
  const displayValue = reducedMotion ? value : count;

  return (
    <span ref={ref} className={className}>
      {isVisible ? displayValue : 0}
      {suffix}
    </span>
  );
}
