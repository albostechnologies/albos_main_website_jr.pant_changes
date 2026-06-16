"use client";

import { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { LiveChatWidget } from "@/components/ui/LiveChatWidget";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { PageTransition } from "@/components/ui/PageTransition";
import { LenisProvider } from "@/components/ui/SmoothScroll";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import {
  SectionSkeleton,
  LoadingSkeleton,
} from "@/components/ui/LoadingSkeleton";

// Lazy-loaded below-fold sections
const ProjectStorySection = lazy(() =>
  import("@/components/sections/ProjectStorySection").then((m) => ({
    default: m.ProjectStorySection,
  })),
);
const TechStackSection = lazy(() =>
  import("@/components/sections/TechStackSection").then((m) => ({
    default: m.TechStackSection,
  })),
);
const AwardsSection = lazy(() =>
  import("@/components/sections/AwardsSection").then((m) => ({
    default: m.AwardsSection,
  })),
);
const TestimonialsSection = lazy(() =>
  import("@/components/sections/TestimonialsSection").then((m) => ({
    default: m.TestimonialsSection,
  })),
);
const ProcessSection = lazy(() =>
  import("@/components/sections/ProcessSection").then((m) => ({
    default: m.ProcessSection,
  })),
);
const TeamSection = lazy(() =>
  import("@/components/sections/TeamSection").then((m) => ({
    default: m.TeamSection,
  })),
);
const CTABannerSection = lazy(() =>
  import("@/components/sections/CTABannerSection").then((m) => ({
    default: m.CTABannerSection,
  })),
);
const AboutSection = lazy(() =>
  import("@/components/sections/AboutSection").then((m) => ({
    default: m.AboutSection,
  })),
);
const ContactSection = lazy(() =>
  import("@/components/sections/ContactSection").then((m) => ({
    default: m.ContactSection,
  })),
);
const TechnologiesFullSection = lazy(() =>
  import("@/components/sections/TechnologiesFullSection").then((m) => ({
    default: m.TechnologiesFullSection,
  })),
);
const IndustriesSection = lazy(() =>
  import("@/components/sections/IndustriesSection").then((m) => ({
    default: m.IndustriesSection,
  })),
);
const ParallaxSection = lazy(() =>
  import("@/components/ui/ParallaxSection").then((m) => ({
    default: m.ParallaxSection,
  })),
);
const ShowcaseSection = lazy(() =>
  import("@/components/sections/ShowcaseSection").then((m) => ({
    default: m.ShowcaseSection,
  })),
);

// Page-specific skeleton layouts — Light Mode
function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="h-screen flex flex-col justify-end pb-20 px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1400px] w-full space-y-6">
          <LoadingSkeleton variant="text" className="w-32 h-3" />
          <LoadingSkeleton variant="text" className="w-4/5 h-16" />
          <LoadingSkeleton variant="text" className="w-3/5 h-16" />
          <LoadingSkeleton variant="text" className="w-1/3 h-5" />
        </div>
      </div>
      <SectionSkeleton />
      <SectionSkeleton />
    </div>
  );
}

function DefaultPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1400px] space-y-8">
          <LoadingSkeleton variant="text" className="w-24 h-3" />
          <LoadingSkeleton variant="text" className="w-1/2 h-12" />
          <LoadingSkeleton variant="text" className="w-2/3 h-5" />
          <div className="mt-12 space-y-6">
            <LoadingSkeleton variant="card" count={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <LoadingSkeleton variant="text" className="w-24 h-3" />
              <LoadingSkeleton variant="text" className="w-1/2 h-10" />
              <LoadingSkeleton variant="text" className="w-3/4 h-5" />
              <LoadingSkeleton variant="rect" className="h-64" />
            </div>
            <div className="space-y-4">
              <LoadingSkeleton variant="rect" className="h-12" />
              <LoadingSkeleton variant="rect" className="h-12" />
              <LoadingSkeleton variant="rect" className="h-12" />
              <LoadingSkeleton variant="rect" className="h-32" />
              <LoadingSkeleton variant="rect" className="h-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getPageSkeleton(page) {
  switch (page) {
    case "home":
      return <HomeSkeleton />;
    case "contact":
      return <ContactSkeleton />;
    default:
      return <DefaultPageSkeleton />;
  }
}

function SectionFallback() {
  return <SectionSkeleton />;
}

function ParallaxFallback() {
  return <SectionSkeleton />;
}

// Sections rendered inside this single-page shell, keyed by their clean URL.
// services / case-studies / blog / careers have their own route files, so they are not here.
const PATH_TO_PAGE = {
  "/": "home",
  "/about": "about",
  "/technologies": "technologies",
  "/industries": "industries",
  "/contact": "contact",
};

function getPageFromPath() {
  if (typeof window === "undefined") return "home";
  return PATH_TO_PAGE[window.location.pathname] ?? "home";
}

