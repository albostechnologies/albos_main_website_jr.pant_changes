"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Linkedin,
  Twitter,
  Target,
  Code2,
  Eye,
  Shield,
  BookOpen,
  Users,
  Laptop,
  GraduationCap,
  Heart,
  Dumbbell,
  Coffee,
  Plane,
  Sparkles,
} from "lucide-react";
import { STATS, COMPANY_VALUES } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CountUp } from "@/components/ui/CountUp";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { staggerContainer, revealMask } from "@/lib/animations";

/* ─── Icon map for values ─── */
const VALUE_ICONS = {
  Target,
  Code2,
  Eye,
  Shield,
  BookOpen,
  Users,
};

/* ─── Timeline milestones ─── */
const MILESTONES = [
  {
    year: "2014",
    event: "Founded",
    description:
      "Albos Technologies Pvt Ltd launched in Pune, India with a mission to deliver world-class software engineering services.",
  },
  {
    year: "2016",
    event: "100th Project",
    description:
      "Milestone reached — 100 successful project deliveries across FinTech, HealthTech, and EdTech.",
  },
  {
    year: "2019",
    event: "Global Reach",
    description:
      "Clients across 12 industries worldwide. Team grows to 150+ engineers delivering enterprise-grade solutions.",
  },
  {
    year: "2022",
    event: "AI & Blockchain",
    description:
      "Launched dedicated AI/ML and Blockchain practices. Expanded service portfolio to 9 core verticals.",
  },
  {
    year: "2024",
    event: "500+ Projects",
    description:
      "250+ professionals, 500+ projects delivered, 320+ happy clients. 4.9★ Clutch rating. ISO Certified.",
  },
];

/* ─── Office locations for world map ─── */
const OFFICES = [
  { city: "Pune", team: 250, x: 68, y: 40 },
  { city: "Dubai", team: 15, x: 60, y: 38 },
  { city: "London", team: 12, x: 47, y: 27 },
  { city: "Frankfurt", team: 10, x: 51, y: 26 },
  { city: "Singapore", team: 8, x: 76, y: 52 },
];

/* ─── Team member gradient backgrounds ─── */
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

/* ─── Leader quotes for hover ─── */
const LEADER_QUOTES = {
  "Alex Volkov":
    'Great software is built by people who refuse to settle for "good enough."',
  "Maria Santos":
    "The best architecture is invisible — it just lets the business move faster.",
  "David Kim": "Shipping quality code on time is a discipline, not a miracle.",
  "Rachel Green": "Design is not what it looks like. Design is how it works.",
  "Ahmed Hassan":
    "Security and performance are not features — they are foundations.",
  "Lisa Wang":
    "AI should amplify human capability, not replace human judgment.",
  "James O'Brien":
    "Every client partnership begins with listening, not selling.",
  "Priya Patel":
    "Quality is never an accident — it is always the result of intelligent effort.",
};

/* ─── Benefits data ─── */
const BENEFITS = [
  {
    icon: Laptop,
    title: "Remote-First Culture",
    description:
      "Work from anywhere with flexible hours. We trust our team to deliver regardless of location.",
  },
  {
    icon: GraduationCap,
    title: "Learning Budget",
    description:
      "$5,000 annual budget for courses, conferences, and certifications to keep you growing.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description:
      "Comprehensive health, dental, and vision coverage plus mental health support.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Stipend",
    description:
      "Monthly gym membership reimbursement and wellness program access.",
  },
  {
    icon: Plane,
    title: "Unlimited PTO",
    description:
      "Take the time you need to recharge. We measure output, not hours at a desk.",
  },
  {
    icon: Coffee,
    title: "Team Retreats",
    description:
      "Annual company retreats and quarterly team offsites to build connection.",
  },
];

/* ═══════════════════════════════════════════════
   ABOUT SECTION
   ═══════════════════════════════════════════════ */

