"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiDotnet,
  SiNestjs,
  SiGraphql,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiElasticsearch,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiJenkins,
  SiGithubactions,
  SiFlutter,
  SiSwift,
  SiKotlin,
} from "react-icons/si";
import { FaJava, FaAws, FaApple, FaMicrosoft } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";
import { TECH_STACK } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const tabKeys = ["web", "database", "cloud", "mobile"];

// Original brand logos keyed by the tech `name` in TECH_STACK.
// Techs without a brand logo gracefully fall back to the colored dot.
const TECH_ICONS = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Vue.js": SiVuedotjs,
  Angular: SiAngular,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  Java: FaJava,
  ".NET": SiDotnet,
  NestJS: SiNestjs,
  GraphQL: SiGraphql,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  "SQL Server": DiMsqlServer,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Elasticsearch: SiElasticsearch,
  DynamoDB: FaAws,
  AWS: FaAws,
  Azure: FaMicrosoft,
  GCP: SiGooglecloud,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
  Jenkins: SiJenkins,
  "GitHub Actions": SiGithubactions,
  "React Native": SiReact,
  Flutter: SiFlutter,
  Swift: SiSwift,
  Kotlin: SiKotlin,
  "Objective-C": FaApple,
};

// Near-white brand colors are invisible on the light section background,
// so darken them while leaving saturated brand colors untouched.
function getIconColor(color) {
  const hex = color.replace("#", "");
  const full =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.85 ? "#18181B" : color;
}

// Staggered entrance variants for tech cards
const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
  exit: {
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
};

function TechCard({ name, color }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = TECH_ICONS[name];

  return (
    <motion.div
      variants={gridItemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:border-[#F97316]/30 cursor-pointer",
        isHovered
          ? "border-albos-accent/30 bg-albos-accent/[0.06]"
          : "border-black/[0.06] bg-black/[0.02]",
      )}
    >
      {/* Brand logo (falls back to a colored dot when no logo is mapped) */}
      <span
        className="relative flex h-6 w-6 shrink-0 items-center justify-center"
        style={{ color: Icon ? getIconColor(color) : color }}
      >
        {Icon ? (
          <Icon
            aria-hidden="true"
            className="h-[18px] w-[18px] transition-transform duration-300"
            style={{ transform: isHovered ? "scale(1.18)" : "scale(1)" }}
          />
        ) : (
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-40"
              style={{
                backgroundColor: color,
                animation: isHovered
                  ? "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite"
                  : "none",
              }}
            />

            <span
              className="relative inline-flex h-2.5 w-2.5 rounded-full transition-transform duration-300"
              style={{
                backgroundColor: color,
                transform: isHovered ? "scale(1.3)" : "scale(1)",
              }}
            />
          </span>
        )}
      </span>

      {/* Tech name */}
      <span
        className={cn(
          "text-sm font-medium font-[family-name:var(--font-inter)] transition-colors duration-300",
          isHovered ? "text-albos-text" : "text-albos-text/60",
        )}
      >
        {name}
      </span>

      {/* Hover accent bar */}
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
        style={{ backgroundColor: color }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}

export function TechStackSection() {
  const [activeTab, setActiveTab] = useState("web");
  const activeData = TECH_STACK[activeTab];

  return (
    <section
      id="technologies"
      className="relative bg-albos-mid py-16 md:py-20 lg:py-28 overflow-hidden"
    >
      {/* Gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent" />

      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <ScrollReveal direction="up" className="mb-12 lg:mb-16">
          <SectionLabel label="Technologies We Use" />
          <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-bold text-albos-text leading-tight">
            Powered by the Best
          </h2>
          <p className="mt-4 text-albos-muted text-base md:text-lg max-w-xl font-[family-name:var(--font-inter)]">
            From React to Kubernetes, our engineers master the tools that power
            modern enterprise software.
          </p>
        </ScrollReveal>

        {/* Two-column layout: sticky tabs left, grid right */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left: Sticky tab navigation (desktop) */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="sticky top-32">
              <nav className="flex flex-col gap-2">
                {tabKeys.map((key) => {
                  const isActive = key === activeTab;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-400",
                        isActive
                          ? "bg-albos-accent/[0.08]"
                          : "hover:bg-black/[0.03]",
                      )}
                    >
                      {/* Active accent bar */}
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-albos-accent"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{
                          scaleY: isActive ? 1 : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />

                      {/* Tab label */}
                      <span
                        className={cn(
                          "font-[family-name:var(--font-plus-jakarta)] text-sm font-semibold transition-colors duration-300",
                          isActive
                            ? "text-albos-accent"
                            : "text-albos-text/50 group-hover:text-albos-text/80",
                        )}
                      >
                        {TECH_STACK[key].label}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Dev count summary */}
              <div className="mt-8 pt-6 border-t border-black/[0.06]">
                <p className="text-xs uppercase tracking-[0.15em] text-albos-muted font-[family-name:var(--font-inter)] mb-2">
                  Total Engineers
                </p>
                <p className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold text-albos-text">
                  {TECH_STACK[activeTab].categories.reduce(
                    (sum, cat) => sum + cat.devCount,
                    0,
                  )}
                  <span className="text-albos-accent">+</span>
                </p>
              </div>
            </div>
          </div>

          {/* Mobile: horizontal tab pills */}
          <div className="lg:hidden -mx-6 px-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 pb-2">
              {tabKeys.map((key) => {
                const isActive = key === activeTab;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={cn(
                      "shrink-0 rounded-full px-4 py-2 text-xs font-semibold font-[family-name:var(--font-inter)] transition-all duration-300 whitespace-nowrap",
                      isActive
                        ? "bg-albos-accent text-albos-dark"
                        : "border border-black/[0.12] text-albos-text/70 hover:border-albos-accent/40 hover:text-albos-text",
                    )}
                  >
                    {TECH_STACK[key].label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Animated tech grid */}
          <div className="w-full lg:w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={gridContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-10"
              >
                {activeData.categories.map((category) => (
                  <div key={category.name}>
                    {/* Category heading with dev count badge */}
                    <div className="flex items-center gap-3 mb-5">
                      <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-albos-text">
                        {category.name}
                      </h3>
                      <span className="inline-flex items-center rounded-full bg-black/[0.05] border border-black/[0.08] px-2.5 py-0.5 text-[10px] font-semibold text-albos-muted font-[family-name:var(--font-inter)]">
                        {category.devCount} Developers
                      </span>
                    </div>

                    {/* Tech cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {category.techs.map((tech) => (
                        <TechCard
                          key={tech.name}
                          name={tech.name}
                          color={tech.color}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