export default function Home() {
  const [activePage, setActivePage] = useState(getPageFromPath);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const handleNavigate = useCallback(
    (page) => {
      const key = page;

      // Pages that have their own route files need a real navigation.
      if (key === "services") {
        window.location.href = "/services";
        return;
      }
      if (key === "case-studies") {
        window.location.href = "/case-studies";
        return;
      }
      if (key === "blog") {
        window.location.href = "/blog";
        return;
      }
      if (key === "careers") {
        window.location.href = "/careers";
        return;
      }

      if (key === activePage) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      setIsPageLoading(true);
      setActivePage(key);
      window.scrollTo({ top: 0, behavior: "smooth" });

      const path = key === "home" ? "/" : `/${key}`;
      window.history.pushState(null, "", path);
    },
    [activePage],
  );

  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromPath();
      setActivePage(page);
      setIsPageLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (isPageLoading) {
      const timeout = setTimeout(() => setIsPageLoading(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isPageLoading, activePage]);

  return (
    <LenisProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-[#F97316] focus:px-4 focus:py-2 focus:text-white focus:font-semibold focus:outline-none"
        >
          Skip to content
        </a>

        <CustomCursor />
        <ScrollProgress />
        <Navbar activePage={activePage} onNavigate={handleNavigate} />

        <PageTransition pageKey={activePage} />

        <main id="main-content" className="flex-1">
          <AnimatePresence mode="wait">
            {isPageLoading ? (
              <motion.div
                key={`skeleton-${activePage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {getPageSkeleton(activePage)}
              </motion.div>
            ) : (
              <div
                key={`content-${activePage}`}
                style={{
                  animation:
                    "fadeIn 0.4s cubic-bezier(0.76, 0, 0.24, 1) forwards",
                }}
              >
                {activePage === "home" && (
                  <div
                    key="home"
                    style={{
                      animation:
                        "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                    }}
                  >
                    <HeroSection onNavigate={handleNavigate} />
                    <MarqueeSection />
                    <SectionDivider variant="gradient" />
                    <Suspense fallback={<SectionFallback />}>
                      <ShowcaseSection />
                    </Suspense>
                    <SectionDivider variant="gradient" />
                    <ExpertiseSection />
                    <SectionDivider variant="dots" />
                    <SectionDivider variant="wave" />
                    <StatsSection />
                    <SectionDivider variant="accent" />
                    <Suspense fallback={<SectionFallback />}>
                      <ProjectStorySection />
                    </Suspense>
                    <SectionDivider variant="gradient" />
                    <Suspense fallback={<SectionFallback />}>
                      <TechStackSection />
                    </Suspense>
                    <SectionDivider variant="dots" />
                    <Suspense fallback={<ParallaxFallback />}>
                      <ParallaxSection speed={0.15}>
                        <AwardsSection />
                      </ParallaxSection>
                    </Suspense>
                    <SectionDivider variant="gradient" />
                    <Suspense fallback={<ParallaxFallback />}>
                      <ParallaxSection speed={0.15}>
                        <TestimonialsSection />
                      </ParallaxSection>
                    </Suspense>
                    <SectionDivider variant="accent" />
                    <SectionDivider variant="diagonal" />
                    <Suspense fallback={<SectionFallback />}>
                      <ProcessSection />
                    </Suspense>
                    <SectionDivider variant="gradient" />
                    {/* <Suspense fallback={<SectionFallback />}>
                   <TeamSection />
                  </Suspense> */}
                    <SectionDivider variant="dots" />
                    <Suspense fallback={<SectionFallback />}>
                      <CTABannerSection onNavigate={handleNavigate} />
                    </Suspense>
                  </div>
                )}

                {activePage === "about" && (
                  <motion.div
                    key="about"
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)" }}
                    exit={{ clipPath: "inset(0 0 100% 0)" }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Breadcrumbs
                      items={[{ label: "About", page: "about" }]}
                      onNavigate={handleNavigate}
                    />
                    <Suspense fallback={<SectionFallback />}>
                      <AboutSection />
                    </Suspense>
                  </motion.div>
                )}

                {activePage === "technologies" && (
                  <motion.div
                    key="technologies"
                    initial={{ opacity: 0, x: -60, skewX: -3 }}
                    animate={{ opacity: 1, x: 0, skewX: 0 }}
                    exit={{ opacity: 0, x: 40, skewX: 3 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Breadcrumbs
                      items={[{ label: "Technologies", page: "technologies" }]}
                      onNavigate={handleNavigate}
                    />
                    <Suspense fallback={<SectionFallback />}>
                      <TechnologiesFullSection />
                    </Suspense>
                  </motion.div>
                )}

                {activePage === "industries" && (
                  <motion.div
                    key="industries"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Breadcrumbs
                      items={[{ label: "Industries", page: "industries" }]}
                      onNavigate={handleNavigate}
                    />
                    <Suspense fallback={<SectionFallback />}>
                      <IndustriesSection />
                    </Suspense>
                  </motion.div>
                )}

                {activePage === "contact" && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, y: 40, rotateX: 5 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: -3 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    style={{ perspective: 1200 }}
                  >
                    <Breadcrumbs
                      items={[{ label: "Contact", page: "contact" }]}
                      onNavigate={handleNavigate}
                    />
                    <Suspense fallback={<ContactSkeleton />}>
                      <ContactSection onNavigate={handleNavigate} />
                    </Suspense>
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        </main>

        <Footer onNavigate={handleNavigate} />
        <CookieConsent />
        <CommandPalette onNavigate={handleNavigate} />
        <LiveChatWidget />
        <BackToTop />
      </div>
    </LenisProvider>
  );
}