export function AboutSection() {
  const timelineRef = useRef(null);

  return (
    <section className="relative overflow-hidden mesh-gradient-2">
      {/* ═══ HERO ═══ */}
      <div className="relative bg-[#FAFAFA] flex min-h-[60vh] flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Subtle accent glow */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#F97316]/[0.04] blur-[150px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[var(--container-max)] w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Content */}
          <div className="flex-1">
            <ScrollReveal direction="up">
              <SectionLabel label="Who We Are" />
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h1
                className="mt-6 font-[family-name:var(--font-plus-jakarta)] font-extrabold leading-[0.95] tracking-tight text-[#18181B]"
                style={{ fontSize: "var(--fs-h1)" }}
              >
                Built by Engineers.
                <br />
                Driven by Results.
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <p className="mt-6 text-[#A1A1AA] text-base md:text-lg max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
                We are a team of 250+ engineers, designers, and strategists
                based in Pune, India who believe that great software is built by
                people who genuinely care about the outcome.
              </p>
            </ScrollReveal>
          </div>

          {/* Right: Team Photo */}
          <motion.div
            className="w-full lg:w-1/2 shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <Image
              src="/images/team-photo.png"
              alt="Our diverse team collaborating on innovative solutions"
              width={800}
              height={500}
              className="rounded-2xl border border-black/[0.06] object-cover w-full h-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* ═══ MISSION STATEMENT (Light) ═══ */}
      <div className="relative bg-[#FAFAFA] py-24 md:py-32 lg:py-40">
        {/* Subtle top/bottom border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />

        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* RevealMask animation on the quote */}
            <motion.blockquote
              variants={revealMask}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="font-[family-name:var(--font-inter)] text-2xl md:text-3xl lg:text-4xl font-light italic leading-relaxed text-[#18181B]"
            >
              &ldquo;We exist to turn your most complex technical challenges
              into your{" "}
              <span className="text-[#F97316] font-medium not-italic">
                greatest competitive advantages
              </span>
              .&rdquo;
            </motion.blockquote>

            {/* Decorative accent line */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-[#F97316]/40" />
                <div className="w-2 h-2 rounded-full bg-[#F97316]" />
                <div className="h-px w-12 bg-[#F97316]/40" />
              </div>
              <p className="mt-4 text-sm text-[#52525B] font-[family-name:var(--font-inter)] uppercase tracking-wider">
                Our Mission
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* ═══ STORY TIMELINE ═══ */}
      <div className="relative bg-[#FAFAFA] py-20 md:py-28 lg:py-36">
        <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />

        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-12 lg:mb-16">
            <SectionLabel label="Our Journey" />
            <h2
              className="mt-4 font-[family-name:var(--font-plus-jakarta)] font-bold text-[#18181B] leading-tight"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              From Startup to Scale
            </h2>
          </ScrollReveal>

          {/* Horizontal scroll timeline */}
          <div
            ref={timelineRef}
            className="relative overflow-x-auto scrollbar-hide pb-4"
          >
            <div className="flex gap-0 min-w-max">
              {MILESTONES.map((milestone, i) => (
                <TimelineMilestone
                  key={milestone.year}
                  milestone={milestone}
                  index={i}
                  isLast={i === MILESTONES.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ NUMBERS ═══ */}
      <div className="relative bg-[#FFFFFF] py-20 md:py-28 lg:py-32">
        <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />

        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-12 lg:mb-16">
            <SectionLabel label="By the Numbers" />
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0"
          >
            {STATS.map((stat, i) => (
              <ScrollReveal key={stat.label} direction="up" delay={i * 0.1}>
                <div
                  className={`relative flex flex-col items-center text-center px-6 py-4 glow-accent ${
                    i < STATS.length - 1
                      ? "sm:border-r sm:border-black/[0.06] lg:border-r lg:border-black/[0.06]"
                      : ""
                  } ${
                    i < 2
                      ? "border-b sm:border-b-0 border-black/[0.06] lg:border-b-0"
                      : ""
                  }`}
                >
                  <span className="font-[family-name:var(--font-plus-jakarta)] text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none">
                    <span className="text-[#F97316]">
                      <CountUp
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                    </span>
                  </span>
                  <span className="mt-3 font-[family-name:var(--font-inter)] text-sm md:text-base text-[#18181B]/80 tracking-wide">
                    {stat.label}
                  </span>
                  <span className="mt-4 h-1 w-8 rounded-full bg-[#F97316]/30" />
                </div>
              </ScrollReveal>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ═══ GLOBAL PRESENCE / WORLD MAP ═══ */}
      <div className="relative bg-[#FAFAFA] py-20 md:py-28 lg:py-36">
        <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />

        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-12 lg:mb-16">
            <SectionLabel label="Global Presence" />
            <h2
              className="mt-4 font-[family-name:var(--font-plus-jakarta)] font-bold text-[#18181B] leading-tight"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              Worldwide Reach, Local Expertise
            </h2>
            <p className="mt-4 text-[#A1A1AA] text-base md:text-lg max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
              Headquartered in Pune, India with global reach across 12
              industries. We deliver excellence for clients worldwide.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <WorldMap />
          </ScrollReveal>
        </div>
      </div>

      {/* ═══ LEADERSHIP ═══ (section intentionally disabled) */}

      {/* ═══ CULTURE & VALUES ═══ */}
      <div className="relative bg-[#FFFFFF] py-20 md:py-28 lg:py-36">
        <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />

        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-12 lg:mb-16">
            <SectionLabel label="Culture & Values" />
            <h2
              className="mt-4 font-[family-name:var(--font-plus-jakarta)] font-bold text-[#18181B] leading-tight"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              What Drives Us Every Day
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {COMPANY_VALUES.map((value, i) => (
              <ScrollReveal key={value.title} direction="up" delay={i * 0.08}>
                <ValueCard value={value} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ CULTURE & BENEFITS ═══ */}
      <div className="relative bg-[#FAFAFA] py-20 md:py-28 lg:py-36">
        <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />
        {/* Subtle accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F97316]/[0.03] blur-[180px] pointer-events-none" />

        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-12 lg:mb-16">
            <SectionLabel label="Perks & Benefits" />
            <h2
              className="mt-4 font-[family-name:var(--font-plus-jakarta)] font-bold text-[#18181B] leading-tight"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              Why You&apos;ll Love Working Here
            </h2>
            <p className="mt-4 text-[#A1A1AA] text-base md:text-lg max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
              We invest in our people because extraordinary outcomes require
              extraordinary teams.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {BENEFITS.map((benefit, i) => (
              <ScrollReveal key={benefit.title} direction="up" delay={i * 0.08}>
                <BenefitCard benefit={benefit} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ HIRING CTA ═══ */}
      <div className="relative bg-[#FAFAFA] py-24 md:py-32 lg:py-40">
        <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />

        {/* Accent glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#F97316]/[0.04] blur-[150px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20 text-center">
          <ScrollReveal direction="up">
            <SectionLabel label="We're Hiring" />
            <h2
              className="mt-6 font-[family-name:var(--font-plus-jakarta)] font-extrabold leading-[0.95] tracking-tight text-[#18181B]"
              style={{ fontSize: "var(--fs-h1)" }}
            >
              Join 250+ Professionals
            </h2>
            <p className="mt-6 text-[#A1A1AA] text-base md:text-lg max-w-xl mx-auto font-[family-name:var(--font-inter)] leading-relaxed">
              Build the future of enterprise software alongside world-class
              engineers, designers, and product thinkers.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton strength={0.2}>
                <a
                  href="/careers"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F97316] text-white text-sm font-bold font-[family-name:var(--font-inter)] uppercase tracking-wider hover:bg-[#EA580C] transition-colors duration-300"
                >
                  View Open Roles
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <a
                  href="/careers"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-black/[0.15] text-[#18181B] text-sm font-bold font-[family-name:var(--font-inter)] uppercase tracking-wider hover:border-[#F97316]/40 hover:text-[#F97316] transition-all duration-300"
                >
                  Submit Your CV
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ═══ TIMELINE MILESTONE SUB-COMPONENT ═══ */
function TimelineMilestone({ milestone, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center px-8 md:px-12 lg:px-16"
    >
      {/* Year marker with glow */}
      <motion.span
        className="font-[family-name:var(--font-plus-jakarta)] text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F97316] leading-none glow-accent"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.1,
        }}
      >
        {milestone.year}
      </motion.span>

      {/* Dot */}
      <motion.div
        className="relative z-10 my-4 w-4 h-4 rounded-full bg-[#F97316] ring-4 ring-[#FAFAFA]"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.1 + 0.2,
        }}
      />

      {/* Connecting dotted line between markers */}
      {!isLast && (
        <div className="absolute top-[calc(50%+8px)] left-[calc(50%+32px)] right-0 h-[2px] hidden md:block">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #F97316 0px, #F97316 4px, transparent 4px, transparent 10px)",
              opacity: 0.3,
            }}
          />
        </div>
      )}

      {/* Event */}
      <motion.h3
        className="font-[family-name:var(--font-plus-jakarta)] text-lg md:text-xl font-bold text-[#18181B] text-center mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.1 + 0.3,
        }}
      >
        {milestone.event}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="mt-2 text-[#A1A1AA] text-sm font-[family-name:var(--font-inter)] leading-relaxed max-w-[200px] md:max-w-[240px] text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.1 + 0.4,
        }}
      >
        {milestone.description}
      </motion.p>
    </div>
  );
}

/* ═══ WORLD MAP SUB-COMPONENT ═══ */
function WorldMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[2/1] max-h-[500px] rounded-2xl border border-black/[0.06] bg-[#FAFAFA] overflow-hidden"
    >
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F97316]/[0.02] via-transparent to-transparent pointer-events-none" />

      {/* SVG World Map */}
      <svg
        viewBox="0 0 100 60"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Continent outlines - simplified paths using white/[0.06] */}
        {/* North America */}
        <path
          d="M10,12 L12,10 L16,9 L20,10 L24,12 L26,15 L25,18 L27,20 L25,22 L23,24 L22,28 L20,32 L18,35 L16,36 L14,34 L13,32 L12,28 L11,24 L10,20 Z"
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="0.3"
        />

        {/* South America */}
        <path
          d="M20,38 L22,36 L25,37 L27,40 L28,44 L27,48 L25,52 L23,54 L21,52 L20,48 L19,44 L19,40 Z"
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="0.3"
        />

        {/* Europe */}
        <path
          d="M44,10 L46,8 L48,9 L52,10 L54,12 L53,14 L50,16 L48,17 L46,16 L44,14 L43,12 Z"
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="0.3"
        />

        {/* Africa */}
        <path
          d="M44,20 L48,18 L52,20 L54,24 L53,28 L52,32 L50,36 L48,38 L46,36 L44,32 L43,28 L43,24 Z"
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="0.3"
        />

        {/* Asia */}
        <path
          d="M54,8 L58,6 L62,7 L68,8 L72,10 L76,12 L78,16 L76,20 L74,24 L70,26 L66,28 L62,26 L58,24 L56,20 L54,16 L53,12 Z"
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="0.3"
        />

        {/* Australia */}
        <path
          d="M78,42 L82,40 L86,42 L88,46 L86,50 L82,52 L78,50 L76,46 Z"
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="0.3"
        />

        {/* Connection lines between offices (dashed, animated) */}
        {[
          [OFFICES[0], OFFICES[1]], // Pune → Dubai
          [OFFICES[1], OFFICES[2]], // Dubai → London
          [OFFICES[2], OFFICES[3]], // London → Frankfurt
          [OFFICES[3], OFFICES[4]], // Frankfurt → Singapore
          [OFFICES[0], OFFICES[2]], // Pune → London
        ].map(([from, to], i) => (
          <motion.line
            key={`line-${i}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#F97316"
            strokeWidth="0.15"
            strokeDasharray="1 1"
            strokeOpacity={0.25}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              isInView
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              duration: 1.5,
              delay: 0.5 + i * 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <animate
              attributeName="stroke-dashoffset"
              from="4"
              to="0"
              dur="3s"
              repeatCount="indefinite"
            />
          </motion.line>
        ))}

        {/* Office dots with pulse */}
        {OFFICES.map((office, i) => (
          <g key={office.city}>
            {/* Pulse ring */}
            <motion.circle
              cx={office.x}
              cy={office.y}
              r="1.5"
              fill="none"
              stroke="#F97316"
              strokeWidth="0.15"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView
                  ? {
                      opacity: [0, 0.6, 0],
                      scale: [0.5, 2, 3],
                      r: [1.5, 2.5, 3.5],
                    }
                  : { opacity: 0, scale: 0 }
              }
              transition={{
                duration: 2.5,
                delay: 0.8 + i * 0.15,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />

            {/* Inner dot */}
            <motion.circle
              cx={office.x}
              cy={office.y}
              r="0.8"
              fill="#F97316"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
              }
              transition={{
                duration: 0.4,
                delay: 0.6 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Glow */}
            <motion.circle
              cx={office.x}
              cy={office.y}
              r="2"
              fill="#F97316"
              opacity={0.15}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </g>
        ))}

        {/* City labels */}
        {OFFICES.map((office, i) => (
          <motion.g
            key={`label-${office.city}`}
            initial={{ opacity: 0, y: 2 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 2 }}
            transition={{
              duration: 0.5,
              delay: 1 + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <text
              x={office.x}
              y={office.y - 2.5}
              textAnchor="middle"
              className="fill-[#18181B] font-[family-name:var(--font-inter)]"
              fontSize="1.4"
              fontWeight="600"
            >
              {office.city}
            </text>
            <text
              x={office.x}
              y={office.y - 1.2}
              textAnchor="middle"
              className="fill-[#A1A1AA] font-[family-name:var(--font-inter)]"
              fontSize="1"
            >
              {office.team} people
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

/* ═══ LEADERSHIP CARD SUB-COMPONENT ═══ */
function LeadershipCard({ name, role, gradient, quote }) {
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
      {/* Gradient placeholder photo */}
      <div
        className="aspect-[3/4] w-full relative"
        style={{ background: gradient }}
      >
        {/* Grayscale → Color effect via overlay */}
        <motion.div
          className="absolute inset-0 bg-[#FAFAFA]/30"
          animate={isHovered ? { opacity: 0 } : { opacity: 0.3 }}
          transition={{ duration: 0.5 }}
        />

        {/* Inner border with premium shadow */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-black/[0.06] group-hover:ring-[#F97316]/20 transition-all duration-500" />

        {/* Gradient overlay on avatar area */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, rgba(249,115,22,0.08) 100%)",
          }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Premium shadow layer */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(0,0,0,0.3)] pointer-events-none" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Large initial letter */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-[family-name:var(--font-plus-jakarta)] text-8xl md:text-9xl font-extrabold text-black/[0.04] select-none">
            {name.charAt(0)}
          </span>
        </div>

        {/* Quote that appears on hover */}
        <motion.div
          className="absolute inset-x-0 top-0 p-5 pt-8"
          initial={{ opacity: 0, y: -10 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-[#18181B]/80 backdrop-blur-md rounded-xl p-4 border border-black/[0.06]">
            <p className="text-[#18181B]/90 text-xs md:text-sm font-[family-name:var(--font-inter)] italic leading-relaxed">
              &ldquo;{quote}&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent pt-20 pb-6 px-5">
          <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg md:text-xl font-bold text-[#18181B] leading-tight">
            {name}
          </h3>

          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-[#A1A1AA] font-[family-name:var(--font-inter)]">
              {role}
            </p>
            {/* Social icons — visible on hover */}
            <motion.div
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, x: -8 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F97316]/15 hover:bg-[#F97316]/25 transition-colors duration-300"
              >
                <Linkedin className="h-3.5 w-3.5 text-[#F97316]" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F97316]/15 hover:bg-[#F97316]/25 transition-colors duration-300"
              >
                <Twitter className="h-3.5 w-3.5 text-[#F97316]" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══ VALUE CARD SUB-COMPONENT ═══ */
function ValueCard({ value, index }) {
  const Icon = VALUE_ICONS[value.icon] || Target;
  const isEven = index % 2 === 0;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isEven
          ? "bg-[#F5F5F0] border border-black/[0.06]"
          : "bg-[#FAFAFA] border border-black/[0.04]"
      }`}
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at ${isEven ? "80% 20%" : "20% 80%"}, rgba(249,115,22,0.3) 0%, transparent 50%)`,
        }}
      />

      {/* Accent gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative p-6 md:p-8">
        {/* Icon with animation */}
        <motion.div
          className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${
            isEven ? "bg-[#F97316]/10" : "bg-black/[0.05]"
          }`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Icon
            className={`h-5 w-5 ${isEven ? "text-[#F97316]" : "text-[#A1A1AA]"} group-hover:text-[#F97316] transition-colors duration-300`}
          />
        </motion.div>

        {/* Title */}
        <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg md:text-xl font-bold text-[#18181B] leading-tight">
          {value.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-[#A1A1AA] text-sm font-[family-name:var(--font-inter)] leading-relaxed">
          {value.description}
        </p>

        {/* Expand indicator */}
        <motion.div
          className="mt-4 flex items-center gap-2 text-[#F97316]/60 group-hover:text-[#F97316] transition-colors duration-300"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs font-[family-name:var(--font-inter)] font-medium uppercase tracking-wider">
            {isExpanded ? "Less" : "Learn more"}
          </span>
        </motion.div>

        {/* Expanded content */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-4 mt-4 border-t border-black/[0.06]">
            <p className="text-[#71717A] text-sm font-[family-name:var(--font-inter)] leading-relaxed">
              This value shapes everything we do — from how we hire and onboard
              new team members to how we approach code reviews and client
              communication.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Accent line at bottom on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F97316]/50 to-transparent"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}

/* ═══ BENEFIT CARD SUB-COMPONENT ═══ */
function BenefitCard({ benefit, index }) {
  const Icon = benefit.icon;
  const accentPositions = [
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
    "top-right",
    "bottom-left",
  ];
  const pos = accentPositions[index % accentPositions.length];

  return (
    <motion.div
      className="group relative rounded-2xl p-6 md:p-8 glass-card border border-black/[0.06] hover:border-[#F97316]/20 transition-all duration-500 cursor-default"
      whileHover={{
        y: -6,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Subtle gradient accent */}
      <div
        className="absolute w-32 h-32 rounded-full bg-[#F97316]/[0.06] blur-[60px] pointer-events-none"
        style={{
          top: pos.includes("top") ? "-20%" : "auto",
          bottom: pos.includes("bottom") ? "-20%" : "auto",
          left: pos.includes("left") ? "-10%" : "auto",
          right: pos.includes("right") ? "-10%" : "auto",
        }}
      />

      {/* Hover glow overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Icon */}
      <motion.div
        className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#F97316]/10 group-hover:bg-[#F97316]/15 transition-colors duration-300 mb-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Icon className="h-6 w-6 text-[#F97316]" />
      </motion.div>

      {/* Title */}
      <h3 className="relative font-[family-name:var(--font-plus-jakarta)] text-lg md:text-xl font-bold text-[#18181B] leading-tight">
        {benefit.title}
      </h3>

      {/* Description */}
      <p className="relative mt-3 text-[#A1A1AA] text-sm font-[family-name:var(--font-inter)] leading-relaxed">
        {benefit.description}
      </p>

      {/* Decorative corner accent */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Sparkles className="h-4 w-4 text-[#F97316]/30" />
      </div>
    </motion.div>
  );
}
