"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Heart,
  DollarSign,
  GraduationCap,
  ShoppingCart,
  Factory,
  Truck,
  Building2,
  Play,
  Check,
  Lock,
  Database,
  Cpu,
  Send,
  Activity,
  BarChart3,
  FileCheck,
  Globe,
  Zap,
  ShieldCheck,
  LockKeyhole,
  ShieldCheck as FileShieldIcon,
  Scale,
  Loader2,
  FolderKanban,
} from "lucide-react";
import { INDUSTRIES, CLIENT_LOGOS } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CountUp } from "@/components/ui/CountUp";

/* ─── Icon map from string names to Lucide components ─── */
const ICON_MAP = {
  Heart,
  DollarSign,
  GraduationCap,
  ShoppingCart,
  Factory,
  Truck,
  Building2,
  Play,
};

/* ─── Industry detail data ─── */
const INDUSTRY_DETAILS = [
  {
    challenge:
      "Healthcare organizations struggle with fragmented patient data, regulatory compliance burdens, and legacy systems that can't communicate across departments.",
    solution:
      "Albos builds HIPAA-compliant platforms that unify patient records, automate clinical workflows, and enable secure real-time collaboration between providers, payers, and patients.",
    features: [
      {
        icon: ShieldCheck,
        name: "HIPAA Compliance",
        desc: "End-to-end encrypted data handling with audit trails",
      },
      {
        icon: Activity,
        name: "Real-Time Monitoring",
        desc: "Live patient vitals dashboards and alerting systems",
      },
      {
        icon: Globe,
        name: "Telehealth Platforms",
        desc: "Secure video consultations and remote diagnostics",
      },
    ],
    stat: { value: 99, suffix: ".9%", label: "Uptime SLA" },
  },
  {
    challenge:
      "Financial institutions face mounting pressure from real-time transaction demands, evolving regulations, and the need to modernize core banking without downtime.",
    solution:
      "We architect high-throughput trading platforms, automated compliance engines, and secure payment infrastructure that process millions of transactions with sub-millisecond latency.",
    features: [
      {
        icon: LockKeyhole,
        name: "Fraud Detection",
        desc: "ML-powered real-time transaction anomaly detection",
      },
      {
        icon: BarChart3,
        name: "Risk Analytics",
        desc: "Predictive modeling for credit and market risk",
      },
      {
        icon: Zap,
        name: "Payment Infrastructure",
        desc: "High-throughput payment processing and settlement",
      },
    ],
    stat: { value: 10, suffix: "M+", label: "Transactions / Day" },
  },
  {
    challenge:
      "Educational platforms battle engagement drop-off, accessibility gaps, and the challenge of personalizing learning at scale across diverse student populations.",
    solution:
      "Albos creates adaptive learning ecosystems powered by AI that personalize content delivery, track mastery in real-time, and ensure WCAG-compliant experiences for every learner.",
    features: [
      {
        icon: Cpu,
        name: "Adaptive Learning",
        desc: "AI-driven personalized learning paths and assessments",
      },
      {
        icon: Globe,
        name: "Accessibility First",
        desc: "WCAG 2.1 AA compliant interfaces and interactions",
      },
      {
        icon: BarChart3,
        name: "Learning Analytics",
        desc: "Real-time dashboards for student progress and outcomes",
      },
    ],
    stat: { value: 95, suffix: "%", label: "Completion Rate" },
  },
  {
    challenge:
      "Retailers wrestle with omnichannel consistency, inventory visibility gaps, and the need to deliver personalized shopping experiences that convert across every touchpoint.",
    solution:
      "We build unified commerce platforms that sync inventory in real-time, power personalized recommendations, and deliver seamless experiences from mobile to in-store.",
    features: [
      {
        icon: Database,
        name: "Inventory Sync",
        desc: "Real-time stock visibility across all channels",
      },
      {
        icon: Cpu,
        name: "Personalization Engine",
        desc: "AI-powered product recommendations and merchandising",
      },
      {
        icon: Globe,
        name: "Omnichannel Platform",
        desc: "Unified experience across web, mobile, and POS",
      },
    ],
    stat: { value: 2, suffix: "x", label: "Revenue Growth" },
  },
  {
    challenge:
      "Manufacturers face production inefficiencies, quality control bottlenecks, and the complexity of integrating IoT data across factory floors and supply chains.",
    solution:
      "Albos delivers smart factory platforms that connect IoT sensors, automate quality inspection with computer vision, and optimize production scheduling with predictive maintenance.",
    features: [
      {
        icon: Cpu,
        name: "Predictive Maintenance",
        desc: "IoT-driven equipment health monitoring and alerts",
      },
      {
        icon: Activity,
        name: "Quality Automation",
        desc: "Computer vision for real-time defect detection",
      },
      {
        icon: BarChart3,
        name: "Production Optimization",
        desc: "AI scheduling and throughput maximization",
      },
    ],
    stat: { value: 40, suffix: "%", label: "Less Downtime" },
  },
  {
    challenge:
      "Logistics companies struggle with last-mile visibility, route optimization under volatility, and the need to unify disparate supply chain data into actionable insights.",
    solution:
      "We engineer end-to-end visibility platforms with real-time fleet tracking, AI-optimized routing, and predictive ETAs that reduce delivery times and operational costs.",
    features: [
      {
        icon: Globe,
        name: "Fleet Visibility",
        desc: "Real-time GPS tracking and geofencing alerts",
      },
      {
        icon: Cpu,
        name: "Route Optimization",
        desc: "AI-driven dynamic routing and load planning",
      },
      {
        icon: Database,
        name: "Supply Chain Analytics",
        desc: "End-to-end pipeline visibility and forecasting",
      },
    ],
    stat: { value: 35, suffix: "%", label: "Faster Delivery" },
  },
  {
    challenge:
      "Real estate firms deal with fragmented property data, slow transaction cycles, and the challenge of delivering immersive digital experiences that drive buyer engagement.",
    solution:
      "Albos builds property management platforms with 3D virtual tours, automated transaction workflows, and CRM systems that accelerate deal cycles and improve tenant retention.",
    features: [
      {
        icon: Globe,
        name: "Virtual Tours",
        desc: "Immersive 3D property walkthroughs and staging",
      },
      {
        icon: Database,
        name: "Property Management",
        desc: "Unified listings, leases, and maintenance tracking",
      },
      {
        icon: BarChart3,
        name: "Market Analytics",
        desc: "Predictive valuation and investment insights",
      },
    ],
    stat: { value: 3, suffix: "x", label: "Faster Deal Close" },
  },
  {
    challenge:
      "Media companies face content delivery bottlenecks, rights management complexity, and the need to monetize audiences across rapidly shifting platforms and formats.",
    solution:
      "We architect content management and distribution platforms with automated rights tracking, adaptive streaming, and audience analytics that maximize engagement and revenue.",
    features: [
      {
        icon: Database,
        name: "Content Management",
        desc: "Scalable DAM with automated tagging and rights",
      },
      {
        icon: Zap,
        name: "Adaptive Streaming",
        desc: "Multi-format delivery optimized per device and bandwidth",
      },
      {
        icon: BarChart3,
        name: "Audience Analytics",
        desc: "Real-time engagement metrics and monetization insights",
      },
    ],
    stat: { value: 80, suffix: "%", label: "Less Manual Work" },
  },
];

