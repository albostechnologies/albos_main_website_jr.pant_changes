"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTABannerSection({ onNavigate }) {
  return (
    <section className="relative bg-gradient-to-br from-[#FAFAFA] via-[#FFFFFF] to-[#FAFAFA] py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Noise texture overlay */}
      <div className="noise-overlay absolute inset-0" />

      {/* Animated accent lines at the top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-[#F97316] to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ width: "50%" }}
        />
      </div>

      {/* Subtle radial gradient accent in center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(249, 115, 22, 0.08), transparent)",
        }}
      />

      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(0,0,0,0.06) 59px, rgba(0,0,0,0.06) 60px),
            repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(0,0,0,0.06) 59px, rgba(0,0,0,0.06) 60px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top/bottom border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />

      <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20 text-center">
        <ScrollReveal direction="up">
          {/* Small decorative accent line */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-[2px] bg-[#F97316]" />
          </div>

          {/* Large heading */}
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#18181B] leading-[1.05] max-w-4xl mx-auto">
            Ready to Build Something{" "}
            <span className="text-[#F97316]">Extraordinary ?</span>
          </h2>

          <p className="mt-6 text-[#A1A1AA] text-base md:text-lg max-w-xl mx-auto font-[family-name:var(--font-inter)] leading-relaxed">
            Let&apos;s turn your vision into reality. Our team is ready to
            architect, design, and build your next breakthrough.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA — accent bg, magnetic */}
            <MagneticButton strength={0.2}>
              <div className="relative">
                {/* Pulsing glow behind button */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#F97316]/40 blur-xl"
                  animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <button
                  onClick={() => onNavigate?.("contact")}
                  className="relative group inline-flex items-center gap-2 rounded-full bg-[#F97316] px-8 py-4 text-base font-semibold text-white font-[family-name:var(--font-inter)] transition-all duration-300 hover:bg-[#EA580C] hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] cursor-pointer"
                >
                  Start a Project
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </MagneticButton>

            {/* Ghost/outline CTA */}
            <button
              onClick={() => onNavigate?.("case-studies")}
              className="group inline-flex items-center gap-2 rounded-full border border-black/[0.12] bg-black/[0.03] px-8 py-4 text-base font-semibold text-[#18181B] font-[family-name:var(--font-inter)] transition-all duration-300 hover:border-[#F97316]/40 hover:text-[#F97316] hover:bg-[#F97316]/[0.04] cursor-pointer"
            >
              View Our Work
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
