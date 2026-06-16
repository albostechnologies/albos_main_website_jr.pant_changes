"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  FlaskConical,
  Zap,
  Cpu,
  Globe,
  Smartphone,
  Star,
  GitFork,
  ExternalLink,
  Atom,
  Brain,
  Blocks,
  Wifi,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { TECH_STACK } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const tabKeys = ["web", "database", "cloud", "mobile"];

const tabIcons = {
  web: <Globe className="h-4 w-4" />,
  database: <Cpu className="h-4 w-4" />,
  cloud: <Zap className="h-4 w-4" />,
  mobile: <Smartphone className="h-4 w-4" />,
};

const CERTIFICATIONS = [
  { name: "AWS Partner", sub: "Advanced Consulting", color: "#FF9900" },
  { name: "Google Cloud Partner", sub: "Premier Tier", color: "#4285F4" },
  { name: "Azure Partner", sub: "Gold Certified", color: "#0078D4" },
  { name: "Kubernetes Certified", sub: "CKA & CKAD", color: "#326CE5" },
];

const RD_FOCUS = [
  {
    title: "AI/LLM Integration",
    description:
      "Building production-grade LLM pipelines with fine-tuning, RAG architectures, and multi-agent systems.",
    status: "In Production",
  },
  {
    title: "WebAssembly",
    description:
      "Exploring WASM for near-native performance in browser-based compute-heavy applications.",
    status: "Active Research",
  },
  {
    title: "Edge Computing",
    description:
      "Deploying serverless functions at the edge for sub-10ms response times globally.",
    status: "Active Research",
  },
  {
    title: "AR/VR Development",
    description:
      "Prototyping immersive interfaces for training, visualization, and remote collaboration.",
    status: "Exploring",
  },
];

/* Bar chart data: total devs per technology area */
const TEAM_BREAKDOWN = [
  { label: "Front-End", count: 44, color: "#F97316" },
  { label: "Back-End", count: 38, color: "#E0234E" },
  { label: "Mobile", count: 32, color: "#61DAFB" },
  { label: "AI/ML", count: 28, color: "#3776AB" },
  { label: "Cloud/DevOps", count: 24, color: "#FF9900" },
  { label: "Database", count: 30, color: "#4169E1" },
  { label: "Design", count: 18, color: "#06B6D4" },
];

const maxDevCount = Math.max(...TEAM_BREAKDOWN.map((d) => d.count));

