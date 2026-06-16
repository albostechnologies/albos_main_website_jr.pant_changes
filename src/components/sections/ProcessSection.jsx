"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function StepCard({ step, index, isLast }) {
  return (
    <div className="relative flex flex-col lg:flex-1">
      {/* Step content */}
      <div className="relative z-10 card-hover-lift border-glow rounded-2xl p-6 -m-6">
        {/* Large number */}
        <span className="block font-[family-name:var(--font-plus-jakarta)] text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#F97316]/[0.25] leading-none select-none">
          {step.number}
        </span>

        {/* Title */}
        <h3 className="mt-2 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-[#18181B] leading-tight">
          {step.title}
        </h3>

        {/* Duration pill */}
        <div className="mt-3 inline-flex items-center rounded-full bg-[#F97316]/10 border border-[#F97316]/20 px-3 py-1">
          <span className="text-xs font-semibold text-[#F97316] font-[family-name:var(--font-inter)]">
            {step.duration}
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm md:text-base text-[#A1A1AA] leading-relaxed font-[family-name:var(--font-inter)] max-w-xs">
          {step.description}
        </p>

        {/* Deliverables */}
        <ul className="mt-5 space-y-2">
          {step.deliverables.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm text-[#18181B]/70 font-[family-name:var(--font-inter)]"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-[#F97316]/15">
                <Check className="h-2.5 w-2.5 text-[#F97316]" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Connecting line — visible on desktop */}
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-[calc(50%+60px)] right-0 z-0">
          <ConnectingLine />
        </div>
      )}

      {/* Connecting line — visible on mobile (vertical) */}
      {!isLast && (
        <div className="lg:hidden flex justify-start mt-6 mb-2 ml-4">
          <div className="flex flex-col items-center">
            <motion.div
              className="w-px h-12 bg-gradient-to-b from-[#F97316]/40 to-[#F97316]/10"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.1,
              }}
              style={{ transformOrigin: "top" }}
            />

            <div className="w-1.5 h-1.5 rounded-full bg-[#F97316]/40" />
          </div>
        </div>
      )}
    </div>
  );
}

function ConnectingLine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative h-px w-full">
      {/* Base line */}
      <div className="absolute inset-0 bg-black/[0.06]" />
      {/* Animated accent line */}
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#F97316]/50 to-[#F97316]/20"
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />

      {/* End dot */}
      <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-[#F97316]/40" />
    </div>
  );
}

export function ProcessSection() {
  return (
    <section className="relative mesh-gradient-2 py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Subtle top/bottom border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />

      <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <ScrollReveal direction="up" className="mb-12 lg:mb-20">
          <SectionLabel label="How We Work" />
          <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#18181B] leading-tight">
            A Proven Process
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-base md:text-lg max-w-xl font-[family-name:var(--font-inter)]">
            From discovery to scale — a battle-tested methodology that delivers
            predictable, high-quality outcomes.
          </p>
        </ScrollReveal>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="flex flex-col lg:flex-row lg:gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <ScrollReveal key={step.number} direction="up" delay={i * 0.12}>
              <StepCard
                step={step}
                index={i}
                isLast={i === PROCESS_STEPS.length - 1}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
