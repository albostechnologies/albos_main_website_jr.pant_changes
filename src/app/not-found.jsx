"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowRight, Cpu, Zap } from "lucide-react";

/* ─── Floating Shape Component ────────────────────────────── */
function FloatingShape({ className, delay = 0, duration = 6 }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 180, 360],
        opacity: [0.15, 0.3, 0.15],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── Spark Component ─────────────────────────────────────── */
function Spark({ x, y, delay }) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={2}
      fill="#F97316"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

/* ─── Broken Circuit SVG ──────────────────────────────────── */
function BrokenCircuit() {
  return (
    <svg
      viewBox="0 0 300 200"
      className="w-full max-w-[300px] h-auto opacity-30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main circuit lines */}
      <motion.path
        d="M30 100 H120 L140 60 H200"
        stroke="#F97316"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />

      <motion.path
        d="M60 40 V100"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.path
        d="M200 60 V140 H250"
        stroke="#F97316"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          delay: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.path
        d="M140 60 V160 H80 L60 140"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.8,
          delay: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.path
        d="M250 140 H270"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Circuit nodes */}
      <circle
        cx="30"
        cy="100"
        r="4"
        fill="white"
        stroke="#F97316"
        strokeWidth="1.5"
      />
      <circle
        cx="60"
        cy="40"
        r="3"
        fill="white"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="1"
      />
      <circle
        cx="140"
        cy="60"
        r="4"
        fill="white"
        stroke="#F97316"
        strokeWidth="1.5"
      />
      <circle cx="200" cy="60" r="3" fill="#F97316" opacity="0.6" />
      <circle
        cx="250"
        cy="140"
        r="3"
        fill="white"
        stroke="#F97316"
        strokeWidth="1.5"
      />
      <circle
        cx="270"
        cy="140"
        r="3"
        fill="white"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="1"
      />

      {/* Broken line (the disconnect) */}
      <motion.line
        x1="120"
        y1="100"
        x2="120"
        y2="100"
        stroke="#F97316"
        strokeWidth="3"
        strokeLinecap="round"
        animate={{
          x1: [120, 125],
          x2: [120, 115],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Sparks */}
      <Spark x={120} y={95} delay={0} />
      <Spark x={125} y={105} delay={0.3} />
      <Spark x={115} y={100} delay={0.6} />
      <Spark x={122} y={92} delay={0.9} />
      <Spark x={118} y={108} delay={1.2} />

      {/* Small IC/chip shape */}
      <rect
        x="80"
        y="80"
        width="20"
        height="16"
        rx="2"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="1"
        fill="none"
      />
      <line
        x1="85"
        y1="80"
        x2="85"
        y2="76"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
      <line
        x1="90"
        y1="80"
        x2="90"
        y2="76"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
      <line
        x1="95"
        y1="80"
        x2="95"
        y2="76"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
      <line
        x1="85"
        y1="96"
        x2="85"
        y2="100"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
      <line
        x1="90"
        y1="96"
        x2="90"
        y2="100"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
      <line
        x1="95"
        y1="96"
        x2="95"
        y2="100"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
    </svg>
  );
}

/* ─── Corner Brackets Component ───────────────────────────── */
function CornerBrackets() {
  return (
    <>
      {/* Top-left bracket */}
      <motion.div
        className="absolute top-12 left-8 md:top-16 md:left-16"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="w-10 h-10 border-t-2 border-l-2 border-[#F97316]/30" />
      </motion.div>
      {/* Top-right bracket */}
      <motion.div
        className="absolute top-12 right-8 md:top-16 md:right-16"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="w-10 h-10 border-t-2 border-r-2 border-[#F97316]/30" />
      </motion.div>
      {/* Bottom-left bracket */}
      <motion.div
        className="absolute bottom-12 left-8 md:bottom-16 md:left-16"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="w-10 h-10 border-b-2 border-l-2 border-[#F97316]/30" />
      </motion.div>
      {/* Bottom-right bracket */}
      <motion.div
        className="absolute bottom-12 right-8 md:bottom-16 md:right-16"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="w-10 h-10 border-b-2 border-r-2 border-[#F97316]/30" />
      </motion.div>
    </>
  );
}

/* ─── Accent Dots Component ───────────────────────────────── */
function AccentDots() {
  const dots = [
    { x: "8%", y: "35%", size: 4, delay: 0 },
    { x: "12%", y: "65%", size: 3, delay: 0.5 },
    { x: "88%", y: "30%", size: 5, delay: 1 },
    { x: "92%", y: "70%", size: 3, delay: 1.5 },
    { x: "20%", y: "20%", size: 2, delay: 0.3 },
    { x: "80%", y: "80%", size: 2, delay: 0.8 },
  ];

  return (
    <>
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#F97316]"
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/* ─── Main 404 Page ───────────────────────────────────────── */
export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] px-6">
      {/* Grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.06)_0%,transparent_70%)]" />

      {/* Decorative corner brackets */}
      <CornerBrackets />

      {/* Accent dots */}
      <AccentDots />

      {/* Floating geometric shapes */}
      <FloatingShape
        className="absolute top-[15%] left-[10%] h-16 w-16 rounded-full border border-[#F97316]/20"
        delay={0}
        duration={7}
      />

      <FloatingShape
        className="absolute top-[20%] right-[15%] h-8 w-8 rotate-45 border border-black/10"
        delay={1}
        duration={5}
      />

      <FloatingShape
        className="absolute bottom-[25%] left-[20%] h-6 w-6 bg-[#F97316]/10"
        delay={2}
        duration={8}
      />

      <FloatingShape
        className="absolute bottom-[20%] right-[10%] h-20 w-20 rounded-full border border-black/[0.05]"
        delay={0.5}
        duration={9}
      />

      <FloatingShape
        className="absolute top-[60%] left-[5%] h-3 w-3 rounded-full bg-[#F97316]/20"
        delay={3}
        duration={4}
      />

      <FloatingShape
        className="absolute top-[10%] left-[50%] h-4 w-4 rotate-12 border border-[#F97316]/15"
        delay={1.5}
        duration={6}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Broken circuit illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <BrokenCircuit />
        </motion.div>

        {/* Glitch 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <h1
            className="glitch-text font-[family-name:var(--font-plus-jakarta)] text-[8rem] font-extrabold leading-none tracking-tighter sm:text-[10rem] md:text-[12rem]"
            data-text="404"
          >
            404
          </h1>
        </motion.div>

        {/* Accent line below 404 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-[2px] w-32 bg-gradient-to-r from-transparent via-[#F97316] to-transparent"
        />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#18181B] sm:text-3xl md:text-4xl"
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-4 max-w-md text-base text-[#71717A] sm:text-lg"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-[#F97316] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#EA580C] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] active:scale-95"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-black/[0.12] bg-transparent px-7 py-3.5 text-sm font-semibold text-[#18181B] transition-all hover:border-[#F97316]/50 hover:bg-black/[0.04] hover:text-[#F97316] active:scale-95"
          >
            Explore Our Services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Decorative accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-12 h-[1px] w-48 bg-gradient-to-r from-transparent via-[#F97316]/50 to-transparent"
        />

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-6 flex items-center gap-2 text-xs text-[#A1A1AA]"
          style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
        >
          <Cpu className="h-3 w-3" />
          <span>albos_tech::error</span>
          <Zap className="h-3 w-3 text-[#F97316]" />
          <span>404</span>
        </motion.p>
      </div>
    </div>
  );
}