const RADAR_ITEMS = [
  // Front-End
  {
    name: "React",
    quadrant: "Front-End",
    ring: "adopt",
    angle: 25,
    description: "Primary UI library — 44+ developers",
  },
  {
    name: "Next.js",
    quadrant: "Front-End",
    ring: "adopt",
    angle: 55,
    description: "Full-stack React framework for production",
  },
  {
    name: "TypeScript",
    quadrant: "Front-End",
    ring: "adopt",
    angle: 40,
    description: "Type-safe development across all projects",
  },
  {
    name: "Tailwind CSS",
    quadrant: "Front-End",
    ring: "adopt",
    angle: 70,
    description: "Utility-first CSS for rapid UI development",
  },
  {
    name: "Astro",
    quadrant: "Front-End",
    ring: "trial",
    angle: 30,
    description: "Content-focused sites with island architecture",
  },
  {
    name: "Framer Motion",
    quadrant: "Front-End",
    ring: "trial",
    angle: 65,
    description: "Production-grade motion library for React",
  },
  {
    name: "Qwik",
    quadrant: "Front-End",
    ring: "assess",
    angle: 45,
    description: "Resumability-based framework evaluation",
  },
  // Back-End
  {
    name: "Node.js",
    quadrant: "Back-End",
    ring: "adopt",
    angle: 115,
    description: "Primary runtime for microservices",
  },
  {
    name: "PostgreSQL",
    quadrant: "Back-End",
    ring: "adopt",
    angle: 140,
    description: "Relational database of choice",
  },
  {
    name: "GraphQL",
    quadrant: "Back-End",
    ring: "adopt",
    angle: 160,
    description: "API layer for complex data requirements",
  },
  {
    name: "NestJS",
    quadrant: "Back-End",
    ring: "trial",
    angle: 125,
    description: "Scalable server-side applications",
  },
  {
    name: "Rust",
    quadrant: "Back-End",
    ring: "assess",
    angle: 150,
    description: "High-performance systems programming",
  },
  {
    name: "Temporal",
    quadrant: "Back-End",
    ring: "assess",
    angle: 135,
    description: "Workflow orchestration evaluation",
  },
  // Cloud/DevOps
  {
    name: "AWS",
    quadrant: "Cloud/DevOps",
    ring: "adopt",
    angle: 205,
    description: "Primary cloud provider — Advanced Partner",
  },
  {
    name: "Kubernetes",
    quadrant: "Cloud/DevOps",
    ring: "adopt",
    angle: 230,
    description: "Container orchestration standard",
  },
  {
    name: "Terraform",
    quadrant: "Cloud/DevOps",
    ring: "adopt",
    angle: 250,
    description: "Infrastructure as Code across all projects",
  },
  {
    name: "Pulumi",
    quadrant: "Cloud/DevOps",
    ring: "trial",
    angle: 215,
    description: "TypeScript-based IaC exploration",
  },
  {
    name: "Crossplane",
    quadrant: "Cloud/DevOps",
    ring: "assess",
    angle: 240,
    description: "Cloud-native control plane evaluation",
  },
  // Mobile
  {
    name: "React Native",
    quadrant: "Mobile",
    ring: "adopt",
    angle: 295,
    description: "Cross-platform mobile — 32+ developers",
  },
  {
    name: "Swift",
    quadrant: "Mobile",
    ring: "adopt",
    angle: 320,
    description: "Native iOS development",
  },
  {
    name: "Kotlin",
    quadrant: "Mobile",
    ring: "adopt",
    angle: 340,
    description: "Native Android development",
  },
  {
    name: "Flutter",
    quadrant: "Mobile",
    ring: "trial",
    angle: 305,
    description: "Dart-based cross-platform exploration",
  },
  {
    name: "Expo",
    quadrant: "Mobile",
    ring: "trial",
    angle: 330,
    description: "Simplified React Native development",
  },
];

const RADAR_SIZE = 420;
const RADAR_CENTER = RADAR_SIZE / 2;
const RADAR_RADII = {
  adopt: RADAR_SIZE * 0.2,
  trial: RADAR_SIZE * 0.34,
  assess: RADAR_SIZE * 0.47,
};
const QUADRANT_COLORS = {
  "Front-End": "#F97316",
  "Back-End": "#61DAFB",
  "Cloud/DevOps": "#FF9900",
  Mobile: "#3B82F6",
};

/* ─── Open Source Data ─── */
const OPEN_SOURCE_PROJECTS = [
  {
    name: "albos-ui",
    description:
      "Production-grade React component library with 50+ accessible components built on Radix UI.",
    stars: 2847,
    language: "TypeScript",
    languageColor: "#3178C6",
    href: "https://github.com/albos/albos-ui",
  },
  {
    name: "edge-cache",
    description:
      "Lightweight CDN-edge caching layer with smart invalidation and stale-while-revalidate support.",
    stars: 1523,
    language: "Rust",
    languageColor: "#DEA584",
    href: "https://github.com/albos/edge-cache",
  },
  {
    name: "react-scan",
    description:
      "Performance profiling toolkit that visualizes React component renders in real-time.",
    stars: 4210,
    language: "TypeScript",
    languageColor: "#3178C6",
    href: "https://github.com/albos/react-scan",
  },
  {
    name: "k8s-deployer",
    description:
      "Zero-downtime Kubernetes deployment CLI with canary and blue-green strategy support.",
    stars: 982,
    language: "Go",
    languageColor: "#00ADD8",
    href: "https://github.com/albos/k8s-deployer",
  },
  {
    name: "llm-gateway",
    description:
      "Unified API gateway for OpenAI, Anthropic, and local LLMs with rate limiting and caching.",
    stars: 3156,
    language: "Python",
    languageColor: "#3572A5",
    href: "https://github.com/albos/llm-gateway",
  },
  {
    name: "design-tokens",
    description:
      "Universal design token system that syncs Figma variables to CSS, Tailwind, and React Native.",
    stars: 1204,
    language: "TypeScript",
    languageColor: "#3178C6",
    href: "https://github.com/albos/design-tokens",
  },
];

