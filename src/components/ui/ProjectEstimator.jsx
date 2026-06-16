"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  Brain,
  Cloud,
  Palette,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Calculator,
  Users,
  Clock,
  DollarSign,
  Check,
  X,
  ArrowRight,
  Sparkles,
  BarChart3,
  Zap,
  Shield,
  CreditCard,
  BarChart2,
  Settings,
  Bell,
  Languages,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Data Constants ─── */
const PROJECT_TYPES = [
  {
    key: "web-app",
    label: "Web Application",
    description: "Full-stack web platforms & SaaS",
    icon: <Globe className="h-5 w-5" />,
    baseMin: 25000,
    baseMax: 80000,
  },
  {
    key: "mobile-app",
    label: "Mobile App",
    description: "iOS, Android & cross-platform",
    icon: <Smartphone className="h-5 w-5" />,
    baseMin: 30000,
    baseMax: 100000,
  },
  {
    key: "ai-ml",
    label: "AI/ML Solution",
    description: "Intelligent systems & automation",
    icon: <Brain className="h-5 w-5" />,
    baseMin: 40000,
    baseMax: 150000,
  },
  {
    key: "cloud",
    label: "Cloud Infrastructure",
    description: "Scalable architecture & DevOps",
    icon: <Cloud className="h-5 w-5" />,
    baseMin: 20000,
    baseMax: 60000,
  },
  {
    key: "ui-ux",
    label: "UI/UX Design",
    description: "Design systems & prototypes",
    icon: <Palette className="h-5 w-5" />,
    baseMin: 10000,
    baseMax: 40000,
  },
  {
    key: "consulting",
    label: "Consulting",
    description: "Strategy & technical guidance",
    icon: <MessageSquare className="h-5 w-5" />,
    baseMin: 5000,
    baseMax: 25000,
  },
];

const COMPLEXITY_LEVELS = [
  {
    key: "simple",
    label: "Simple",
    description: "MVP with core functionality, minimal integrations",
    multiplier: 0.6,
    barPercent: 33,
    timelineRange: "4–8 weeks",
  },
  {
    key: "moderate",
    label: "Moderate",
    description: "Full feature set, third-party integrations, polished UX",
    multiplier: 1.0,
    barPercent: 66,
    timelineRange: "2–4 months",
  },
  {
    key: "complex",
    label: "Complex",
    description: "Enterprise-grade, high-scale, advanced security & compliance",
    multiplier: 1.5,
    barPercent: 100,
    timelineRange: "4–8 months",
  },
];

const FEATURES = [
  {
    key: "auth",
    label: "User Authentication",
    icon: <Shield className="h-4 w-4" />,
    costMin: 3000,
    costMax: 8000,
  },
  {
    key: "payments",
    label: "Payment Processing",
    icon: <CreditCard className="h-4 w-4" />,
    costMin: 5000,
    costMax: 8000,
  },
  {
    key: "chat",
    label: "Real-time Chat",
    icon: <MessageSquare className="h-4 w-4" />,
    costMin: 4000,
    costMax: 7000,
  },
  {
    key: "analytics",
    label: "Analytics Dashboard",
    icon: <BarChart2 className="h-4 w-4" />,
    costMin: 3000,
    costMax: 6000,
  },
  {
    key: "admin",
    label: "Admin Panel",
    icon: <Settings className="h-4 w-4" />,
    costMin: 4000,
    costMax: 8000,
  },
  {
    key: "api",
    label: "API Integration",
    icon: <Zap className="h-4 w-4" />,
    costMin: 2000,
    costMax: 6000,
  },
  {
    key: "notifications",
    label: "Push Notifications",
    icon: <Bell className="h-4 w-4" />,
    costMin: 2000,
    costMax: 5000,
  },
  {
    key: "multilang",
    label: "Multi-language Support",
    icon: <Languages className="h-4 w-4" />,
    costMin: 3000,
    costMax: 7000,
  },
];

