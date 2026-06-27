"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowRight, Clock, ChevronDown } from "lucide-react";
import { NAV_LINKS, CONTACT_INFO, SERVICES } from "@/lib/constants";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const SCROLL_SHOW_THRESHOLD = 80; // scroll distance before navbar appears on home page
const SCROLL_HIDE_THRESHOLD = 20; // scroll distance below which navbar hides (hysteresis to prevent flicker)
const HERO_HEIGHT = 600; // approximate hero section height in px

// Page descriptions for mobile menu preview
const PAGE_DESCRIPTIONS = {
  services: "Custom software, web & mobile development",
  "case-studies": "500+ projects across 12 industries",
  about: "Our story, team & mission",
  technologies: "Full-stack expertise & R&D focus",
  industries: "Domain-specific solutions",
  blog: "Insights, engineering & AI articles",
  careers: "Join our team — 12 open roles",
  contact: "Start your project today",
};

export function Navbar({ activePage = "home", onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);

  // Track scroll position for progress bar and visibility logic
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  // Navbar visibility: hidden on home page until user scrolls, always visible on other pages
  const isHomePage = activePage === "home";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
      // Hysteresis: use higher threshold to show, lower threshold to hide
      // This prevents flickering when scrolling near the threshold boundary
      setIsScrolled((prev) => {
        if (prev) return scrollTop > SCROLL_HIDE_THRESHOLD; // once visible, only hide near very top
        return scrollTop > SCROLL_SHOW_THRESHOLD; // initially hidden, show after scrolling past 80px
      });
      setShowProgressBar(scrollTop > HERO_HEIGHT);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if navbar should be visible:
  // - On non-home pages: always visible
  // - On home page: visible only after scrolling past threshold (with hysteresis)
  // - When mobile menu is open: always visible (so close button is accessible)
  const isNavbarVisible = isMobileMenuOpen || !isHomePage || isScrolled;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);

    // Normalise '/services' (or legacy '#services', or '/') -> 'services' | 'home'
    const page = href.replace(/^[/#]/, "") || "home";

    // Pages with their own route files always do a real navigation.
    if (
      page === "services" ||
      page === "blog" ||
      page === "careers" ||
      page === "case-studies"
    ) {
      if (activePage === page) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.location.href = `/${page}`;
      }
      return;
    }

    // SPA sections rendered inside the home shell.
    if (onNavigate) {
      onNavigate(page);
    } else {
      // On standalone routes there is no shell — navigate for real.
      window.location.href = page === "home" ? "/" : `/${page}`;
    }
  };

  // Compute active indicator position
  const getActiveIndex = () => {
    return NAV_LINKS.findIndex((link) => {
      const linkPage = link.href.replace(/^[/#]/, "");
      return activePage === linkPage;
    });
  };

  const activeIndex = getActiveIndex();

  // Mobile menu variants
  const mobileMenuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: { opacity: 0, x: -30, transition: { duration: 0.2 } },
  };

  const mobileDescVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.08,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
  };

  const mobileSocialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: isNavbarVisible ? 0 : -100,
          opacity: isNavbarVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
          isScrolled || !isHomePage
            ? "bg-[#FAFAFA]/90 backdrop-blur-xl border-b border-black/[0.06] shadow-lg shadow-black/5"
            : "bg-[#FAFAFA]/80 backdrop-blur-lg border-b border-black/[0.04]",
        )}
      >
        {/* Left accent line when scrolled */}
        {(isScrolled || !isHomePage) && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F97316] via-[#F97316]/50 to-transparent origin-top"
          />
        )}

        {/* Dot-grid pattern overlay when scrolled */}
        {(isScrolled || !isHomePage) && (
          <div className="absolute inset-0 dot-grid opacity-5 pointer-events-none" />
        )}

        <nav className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("/")}
            className="flex items-center gap-2.5 group"
            aria-label="Albos Technologies Pvt Ltd - Home"
          >
            <Image
              src="/images/albos-logo-real.png"
              alt="Albos Technologies Pvt Ltd"
              width={368}
              height={88}
              className="h-8 md:h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </button>

          {/* Desktop Nav Links */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center gap-1 relative"
          >
            {NAV_LINKS.map((link) => {
              const linkPage = link.href.replace(/^[/#]/, "");
              const isActive = activePage === linkPage;
              const isServices = linkPage === "services";
              return (
                <li
                  key={link.label}
                  className={cn("relative", isServices && "group/nav")}
                >
                  <motion.button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "relative inline-flex items-center gap-1 font-[family-name:var(--font-inter)] text-[0.8125rem] font-medium py-1.5 px-3 rounded-md transition-colors duration-300 link-underline",
                      isActive
                        ? "text-[#F97316]"
                        : "text-[#18181B]/70 hover:text-[#18181B]",
                    )}
                    aria-label={`Navigate to ${link.label}`}
                    aria-current={isActive ? "page" : undefined}
                    aria-haspopup={isServices ? "menu" : undefined}
                  >
                    {link.label}
                    {isServices && (
                      <ChevronDown className="size-3.5 transition-transform duration-300 group-hover/nav:rotate-180" />
                    )}
                  </motion.button>
                  {/* Active indicator per item — uses layoutId for smooth slide */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#F97316] rounded-full"
                      layoutId="navActiveIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Services mega-menu dropdown */}
                  {isServices && (
                    <div
                      role="menu"
                      aria-label="Services"
                      className="absolute left-0 top-full z-50 pt-3 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 group-focus-within/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0"
                    >
                      <div className="w-[460px] rounded-xl border border-black/[0.08] bg-white p-3 shadow-xl shadow-black/10">
                        <div className="grid grid-cols-2 gap-0.5">
                          {SERVICES.map((service) => (
                            <a
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              role="menuitem"
                              className="group/svc flex items-start gap-2.5 rounded-lg px-3 py-2 transition-colors hover:bg-[#F97316]/[0.06]"
                            >
                              <span className="mt-px font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#A1A1AA] transition-colors group-hover/svc:text-[#F97316]">
                                {service.id}
                              </span>
                              <span className="font-[family-name:var(--font-inter)] text-[0.8125rem] font-medium leading-snug text-[#18181B]/80 transition-colors group-hover/svc:text-[#F97316]">
                                {service.title}
                              </span>
                            </a>
                          ))}
                        </div>
                        <div className="mt-2 border-t border-black/[0.06] pt-2">
                          <a
                            href="/services"
                            role="menuitem"
                            className="flex items-center justify-between rounded-lg px-3 py-2 font-[family-name:var(--font-inter)] text-[0.8125rem] font-semibold text-[#F97316] transition-colors hover:bg-[#F97316]/[0.06]"
                          >
                            View all services
                            <ArrowRight className="size-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </motion.ul>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone with tooltip */}
            <div
              className="relative"
              onMouseEnter={() => setShowPhoneTooltip(true)}
              onMouseLeave={() => setShowPhoneTooltip(false)}
            >
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat on WhatsApp: ${CONTACT_INFO.phone}`}
                className="flex items-center gap-2 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#71717A] hover:text-[#18181B] transition-colors duration-300"
              >
                <Phone className="size-3.5" />
                {CONTACT_INFO.phone}
              </a>
              {/* Business hours tooltip */}
              <AnimatePresence>
                {showPhoneTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 px-3 py-2 bg-[#FFFFFF] border border-black/[0.08] rounded-lg shadow-xl z-50 whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2 text-xs text-[#18181B]">
                      <Clock className="size-3 text-[#F97316]" />
                      <span className="font-medium">Business Hours</span>
                    </div>
                    <p className="text-[0.7rem] text-[#71717A] mt-1">
                      Mon–Sat: 10AM–7PM IST
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cmd+K shortcut badge */}
            <button
              onClick={() => {
                window.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "k", metaKey: true }),
                );
              }}
              className="text-[9px] font-[family-name:var(--font-jetbrains-mono)] bg-black/[0.04] border border-black/[0.08] rounded px-1.5 py-0.5 text-[#A1A1AA] hover:text-[#18181B] hover:border-black/[0.15] transition-colors duration-200 cursor-pointer"
              aria-label="Open command palette"
            >
              ⌘K
            </button>

            {/* Get Started button with enhanced glow */}
            <button
              onClick={() => handleNavClick("/contact")}
              className="group relative flex items-center gap-2 rounded-md bg-[#F97316] px-5 py-2.5 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition-all duration-300 hover:bg-[#EA580C] hover:shadow-[0_0_40px_rgba(249,115,22,0.4),0_0_80px_rgba(249,115,22,0.15)] active:scale-[0.97]"
              aria-label="Get Started - Contact us"
            >
              {/* Glow layer behind button */}
              <span className="absolute inset-0 rounded-md bg-[#F97316] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50" />
              <span className="relative">Get Started</span>
              <ArrowRight className="size-4 relative transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-[60] flex items-center justify-center size-11 rounded-md lg:hidden text-[#18181B] hover:bg-black/[0.06] transition-colors duration-200"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* Scroll Progress Indicator */}
        <AnimatePresence>
          {showProgressBar && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/[0.06] origin-left"
            >
              <motion.div
                className="h-full bg-[#F97316] origin-left"
                style={{ width: `${scrollProgress * 100}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Blurred background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[54] bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[55] bg-[#FAFAFA]/98 lg:hidden"
            >
              {/* Accent gradient line at top */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316] to-transparent" />

              {/* Close button inside mobile menu */}
              <div className="absolute top-5 right-6 z-10">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center size-11 rounded-full bg-black/[0.06] hover:bg-black/[0.12] text-[#18181B] transition-all duration-200 hover:scale-110 active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="flex flex-col h-full pt-[100px] px-8 pb-10">
                {/* Nav Links with descriptions */}
                <div className="flex-1">
                  <nav className="space-y-1">
                    {NAV_LINKS.map((link, i) => {
                      const linkPage = link.href.replace(/^[/#]/, "");
                      const isActive = activePage === linkPage;
                      const description = PAGE_DESCRIPTIONS[linkPage] || "";
                      const isServices = linkPage === "services";
                      return (
                        <motion.div
                          key={link.label}
                          custom={i}
                          variants={mobileLinkVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <div className="flex items-center group">
                            <button
                              onClick={() => handleNavClick(link.href)}
                              className="flex flex-1 items-center gap-4 py-3 text-left"
                              aria-label={`Navigate to ${link.label}`}
                            >
                              <span
                                className={cn(
                                  "font-[family-name:var(--font-jetbrains-mono)] text-xs transition-colors duration-300",
                                  isActive
                                    ? "text-[#F97316]"
                                    : "text-[#F97316]/60 group-hover:text-[#F97316]",
                                )}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <div className="flex-1">
                                <span
                                  className={cn(
                                    "font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold transition-colors duration-300 block",
                                    isActive
                                      ? "text-[#F97316]"
                                      : "text-[#18181B] group-hover:text-[#F97316]",
                                  )}
                                >
                                  {link.label}
                                </span>
                                {/* Page preview description */}
                                <motion.span
                                  custom={i}
                                  variants={mobileDescVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  className={cn(
                                    "text-xs font-[family-name:var(--font-inter)] block mt-0.5 transition-colors duration-300",
                                    isActive
                                      ? "text-[#F97316]/60"
                                      : "text-[#71717A] group-hover:text-[#71717A]",
                                  )}
                                >
                                  {description}
                                </motion.span>
                              </div>
                            </button>
                            {isServices ? (
                              <button
                                onClick={() =>
                                  setMobileServicesExpanded((v) => !v)
                                }
                                aria-label="Toggle services submenu"
                                aria-expanded={mobileServicesExpanded}
                                className="flex size-10 shrink-0 items-center justify-center rounded-lg text-[#71717A] transition-colors hover:bg-black/[0.04] hover:text-[#F97316]"
                              >
                                <ChevronDown
                                  className={cn(
                                    "size-5 transition-transform duration-300",
                                    mobileServicesExpanded && "rotate-180",
                                  )}
                                />
                              </button>
                            ) : (
                              <ArrowRight
                                className={cn(
                                  "size-4 transition-all duration-300",
                                  isActive
                                    ? "text-[#F97316] opacity-100"
                                    : "text-[#71717A] opacity-0 group-hover:opacity-60 group-hover:translate-x-0.5",
                                )}
                              />
                            )}
                          </div>

                          {/* Services submenu */}
                          {isServices && (
                            <AnimatePresence initial={false}>
                              {mobileServicesExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                  }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-9 mb-2 flex flex-col border-l border-black/[0.08] pl-4">
                                    {SERVICES.map((service) => (
                                      <a
                                        key={service.slug}
                                        href={`/services/${service.slug}`}
                                        onClick={() =>
                                          setIsMobileMenuOpen(false)
                                        }
                                        className="group/svc flex items-center gap-2.5 py-2 font-[family-name:var(--font-inter)] text-sm text-[#18181B]/70 transition-colors hover:text-[#F97316]"
                                      >
                                        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#A1A1AA] transition-colors group-hover/svc:text-[#F97316]">
                                          {service.id}
                                        </span>
                                        {service.title}
                                      </a>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          )}
                        </motion.div>
                      );
                    })}
                  </nav>
                </div>

                {/* Bottom Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.5, duration: 0.5 },
                  }}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                  className="space-y-6 pt-8 border-t border-black/[0.06]"
                >
                  {/* Phone */}
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Chat on WhatsApp: ${CONTACT_INFO.phone}`}
                    className="flex items-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#71717A] hover:text-[#18181B] transition-colors duration-300"
                  >
                    <Phone className="size-4 text-[#F97316]" />
                    {CONTACT_INFO.phone}
                  </a>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleNavClick("/contact")}
                    className="group relative flex w-full items-center justify-center gap-2 rounded-md bg-[#F97316] px-6 py-3.5 font-[family-name:var(--font-inter)] text-base font-semibold text-white transition-all duration-300 hover:bg-[#EA580C] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
                    aria-label="Get Started - Contact us"
                  >
                    <span className="absolute inset-0 rounded-md bg-[#F97316] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40" />
                    <span className="relative">Get Started</span>
                    <ArrowRight className="size-4 relative transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  {/* Social Links */}
                  <motion.div
                    variants={mobileSocialVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-center gap-5 pt-4"
                  >
                    <span className="text-xs text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                      Follow us
                    </span>
                    <a
                      href={CONTACT_INFO.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center size-10 rounded-lg bg-black/[0.04] text-[#A1A1AA] hover:text-[#18181B] hover:bg-black/[0.08] transition-all duration-300 hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <svg
                        className="size-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href={CONTACT_INFO.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center size-10 rounded-lg bg-black/[0.04] text-[#A1A1AA] hover:text-[#18181B] hover:bg-black/[0.08] transition-all duration-300 hover:scale-110"
                      aria-label="Twitter"
                    >
                      <svg
                        className="size-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href={CONTACT_INFO.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center size-10 rounded-lg bg-black/[0.04] text-[#A1A1AA] hover:text-[#18181B] hover:bg-black/[0.08] transition-all duration-300 hover:scale-110"
                      aria-label="GitHub"
                    >
                      <svg
                        className="size-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      href={CONTACT_INFO.social.dribbble}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center size-10 rounded-lg bg-black/[0.04] text-[#A1A1AA] hover:text-[#18181B] hover:bg-black/[0.08] transition-all duration-300 hover:scale-110"
                      aria-label="Dribbble"
                    >
                      <svg
                        className="size-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702C16.86 2.61 14.545 1.62 12 1.62c-.824 0-1.63.1-2.4.285v.146zm10.14 3.2c-.22.305-1.882 2.49-5.663 4.017.226.46.44.93.64 1.4.07.17.14.335.204.5 3.41-.428 6.8.26 7.14.33-.02-2.42-.88-4.64-2.32-6.25z" />
                      </svg>
                    </a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
