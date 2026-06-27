"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  X,
  Users,
  FolderKanban,
  UserPlus,
  Clock,
  Code2,
  Rocket,
  BarChart3,
  Zap,
  TrendingUp,
  Shield,
  Star,
} from "lucide-react";
import { SERVICES, PROCESS_STEPS } from "@/lib/constants";
import { getServiceImage } from "@/data/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CountUp } from "@/components/ui/CountUp";

/* ─── Tech stack color map ─── */
const TECH_COLORS = {
  React: "#61DAFB",
  "Node.js": "#339933",
  Python: "#3776AB",
  Java: "#ED8B00",
  ".NET": "#512BD4",
  "Next.js": "#FFFFFF",
  Vue: "#4FC08D",
  NestJS: "#E0234E",
  PostgreSQL: "#4169E1",
  "React Native": "#61DAFB",
  Swift: "#F05138",
  Kotlin: "#7F52FF",
  Flutter: "#02569B",
  TensorFlow: "#FF6F00",
  PyTorch: "#EE4C2C",
  OpenAI: "#10A37F",
  "AWS SageMaker": "#FF9900",
  AWS: "#FF9900",
  Azure: "#0078D4",
  GCP: "#4285F4",
  Docker: "#2496ED",
  Kubernetes: "#326CE5",
  Terraform: "#7B42BC",
  Figma: "#F24E1E",
  Framer: "#0055FF",
  Principle: "#8B5CF6",
  Storybook: "#FF4785",
};

/* ─── Service image paths (from @/data/services) ─── */

/* ─── Gradient overlay backgrounds for service visual panels (subtle for image visibility) ─── */
const SERVICE_GRADIENTS = [
  "linear-gradient(135deg, rgba(26,13,0,0.15) 0%, rgba(13,13,13,0.1) 50%, rgba(26,8,0,0.25) 100%)",
  "linear-gradient(135deg, rgba(0,26,13,0.15) 0%, rgba(13,13,13,0.1) 50%, rgba(0,26,8,0.25) 100%)",
  "linear-gradient(135deg, rgba(13,0,26,0.15) 0%, rgba(13,13,13,0.1) 50%, rgba(8,0,26,0.25) 100%)",
  "linear-gradient(135deg, rgba(26,10,0,0.15) 0%, rgba(13,13,13,0.1) 50%, rgba(26,6,0,0.25) 100%)",
  "linear-gradient(135deg, rgba(0,16,26,0.15) 0%, rgba(13,13,13,0.1) 50%, rgba(0,16,26,0.25) 100%)",
  "linear-gradient(135deg, rgba(26,0,21,0.15) 0%, rgba(13,13,13,0.1) 50%, rgba(26,0,16,0.25) 100%)",
  "linear-gradient(135deg, rgba(26,13,0,0.12) 0%, rgba(13,13,13,0.08) 50%, rgba(26,8,0,0.2) 100%)",
  "linear-gradient(135deg, rgba(0,16,26,0.12) 0%, rgba(13,13,13,0.08) 50%, rgba(0,16,26,0.2) 100%)",
  "linear-gradient(135deg, rgba(26,0,21,0.12) 0%, rgba(13,13,13,0.08) 50%, rgba(26,0,16,0.2) 100%)",
];

/* ─── Engagement Model Data ─── */
const ENGAGEMENT_MODELS = [
  {
    icon: Users,
    title: "Dedicated Team",
    description:
      "A fully integrated team of engineers, designers, and PMs working exclusively on your project. Think of them as your own in-house team, without the overhead.",
    pros: [
      "Full control & flexibility",
      "Deep domain knowledge",
      "Long-term consistency",
      "Scalable on demand",
    ],
    price: "From $8,500/mo per engineer",
    recommended: false,
  },
  {
    icon: FolderKanban,
    title: "Project-Based",
    description:
      "Fixed scope, fixed timeline, fixed budget. We take ownership of the entire delivery — from design through deployment — with full transparency at every stage.",
    pros: [
      "Predictable costs",
      "Clear milestones",
      "End-to-end ownership",
      "Risk mitigation",
    ],
    price: "From $75,000 per project",
    recommended: true,
  },
  {
    icon: UserPlus,
    title: "Staff Augmentation",
    description:
      "Need specific expertise fast? We embed senior engineers into your existing team to fill skill gaps and accelerate delivery without the hiring cycle.",
    pros: [
      "Rapid onboarding (1-2 weeks)",
      "No long-term commitment",
      "Specific skill sets",
      "Seamless integration",
    ],
    price: "From $9,500/mo per engineer",
    recommended: false,
  },
];

