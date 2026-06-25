"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

// ─── Project Data ─────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "FinTrack Pro",
    category: "FinTech",
    description:
      "Real-time financial analytics platform processing 10M+ transactions daily with sub-100ms latency.",
    result: "40% faster load time",
    techStack: ["React", "Node.js", "PostgreSQL", "AWS"],
    image: "/images/projects/fintrack-pro.jpg",
    accentColor: "#F97316",
    accentGlow: "rgba(249, 115, 22, 0.15)",
    bgShift:
      "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(249, 115, 22, 0.08), transparent)",
    metric: "10M+",
    metricLabel: "Transactions / day",
  },
  {
    id: 2,
    title: "MedConnect",
    category: "HealthTech",
    description:
      "HIPAA-compliant telehealth platform connecting 50K+ patients with healthcare providers.",
    result: "3x patient engagement",
    techStack: ["Next.js", "Python", "MongoDB", "Azure"],
    image: "/images/projects/medconnect.jpg",
    accentColor: "#10B981",
    accentGlow: "rgba(16, 185, 129, 0.12)",
    bgShift:
      "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(16, 185, 129, 0.08), transparent)",
    metric: "50K+",
    metricLabel: "Active patients",
  },
  {
    id: 3,
    title: "EduSpark",
    category: "EdTech",
    description:
      "AI-powered adaptive learning platform serving 200K+ students across 15 countries.",
    result: "95% completion rate",
    techStack: ["React Native", "TensorFlow", "Node.js"],
    image: "/images/projects/eduspark.jpg",
    accentColor: "#A855F7",
    accentGlow: "rgba(168, 85, 247, 0.12)",
    bgShift:
      "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(168, 85, 247, 0.08), transparent)",
    metric: "200K+",
    metricLabel: "Students served",
  },
  {
    id: 4,
    title: "RetailOS",
    category: "Retail",
    description:
      "Omnichannel retail management system handling $2B+ annual transactions.",
    result: "2x revenue growth",
    techStack: ["Next.js", "Python", "Redis", "AWS"],
    image: "/images/projects/retailos.jpg",
    accentColor: "#F59E0B",
    accentGlow: "rgba(245, 158, 11, 0.12)",
    bgShift:
      "radial-gradient(ellipse 80% 60% at 40% 50%, rgba(245, 158, 11, 0.08), transparent)",
    metric: "$2B+",
    metricLabel: "Annual transactions",
  },
  {
    id: 5,
    title: "DataVault",
    category: "AI/ML",
    description:
      "Enterprise data governance platform with automated ML pipeline management.",
    result: "80% less manual work",
    techStack: ["React", "Python", "Kubernetes", "Snowflake"],
    image: "/images/projects/datavault.jpg",
    accentColor: "#F97316",
    accentGlow: "rgba(249, 115, 22, 0.15)",
    bgShift:
      "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(249, 115, 22, 0.12), transparent)",
    metric: "80%",
    metricLabel: "Automation rate",
  },
];

// ─── Reduced Motion Check ─────────────────────────────────────────────────
function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading initial media query value on mount
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

// ─── SceneProgress ────────────────────────────────────────────────────────
function SceneProgress({ activeIndex, progress }) {
  return (
    <div className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
      {PROJECTS.map((project, i) => (
        <div
          key={project.id}
          className="flex items-center gap-2 group/progress"
        >
          <span
            className="text-[9px] font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-[0.15em] transition-all duration-500 opacity-0 group-hover/progress:opacity-100 translate-x-2 group-hover/progress:translate-x-0 whitespace-nowrap"
            style={{
              color: i === activeIndex ? project.accentColor : "#A1A1AA",
            }}
          >
            {project.category}
          </span>
          <div className="relative flex items-center justify-center">
            <div
              className="rounded-full transition-all duration-700"
              style={{
                width: i === activeIndex ? "12px" : "6px",
                height: i === activeIndex ? "12px" : "6px",
                backgroundColor:
                  i === activeIndex
                    ? project.accentColor
                    : "rgba(255,255,255,0.15)",
                boxShadow:
                  i === activeIndex
                    ? `0 0 12px ${project.accentColor}40, 0 0 24px ${project.accentColor}20`
                    : "none",
              }}
            />
          </div>
        </div>
      ))}
      <div className="mt-3 w-[2px] h-20 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="w-full rounded-full transition-all duration-150"
          style={{
            height: `${progress * 100}%`,
            background: `linear-gradient(to bottom, ${PROJECTS[activeIndex].accentColor}, ${PROJECTS[activeIndex].accentColor}40)`,
          }}
        />
      </div>
    </div>
  );
}