const TIMELINE_OPTIONS = [
  {
    key: "rush",
    label: "Rush",
    range: "2–4 weeks",
    multiplier: 1.4,
    description: "Expedited delivery with dedicated resources",
  },
  {
    key: "standard",
    label: "Standard",
    range: "1–3 months",
    multiplier: 1.0,
    description: "Normal pace, balanced quality & speed",
  },
  {
    key: "flexible",
    label: "Flexible",
    range: "3–6 months",
    multiplier: 0.85,
    description: "Extended timeline for cost optimization",
  },
  {
    key: "no-deadline",
    label: "No Deadline",
    range: "6+ months",
    multiplier: 0.75,
    description: "Maximum flexibility, best pricing",
  },
];

/* ─── Animated Counter Hook ─── */
function useAnimatedCounter(target, duration = 1200) {
  const [current, setCurrent] = useState(0);
  const prevTarget = useRef(0);

  useEffect(() => {
    const start = prevTarget.current;
    const diff = target - start;
    if (diff === 0) {
      const id = setTimeout(() => setCurrent(target), 0);
      return () => clearTimeout(id);
    }

    const startTime = performance.now();
    let rafId;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(start + diff * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    prevTarget.current = target;
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  return current;
}

/* ─── Format Currency ─── */
function formatCurrency(value) {
  if (value >= 1000) return `$${Math.round(value / 1000)}K`;
  return `$${value}`;
}

/* ─── Step Progress Indicator ─── */
function StepProgress({ currentStep, totalSteps }) {
  const stepLabels = ["Project Type", "Complexity", "Features", "Timeline"];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <motion.div
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-full text-xs font-bold font-[family-name:var(--font-inter)] transition-all duration-300 border-2",
                  i < currentStep
                    ? "bg-[#F97316] border-[#F97316] text-white"
                    : i === currentStep
                      ? "bg-transparent border-[#F97316] text-[#F97316] shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                      : "bg-transparent border-black/[0.12] text-[#A1A1AA]",
                )}
                animate={{
                  scale: i === currentStep ? 1.05 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
              </motion.div>
              <span
                className={cn(
                  "mt-2 text-[10px] font-[family-name:var(--font-inter)] font-medium text-center hidden sm:block",
                  i <= currentStep ? "text-[#F97316]" : "text-[#A1A1AA]",
                )}
              >
                {stepLabels[i]}
              </span>
            </div>
            {/* Connecting line */}
            {i < totalSteps - 1 && (
              <div className="flex-1 mx-2 h-[2px] rounded-full bg-black/[0.06] overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: i < currentStep ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Results Panel ─── */
function ResultsPanel({
  budgetMin,
  budgetMax,
  timelineWeeks,
  teamSize,
  costBreakdown,
  onGetQuote,
}) {
  const animatedMin = useAnimatedCounter(budgetMin);
  const animatedMax = useAnimatedCounter(budgetMax);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Budget range */}
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#A1A1AA] font-[family-name:var(--font-inter)] mb-3">
          Estimated Budget Range
        </p>
        <div className="flex items-baseline justify-center gap-2">
          <motion.span
            className="text-3xl md:text-4xl font-[family-name:var(--font-plus-jakarta)] font-bold text-[#F97316] tabular-nums"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {formatCurrency(animatedMin)}
          </motion.span>
          <span className="text-[#A1A1AA] text-xl font-[family-name:var(--font-inter)]">
            –
          </span>
          <motion.span
            className="text-3xl md:text-4xl font-[family-name:var(--font-plus-jakarta)] font-bold text-[#F97316] tabular-nums"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {formatCurrency(animatedMax)}
          </motion.span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-black/[0.06] bg-black/[0.03] p-4 text-center">
          <Clock className="h-5 w-5 text-[#F97316] mx-auto mb-2" />
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#A1A1AA] font-[family-name:var(--font-inter)]">
            Timeline
          </p>
          <p className="mt-1 text-[#18181B] font-[family-name:var(--font-plus-jakarta)] font-bold text-lg">
            {timelineWeeks}
          </p>
        </div>
        <div className="rounded-xl border border-black/[0.06] bg-black/[0.03] p-4 text-center">
          <Users className="h-5 w-5 text-[#F97316] mx-auto mb-2" />
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#A1A1AA] font-[family-name:var(--font-inter)]">
            Team Size
          </p>
          <p className="mt-1 text-[#18181B] font-[family-name:var(--font-plus-jakarta)] font-bold text-lg">
            {teamSize}
          </p>
        </div>
      </div>

      {/* Cost breakdown - Donut chart style */}
      <div className="rounded-xl border border-black/[0.06] bg-black/[0.03] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#A1A1AA] font-[family-name:var(--font-inter)] mb-4">
          Cost Allocation
        </p>
        <div className="flex items-center gap-6">
          {/* Visual donut indicator */}
          <div className="relative w-24 h-24 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {costBreakdown.reduce((acc, item, i) => {
                const offset = costBreakdown
                  .slice(0, i)
                  .reduce((sum, b) => sum + b.percent, 0);
                const circumference = 2 * Math.PI * 38;
                const strokeLength = (item.percent / 100) * circumference;
                acc.push(
                  <circle
                    key={item.label}
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="10"
                    strokeDasharray={`${strokeLength} ${circumference - strokeLength}`}
                    strokeDashoffset={-(offset / 100) * circumference}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />,
                );
                return acc;
              }, [])}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-[#F97316]" />
            </div>
          </div>
          {/* Legend */}
          <div className="flex-1 space-y-2">
            {costBreakdown.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-[#71717A] font-[family-name:var(--font-inter)] flex-1">
                  {item.label}
                </span>
                <span className="text-xs font-bold text-[#18181B] font-[family-name:var(--font-inter)] tabular-nums">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Get Detailed Quote button */}
      <motion.button
        onClick={onGetQuote}
        className="group w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#FB923C] px-6 py-4 text-white font-[family-name:var(--font-plus-jakarta)] font-bold text-sm uppercase tracking-[0.1em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-[1.02] cursor-pointer"
        whileTap={{ scale: 0.98 }}
      >
        <Sparkles className="h-4 w-4" />
        Get Detailed Quote
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
      </motion.button>

      <p className="text-center text-[10px] text-[#A1A1AA]/60 font-[family-name:var(--font-inter)]">
        Estimates are indicative. Final pricing depends on detailed requirements
        analysis.
      </p>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export function ProjectEstimator({ onNavigate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Estimator state
  const [projectType, setProjectType] = useState(null);
  const [complexity, setComplexity] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState(new Set());
  const [timeline, setTimeline] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 4;

  /* ─── Feature toggle ─── */
  const toggleFeature = useCallback((key) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  /* ─── Pricing calculation ─── */
  const estimate = useMemo(() => {
    if (!projectType || !complexity || !timeline) {
      return { min: 0, max: 0, timelineWeeks: "", teamSize: "", breakdown: [] };
    }

    const typeData = PROJECT_TYPES.find((t) => t.key === projectType);
    const complexityData = COMPLEXITY_LEVELS.find((c) => c.key === complexity);
    const timelineData = TIMELINE_OPTIONS.find((t) => t.key === timeline);

    // Base cost
    const baseMin = typeData.baseMin;
    const baseMax = typeData.baseMax;

    // Feature costs
    const featureMin = Array.from(selectedFeatures).reduce((sum, key) => {
      const f = FEATURES.find((feat) => feat.key === key);
      return sum + (f?.costMin ?? 0);
    }, 0);
    const featureMax = Array.from(selectedFeatures).reduce((sum, key) => {
      const f = FEATURES.find((feat) => feat.key === key);
      return sum + (f?.costMax ?? 0);
    }, 0);

    // Total before multipliers
    const rawMin = baseMin + featureMin;
    const rawMax = baseMax + featureMax;

    // Apply complexity and timeline multipliers
    const finalMin = Math.round(
      rawMin * complexityData.multiplier * timelineData.multiplier,
    );
    const finalMax = Math.round(
      rawMax * complexityData.multiplier * timelineData.multiplier,
    );

    // Timeline estimate
    const timelineWeeks = timelineData.range;

    // Team size
    const avgBudget = (finalMin + finalMax) / 2;
    let teamSize = "2–3";
    if (avgBudget > 200000) teamSize = "8–12";
    else if (avgBudget > 100000) teamSize = "5–8";
    else if (avgBudget > 50000) teamSize = "3–5";

    // Cost breakdown percentages
    const basePct = Math.round(
      ((baseMin + baseMax) / 2 / ((rawMin + rawMax) / 2)) * 100,
    );
    const featurePct =
      selectedFeatures.size > 0
        ? Math.round(
            ((featureMin + featureMax) / 2 / ((rawMin + rawMax) / 2)) * 100,
          )
        : 0;
    const rushPct =
      timelineData.multiplier > 1
        ? Math.round((timelineData.multiplier - 1) * 100)
        : 0;
    const remaining = 100 - basePct - featurePct - rushPct;
    const designPct = Math.max(0, Math.round(remaining * 0.4));
    const devOpsPct = Math.max(0, remaining - designPct);

    const breakdown = [
      { label: "Core Development", percent: basePct, color: "#F97316" },
      ...(featurePct > 0
        ? [{ label: "Feature Add-ons", percent: featurePct, color: "#FB923C" }]
        : []),
      ...(rushPct > 0
        ? [{ label: "Rush Premium", percent: rushPct, color: "#FF9F5C" }]
        : []),
      ...(designPct > 0
        ? [{ label: "Design & UX", percent: designPct, color: "#FFB380" }]
        : []),
      ...(devOpsPct > 0
        ? [{ label: "DevOps & QA", percent: devOpsPct, color: "#CC4A00" }]
        : []),
    ].filter((b) => b.percent > 0);

    return {
      min: finalMin,
      max: finalMax,
      timelineWeeks,
      teamSize,
      breakdown,
    };
  }, [projectType, complexity, selectedFeatures, timeline]);

  /* ─── Navigation ─── */
  const canGoNext = useMemo(() => {
    if (currentStep === 0) return projectType !== null;
    if (currentStep === 1) return complexity !== null;
    if (currentStep === 2) return true; // Features are optional
    if (currentStep === 3) return timeline !== null;
    return false;
  }, [currentStep, projectType, complexity, timeline]);

  const goNext = useCallback(() => {
    if (currentStep === totalSteps - 1 && canGoNext) {
      setShowResults(true);
      return;
    }
    if (canGoNext) {
      setDirection(1);
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  }, [currentStep, canGoNext]);

  const goBack = useCallback(() => {
    if (showResults) {
      setShowResults(false);
      return;
    }
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, [showResults]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setProjectType(null);
    setComplexity(null);
    setSelectedFeatures(new Set());
    setTimeline(null);
    setShowResults(false);
    setDirection(1);
  }, []);

  const handleGetQuote = useCallback(() => {
    if (onNavigate) {
      onNavigate("contact");
    }
    // Scroll to the form area
    const formElement = document.querySelector("[data-contact-form]");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [onNavigate]);

  /* ─── Slide transition variants ─── */
  const stepVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  return (
    <div className="relative">
      {/* Collapsed state - CTA button */}
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center py-10 md:py-14"
          >
            <motion.div
              className="relative mb-6"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#FB923C] shadow-lg shadow-[#F97316]/20">
                <Calculator className="h-7 w-7 text-white" />
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl border-2 border-[#F97316]/20 animate-pulse" />
            </motion.div>
            <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl md:text-2xl font-bold text-[#18181B] mb-2">
              Get an Instant Estimate
            </h3>
            <p className="text-[#A1A1AA] text-sm font-[family-name:var(--font-inter)] max-w-md mb-6">
              Answer 4 quick questions to get a ballpark budget and timeline for
              your project.
            </p>
            <motion.button
              onClick={() => setIsExpanded(true)}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#FB923C] px-6 py-3 text-white font-[family-name:var(--font-plus-jakarta)] font-bold text-sm uppercase tracking-[0.1em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-[1.02] cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Sparkles className="h-4 w-4" />
              Get Instant Estimate
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl border border-black/[0.08] bg-[#FAFAFA]/80 backdrop-blur-xl overflow-hidden"
          >
            {/* Gradient accent line at top */}
            <div className="h-[2px] bg-gradient-to-r from-[#F97316] via-[#FB923C] to-transparent" />

            {/* Dot grid background */}
            <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />

            <div className="relative z-10 p-5 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#F97316]/10 border border-[#F97316]/20">
                    <Calculator className="h-4 w-4 text-[#F97316]" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#18181B]">
                      Project Estimator
                    </h3>
                    <p className="text-[10px] font-[family-name:var(--font-inter)] text-[#A1A1AA]">
                      {showResults
                        ? "Your estimate is ready"
                        : `Step ${currentStep + 1} of ${totalSteps}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    handleReset();
                  }}
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-black/[0.08] text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-all duration-300 cursor-pointer"
                  aria-label="Close estimator"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Step progress */}
              {!showResults && (
                <StepProgress
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                />
              )}

              {/* Step content */}
              <div className="relative min-h-[320px]">
                <AnimatePresence mode="wait" custom={direction}>
                  {/* Step 1: Project Type */}
                  {currentStep === 0 && !showResults && (
                    <motion.div
                      key="step-type"
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="text-sm font-[family-name:var(--font-inter)] text-[#71717A] mb-5">
                        What kind of project are you looking to build?
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {PROJECT_TYPES.map((type) => (
                          <motion.button
                            key={type.key}
                            onClick={() => setProjectType(type.key)}
                            className={cn(
                              "group relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all duration-300 cursor-pointer",
                              projectType === type.key
                                ? "border-[#F97316] bg-[#F97316]/10 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                                : "border-black/[0.06] bg-black/[0.02] hover:border-black/[0.12] hover:bg-black/[0.04]",
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Accent indicator */}
                            {projectType === type.key && (
                              <motion.div
                                className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#F97316]"
                                layoutId="type-indicator"
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 25,
                                }}
                              />
                            )}
                            <div
                              className={cn(
                                "flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300",
                                projectType === type.key
                                  ? "bg-[#F97316] text-white"
                                  : "bg-black/[0.06] text-[#A1A1AA] group-hover:text-[#F97316]",
                              )}
                            >
                              {type.icon}
                            </div>
                            <div>
                              <p
                                className={cn(
                                  "font-[family-name:var(--font-plus-jakarta)] text-sm font-bold transition-colors duration-300",
                                  projectType === type.key
                                    ? "text-[#F97316]"
                                    : "text-[#18181B]",
                                )}
                              >
                                {type.label}
                              </p>
                              <p className="text-[11px] text-[#A1A1AA] font-[family-name:var(--font-inter)] mt-0.5">
                                {type.description}
                              </p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Complexity */}
                  {currentStep === 1 && !showResults && (
                    <motion.div
                      key="step-complexity"
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="text-sm font-[family-name:var(--font-inter)] text-[#71717A] mb-5">
                        How complex is your project?
                      </p>
                      <div className="space-y-3">
                        {COMPLEXITY_LEVELS.map((level) => (
                          <motion.button
                            key={level.key}
                            onClick={() => setComplexity(level.key)}
                            className={cn(
                              "group w-full flex items-center gap-4 rounded-xl border p-4 md:p-5 text-left transition-all duration-300 cursor-pointer",
                              complexity === level.key
                                ? "border-[#F97316] bg-[#F97316]/10 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                                : "border-black/[0.06] bg-black/[0.02] hover:border-black/[0.12] hover:bg-black/[0.04]",
                            )}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            {/* Bar chart indicator */}
                            <div className="flex items-end gap-[3px] h-8 shrink-0">
                              {Array.from({ length: 3 }, (_, i) => (
                                <motion.div
                                  key={i}
                                  className={cn(
                                    "w-2 rounded-full transition-all duration-500",
                                    complexity === level.key
                                      ? "bg-[#F97316]"
                                      : i < Math.ceil(level.barPercent / 33)
                                        ? "bg-[#A1A1AA]/40"
                                        : "bg-[#A1A1AA]/15",
                                  )}
                                  initial={{ height: 0 }}
                                  animate={{
                                    height: `${Math.max(20, (level.barPercent / 100) * 32 * ((i + 1) / 3))}px`,
                                  }}
                                  transition={{ delay: i * 0.1, duration: 0.4 }}
                                />
                              ))}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p
                                  className={cn(
                                    "font-[family-name:var(--font-plus-jakarta)] text-sm font-bold transition-colors duration-300",
                                    complexity === level.key
                                      ? "text-[#F97316]"
                                      : "text-[#18181B]",
                                  )}
                                >
                                  {level.label}
                                </p>
                                <span className="text-[11px] font-[family-name:var(--font-inter)] text-[#A1A1AA]">
                                  {level.timelineRange}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#A1A1AA] font-[family-name:var(--font-inter)] mt-0.5">
                                {level.description}
                              </p>
                            </div>
                            {/* Radio indicator */}
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all duration-300",
                                complexity === level.key
                                  ? "border-[#F97316] bg-[#F97316]"
                                  : "border-black/[0.12]",
                              )}
                            >
                              {complexity === level.key && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-2 h-2 rounded-full bg-[#FAFAFA]"
                                />
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Features */}
                  {currentStep === 2 && !showResults && (
                    <motion.div
                      key="step-features"
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-center justify-between mb-5">
                        <p className="text-sm font-[family-name:var(--font-inter)] text-[#71717A]">
                          Select features you need
                        </p>
                        <span className="text-[11px] font-[family-name:var(--font-inter)] text-[#A1A1AA]">
                          {selectedFeatures.size} selected · optional
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {FEATURES.map((feature) => {
                          const isSelected = selectedFeatures.has(feature.key);
                          return (
                            <motion.button
                              key={feature.key}
                              onClick={() => toggleFeature(feature.key)}
                              className={cn(
                                "group flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-300 cursor-pointer",
                                isSelected
                                  ? "border-[#F97316]/50 bg-[#F97316]/10"
                                  : "border-black/[0.06] bg-black/[0.02] hover:border-black/[0.12] hover:bg-black/[0.04]",
                              )}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {/* Checkbox */}
                              <div
                                className={cn(
                                  "flex items-center justify-center w-5 h-5 rounded border shrink-0 transition-all duration-300",
                                  isSelected
                                    ? "bg-[#F97316] border-[#F97316]"
                                    : "border-black/[0.15] group-hover:border-black/[0.3]",
                                )}
                              >
                                {isSelected && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </div>
                              {/* Icon */}
                              <div
                                className={cn(
                                  "flex items-center justify-center w-7 h-7 rounded-md transition-all duration-300 shrink-0",
                                  isSelected
                                    ? "bg-[#F97316]/20 text-[#F97316]"
                                    : "bg-black/[0.04] text-[#A1A1AA] group-hover:text-[#71717A]",
                                )}
                              >
                                {feature.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={cn(
                                    "text-xs font-[family-name:var(--font-inter)] font-semibold transition-colors duration-300",
                                    isSelected
                                      ? "text-[#18181B]"
                                      : "text-[#71717A]",
                                  )}
                                >
                                  {feature.label}
                                </p>
                                <p className="text-[10px] text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                                  +{formatCurrency(feature.costMin)}–
                                  {formatCurrency(feature.costMax)}
                                </p>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Timeline */}
                  {currentStep === 3 && !showResults && (
                    <motion.div
                      key="step-timeline"
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="text-sm font-[family-name:var(--font-inter)] text-[#71717A] mb-5">
                        How urgent is your project?
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {TIMELINE_OPTIONS.map((option) => (
                          <motion.button
                            key={option.key}
                            onClick={() => setTimeline(option.key)}
                            className={cn(
                              "group relative flex flex-col gap-2 rounded-xl border p-4 text-left transition-all duration-300 cursor-pointer",
                              timeline === option.key
                                ? "border-[#F97316] bg-[#F97316]/10 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                                : "border-black/[0.06] bg-black/[0.02] hover:border-black/[0.12] hover:bg-black/[0.04]",
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Urgency badge */}
                            {option.key === "rush" && (
                              <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider bg-[#F97316] text-white px-1.5 py-0.5 rounded font-[family-name:var(--font-inter)]">
                                +40%
                              </span>
                            )}
                            {option.key === "no-deadline" && (
                              <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded font-[family-name:var(--font-inter)]">
                                -25%
                              </span>
                            )}
                            {option.key === "flexible" && (
                              <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider bg-[#F97316]/20 text-[#F97316] px-1.5 py-0.5 rounded font-[family-name:var(--font-inter)]">
                                -15%
                              </span>
                            )}
                            <p
                              className={cn(
                                "font-[family-name:var(--font-plus-jakarta)] text-base font-bold transition-colors duration-300",
                                timeline === option.key
                                  ? "text-[#F97316]"
                                  : "text-[#18181B]",
                              )}
                            >
                              {option.label}
                            </p>
                            <p className="text-[#F97316] font-[family-name:var(--font-inter)] text-sm font-semibold">
                              {option.range}
                            </p>
                            <p className="text-[11px] text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                              {option.description}
                            </p>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Results */}
                  {showResults && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ResultsPanel
                        budgetMin={estimate.min}
                        budgetMax={estimate.max}
                        timelineWeeks={estimate.timelineWeeks}
                        teamSize={estimate.teamSize}
                        costBreakdown={estimate.breakdown}
                        onGetQuote={handleGetQuote}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation buttons */}
              {!showResults && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/[0.06]">
                  <button
                    onClick={goBack}
                    disabled={currentStep === 0}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-[family-name:var(--font-inter)] font-semibold transition-all duration-300 cursor-pointer",
                      currentStep === 0
                        ? "text-[#A1A1AA]/30 cursor-not-allowed"
                        : "text-[#71717A] hover:text-[#18181B] border border-black/[0.08] hover:border-black/[0.15]",
                    )}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    onClick={goNext}
                    disabled={!canGoNext}
                    className={cn(
                      "flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-[family-name:var(--font-inter)] font-bold transition-all duration-300 cursor-pointer",
                      canGoNext
                        ? "bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                        : "bg-black/[0.04] text-[#A1A1AA] cursor-not-allowed",
                    )}
                  >
                    {currentStep === totalSteps - 1 ? (
                      <>
                        <BarChart3 className="h-4 w-4" />
                        See Estimate
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Results - Back/Reset */}
              {showResults && (
                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-black/[0.06]">
                  <button
                    onClick={goBack}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-[family-name:var(--font-inter)] font-semibold text-[#71717A] border border-black/[0.08] hover:border-black/[0.15] hover:text-[#18181B] transition-all duration-300 cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Adjust
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-[family-name:var(--font-inter)] font-semibold text-[#71717A] border border-black/[0.08] hover:border-black/[0.15] hover:text-[#18181B] transition-all duration-300 cursor-pointer"
                  >
                    Start Over
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
