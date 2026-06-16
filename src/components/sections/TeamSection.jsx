"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Unique gradient backgrounds for each team member card
const memberGradients = [
  "linear-gradient(135deg, #2a1a0a 0%, #1a0d05 40%, #3a1f0a 100%)",
  "linear-gradient(135deg, #0a1a2a 0%, #05101a 40%, #0a2040 100%)",
  "linear-gradient(135deg, #1a0a2a 0%, #10051a 40%, #2a0a3a 100%)",
  "linear-gradient(135deg, #0a2a1a 0%, #051a10 40%, #0a3a20 100%)",
  "linear-gradient(135deg, #2a0a1a 0%, #1a0510 40%, #3a0a20 100%)",
  "linear-gradient(135deg, #1a1a0a 0%, #101005 40%, #2a2a0a 100%)",
  "linear-gradient(135deg, #0a1a1a 0%, #051010 40%, #0a2a2a 100%)",
  "linear-gradient(135deg, #2a0a0a 0%, #1a0505 40%, #3a0a0a 100%)",
];

function TeamCard({ name, role, gradient, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer card-hover-lift"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Gradient placeholder for photo */}
      <div className="aspect-[3/4] w-full" style={{ background: gradient }}>
        {/* Inner border */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-black/[0.06] group-hover:ring-[#F97316]/20 transition-all duration-500" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Person initial as large background letter with gradient overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center">
            <span className="font-[family-name:var(--font-plus-jakarta)] text-6xl md:text-7xl font-extrabold text-white/[0.08] select-none">
              {name.charAt(0)}
            </span>
          </div>
        </div>

        {/* Bottom gradient overlay for text */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent pt-20 pb-6 px-5">
          {/* Name */}
          <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg md:text-xl font-bold text-[#18181B] leading-tight">
            {name}
          </h3>

          {/* Role — appears on hover */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1 inline-flex items-center rounded-full bg-[#F97316]/10 border border-[#F97316]/20 px-2.5 py-0.5 text-xs text-[#F97316] font-[family-name:var(--font-inter)] font-semibold"
          >
            {role}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

function JoinCard() {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer h-full card-hover-lift"
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Pulsing border effect */}
      <div className="absolute -inset-0.5 rounded-2xl bg-[#F97316]/20 blur-sm animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Background */}
      <div className="aspect-[3/4] w-full bg-[#FFFFFF] flex items-center justify-center relative">
        {/* Accent border */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-[#F97316]/20 group-hover:ring-[#F97316]/40 transition-all duration-500" />

        {/* Dashed border inner */}
        <div className="absolute inset-3 rounded-xl border border-dashed border-black/[0.08] group-hover:border-[#F97316]/20 transition-all duration-500" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
          {/* Plus icon */}
          <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#F97316]/30 group-hover:border-[#F97316] transition-colors duration-300 mb-5">
            <span className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#F97316]">
              +
            </span>
          </div>

          <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl md:text-2xl font-bold text-[#18181B] leading-tight">
            Join Our Team
          </h3>

          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F97316] font-[family-name:var(--font-inter)] group-hover:gap-2.5 transition-all duration-300">
            View Openings
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function TeamSection() {
  return (
    <section className="relative mesh-gradient-1 py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Subtle top/bottom border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />

      <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <ScrollReveal direction="up" className="mb-12 lg:mb-16">
          <SectionLabel label="275+ Professionals" />
          <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#18181B] leading-tight">
            The People Behind the Code
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-base md:text-lg max-w-xl font-[family-name:var(--font-inter)]">
            A world-class team of engineers, designers, and strategists united
            by a passion for building exceptional software.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {TEAM_MEMBERS.map((member, i) => (
            <ScrollReveal key={member.name} direction="up" delay={i * 0.06}>
              <TeamCard
                name={member.name}
                role={member.role}
                gradient={memberGradients[i % memberGradients.length]}
                index={i}
              />
            </ScrollReveal>
          ))}

          {/* Join CTA card */}
          <ScrollReveal direction="up" delay={TEAM_MEMBERS.length * 0.06}>
            <JoinCard />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