// ─── BackgroundLayer ──────────────────────────────────────────────────────
function BackgroundLayer({ activeIndex }) {
  const project = PROJECTS[activeIndex];
  const { scrollY } = useScroll();
  const orb1Y = useTransform(scrollY, [0, 8000], [0, -300]);
  const orb2Y = useTransform(scrollY, [0, 8000], [0, -180]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 transition-all"
        style={{ background: project.bgShift, transitionDuration: "1.5s" }}
      />

      <motion.div
        className="absolute"
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: "700px",
          maxHeight: "700px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${project.accentGlow}, transparent 70%)`,
          top: "5%",
          left: "-15%",
          y: orb1Y,
          filter: "blur(100px)",
        }}
      />

      <motion.div
        className="absolute"
        style={{
          width: "35vw",
          height: "35vw",
          maxWidth: "500px",
          maxHeight: "500px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${project.accentGlow}, transparent 70%)`,
          bottom: "0%",
          right: "-10%",
          y: orb2Y,
          filter: "blur(80px)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, ${project.accentColor} 1px, transparent 1px),
                            radial-gradient(circle at 70% 60%, ${project.accentColor} 0.5px, transparent 0.5px),
                            radial-gradient(circle at 50% 80%, ${project.accentColor} 0.8px, transparent 0.8px)`,
          backgroundSize: "120px 120px, 160px 160px, 200px 200px",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}

// ─── ProjectScene (individual scene for each project) ─────────────────────
function ProjectScene({ project, index, isActive, direction }) {
  const imageRef = useRef(null);

  // GSAP image entrance animation
  useEffect(() => {
    if (!imageRef.current || !isActive) return;

    gsap.fromTo(
      imageRef.current,
      { xPercent: direction > 0 ? -25 : 25, opacity: 0, scale: 0.85 },
      { xPercent: 0, opacity: 1, scale: 1, duration: 1.0, ease: "power3.out" },
    );

    return () => {
      if (imageRef.current) {
        gsap.set(imageRef.current, { opacity: 0 });
      }
    };
  }, [isActive, direction]);

  return (
    <div
      className="absolute inset-0 flex items-center"
      style={{
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
        transition: "opacity 0.6s ease",
      }}
    >
      {/* MIDGROUND: Project info (left side) */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="inline-block text-[10px] font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-[0.2em] font-semibold"
              style={{ color: project.accentColor }}
            >
              {project.category}
            </span>
          </motion.div>

          <motion.h2
            className="font-[family-name:var(--font-plus-jakarta)] font-bold text-white leading-[0.92] mt-3"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 7rem)",
              letterSpacing: "-0.03em",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.title}
          </motion.h2>

          <motion.p
            className="mt-4 text-albos-muted text-sm md:text-base lg:text-lg max-w-md font-[family-name:var(--font-inter)] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 0.7, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.description}
          </motion.p>

          <motion.div
            className="mt-5 inline-flex items-center gap-2.5"
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: project.accentColor,
                boxShadow: `0 0 10px ${project.accentColor}60`,
              }}
            />

            <span className="text-sm font-semibold text-white/80 font-[family-name:var(--font-inter)]">
              {project.result}
            </span>
          </motion.div>
        </div>
      </div>

      {/* FOREGROUND: Project image (right side) — depth blur on transition */}
      <div
        ref={imageRef}
        className="absolute top-1/2 -translate-y-1/2 w-[65vw] md:w-[48vw] lg:w-[42vw] aspect-[4/3] pointer-events-none md:right-0 right-[2vw]"
        style={{
          opacity: 0,
          willChange: "transform",
          filter: isActive ? "blur(0px)" : "blur(8px)",
          transition: "filter 0.6s ease",
        }}
      >
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{
            boxShadow: `0 50px 120px -30px ${project.accentGlow}, 0 0 80px -20px ${project.accentGlow}`,
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, rgba(10,10,10,0.5) 0%, transparent 50%, ${project.accentColor}08 100%)`,
            }}
          />

          <div
            className="absolute inset-0 rounded-2xl"
            style={{ border: `1px solid ${project.accentColor}15` }}
          />

          {/* Shine sweep effect */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(105deg, transparent 40%, ${project.accentColor}10 45%, transparent 50%)`,
            }}
          />
        </div>
      </div>

      {/* FOREGROUND: Floating metric card */}
      <motion.div
        className="absolute top-[20%] right-[3%] md:right-[43%] z-20 pointer-events-none"
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={
          isActive
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 60, scale: 0.9 }
        }
        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="glass-card px-4 md:px-5 py-3 md:py-4 min-w-[120px] md:min-w-[140px]"
          style={{ animation: "floatCard1 6s ease-in-out infinite" }}
        >
          <div
            className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-plus-jakarta)] tabular-nums"
            style={{ color: project.accentColor }}
          >
            {project.metric}
          </div>
          <div className="text-[9px] md:text-[10px] text-albos-muted font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-[0.1em] mt-1">
            {project.metricLabel}
          </div>
        </div>
      </motion.div>

      {/* FOREGROUND: Tech stack card */}
      <motion.div
        className="absolute bottom-[18%] right-[3%] md:right-[46%] z-20 pointer-events-none"
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={
          isActive
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 60, scale: 0.9 }
        }
        transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="glass-card px-4 py-3"
          style={{ animation: "floatCard2 7s ease-in-out infinite" }}
        >
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md px-2 py-0.5 text-[9px] md:text-[10px] font-medium font-[family-name:var(--font-inter)]"
                style={{
                  background: `${project.accentColor}12`,
                  color: `${project.accentColor}CC`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main ProjectStorySection ─────────────────────────────────────────────
export function ProjectStorySection() {
  const sectionRef = useRef(null);
  const [activeScene, setActiveScene] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [prevScene, setPrevScene] = useState(0);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to active scene
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (prefersReduced) {
      setActiveScene(0);
      setSceneProgress(0);
      return;
    }

    const totalProjects = PROJECTS.length;
    const sceneSize = 1 / totalProjects;
    const sceneIndex = Math.min(
      Math.floor(latest / sceneSize),
      totalProjects - 1,
    );
    const withinScene = (latest - sceneIndex * sceneSize) / sceneSize;

    setActiveScene((prev) => {
      if (prev !== sceneIndex) {
        setPrevScene(prev);
      }
      return sceneIndex;
    });
    setSceneProgress(Math.min(1, Math.max(0, withinScene)));
  });

  const direction = activeScene >= prevScene ? 1 : -1;

  return (
    <section
      ref={sectionRef}
      className="relative bg-albos-dark"
      style={{ height: prefersReduced ? "auto" : "400vh" }}
    >
      {/* Sticky container using CSS sticky */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Section header - always visible */}
        <div className="absolute top-6 md:top-8 left-6 md:left-12 lg:left-20 z-30">
          <span className="mono-label">Selected Work</span>
          <h2 className="mt-2 font-[family-name:var(--font-plus-jakarta)] text-xl md:text-2xl lg:text-3xl font-bold text-albos-light leading-tight">
            Projects That Define Us
          </h2>
          <p className="mt-1.5 text-albos-muted text-xs md:text-sm max-w-[260px] font-[family-name:var(--font-inter)] hidden md:block">
            Real results from real partnerships. Scroll through our work.
          </p>
          {/* Accent separator line */}
          <div
            className="mt-3 h-[1px] w-16 transition-all duration-1000"
            style={{
              background: `linear-gradient(90deg, ${PROJECTS[activeScene].accentColor}, transparent)`,
            }}
          />
        </div>

        {/* Background layer */}
        <BackgroundLayer activeIndex={activeScene} />

        {/* Scene progress indicator */}
        <SceneProgress activeIndex={activeScene} progress={sceneProgress} />

        {/* Project scenes */}
        {PROJECTS.map((project, index) => (
          <ProjectScene
            key={project.id}
            project={project}
            index={index}
            isActive={activeScene === index}
            direction={direction}
          />
        ))}

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-albos-dark via-albos-dark/50 to-transparent z-20 pointer-events-none" />
        {/* Top gradient fade for header readability */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-albos-dark/80 to-transparent z-20 pointer-events-none" />

        {/* Cinematic scan line overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[5] opacity-[0.015]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* Left accent vertical line */}
        <div
          className="absolute left-3 md:left-8 lg:left-16 top-[15%] bottom-[15%] w-[1px] z-20 pointer-events-none transition-all duration-1000"
          style={{
            background: `linear-gradient(to bottom, transparent, ${PROJECTS[activeScene].accentColor}30, transparent)`,
          }}
        />

        {/* View All CTA - appears at end */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity:
              activeScene === PROJECTS.length - 1 && sceneProgress > 0.7
                ? 1
                : 0,
            y:
              activeScene === PROJECTS.length - 1 && sceneProgress > 0.7
                ? 0
                : 20,
          }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="/case-studies"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] backdrop-blur-md px-6 py-3 text-sm font-semibold text-albos-light font-[family-name:var(--font-inter)] transition-all duration-300 hover:border-albos-accent/40 hover:text-albos-accent hover:bg-albos-accent/[0.06]"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Noise overlay */}
        <div className="absolute inset-0 noise-texture pointer-events-none z-10" />

        {/* Scene counter - bottom left */}
        <div className="absolute bottom-8 left-6 md:left-12 lg:left-20 z-30 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {PROJECTS.map((_, i) => (
              <div
                key={i}
                className="h-[2px] rounded-full transition-all duration-500"
                style={{
                  width: i === activeScene ? "32px" : "12px",
                  backgroundColor:
                    i === activeScene
                      ? PROJECTS[i].accentColor
                      : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
          <span className="text-[10px] font-[family-name:var(--font-jetbrains-mono)] text-albos-muted tabular-nums">
            {String(activeScene + 1).padStart(2, "0")} /{" "}
            {String(PROJECTS.length).padStart(2, "0")}
          </span>
        </div>

        {/* Floating card animations - CSS keyframes */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes floatCard1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes floatCard2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes floatCard3 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
        `,
          }}
        />
      </div>

      {/* Fallback for reduced motion */}
      {prefersReduced && (
        <div className="py-20 px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <div key={project.id} className="glass-card p-6 rounded-2xl">
                <span className="mono-label">{project.category}</span>
                <h3 className="mt-2 font-[family-name:var(--font-plus-jakarta)] text-xl font-bold text-albos-light">
                  {project.title}
                </h3>
                <p className="mt-2 text-albos-muted text-sm">
                  {project.description}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: project.accentColor }}
                  />
                  <span className="text-sm font-semibold text-white/80">
                    {project.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
