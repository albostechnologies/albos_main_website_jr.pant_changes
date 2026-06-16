"use client";

import { useEffect, useRef, useState, useCallback } from "react";

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function linear(t) {
  return t;
}

export function ScrollTriggeredCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
  easing = "easeOut",
  className = "",
  delay = 0,
  decimals = 0,
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const animationRef = useRef(null);

  const easingFn =
    easing === "easeInOut" ? easeInOut : easing === "linear" ? linear : easeOut;

  const startCounting = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = performance.now() + delay;

    const animate = (now) => {
      if (now < startTime) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFn(progress);
      const current = easedProgress * target;

      setCount(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [hasStarted, target, duration, delay, easingFn]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting();
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [startCounting]);

  const formattedCount =
    decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString();

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}

export default ScrollTriggeredCounter;