/* ─── Key Results per service ─── */
const SERVICE_KEY_RESULTS = [
  [
    { value: 40, suffix: "%", label: "Faster Delivery", icon: Zap },
    { value: 99, suffix: ".9%", label: "Uptime SLA", icon: Shield },
    { value: 3, suffix: "x", label: "Team Productivity", icon: TrendingUp },
  ],
  [
    { value: 2, suffix: "x", label: "Page Speed", icon: Zap },
    { value: 60, suffix: "%", label: "Better Conversion", icon: TrendingUp },
    { value: 50, suffix: "ms", label: "Response Time", icon: Shield },
  ],
  [
    { value: 4, suffix: ".8★", label: "Avg Rating", icon: Star },
    { value: 3, suffix: "x", label: "Engagement", icon: TrendingUp },
    { value: 200, suffix: "K+", label: "Downloads", icon: Users },
  ],
  [
    { value: 80, suffix: "%", label: "Less Manual Work", icon: Zap },
    { value: 5, suffix: "x", label: "Prediction Accuracy", icon: TrendingUp },
    { value: 10, suffix: "M+", label: "Data Points", icon: Shield },
  ],
  [
    { value: 99, suffix: ".99%", label: "Uptime SLA", icon: Shield },
    { value: 70, suffix: "%", label: "Cost Reduction", icon: TrendingUp },
    { value: 10, suffix: "x", label: "Deploy Frequency", icon: Zap },
  ],
  [
    { value: 3, suffix: "x", label: "User Satisfaction", icon: Star },
    { value: 40, suffix: "%", label: "Less Churn", icon: TrendingUp },
    { value: 2, suffix: "x", label: "Conversion Rate", icon: Zap },
  ],
  // Digital Marketing & SEO (index 6)
  [
    { value: 300, suffix: "%", label: "ROI Increase", icon: TrendingUp },
    { value: 50, suffix: "%", label: "More Leads", icon: Zap },
    { value: 1, suffix: "st Page", label: "Ranking", icon: Shield },
  ],
  // ERP & CRM Systems (index 7)
  [
    { value: 45, suffix: "%", label: "Faster Processes", icon: Zap },
    { value: 99, suffix: ".9%", label: "Data Accuracy", icon: Shield },
    { value: 2, suffix: "x", label: "Faster Reporting", icon: TrendingUp },
  ],
  // Telecalling & Support (index 8)
  [
    { value: 90, suffix: "%", label: "Resolution Rate", icon: Shield },
    { value: 30, suffix: "s", label: "Avg Response", icon: Zap },
    { value: 4, suffix: ".7★", label: "Satisfaction", icon: Star },
  ],
];

/* ─── Services Comparison Table Data ─── */
const COMPARISON_FEATURES = [
  {
    row: "Typical Timeline",
    values: [
      "8–16 weeks",
      "6–12 weeks",
      "8–14 weeks",
      "10–20 weeks",
      "4–8 weeks",
      "4–10 weeks",
    ],
  },
  {
    row: "Team Size",
    values: ["5–12", "4–8", "4–10", "4–8", "3–6", "3–6"],
  },
  {
    row: "Best For",
    values: [
      "Enterprise Systems",
      "Digital Platforms",
      "Mobile-First Products",
      "AI-Powered Solutions",
      "Infrastructure & Scaling",
      "Product Design",
    ],
  },
  {
    row: "Price Range",
    values: [
      "$75K–$500K",
      "$50K–$300K",
      "$60K–$350K",
      "$80K–$400K",
      "$40K–$200K",
      "$30K–$150K",
    ],
  },
  {
    row: "Custom Architecture",
    values: [true, true, false, true, true, false],
  },
  {
    row: "Backend Development",
    values: [true, true, false, true, true, false],
  },
  {
    row: "Mobile Support",
    values: [true, true, true, true, false, false],
  },
  {
    row: "ML / AI Integration",
    values: [true, false, true, true, true, false],
  },
  {
    row: "Cloud Deployment",
    values: [true, true, true, true, true, false],
  },
  {
    row: "Design System",
    values: [true, true, true, false, true, true],
  },
  {
    row: "24/7 Support",
    values: [true, true, true, true, true, true],
  },
  {
    row: "Code Review & QA",
    values: [true, true, true, true, true, true],
  },
];

