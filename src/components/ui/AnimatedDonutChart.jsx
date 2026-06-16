"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Design Tokens ─── */
const COLORS = {
  accent: "#F97316",
  accentLight: "#FB923C",
  teal: "#2DD4BF",
  blue: "#6366F1",
  purple: "#A855F7",
  darkBg: "#FAFAFA",
  cardBg: "#FFFFFF",
  border: "rgba(0,0,0,0.06)",
  textPrimary: "#18181B",
  textSecondary: "#71717A",
};

/* ─── CountUp Hook ─── */
function useCountUp(target, duration = 2, start = false) {
  const [count, setCount] = useState(0);
  const animationRef = useRef(0);

  useEffect(() => {
    if (!start) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [target, duration, start]);

  return count;
}

export function SingleDonutChart({
  percentage,
  color,
  colorEnd,
  label,
  size = 180,
  strokeWidth = 14,
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(percentage, 2, isInView);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const gradientId = `donut-gradient-${label.replace(/\s+/g, "-").toLowerCase()}-${delay}`;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-20"
          style={{ backgroundColor: color }}
        />

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={colorEnd || color} />
            </linearGradient>
          </defs>

          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={COLORS.border}
            strokeWidth={strokeWidth}
          />

          {/* Animated foreground ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={
              isInView
                ? { strokeDashoffset }
                : { strokeDashoffset: circumference }
            }
            transition={{
              duration: 2,
              delay: delay + 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              filter: `drop-shadow(0 0 6px ${color}40)`,
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-bold text-[#18181B] tabular-nums">
            {count}
            <span className="text-lg md:text-xl">%</span>
          </span>
        </div>
      </div>

      {/* Label */}
      <p className="mt-4 text-sm font-medium font-[family-name:var(--font-inter)] text-[#71717A] text-center">
        {label}
      </p>
    </motion.div>
  );
}

export function MultiDonutChart({
  segments,
  centerText,
  centerSubText,
  size = 260,
  strokeWidth = 20,
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke-dasharray and stroke-dashoffset for each segment
  const segmentData = segments.map((seg, i) => {
    const segLength = (seg.percentage / 100) * circumference;
    const gap = 4; // Small gap between segments
    const adjustedLength = Math.max(0, segLength - gap);

    const offsetBefore = segments
      .slice(0, i)
      .reduce((acc, s) => acc + (s.percentage / 100) * circumference, 0);

    return {
      ...seg,
      length: adjustedLength,
      gap,
      offset: -offsetBefore,
      fullCircumference: circumference,
    };
  });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Chart */}
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-10"
          style={{ backgroundColor: COLORS.accent }}
        />

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={COLORS.border}
            strokeWidth={strokeWidth}
          />

          {/* Segments */}
          {segmentData.map((seg, i) => (
            <motion.circle
              key={seg.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={hoveredIndex === i ? strokeWidth + 6 : strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${seg.length} ${circumference - seg.length}`}
              strokeDashoffset={seg.offset}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={
                isInView
                  ? { opacity: 1, pathLength: 1 }
                  : { opacity: 0, pathLength: 0 }
              }
              transition={{
                duration: 1.5,
                delay: delay + 0.3 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer transition-all duration-200"
              style={{
                filter:
                  hoveredIndex === i
                    ? `drop-shadow(0 0 12px ${seg.color}60)`
                    : `drop-shadow(0 0 4px ${seg.color}30)`,
              }}
            />
          ))}
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-[#18181B]">
            {centerText}
          </span>
          {centerSubText && (
            <span className="text-xs font-medium font-[family-name:var(--font-inter)] text-[#71717A] mt-1">
              {centerSubText}
            </span>
          )}
        </div>

        {/* Hover tooltip */}
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full -mt-2 px-3 py-1.5 rounded-lg bg-[#F5F5F0] border border-black/[0.08] shadow-xl pointer-events-none z-20"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: segments[hoveredIndex].color }}
              />

              <span className="text-xs font-medium font-[family-name:var(--font-inter)] text-[#18181B] whitespace-nowrap">
                {segments[hoveredIndex].label}:{" "}
                {segments[hoveredIndex].percentage}%
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-x-6 gap-y-3">
        {segments.map((seg, i) => (
          <motion.div
            key={seg.label}
            className="flex items-center gap-3 cursor-pointer group"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: delay + 0.5 + i * 0.08 }}
          >
            <div
              className="w-3 h-3 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-125"
              style={{ backgroundColor: seg.color }}
            />

            <div className="flex flex-col">
              <span className="text-sm font-medium font-[family-name:var(--font-inter)] text-[#18181B] group-hover:text-[#F97316] transition-colors duration-200">
                {seg.label}
              </span>
              <span className="text-xs font-[family-name:var(--font-inter)] text-[#71717A]">
                {seg.percentage}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
