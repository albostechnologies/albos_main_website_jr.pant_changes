"use client";

import { STATS } from "@/lib/constants";
import { CountUp } from "@/components/ui/CountUp";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";

export function StatsSection() {
  return (
    <section className="relative bg-albos-mid py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Subtle top/bottom border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />

      {/* Background accent gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F97316]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Dot grid pattern */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0"
        >
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} direction="up" delay={i * 0.1}>
              <div
                className={`relative flex flex-col items-center text-center px-3 sm:px-6 py-4 sm:py-6 group ${
                  i < STATS.length - 1
                    ? "sm:border-r sm:border-black/[0.06] lg:border-r lg:border-black/[0.06]"
                    : ""
                } ${
                  i < 2
                    ? "border-b sm:border-b-0 border-black/[0.06] lg:border-b-0"
                    : i === 2
                      ? "border-b lg:border-b-0"
                      : ""
                }`}
              >
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

                {/* Accent top line on hover */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-12 h-[2px] bg-albos-accent transition-all duration-500" />

                {/* Large display number */}
                <span className="relative font-[family-name:var(--font-plus-jakarta)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none">
                  <span className="text-gradient">
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </span>
                </span>

                {/* Label */}
                <span className="relative mt-2 sm:mt-3 font-[family-name:var(--font-inter)] text-xs sm:text-sm md:text-base text-albos-text/80 tracking-wide">
                  {stat.label}
                </span>

                {/* Decorative accent bar */}
                <span className="relative mt-4 h-1 w-8 rounded-full bg-gradient-to-r from-albos-accent to-albos-accent/30" />
              </div>
            </ScrollReveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