/* ─── Industry growth metrics for comparison chart ─── */
const INDUSTRY_GROWTH = [
  { name: "FinTech", growth: 87, color: "#F97316" },
  { name: "HealthTech", growth: 82, color: "#FB923C" },
  { name: "Retail", growth: 75, color: "#FF964D" },
  { name: "EdTech", growth: 71, color: "#FFB06B" },
  { name: "Manufacturing", growth: 65, color: "#FFC48A" },
  { name: "Logistics", growth: 60, color: "#FFD8A8" },
  { name: "Real Estate", growth: 55, color: "#FFE6C4" },
  { name: "Media", growth: 48, color: "#FFF0DB" },
];

/* ─── Cross-industry capabilities ─── */
const CAPABILITIES = [
  "API Development",
  "System Integration",
  "Data Pipelines",
  "Security Compliance",
  "Cloud Migration",
  "Legacy Modernization",
];

/* ─── Compliance certifications ─── */
const CERTIFICATIONS = [
  { name: "HIPAA", icon: ShieldCheck, status: "Certified" },
  { name: "SOC 2", icon: Lock, status: "Certified" },
  { name: "ISO 27001", icon: FileShieldIcon, status: "Certified" },
  { name: "GDPR", icon: Scale, status: "Certified" },
  { name: "PCI-DSS", icon: LockKeyhole, status: "Certified" },
  { name: "CCPA", icon: FileCheck, status: "Certified" },
];