/* ─── Innovation Lab Data ─── */
const INNOVATION_LAB = [
  {
    title: "Quantum Computing",
    description:
      "Researching quantum algorithms for optimization problems, cryptography, and drug discovery simulations.",
    icon: Atom,
    color: "#A855F7",
  },
  {
    title: "Edge AI",
    description:
      "Deploying lightweight ML models on edge devices for real-time inference without cloud dependency.",
    icon: Brain,
    color: "#22C55E",
  },
  {
    title: "Web3 & Decentralization",
    description:
      "Exploring decentralized identity, smart contracts, and token-gated experiences for enterprise.",
    icon: Blocks,
    color: "#F59E0B",
  },
  {
    title: "Ambient Computing",
    description:
      "Building invisible interfaces — voice, gesture, and context-aware systems that adapt to users.",
    icon: Wifi,
    color: "#3B82F6",
  },
  {
    title: "Generative Design",
    description:
      "AI-assisted UI/UX generation that creates responsive layouts from natural language descriptions.",
    icon: Sparkles,
    color: "#F97316",
  },
  {
    title: "Autonomous Agents",
    description:
      "Multi-agent systems that orchestrate complex workflows with minimal human intervention.",
    icon: FlaskConical,
    color: "#EF4444",
  },
];

/* ─── Stagger Variants ─── */
const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
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

/* ─── GlitchText ─── */
function GlitchText({ children, className }) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 z-0 text-[#F97316]/70"
        aria-hidden
        style={{
          clipPath: "inset(0 0 65% 0)",
          transform: "translate(-2px, -1px)",
        }}
      >
        {children}
      </span>
      <span
        className="absolute inset-0 z-0 text-[#00d4ff]/50"
        aria-hidden
        style={{
          clipPath: "inset(65% 0 0 0)",
          transform: "translate(2px, 1px)",
        }}
      >
        {children}
      </span>
    </span>
  );
}