/* ═══════════════════════════════════════════════
   SERVICES SECTION
   ═══════════════════════════════════════════════ */

export function ServicesSection() {
  const [activeService, setActiveService] = useState(0);
  const serviceRefs = useRef([]);
  const isScrolling = useRef(false);

  /* ─── Scroll to service block on tab click ─── */
  const scrollToService = (index) => {
    setActiveService(index);
    isScrolling.current = true;
    serviceRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
  };

  /* ─── Update active tab on scroll ─── */
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;
      const scrollTop = window.scrollY;
      let closest = 0;
      let closestDist = Infinity;
      serviceRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const dist = Math.abs(ref.offsetTop - scrollTop - 200);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveService(closest);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative mesh-gradient-1 overflow-hidden">
      {/* ═══ HERO ═══ */}
      <div className="relative flex min-h-[50vh] flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-16 md:pt-40 md:pb-20">
        {/* Gradient accent line at start of section */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F97316] via-[#FB923C] to-transparent" />
        {/* Subtle accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#F97316]/[0.03] blur-[120px] pointer-events-none" />

        {/* Floating decorative shapes */}
        <div
          className="absolute top-20 right-16 w-16 h-16 rounded-full border border-[#F97316]/10 animate-float pointer-events-none hidden lg:block"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-32 right-32 w-3 h-3 rounded-full bg-[#F97316]/20 animate-float pointer-events-none hidden lg:block"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full border border-[#F97316]/5 animate-float pointer-events-none hidden lg:block"
          style={{ animationDelay: "4s" }}
        />

        <div className="relative z-10 mx-auto max-w-[var(--container-max)] w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Content */}
          <div className="flex-1">
            <ScrollReveal direction="up">
              <SectionLabel label="Services" />
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h1
                className="mt-6 font-[family-name:var(--font-plus-jakarta)] font-extrabold leading-[0.95] tracking-tight text-[#18181B]"
                style={{ fontSize: "var(--fs-h1)" }}
              >
                End-to-End
                <br />
                Software Engineering
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <p className="mt-6 text-[#A1A1AA] text-base md:text-lg max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
                From concept to scale — we architect, design, build, and
                maintain enterprise software that drives measurable business
                outcomes across every industry.
              </p>
            </ScrollReveal>
          </div>

          {/* Right: Tech Infrastructure Image */}
          <motion.div
            className="w-full lg:w-1/2 shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <img
              src="/images/tech-infra.png"
              alt="Enterprise-grade data center and server infrastructure"
              className="rounded-2xl border border-black/[0.06] object-cover w-full h-auto"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>

      {/* ═══ STICKY TAB BAR ═══ */}
      <div className="sticky top-[72px] z-30 bg-[#FAFAFA]/90 backdrop-blur-xl border-b border-black/[0.06]">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {SERVICES.map((service, i) => (
              <button
                key={service.slug}
                onClick={() => scrollToService(i)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-[family-name:var(--font-inter)] font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeService === i
                    ? "bg-[#F97316] text-white"
                    : "bg-black/[0.05] text-[#A1A1AA] hover:bg-black/[0.08] hover:text-[#18181B]"
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ SERVICE DETAIL BLOCKS ═══ */}
      <div>
        {SERVICES.map((service, i) => {
          const isOdd = i % 2 === 0; // 0-indexed, so index 0 = "01" = odd
          const keyResults = SERVICE_KEY_RESULTS[i] || [];
          return (
            <div
              key={service.slug}
              ref={(el) => {
                serviceRefs.current[i] = el;
              }}
              className="relative border-b border-black/[0.06]"
            >
              <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20 py-20 md:py-28">
                <div
                  className={`flex flex-col ${isOdd ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-stretch`}
                >
                  {/* Content Column */}
                  <div className="w-full lg:w-[40%] flex flex-col justify-center">
                    <ScrollReveal direction={isOdd ? "left" : "right"}>
                      {/* Service Number + Name */}
                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="font-[family-name:var(--font-plus-jakarta)] text-5xl md:text-6xl font-extrabold text-[#F97316]/20 leading-none">
                          {service.id}
                        </span>
                        <h2
                          className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[#18181B] leading-tight"
                          style={{ fontSize: "var(--fs-h2)" }}
                        >
                          {service.title}
                        </h2>
                      </div>

                      {/* Location Pills */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {service.locations.map((loc, li) => (
                          <span
                            key={loc}
                            className={`px-3 py-1 rounded-full text-xs font-semibold font-[family-name:var(--font-inter)] tracking-wide transition-all duration-300 ${
                              li === 0
                                ? "bg-[#F97316] text-white"
                                : "border border-black/[0.15] text-[#A1A1AA] hover:border-[#F97316]/40 hover:text-[#18181B]"
                            }`}
                          >
                            {loc}
                          </span>
                        ))}
                      </div>

                      {/* Capability Tags */}
                      <div className="flex flex-wrap gap-2 mt-5">
                        {service.capabilities.map((cap) => (
                          <span
                            key={cap}
                            className="px-3 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs text-[#18181B]/70 font-[family-name:var(--font-inter)] hover:border-[#F97316]/20 hover:text-[#18181B] transition-all duration-300 cursor-default"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="mt-6 text-[#A1A1AA] text-sm md:text-base font-[family-name:var(--font-inter)] leading-relaxed max-w-lg">
                        {service.description}
                      </p>

                      {/* Tech Stack Icons Row */}
                      <div className="flex flex-wrap gap-3 mt-6">
                        {service.techStack.map((tech) => (
                          <div key={tech} className="flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{
                                backgroundColor: TECH_COLORS[tech] || "#F97316",
                              }}
                            />

                            <span className="text-xs text-[#18181B]/50 font-[family-name:var(--font-inter)] hover:text-[#18181B] transition-colors duration-300">
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA + Metric Badge */}
                      <div className="flex items-center gap-6 mt-8">
                        <MagneticButton strength={0.2}>
                          <a
                            href={`/services/${service.slug}`}
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] font-[family-name:var(--font-inter)] hover:text-[#EA580C] transition-colors duration-300"
                          >
                            Learn More
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        </MagneticButton>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/20">
                          <Users className="h-3.5 w-3.5 text-[#F97316]" />
                          <span className="text-xs font-semibold text-[#F97316] font-[family-name:var(--font-inter)]">
                            {service.metric}
                          </span>
                        </div>
                      </div>

                      {/* ═══ Key Results Mini-Section ═══ */}
                      <div className="mt-10 pt-8 border-t border-black/[0.06]">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#F97316]/60 font-[family-name:var(--font-inter)] mb-4">
                          Key Results
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          {keyResults.map((result, ri) => {
                            const ResultIcon = result.icon;
                            return (
                              <KeyResultCard
                                key={ri}
                                value={result.value}
                                suffix={result.suffix}
                                label={result.label}
                                icon={ResultIcon}
                                delay={ri * 0.15}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Service Image Column with Parallax */}
                  <ScrollReveal
                    direction={isOdd ? "right" : "left"}
                    delay={0.15}
                    className="w-full lg:w-[60%]"
                  >
                    <ParallaxPanel
                      imageSrc={getServiceImage(service.slug)}
                      gradient={SERVICE_GRADIENTS[i] || SERVICE_GRADIENTS[0]}
                      serviceId={service.id}
                      serviceTitle={service.title}
                      techStack={service.techStack}
                    />
                  </ScrollReveal>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══ PROCESS TIMELINE ═══ */}
      <div className="relative bg-[#FAFAFA] py-16 md:py-20 lg:py-28">
        <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />

        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-12 lg:mb-20">
            <SectionLabel label="How We Deliver" />
            <h2
              className="mt-4 font-[family-name:var(--font-plus-jakarta)] font-bold text-[#18181B] leading-tight"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              A Proven Delivery Framework
            </h2>
          </ScrollReveal>

          {/* Vertical Timeline */}
          <div className="relative ml-4 md:ml-8">
            {PROCESS_STEPS.map((step, i) => (
              <TimelineStep
                key={step.number}
                step={step}
                index={i}
                isLast={i === PROCESS_STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ═══ ENGAGEMENT MODELS ═══ */}
      <div className="relative bg-[#FFFFFF] py-16 md:py-20 lg:py-28">
        <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />

        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-12 lg:mb-16">
            <SectionLabel label="Engagement Models" />
            <h2
              className="mt-4 font-[family-name:var(--font-plus-jakarta)] font-bold text-[#18181B] leading-tight"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              Choose Your Collaboration Model
            </h2>
            <p className="mt-4 text-[#A1A1AA] text-base md:text-lg max-w-2xl font-[family-name:var(--font-inter)]">
              Flexible engagement options designed to match your project scope,
              timeline, and budget.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {ENGAGEMENT_MODELS.map((model, i) => (
              <ScrollReveal key={model.title} direction="up" delay={i * 0.1}>
                <EngagementCard model={model} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ SERVICES COMPARISON TABLE ═══ */}
      <div className="relative bg-[#FAFAFA] py-16 md:py-20 lg:py-28">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F97316]/30 to-transparent" />
        {/* Subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#F97316]/[0.02] blur-[150px] pointer-events-none" />

        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-12 lg:mb-16">
            <SectionLabel label="At a Glance" />
            <h2
              className="mt-4 font-[family-name:var(--font-plus-jakarta)] font-bold text-[#18181B] leading-tight"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              Compare Our Services
            </h2>
            <p className="mt-4 text-[#A1A1AA] text-base md:text-lg max-w-2xl font-[family-name:var(--font-inter)]">
              Side-by-side comparison to help you find the right fit for your
              project needs.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <ServicesComparisonTable activeService={activeService} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ═══ PARALLAX PANEL SUB-COMPONENT ═══ */
function ParallaxPanel({
  imageSrc,
  gradient,
  serviceId,
  serviceTitle,
  techStack,
}) {
  const ref = useRef(null);

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-glow group">
        {/* Service Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imageSrc}
            alt={`${serviceTitle} - Albos Technologies Pvt Ltd`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Subtle dark overlay for depth */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{ background: gradient }}
        />

        {/* Inner border */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-black/[0.06]" />

        {/* Large service number - watermark style */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-[family-name:var(--font-plus-jakarta)] text-[10rem] md:text-[14rem] font-extrabold text-white/[0.06] select-none leading-none">
            {serviceId}
          </span>
        </div>

        {/* Orange accent glow */}
        <div
          className="absolute w-[250px] h-[250px] rounded-full blur-[80px] opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.5) 0%, transparent 70%)",
            top: "10%",
            right: "10%",
          }}
        />

        {/* Service badge at top-left */}
        <div className="absolute top-5 left-5 right-5 z-10">
          <span className="inline-block px-2.5 py-1 rounded-md bg-[#F97316] text-[10px] text-white font-bold font-[family-name:var(--font-inter)] tracking-wider uppercase">
            Service {serviceId}
          </span>
        </div>

        {/* Tech stack labels at bottom */}
        <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-wrap gap-2">
          {techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm text-[10px] text-white/60 font-[family-name:var(--font-inter)] tracking-wide uppercase border border-white/[0.08]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom gradient fade for tech label contrast */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent rounded-b-2xl pointer-events-none" />
      </div>
    </div>
  );
}

/* ═══ KEY RESULT CARD SUB-COMPONENT ═══ */
function KeyResultCard({ value, suffix, label, icon: Icon, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-xl bg-black/[0.03] border border-black/[0.06] p-3 md:p-4 group hover:border-[#F97316]/20 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Accent top line on hover */}
      <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-[#F97316]/0 to-transparent group-hover:via-[#F97316]/40 transition-all duration-500" />

      <Icon className="h-3.5 w-3.5 text-[#F97316]/40 mb-2 group-hover:text-[#F97316] transition-colors duration-300" />
      <div className="font-[family-name:var(--font-plus-jakarta)] text-xl md:text-2xl font-bold text-[#18181B] leading-none">
        <CountUp value={value} suffix={suffix} duration={2} />
      </div>
      <p className="mt-1 text-[10px] md:text-xs text-[#A1A1AA] font-[family-name:var(--font-inter)] leading-tight">
        {label}
      </p>
    </motion.div>
  );
}

/* ═══ SERVICES COMPARISON TABLE SUB-COMPONENT ═══ */
function ServicesComparisonTable({ activeService }) {
  const tableRef = useRef(null);
  const isInView = useInView(tableRef, { once: true, margin: "-60px" });
  const [hoveredCol, setHoveredCol] = useState(null);

  return (
    <motion.div
      ref={tableRef}
      className="relative rounded-2xl border border-black/[0.06] overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Gradient accent at top of table */}
      <div className="h-[2px] bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F97316]" />

      {/* Horizontal scroll wrapper for mobile */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="min-w-[900px]">
          {/* ═══ Header Row ═══ */}
          <div className="grid grid-cols-[180px_repeat(6,1fr)] bg-gradient-to-r from-[#F5F5F0] via-[#1E1E1E] to-[#F5F5F0]">
            {/* Top-left empty cell */}
            <div className="px-5 py-4 border-b border-r border-black/[0.06]">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                Feature
              </span>
            </div>
            {SERVICES.map((service, i) => (
              <div
                key={service.slug}
                className={`px-4 py-4 border-b border-r border-black/[0.06] last:border-r-0 transition-all duration-300 cursor-pointer ${
                  activeService === i
                    ? "bg-[#F97316]/10"
                    : hoveredCol === i
                      ? "bg-black/[0.03]"
                      : ""
                }`}
                onMouseEnter={() => setHoveredCol(i)}
                onMouseLeave={() => setHoveredCol(null)}
              >
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={`font-[family-name:var(--font-plus-jakarta)] text-xs font-bold tracking-wide transition-colors duration-300 ${
                      activeService === i ? "text-[#F97316]" : "text-[#18181B]"
                    }`}
                  >
                    {service.id}
                  </span>
                  <span
                    className={`text-[11px] font-semibold font-[family-name:var(--font-inter)] text-center leading-tight transition-colors duration-300 ${
                      activeService === i
                        ? "text-[#F97316]"
                        : "text-[#18181B]/80"
                    }`}
                  >
                    {service.title}
                  </span>
                </div>
                {/* Active indicator line */}
                {activeService === i && (
                  <motion.div
                    className="mt-2 mx-auto h-[2px] rounded-full bg-[#F97316]"
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* ═══ Data Rows ═══ */}
          {COMPARISON_FEATURES.map((feature, rowIdx) => (
            <div
              key={feature.row}
              className={`grid grid-cols-[180px_repeat(6,1fr)] ${
                rowIdx % 2 === 0 ? "bg-[#0F0F0F]" : "bg-[#FAFAFA]"
              }`}
            >
              {/* Sticky first column (label) */}
              <div className="sticky left-0 z-10 px-5 py-3.5 border-b border-r border-black/[0.06] flex items-center bg-inherit">
                <span className="text-xs font-medium text-[#71717A] font-[family-name:var(--font-inter)] leading-tight">
                  {feature.row}
                </span>
              </div>

              {/* Value cells */}
              {feature.values.map((val, ci) => {
                const isBool = typeof val === "boolean";
                const isActive = activeService === ci;
                const isHovered = hoveredCol === ci;

                return (
                  <div
                    key={ci}
                    className={`px-4 py-3.5 border-b border-r border-black/[0.06] last:border-r-0 flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#F97316]/[0.06]"
                        : isHovered
                          ? "bg-black/[0.02]"
                          : ""
                    }`}
                    onMouseEnter={() => setHoveredCol(ci)}
                    onMouseLeave={() => setHoveredCol(null)}
                  >
                    {isBool ? (
                      val ? (
                        <span
                          className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${
                            isActive ? "bg-[#F97316]/20" : "bg-[#F97316]/10"
                          }`}
                        >
                          <Check className="h-3.5 w-3.5 text-[#F97316]" />
                        </span>
                      ) : (
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/[0.03]">
                          <X className="h-3.5 w-3.5 text-[#A1A1AA]/40" />
                        </span>
                      )
                    ) : (
                      <span
                        className={`text-xs font-semibold font-[family-name:var(--font-inter)] text-center transition-colors duration-300 ${
                          isActive ? "text-[#18181B]" : "text-[#71717A]"
                        }`}
                      >
                        {String(val)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* ═══ Key Technologies Row ═══ */}
          <div className="grid grid-cols-[180px_repeat(6,1fr)] bg-[#0F0F0F]">
            <div className="sticky left-0 z-10 px-5 py-4 border-r border-black/[0.06] flex items-center bg-inherit">
              <span className="text-xs font-medium text-[#71717A] font-[family-name:var(--font-inter)] leading-tight">
                Key Technologies
              </span>
            </div>
            {SERVICES.map((service, ci) => {
              const isActive = activeService === ci;
              const isHovered = hoveredCol === ci;
              return (
                <div
                  key={service.slug}
                  className={`px-4 py-4 border-r border-black/[0.06] last:border-r-0 transition-all duration-300 ${
                    isActive
                      ? "bg-[#F97316]/[0.06]"
                      : isHovered
                        ? "bg-black/[0.02]"
                        : ""
                  }`}
                  onMouseEnter={() => setHoveredCol(ci)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/[0.04] text-[10px] text-[#71717A] font-[family-name:var(--font-inter)]"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            backgroundColor: TECH_COLORS[tech] || "#F97316",
                          }}
                        />

                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══ TIMELINE STEP SUB-COMPONENT ═══ */
function TimelineStep({ step, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const phaseIcons = [Clock, Code2, Rocket, BarChart3];
  const Icon = phaseIcons[index % phaseIcons.length];

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-8 pb-16 last:pb-0">
      {/* Left: Timeline line + dot */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <motion.div
          className="relative z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#F97316] bg-[#FAFAFA] shrink-0"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Icon className="h-4 w-4 md:h-5 md:w-5 text-[#F97316]" />
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className="w-px flex-1"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ transformOrigin: "top" }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#F97316]/40 via-[#F97316]/20 to-[#F97316]/5" />
          </motion.div>
        )}
      </div>

      {/* Right: Content */}
      <div className="flex-1 pt-1 md:pt-2">
        <ScrollReveal direction="right" delay={index * 0.08}>
          {/* Phase number + duration */}
          <div className="flex items-center gap-3 mb-2">
            <span className="font-[family-name:var(--font-plus-jakarta)] text-sm font-bold text-[#F97316]">
              Phase {step.number}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[10px] text-[#F97316] font-[family-name:var(--font-inter)] font-semibold uppercase tracking-wider">
              {step.duration}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl md:text-2xl lg:text-3xl font-bold text-[#18181B] leading-tight">
            {step.title}
          </h3>

          {/* Description */}
          <p className="mt-3 text-[#A1A1AA] text-sm md:text-base font-[family-name:var(--font-inter)] leading-relaxed max-w-lg">
            {step.description}
          </p>

          {/* Deliverables */}
          <ul className="mt-4 space-y-2">
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
        </ScrollReveal>
      </div>
    </div>
  );
}

/* ═══ ENGAGEMENT CARD SUB-COMPONENT ═══ */
function EngagementCard({ model }) {
  const Icon = model.icon;

  return (
    <motion.div
      className={`relative h-full rounded-2xl overflow-hidden p-6 md:p-8 transition-all duration-500 border-glow ${
        model.recommended
          ? "bg-[#F5F5F0] border-2 border-[#F97316]/40 ring-1 ring-[#F97316]/10"
          : "bg-[#F5F5F0] border border-black/[0.06]"
      }`}
      whileHover={{
        y: -6,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Recommended badge */}
      {model.recommended && (
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#F97316] text-[10px] text-white font-bold uppercase tracking-wider font-[family-name:var(--font-inter)]">
          Recommended
        </div>
      )}

      {/* Accent glow for recommended */}
      {model.recommended && (
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#F97316]/[0.06] blur-[60px] pointer-events-none" />
      )}

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${
          model.recommended ? "bg-[#F97316]/15" : "bg-black/[0.05]"
        }`}
      >
        <Icon
          className={`h-6 w-6 ${model.recommended ? "text-[#F97316]" : "text-[#A1A1AA]"}`}
        />
      </div>

      {/* Title */}
      <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl md:text-2xl font-bold text-[#18181B] leading-tight">
        {model.title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-[#A1A1AA] text-sm font-[family-name:var(--font-inter)] leading-relaxed">
        {model.description}
      </p>

      {/* Pros list */}
      <ul className="mt-5 space-y-2">
        {model.pros.map((pro) => (
          <li
            key={pro}
            className="flex items-center gap-2 text-sm text-[#18181B]/80 font-[family-name:var(--font-inter)]"
          >
            <Check className="h-4 w-4 text-[#F97316] shrink-0" />
            {pro}
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="mt-6 pt-5 border-t border-black/[0.06]">
        <span className="font-[family-name:var(--font-plus-jakarta)] text-lg md:text-xl font-bold text-[#18181B]">
          {model.price}
        </span>
      </div>

      {/* CTA */}
      <div className="mt-5">
        <MagneticButton strength={0.15}>
          <a
            href="/contact"
            className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold font-[family-name:var(--font-inter)] transition-all duration-300 ${
              model.recommended
                ? "bg-[#F97316] text-white hover:bg-[#EA580C]"
                : "bg-black/[0.06] text-[#18181B] hover:bg-[#F97316] hover:text-white"
            }`}
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </MagneticButton>
      </div>
    </motion.div>
  );
}