/* ═══════════════════════════════════════════════
   INDUSTRIES SECTION
   ═══════════════════════════════════════════════ */

export function IndustriesSection() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [filterPill, setFilterPill] = useState(null);
  const sectionRefs = useRef([]);
  const isClickScrolling = useRef(false);
  const sidebarRef = useRef(null);

  /* ─── Scroll to industry section ─── */
  const scrollToIndustry = useCallback((index) => {
    setActiveIndustry(index);
    isClickScrolling.current = true;
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 1200);
  }, []);

  /* ─── Track active section on scroll ─── */
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;
      const scrollTop = window.scrollY;
      let closest = 0;
      let closestDist = Infinity;
      sectionRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const dist = Math.abs(ref.offsetTop - scrollTop - 250);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveIndustry(closest);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="industries"
      className="relative overflow-hidden mesh-gradient-1"
    >
      {/* ═══ HERO ═══ */}
      <div className="relative bg-[#FAFAFA] min-h-[60vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-16 pb-16 md:pt-16 md:pb-24">
        {/* Subtle industry icon grid pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,0,0,0.06) 79px, rgba(0,0,0,0.06) 80px),
                repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(0,0,0,0.06) 79px, rgba(0,0,0,0.06) 80px)
              `,
              backgroundSize: "80px 80px",
            }}
          />

          {/* Industry icon watermark grid */}
          <div className="absolute inset-0 grid grid-cols-8 md:grid-cols-12 gap-0 opacity-[0.03]">
            {Array.from({ length: 96 }).map((_, i) => {
              const iconName = INDUSTRIES[i % INDUSTRIES.length].icon;
              const Icon = ICON_MAP[iconName];
              if (!Icon) return <div key={i} />;
              return (
                <div key={i} className="flex items-center justify-center py-6">
                  <Icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#F97316]/[0.03] blur-[140px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[var(--container-max)] w-full">
          <ScrollReveal direction="up">
            <SectionLabel label="Industries" />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h1
              className="mt-6 font-[family-name:var(--font-plus-jakarta)] font-extrabold leading-[0.95] tracking-tight text-[#18181B]"
              style={{ fontSize: "var(--fs-h1)" }}
            >
              Software Solutions
              <br />
              Built for Your Industry
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="mt-6 text-[#A1A1AA] text-base md:text-lg max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
              Deep domain expertise meets world-class engineering. We deliver
              tailored software solutions that address the unique challenges and
              compliance requirements of your sector.
            </p>
          </ScrollReveal>

          {/* Filter pills row */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-2">
              <button
                onClick={() => setFilterPill(null)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-[family-name:var(--font-inter)] font-semibold uppercase tracking-wider transition-all duration-300 ${
                  filterPill === null
                    ? "bg-[#F97316] text-white"
                    : "bg-black/[0.05] text-[#A1A1AA] hover:bg-black/[0.08] hover:text-[#18181B]"
                }`}
              >
                All Industries
              </button>
              {INDUSTRIES.map((industry) => (
                <button
                  key={industry.name}
                  onClick={() => {
                    setFilterPill(industry.name);
                    const idx = INDUSTRIES.findIndex(
                      (ind) => ind.name === industry.name,
                    );
                    if (idx !== -1) scrollToIndustry(idx);
                  }}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-[family-name:var(--font-inter)] font-semibold uppercase tracking-wider transition-all duration-300 ${
                    filterPill === industry.name
                      ? "bg-[#F97316] text-white"
                      : "bg-black/[0.05] text-[#A1A1AA] hover:bg-black/[0.08] hover:text-[#18181B]"
                  }`}
                >
                  {industry.name}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ═══ INDUSTRY DETAIL AREA: SIDEBAR + SECTIONS ═══ */}
      <div className="relative">
        {/* ─── Sticky Sidebar (Desktop) ─── */}
        <div className="hidden lg:block fixed right-0 top-0 z-40 h-full pointer-events-none">
          <div
            ref={sidebarRef}
            className="h-full flex flex-col justify-center items-end pr-6 xl:pr-10 pointer-events-auto"
          >
            <nav className="relative flex flex-col gap-1 py-4">
              {/* Sliding active indicator */}
              <motion.div
                className="absolute right-0 w-[3px] rounded-full bg-[#F97316]"
                animate={{
                  top: activeIndustry * 44 + 4,
                  height: 36,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />

              {INDUSTRIES.map((industry, i) => {
                const Icon = ICON_MAP[industry.icon];
                return (
                  <button
                    key={industry.name}
                    onClick={() => scrollToIndustry(i)}
                    className={`relative flex items-center gap-3 pr-6 pl-4 py-2.5 text-right text-sm font-[family-name:var(--font-inter)] font-medium transition-all duration-300 rounded-l-lg hover:bg-black/[0.03] ${
                      activeIndustry === i
                        ? "text-[#18181B]"
                        : "text-[#A1A1AA] hover:text-[#18181B]/70"
                    }`}
                    style={{
                      background:
                        activeIndustry === i
                          ? "rgba(255,255,255,0.04)"
                          : "transparent",
                    }}
                  >
                    <span className="whitespace-nowrap">{industry.name}</span>
                    {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* ─── Horizontal Scroll Nav (Mobile) ─── */}
        <div className="lg:hidden sticky top-0 z-30 bg-[#FAFAFA]/90 backdrop-blur-xl border-b border-black/[0.06]">
          <div className="mx-auto max-w-[var(--container-max)] px-6">
            <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
              {INDUSTRIES.map((industry, i) => {
                const Icon = ICON_MAP[industry.icon];
                return (
                  <button
                    key={industry.name}
                    onClick={() => scrollToIndustry(i)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-[family-name:var(--font-inter)] font-semibold uppercase tracking-wider transition-all duration-300 ${
                      activeIndustry === i
                        ? "bg-[#F97316] text-white"
                        : "bg-black/[0.05] text-[#A1A1AA] hover:bg-black/[0.08] hover:text-[#18181B]"
                    }`}
                  >
                    {Icon && <Icon className="h-3.5 w-3.5" />}
                    {industry.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Industry Detail Sections ─── */}
        <div>
          {INDUSTRIES.map((industry, i) => {
            const isOdd = i % 2 === 0;
            const bgColor = isOdd ? "#FAFAFA" : "#FFFFFF";
            const detail = INDUSTRY_DETAILS[i];
            const Icon = ICON_MAP[industry.icon];

            return (
              <div
                key={industry.name}
                id={`industry-${industry.name.toLowerCase()}`}
                ref={(el) => {
                  sectionRefs.current[i] = el;
                }}
                className="relative"
                style={{ backgroundColor: bgColor }}
              >
                {/* Top divider */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.06)"
                      ? "rgba(0,0,0,0.06)"
                      : "rgba(0,0,0,0.08)",
                  }}
                />

                <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20 py-20 md:py-28">
                  {/* Industry Header */}
                  <ScrollReveal direction={isOdd ? "left" : "right"}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
                      <div className="flex items-center gap-4">
                        {Icon && (
                          <div
                            className={`flex items-center justify-center w-14 h-14 rounded-2xl ${"bg-[#F97316]/10"}`}
                          >
                            <Icon className="h-7 w-7 text-[#F97316]" />
                          </div>
                        )}
                        <h2
                          className="font-[family-name:var(--font-plus-jakarta)] font-extrabold leading-tight"
                          style={{
                            fontSize: "var(--fs-h2)",
                            color: "#18181B",
                          }}
                        >
                          {industry.name}
                        </h2>
                      </div>
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-[family-name:var(--font-inter)] font-semibold ${
                          "border-black/[0.06] bg-black/[0.02] hover:bg-black/[0.04]"
                            ? "bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316]"
                            : "bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316]"
                        }`}
                      >
                        <FolderKanban className="h-4 w-4" />
                        {industry.projects} projects delivered
                      </div>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Left Column: Challenge + Solution */}
                    <div>
                      {/* Challenge Box */}
                      <ScrollReveal
                        direction={isOdd ? "left" : "right"}
                        delay={0.1}
                      >
                        <div
                          className={`p-6 rounded-xl border ${
                            "border-black/[0.06] bg-black/[0.02] hover:bg-black/[0.04]"
                              ? "border-black/[0.08] bg-black/[0.02]"
                              : "border-black/[0.08] bg-black/[0.02]"
                          }`}
                        >
                          <span
                            className={`font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.15em] font-semibold ${"text-[#F97316]"}`}
                          >
                            The Challenge
                          </span>
                          <p
                            className={`mt-3 text-sm md:text-base font-[family-name:var(--font-inter)] leading-relaxed ${"text-[#52525B]"}`}
                          >
                            {detail.challenge}
                          </p>
                        </div>
                      </ScrollReveal>

                      {/* Solution */}
                      <ScrollReveal
                        direction={isOdd ? "left" : "right"}
                        delay={0.2}
                      >
                        <div className="mt-8">
                          <span
                            className={`font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.15em] font-semibold ${"text-[#18181B]"}`}
                          >
                            Our Solution
                          </span>
                          <p
                            className={`mt-3 text-sm md:text-base font-[family-name:var(--font-inter)] leading-relaxed ${"text-[#52525B]"}`}
                          >
                            {detail.solution}
                          </p>
                        </div>
                      </ScrollReveal>

                      {/* Stat */}
                      <ScrollReveal
                        direction={isOdd ? "left" : "right"}
                        delay={0.3}
                      >
                        <div className="mt-10">
                          <span
                            className={`font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.15em] font-semibold ${"text-[#A1A1AA]"}`}
                          >
                            Key Result
                          </span>
                          <div className="mt-2 flex items-baseline gap-2">
                            <span className="font-[family-name:var(--font-plus-jakarta)] text-5xl md:text-6xl font-extrabold text-[#F97316]">
                              <CountUp
                                value={detail.stat.value}
                                suffix={detail.stat.suffix}
                                duration={2}
                              />
                            </span>
                          </div>
                          <p
                            className={`mt-1 text-sm font-[family-name:var(--font-inter)] ${"text-[#A1A1AA]"}`}
                          >
                            {detail.stat.label}
                          </p>
                        </div>
                      </ScrollReveal>
                    </div>

                    {/* Right Column: Features */}
                    <div className="flex flex-col gap-5">
                      {detail.features.map((feature, fi) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <ScrollReveal
                            key={feature.name}
                            direction={isOdd ? "right" : "left"}
                            delay={0.1 + fi * 0.12}
                          >
                            <div
                              className={`group p-6 rounded-xl border transition-all duration-300 hover:border-[#F97316]/30 card-hover-lift ${
                                "border-black/[0.06] bg-black/[0.02] hover:bg-black/[0.04]"
                                  ? "border-black/[0.06] bg-black/[0.02] hover:bg-black/[0.04]"
                                  : "border-black/[0.06] bg-black/[0.02] hover:bg-black/[0.04]"
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div
                                  className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-300 ${
                                    "border-black/[0.06] bg-black/[0.02] hover:bg-black/[0.04]"
                                      ? "bg-[#F97316]/10 group-hover:bg-[#F97316]/20"
                                      : "bg-[#F97316]/10 group-hover:bg-[#F97316]/20"
                                  }`}
                                >
                                  <FeatureIcon className="h-5 w-5 text-[#F97316]" />
                                </div>
                                <div>
                                  <h3
                                    className={`font-[family-name:var(--font-plus-jakarta)] text-lg font-bold leading-tight ${"text-[#18181B]"}`}
                                  >
                                    {feature.name}
                                  </h3>
                                  <p
                                    className={`mt-1.5 text-sm font-[family-name:var(--font-inter)] leading-relaxed ${"text-[#52525B]"}`}
                                  >
                                    {feature.desc}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </ScrollReveal>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ INDUSTRY COMPARISON CHART ═══ */}
      <div className="relative bg-[#FAFAFA] py-20 md:py-28">
        <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />

        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-12 lg:mb-16">
            <SectionLabel label="Growth Metrics" />
            <h2
              className="mt-4 font-[family-name:var(--font-plus-jakarta)] font-bold text-[#18181B] leading-tight"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              Industry Growth Comparison
            </h2>
            <p className="mt-4 text-[#A1A1AA] text-base md:text-lg max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
              Year-over-year digital transformation investment growth across the
              sectors we serve.
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {INDUSTRY_GROWTH.map((item, i) => (
              <IndustryBar key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ═══ CLIENT LOGO MARQUEE ═══ */}
      <div className="relative bg-[#FFFFFF] py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />

        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20 mb-12">
          <ScrollReveal direction="up">
            <SectionLabel label="Trusted By" />
            <h2
              className="mt-4 font-[family-name:var(--font-plus-jakarta)] font-bold text-[#18181B] leading-tight"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              Partners & Clients
            </h2>
          </ScrollReveal>
        </div>

        {/* Marquee Row 1 - Left to Right */}
        <div className="relative mb-4">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FFFFFF] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FFFFFF] to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-8 shrink-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
                <div
                  key={`row1-${i}`}
                  className="group flex items-center justify-center px-8 py-4 rounded-xl border border-black/[0.04] bg-black/[0.02] min-w-[180px] hover:border-[#F97316]/20 hover:bg-black/[0.04] transition-all duration-300 cursor-pointer grayscale hover:grayscale-0"
                >
                  <span className="font-[family-name:var(--font-plus-jakarta)] font-bold text-lg text-[#52525B] group-hover:text-[#F97316] transition-colors duration-300 whitespace-nowrap">
                    {logo}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Marquee Row 2 - Right to Left */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FFFFFF] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FFFFFF] to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-8 shrink-0"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 35, ease: "linear", repeat: Infinity }}
            >
              {[
                ...CLIENT_LOGOS.slice().reverse(),
                ...CLIENT_LOGOS.slice().reverse(),
              ].map((logo, i) => (
                <div
                  key={`row2-${i}`}
                  className="group flex items-center justify-center px-8 py-4 rounded-xl border border-black/[0.04] bg-black/[0.02] min-w-[180px] hover:border-[#F97316]/20 hover:bg-black/[0.04] transition-all duration-300 cursor-pointer grayscale hover:grayscale-0"
                >
                  <span className="font-[family-name:var(--font-plus-jakarta)] font-bold text-lg text-[#52525B] group-hover:text-[#F97316] transition-colors duration-300 whitespace-nowrap">
                    {logo}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ CROSS-INDUSTRY CAPABILITIES ═══ */}
      <div className="relative bg-[#F97316] py-20 md:py-28 overflow-hidden">
        {/* Decorative noise texture */}
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-20" />

        <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20 text-center">
          <ScrollReveal direction="up">
            <SectionLabel
              label="Core Capabilities"
              dark
              className="justify-center [&>span]:text-white/70 [&>span_span]:bg-white/50 [&>span_span:nth-child(2)]:bg-white"
            />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2
              className="mt-6 font-[family-name:var(--font-plus-jakarta)] font-extrabold text-white leading-tight max-w-3xl mx-auto"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              No matter your industry, our core capabilities remain constant.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={cap}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative px-6 py-3 rounded-full bg-[#FAFAFA]/10 border border-[#FAFAFA]/15 text-white font-[family-name:var(--font-inter)] font-semibold text-sm md:text-base hover:bg-[#FAFAFA]/20 transition-all duration-300 cursor-default select-none">
                    {cap}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ═══ COMPLIANCE & CERTIFICATIONS ═══ */}
      <div className="relative bg-[#FAFAFA] py-20 md:py-28">
        <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />

        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up">
            <SectionLabel label="Compliance" />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2
              className="mt-4 font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[#18181B] leading-tight"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              Certified & Compliant
            </h2>
            <p className="mt-4 text-[#A1A1AA] text-base md:text-lg max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
              Our processes and infrastructure meet the highest industry
              standards, ensuring your data and operations are always protected.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {CERTIFICATIONS.map((cert, i) => {
              const CertIcon = cert.icon;
              return (
                <ScrollReveal key={cert.name} direction="up" delay={i * 0.08}>
                  <div className="group relative p-6 rounded-xl border border-black/[0.06] bg-black/[0.02] hover:border-[#F97316]/20 hover:bg-black/[0.04] transition-all duration-300 card-hover-lift">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#F97316]/10 group-hover:bg-[#F97316]/15 transition-colors duration-300">
                        <CertIcon className="h-6 w-6 text-[#F97316]" />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#18181B]">
                          {cert.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Check className="h-3.5 w-3.5 text-green-500" />
                          <span className="text-xs font-[family-name:var(--font-inter)] font-medium text-green-500">
                            {cert.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══ CONSULTATION CTA ═══ */}
      <div className="relative overflow-hidden py-20 md:py-28">
        {/* Dramatic gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAFA] via-[#1A0D05] to-[#FAFAFA]" />

        {/* Animated accent line at top */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F97316] to-transparent"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 right-[15%] w-3 h-3 rounded-full border border-[#F97316]/30"
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-32 left-[10%] w-4 h-4 rounded-full border border-[#F97316]/20"
          animate={{ y: [10, -10, 10], opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute top-1/2 right-[8%] w-2 h-2 rounded-full bg-[#F97316]/20"
          animate={{
            y: [-15, 15, -15],
            x: [-5, 5, -5],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-1/3 left-[20%] w-6 h-6 rounded-full border border-[#F97316]/10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Subtle glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#F97316]/[0.05] blur-[150px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F97316]/[0.03] blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: CTA Text */}
            <ScrollReveal direction="left">
              <SectionLabel label="Get Started" dark />
              <h2
                className="mt-4 font-[family-name:var(--font-plus-jakarta)] font-extrabold text-white leading-tight"
                style={{ fontSize: "var(--fs-h2)" }}
              >
                Not Sure Which Solution Fits?
              </h2>
              <p className="mt-4 text-white/70 text-base md:text-lg max-w-lg font-[family-name:var(--font-inter)] leading-relaxed">
                Tell us about your industry challenge, and our solutions
                architects will map out the right approach — no commitment, no
                jargon.
              </p>
              <div className="mt-8 flex flex-col gap-3 text-sm font-[family-name:var(--font-inter)] text-white/70">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#F97316] shrink-0" />
                  <span>Free 30-minute consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#F97316] shrink-0" />
                  <span>Tailored technology recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#F97316] shrink-0" />
                  <span>No-obligation project estimate</span>
                </div>
              </div>

              {/* Inline email form */}
              <div className="mt-10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="flex gap-3 max-w-md"
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3 rounded-xl bg-white/[0.08] border border-white/[0.15] text-white placeholder:text-white/40 font-[family-name:var(--font-inter)] text-sm focus:outline-none focus:border-[#F97316]/50 focus:shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all duration-300"
                  />

                  <div className="relative group">
                    {/* Glow behind button */}
                    <div className="absolute inset-0 rounded-xl bg-[#F97316]/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <button
                      type="submit"
                      className="relative px-6 py-3 rounded-xl bg-[#F97316] text-white font-[family-name:var(--font-inter)] font-bold text-sm uppercase tracking-wider hover:bg-[#EA580C] transition-all duration-300 whitespace-nowrap"
                    >
                      Book Call
                    </button>
                  </div>
                </form>
                <p className="mt-2 text-xs text-white/50 font-[family-name:var(--font-inter)]">
                  We&apos;ll respond within 24 hours. No spam, ever.
                </p>
              </div>
            </ScrollReveal>

            {/* Right: Enhanced Contact Form */}
            <ScrollReveal direction="right">
              <div className="relative p-6 md:p-8 rounded-2xl border border-black/[0.06] bg-[#FFFFFF]/80 backdrop-blur-sm">
                {/* Gradient accent at top of card */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F97316]/50 to-transparent rounded-t-2xl" />
                <ConsultationForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ FOLDER ICON (for project badge) ═══ */
function FolderIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

/* ═══ INDUSTRY BAR CHART SUB-COMPONENT ═══ */
function IndustryBar({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="group flex items-center gap-4">
      {/* Label */}
      <div className="w-28 md:w-36 shrink-0 text-right">
        <span className="font-[family-name:var(--font-inter)] text-sm font-medium text-[#71717A] group-hover:text-[#18181B] transition-colors duration-300">
          {item.name}
        </span>
      </div>

      {/* Bar */}
      <div className="flex-1 h-8 md:h-10 rounded-lg bg-black/[0.04] relative overflow-hidden">
        {/* Animated fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-lg"
          style={{
            background: `linear-gradient(90deg, ${item.color}40 0%, ${item.color}80 100%)`,
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${item.growth}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Accent line at start of bar */}
        <motion.div
          className="absolute inset-y-0 left-0 w-[3px] rounded-l-lg"
          style={{ backgroundColor: item.color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: 3 } : { width: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
        />

        {/* Percentage label */}
        <motion.span
          className="absolute inset-y-0 right-3 flex items-center font-[family-name:var(--font-plus-jakarta)] text-sm md:text-base font-bold"
          style={{ color: item.color }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
        >
          {item.growth}%
        </motion.span>
      </div>
    </div>
  );
}

/* ═══ CONSULTATION FORM SUB-COMPONENT ═══ */
function ConsultationForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label
          htmlFor="consult-name"
          className="block text-xs font-[family-name:var(--font-inter)] font-semibold uppercase tracking-wider text-[#A1A1AA] mb-2"
        >
          Name
        </label>
        <input
          id="consult-name"
          type="text"
          required
          value={formState.name}
          onChange={(e) =>
            setFormState((s) => ({ ...s, name: e.target.value }))
          }
          placeholder="Your full name"
          className="w-full px-4 py-3 rounded-xl bg-black/[0.04] border border-black/[0.08] text-[#18181B] placeholder:text-[#52525B] font-[family-name:var(--font-inter)] text-sm focus:outline-none focus:border-[#F97316]/50 focus:shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all duration-300"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="consult-email"
          className="block text-xs font-[family-name:var(--font-inter)] font-semibold uppercase tracking-wider text-[#A1A1AA] mb-2"
        >
          Email
        </label>
        <input
          id="consult-email"
          type="email"
          required
          value={formState.email}
          onChange={(e) =>
            setFormState((s) => ({ ...s, email: e.target.value }))
          }
          placeholder="you@company.com"
          className="w-full px-4 py-3 rounded-xl bg-black/[0.04] border border-black/[0.08] text-[#18181B] placeholder:text-[#52525B] font-[family-name:var(--font-inter)] text-sm focus:outline-none focus:border-[#F97316]/50 focus:shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all duration-300"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="consult-message"
          className="block text-xs font-[family-name:var(--font-inter)] font-semibold uppercase tracking-wider text-[#A1A1AA] mb-2"
        >
          Message
        </label>
        <textarea
          id="consult-message"
          required
          rows={4}
          value={formState.message}
          onChange={(e) =>
            setFormState((s) => ({ ...s, message: e.target.value }))
          }
          placeholder="Tell us about your project or challenge..."
          className="w-full px-4 py-3 rounded-xl bg-black/[0.04] border border-black/[0.08] text-[#18181B] placeholder:text-[#52525B] font-[family-name:var(--font-inter)] text-sm focus:outline-none focus:border-[#F97316]/50 focus:shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all duration-300 resize-none"
        />
      </div>

      {/* Submit Button with glow effect */}
      <div className="relative group">
        {/* Glow behind button */}
        <div className="absolute inset-0 rounded-xl bg-[#F97316]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <MagneticButton strength={0.15}>
          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className="relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F97316] text-white font-[family-name:var(--font-inter)] font-bold text-sm uppercase tracking-wider hover:bg-[#EA580C] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : isSubmitted ? (
              <>
                <Check className="h-4 w-4" />
                Message Sent!
              </>
            ) : (
              <>
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                Get Free Consultation
              </>
            )}
          </button>
        </MagneticButton>
      </div>
    </form>
  );
}