/* ─── Code Lines Background ─── */
function CodeLinesBackground() {
  const lines = [
    "const server = express();",
    "await db.connect(config);",
    'app.use(cors({ origin: "*" }));',
    "const pipeline = new MLPipeline();",
    "docker.compose.up({ services });",
    "kubectl.apply({ manifest });",
    "export default async function handler() {}",
    "const redis = new Redis(cluster);",
    "tf.model({ layers: [...] });",
    "aws.s3.upload({ Bucket, Key });",
  ];

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden
    >
      <div className="absolute inset-0 opacity-[0.025] font-[family-name:var(--font-jetbrains-mono)] text-[10px] md:text-xs leading-relaxed text-[#18181B] whitespace-pre">
        <div className="animate-[codeScroll_60s_linear_infinite]">
          {Array.from({ length: 6 }).map((_, setIdx) => (
            <div key={setIdx}>
              {lines.map((line, i) => (
                <div key={i} className="px-6 leading-7">
                  <span className="text-[#A1A1AA]/60 mr-4 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {line}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Tech Icon Card (Bracket Style) ─── */
function TechCard({ name, color }) {
  const [isHovered, setIsHovered] = useState(false);
  const bracketName = `[${name.toUpperCase().replace(/\./g, ".")}]`;

  return (
    <motion.div
      variants={gridItemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors duration-300 cursor-default card-hover-lift border-glow",
        isHovered
          ? "border-[#F97316]/30 bg-[#F97316]/[0.08]"
          : "border-black/[0.06] bg-black/[0.02]",
      )}
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0" style={{ color }}>
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
            transform: isHovered ? "scale(1.4)" : "scale(1)",
          }}
        />
      </span>
      <span
        className={cn(
          "text-sm font-medium font-[family-name:var(--font-jetbrains-mono)] transition-all duration-300",
          isHovered ? "text-[#18181B]" : "text-[#18181B]/50",
        )}
      >
        {isHovered ? name : bracketName}
      </span>
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

/* ─── Bar Chart Row (Enhanced) ─── */
function BarChartRow({ label, count, color, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const widthPercent = (count / maxDevCount) * 100;
  const percentLabel = Math.round((count / maxDevCount) * 100);

  return (
    <div ref={ref} className="flex items-center gap-4 md:gap-6 group">
      <span className="w-24 md:w-32 text-right text-xs md:text-sm font-[family-name:var(--font-jetbrains-mono)] text-[#A1A1AA] shrink-0 group-hover:text-[#18181B]/70 transition-colors duration-300">
        {label}
      </span>
      <div className="flex-1 relative h-8 md:h-9 bg-black/[0.03] rounded-lg overflow-hidden">
        {/* Gridlines */}
        {[25, 50, 75].map((pct) => (
          <div
            key={pct}
            className="absolute top-0 bottom-0 w-px bg-black/[0.04]"
            style={{ left: `${pct}%` }}
          />
        ))}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-lg bg-gradient-to-r from-[#F97316] to-[#FB923C]"
          style={{ originX: 0 }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: widthPercent / 100 } : { scaleX: 0 }}
          transition={{
            duration: 1.2,
            delay: delay * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Percentage label at end of bar */}
        <motion.span
          className="absolute top-1/2 -translate-y-1/2 text-[10px] font-bold font-[family-name:var(--font-jetbrains-mono)] text-[#18181B]/80"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.4, delay: delay * 0.1 + 0.8 }}
          style={{
            left: `${widthPercent}%`,
            marginLeft: "8px",
          }}
        >
          {percentLabel}%
        </motion.span>
        {/* Count label */}
        <motion.span
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold font-[family-name:var(--font-plus-jakarta)] text-[#18181B]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: delay * 0.1 + 0.6 }}
        >
          {count}
        </motion.span>
      </div>
    </div>
  );
}

/* ─── Certification Badge Card ─── */
function CertBadge({ name, sub, color }) {
  return (
    <div className="group relative flex flex-col items-center justify-center rounded-xl border border-black/[0.06] bg-black/[0.02] p-6 md:p-8 text-center hover:border-black/[0.12] hover:bg-black/[0.04] transition-all duration-500">
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-500 group-hover:scale-110"
        style={{ borderColor: color, backgroundColor: `${color}10` }}
      >
        <Award className="h-6 w-6" style={{ color }} />
      </div>
      <h4 className="font-[family-name:var(--font-plus-jakarta)] text-sm md:text-base font-bold text-[#18181B]">
        {name}
      </h4>
      <p className="mt-1 text-[11px] text-[#A1A1AA] font-[family-name:var(--font-inter)]">
        {sub}
      </p>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

/* ─── R&D Focus Card ─── */
function RDFocusCard({ title, description, status }) {
  const statusConfig = {
    "In Production": {
      bg: "bg-green-500/10",
      text: "text-green-400",
      dot: "bg-green-400",
    },
    "Active Research": {
      bg: "bg-[#F97316]/10",
      text: "text-[#F97316]",
      dot: "bg-[#F97316]",
    },
    Exploring: {
      bg: "bg-blue-400/10",
      text: "text-blue-400",
      dot: "bg-blue-400",
    },
  };

  const config = statusConfig[status];

  return (
    <div className="group relative rounded-xl border border-black/[0.06] bg-black/[0.02] p-6 md:p-7 hover:border-black/[0.12] hover:bg-black/[0.04] transition-all duration-500">
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4",
          config.bg,
        )}
      >
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full animate-ping opacity-40",
              config.dot,
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-2 w-2 rounded-full",
              config.dot,
            )}
          />
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.1em] font-[family-name:var(--font-inter)]",
            config.text,
          )}
        >
          {status}
        </span>
      </div>
      <h4 className="font-[family-name:var(--font-plus-jakarta)] text-lg md:text-xl font-bold text-[#18181B] group-hover:text-[#F97316] transition-colors duration-300">
        {title}
      </h4>
      <p className="mt-2 text-sm text-[#A1A1AA] font-[family-name:var(--font-inter)] leading-relaxed">
        {description}
      </p>
      <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-[#F97316]/0 via-[#F97316]/30 to-[#F97316]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

/* ─── Tech Radar Component ─── */
function TechRadar() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const quadrantLabels = [
    {
      label: "Front-End",
      x: RADAR_CENTER + RADAR_SIZE * 0.27,
      y: RADAR_CENTER - RADAR_SIZE * 0.27,
    },
    {
      label: "Back-End",
      x: RADAR_CENTER - RADAR_SIZE * 0.27,
      y: RADAR_CENTER - RADAR_SIZE * 0.27,
    },
    {
      label: "Cloud/DevOps",
      x: RADAR_CENTER - RADAR_SIZE * 0.27,
      y: RADAR_CENTER + RADAR_SIZE * 0.27,
    },
    {
      label: "Mobile",
      x: RADAR_CENTER + RADAR_SIZE * 0.27,
      y: RADAR_CENTER + RADAR_SIZE * 0.27,
    },
  ];

  const getRadialPos = useCallback((item) => {
    const ringRadius = RADAR_RADII[item.ring];
    const rad = (item.angle * Math.PI) / 180;
    return {
      x: RADAR_CENTER + ringRadius * Math.cos(rad),
      y: RADAR_CENTER + ringRadius * Math.sin(rad),
    };
  }, []);

  const handleItemHover = useCallback(
    (item, e) => {
      setHoveredItem(item);
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const pos = getRadialPos(item);
        const scale = rect.width / RADAR_SIZE;
        setTooltipPos({
          x: rect.left + pos.x * scale,
          y: rect.top + pos.y * scale,
        });
      }
    },
    [getRadialPos],
  );

  return (
    <div ref={containerRef} className="relative">
      <div className="flex justify-center">
        <motion.svg
          ref={svgRef}
          viewBox={`0 0 ${RADAR_SIZE} ${RADAR_SIZE}`}
          className="w-full max-w-[420px] md:max-w-[500px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Rings */}
          {["adopt", "trial", "assess"].map((ring, i) => (
            <motion.circle
              key={ring}
              cx={RADAR_CENTER}
              cy={RADAR_CENTER}
              r={RADAR_RADII[ring]}
              fill="none"
              stroke="rgba(0,0,0,0.06)"
              strokeWidth={1}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
              }
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: `${RADAR_CENTER}px ${RADAR_CENTER}px` }}
            />
          ))}

          {/* Cross lines */}
          <line
            x1={RADAR_CENTER}
            y1={20}
            x2={RADAR_CENTER}
            y2={RADAR_SIZE - 20}
            stroke="rgba(0,0,0,0.04)"
            strokeWidth={1}
          />
          <line
            x1={20}
            y1={RADAR_CENTER}
            x2={RADAR_SIZE - 20}
            y2={RADAR_CENTER}
            stroke="rgba(0,0,0,0.04)"
            strokeWidth={1}
          />

          {/* Ring labels */}
          {["adopt", "trial", "assess"].map((ring) => (
            <text
              key={ring}
              x={RADAR_CENTER + 6}
              y={RADAR_CENTER - RADAR_RADII[ring] + 14}
              className="fill-[#A1A1AA] text-[9px] uppercase tracking-[0.15em] font-[family-name:var(--font-jetbrains-mono)]"
            >
              {ring}
            </text>
          ))}

          {/* Quadrant labels */}
          {quadrantLabels.map((q) => (
            <text
              key={q.label}
              x={q.x}
              y={q.y}
              textAnchor="middle"
              className="fill-[#A1A1AA]/60 text-[11px] font-semibold font-[family-name:var(--font-plus-jakarta)] uppercase tracking-[0.08em]"
            >
              {q.label}
            </text>
          ))}

          {/* Tech items */}
          {RADAR_ITEMS.map((item, i) => {
            const pos = getRadialPos(item);
            const color = QUADRANT_COLORS[item.quadrant];
            return (
              <motion.g
                key={item.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.3, delay: 0.5 + i * 0.03 }}
                onMouseEnter={(e) => handleItemHover(item, e)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={6}
                  fill={color}
                  opacity={hoveredItem?.name === item.name ? 1 : 0.7}
                  className="transition-opacity duration-200"
                />

                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={12}
                  fill={color}
                  opacity={hoveredItem?.name === item.name ? 0.2 : 0}
                  className="transition-opacity duration-200"
                />

                <text
                  x={pos.x}
                  y={pos.y - 10}
                  textAnchor="middle"
                  className="fill-[#18181B]/70 text-[7.5px] font-[family-name:var(--font-jetbrains-mono)] pointer-events-none"
                >
                  {item.name}
                </text>
              </motion.g>
            );
          })}
        </motion.svg>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 pointer-events-none rounded-xl border border-black/[0.08] bg-[#FFFFFF]/95 backdrop-blur-md px-4 py-3 shadow-xl"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y - 70,
              transform: "translateX(-50%)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: QUADRANT_COLORS[hoveredItem.quadrant],
                }}
              />
              <span className="text-xs font-bold font-[family-name:var(--font-plus-jakarta)] text-[#18181B]">
                {hoveredItem.name}
              </span>
            </div>
            <span className="inline-block rounded-full bg-black/[0.06] px-2 py-0.5 text-[9px] text-[#F97316] font-[family-name:var(--font-inter)] uppercase tracking-wider mb-1">
              {hoveredItem.ring}
            </span>
            <p className="text-[11px] text-[#71717A] font-[family-name:var(--font-inter)] leading-relaxed max-w-[200px]">
              {hoveredItem.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6">
        {Object.entries(QUADRANT_COLORS).map(([label, color]) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-[11px] text-[#A1A1AA] font-[family-name:var(--font-inter)]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Animated Star Counter ─── */
function AnimatedStarCount({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

/* ─── Open Source Card ─── */
function OpenSourceCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex flex-col rounded-xl border p-5 md:p-6 transition-all duration-500 cursor-pointer",
        isHovered
          ? "border-[#F97316]/30 bg-[#F97316]/[0.06] shadow-[0_0_30px_rgba(249,115,22,0.08)]"
          : "border-black/[0.06] bg-black/[0.02] hover:border-black/[0.12]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-black/[0.04] border border-black/[0.06] flex items-center justify-center">
            <GitFork className="h-4 w-4 text-[#71717A]" />
          </div>
          <h4 className="font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold text-[#18181B] group-hover:text-[#F97316] transition-colors duration-300">
            {project.name}
          </h4>
        </div>
        <ExternalLink className="h-3.5 w-3.5 text-[#A1A1AA] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Description */}
      <p className="text-[13px] text-[#A1A1AA] font-[family-name:var(--font-inter)] leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-[12px] text-[#71717A] font-[family-name:var(--font-inter)]">
          <Star className="h-3.5 w-3.5 fill-[#F97316] text-[#F97316]" />
          <AnimatedStarCount target={project.stars} />
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-[#71717A] font-[family-name:var(--font-inter)]">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: project.languageColor }}
          />
          {project.language}
        </div>
      </div>

      {/* Glow border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(249, 115, 22, 0.15), 0 0 20px rgba(249, 115, 22, 0.06)",
        }}
      />
    </motion.a>
  );
}

/* ─── Innovation Lab Card ─── */
function InnovationLabCard({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.div
      className="group relative rounded-xl p-[1px] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${item.color}40, transparent 50%, ${item.color}20)`,
        }}
      />

      {/* Card content */}
      <div className="relative rounded-xl bg-[#FAFAFA] border border-black/[0.06] group-hover:border-transparent p-6 md:p-7 transition-all duration-500">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl border border-black/[0.06] flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:border-transparent"
          style={{ backgroundColor: `${item.color}10` }}
        >
          <Icon className="h-5 w-5" style={{ color: item.color }} />
        </div>

        <h4 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#18181B] group-hover:text-[#F97316] transition-colors duration-300 mb-2">
          {item.title}
        </h4>
        <p className="text-sm text-[#A1A1AA] font-[family-name:var(--font-inter)] leading-relaxed mb-4">
          {item.description}
        </p>
        <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#F97316] font-[family-name:var(--font-inter)] group-hover:gap-2 transition-all duration-300">
          Explore
          <ChevronRight className="h-3 w-3" />
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export function TechnologiesFullSection() {
  const [activeTab, setActiveTab] = useState("web");
  const activeData = TECH_STACK[activeTab];
  const chartSectionRef = useRef(null);
  const chartInView = useInView(chartSectionRef, {
    once: true,
    margin: "-60px",
  });

  return (
    <section
      id="technologies-full"
      className="relative bg-[#FAFAFA] overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />

      {/* Dot-grid background pattern */}
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

      {/* Animated code lines background */}
      <CodeLinesBackground />

      {/* ─── Hero ─── */}
      <div className="relative z-10 pt-28 md:pt-36 lg:pt-44 pb-12 md:pb-16">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
              <div>
                <SectionLabel label="Our Stack" />
                <h1 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#18181B] leading-[1.05] tracking-tight">
                  Technology{" "}
                  <GlitchText className="typing-cursor">Stack</GlitchText>
                </h1>
              </div>
              <MagneticButton strength={0.2}>
                <a
                  href="/contact"
                  className="group/link inline-flex items-center gap-2 rounded-full border-2 border-[#F97316]/50 px-6 py-3 text-sm font-semibold text-[#F97316] font-[family-name:var(--font-inter)] transition-all duration-300 hover:bg-[#F97316]/10 hover:border-[#F97316] hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
                >
                  Discover More
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ─── Tech Radar ─── */}
      <div className="relative z-10 py-16 md:py-20">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-10 md:mb-14">
            <SectionLabel label="Technology Radar" />
            <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-[#18181B]">
              What We Use &amp; Explore
            </h2>
            <p className="mt-3 text-[#A1A1AA] text-sm md:text-base font-[family-name:var(--font-inter)] max-w-xl">
              Our technology radar maps tools and frameworks by adoption stage —
              from proven production tools in the center to emerging
              technologies on the outer ring.
            </p>
          </ScrollReveal>

          <TechRadar />
        </div>
      </div>

      {/* ─── Platform Navigation ─── */}
      <div className="relative z-10 pb-8">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex gap-1 border-b border-black/[0.06] overflow-x-auto scrollbar-hide">
              {tabKeys.map((key) => {
                const isActive = key === activeTab;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={cn(
                      "relative flex items-center gap-2 px-5 md:px-6 py-3 text-sm font-semibold font-[family-name:var(--font-inter)] transition-colors duration-300 whitespace-nowrap",
                      isActive
                        ? "text-[#F97316]"
                        : "text-[#A1A1AA] hover:text-[#18181B]/70",
                    )}
                  >
                    {tabIcons[key]}
                    {TECH_STACK[key].label}
                    {isActive && (
                      <motion.div
                        layoutId="techTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F97316] rounded-full"
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ─── Tech Grid ─── */}
      <div className="relative z-10 pb-16 md:pb-20">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
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
                  <div className="flex items-center gap-3 mb-5">
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#18181B]">
                      {category.name}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-black/[0.05] border border-black/[0.08] px-2.5 py-0.5 text-[10px] font-semibold text-[#A1A1AA] font-[family-name:var(--font-jetbrains-mono)]">
                      {category.devCount} Developers
                    </span>
                  </div>
                  <motion.div
                    variants={gridContainerVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                  >
                    {category.techs.map((tech) => (
                      <TechCard
                        key={tech.name}
                        name={tech.name}
                        color={tech.color}
                      />
                    ))}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ─── Team Breakdown (Enhanced) ─── */}
      <div
        ref={chartSectionRef}
        className="relative z-10 py-16 md:py-20 bg-[#FAFAFA]"
      >
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
        {/* Subtle gradient background behind chart */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] rounded-full opacity-[0.03]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(249,115,22,0.15), transparent 70%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20 relative z-10">
          <ScrollReveal direction="up" className="mb-10 md:mb-14">
            <SectionLabel label="Our Developers" />
            <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-[#18181B]">
              Team by the Numbers
            </h2>
            <p className="mt-2 text-[#A1A1AA] text-sm font-[family-name:var(--font-inter)]">
              2024 · {TEAM_BREAKDOWN.reduce((sum, d) => sum + d.count, 0)}{" "}
              engineers across 7 disciplines
            </p>
          </ScrollReveal>

          {/* Year labels + gridlines */}
          <div className="space-y-3 md:space-y-4">
            {TEAM_BREAKDOWN.map((item, i) => (
              <BarChartRow
                key={item.label}
                label={item.label}
                count={item.count}
                color={item.color}
                delay={i}
              />
            ))}
          </div>

          {/* Scale indicator */}
          <motion.div
            className="mt-6 flex items-center justify-end gap-4 text-[10px] text-[#A1A1AA]/60 font-[family-name:var(--font-jetbrains-mono)]"
            initial={{ opacity: 0 }}
            animate={chartInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.5 }}
          >
            <span>0</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </motion.div>
        </div>
      </div>

      {/* ─── Open Source Contributions ─── */}
      <div className="relative z-10 py-16 md:py-20">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-10 md:mb-14">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <SectionLabel label="Open Source" />
                <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-[#18181B]">
                  Our Contributions
                </h2>
                <p className="mt-2 text-[#A1A1AA] text-sm md:text-base font-[family-name:var(--font-inter)] max-w-lg">
                  We build in the open. Our open source projects are used by
                  thousands of developers worldwide.
                </p>
              </div>
              <a
                href="https://github.com/albos"
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 text-[#F97316] font-[family-name:var(--font-inter)] text-sm font-semibold transition-colors duration-300 hover:text-[#EA580C] shrink-0"
              >
                View on GitHub
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {OPEN_SOURCE_PROJECTS.map((project, i) => (
              <OpenSourceCard key={project.name} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ─── Certifications ─── */}
      <div className="relative z-10 py-16 md:py-20">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-10 md:mb-14">
            <SectionLabel label="Certifications" />
            <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-[#18181B]">
              Official Partners
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <ScrollReveal key={cert.name} direction="up" delay={i * 0.08}>
                <CertBadge name={cert.name} sub={cert.sub} color={cert.color} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Innovation Lab ─── */}
      <div className="relative z-10 py-16 md:py-20 bg-[#FAFAFA]">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20 relative z-10">
          <ScrollReveal direction="up" className="mb-10 md:mb-14">
            <SectionLabel label="Innovation Lab" />
            <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-[#18181B]">
              Future-Proofing Our Stack
            </h2>
            <p className="mt-2 text-[#A1A1AA] text-sm md:text-base font-[family-name:var(--font-inter)] max-w-lg">
              Our R&amp;D team dedicates 20% of their time to exploring
              next-generation technologies that will shape the next decade of
              software.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {INNOVATION_LAB.map((item, i) => (
              <InnovationLabCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ─── R&D Focus ─── */}
      <div className="relative z-10 py-16 md:py-20 bg-[#FAFAFA]">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-10 md:mb-14">
            <SectionLabel label="What We're Exploring" />
            <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-[#18181B]">
              R&amp;D Focus Areas
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {RD_FOCUS.map((item, i) => (
              <ScrollReveal key={item.title} direction="up" delay={i * 0.08}>
                <RDFocusCard
                  title={item.title}
                  description={item.description}
                  status={item.status}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CTA ─── */}
      <div className="relative z-10 py-16 md:py-20">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20 text-center">
          <ScrollReveal direction="up">
            <p className="text-[#A1A1AA] text-base md:text-lg font-[family-name:var(--font-inter)] mb-4">
              Want to know if we work with your stack?
            </p>
            <a
              href="/contact"
              className="group/link inline-flex items-center gap-2 text-[#F97316] font-[family-name:var(--font-inter)] text-lg md:text-xl font-semibold transition-colors duration-300 hover:text-[#EA580C]"
            >
              Let&apos;s Talk
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </ScrollReveal>
        </div>
      </div>

      {/* ─── CSS for Code Scroll Animation & Typing Effect ─── */}
      <style jsx>{`
        @keyframes codeScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes typingCursor {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .typing-cursor::after {
          content: "█";
          animation: typingCursor 1s step-end infinite;
          color: #f97316;
          margin-left: 2px;
        }
      `}</style>
    </section>
  );
}
