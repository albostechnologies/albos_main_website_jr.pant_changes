"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Mail,
  MapPin,
  Phone,
  Send,
  Loader2,
  Check,
  AlertCircle,
  Sparkles,
  Shield,
  Zap,
  Calendar,
  FileText,
  Briefcase,
  Rocket,
  Heart,
} from "lucide-react";
import {
  SERVICES,
  CONTACT_INFO,
  CASE_STUDIES,
  CLIENT_LOGOS,
} from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

const COMPANY_LINKS = [
  { label: "About", page: "about" },
  { label: "Case Studies", page: "case-studies" },
  { label: "Industries", page: "industries" },
  { label: "Blog", page: "blog" },
  { label: "Careers", page: "about" },
  { label: "Contact", page: "contact" },
];

const FEATURED_PROJECTS = CASE_STUDIES.slice(0, 5).map((cs) => ({
  id: cs.id,
  slug: cs.slug,
  title: cs.title,
  category: cs.category,
  metric: cs.result,
}));

const QUICK_ACTIONS = [
  {
    label: "Schedule a Call",
    icon: Calendar,
    page: "contact",
  },
  {
    label: "Get a Quote",
    icon: FileText,
    page: "contact",
  },
  {
    label: "View Case Studies",
    icon: Briefcase,
    page: "case-studies",
  },
  {
    label: "Start a Project",
    icon: Rocket,
    page: "contact",
  },
];

export function Footer({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [quickActionsExpanded, setQuickActionsExpanded] = useState(false);
  const logosRef = useRef(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribing(true);
    setSubscribeError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubscribeError(
          data.error || "Something went wrong. Please try again.",
        );
        return;
      }
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    } catch {
      setSubscribeError("Network error. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleLinkClick = (page) => {
    if (onNavigate) {
      onNavigate(page);
      return;
    }
    if (page === "home") {
      window.location.href = "/";
      return;
    }
    if (page === "blog") {
      window.location.href = "/blog";
      return;
    }
    if (page === "case-studies") {
      window.location.href = "/case-studies";
      return;
    }
    window.location.href = `/${page}`;
  };

  return (
    <footer className="relative overflow-hidden bg-[#050505]">
      {/* Gradient accent line at top */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[#F97316] to-transparent" />

      {/* Floating accent dots in corners */}
      <div className="absolute top-12 left-8 size-2 rounded-full bg-[#F97316]/20 animate-float pointer-events-none" />
      <div
        className="absolute top-20 right-12 size-1.5 rounded-full bg-[#F97316]/15 animate-float pointer-events-none"
        style={{ animationDelay: "1s" }}
      />

      <div
        className="absolute bottom-24 left-16 size-1 rounded-full bg-[#F97316]/10 animate-float pointer-events-none"
        style={{ animationDelay: "2s" }}
      />

      <div
        className="absolute bottom-16 right-20 size-2.5 rounded-full bg-[#F97316]/15 animate-float pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      {/* Enhanced dot grid pattern */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      {/* ============ QUICK ACTIONS PANEL ============ */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Quick Actions header */}
          <button
            onClick={() => setQuickActionsExpanded(!quickActionsExpanded)}
            className="flex items-center gap-3 mb-4 group cursor-pointer w-full"
            aria-expanded={quickActionsExpanded}
            aria-controls="quick-actions-panel"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.08]" />
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-widest text-[#A1A1AA] group-hover:text-[#F97316] transition-colors duration-300">
              <Zap className="size-3.5" />
              Quick Actions
              <motion.svg
                className="size-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                animate={{ rotate: quickActionsExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.08]" />
          </button>

          {/* Quick Actions panel - always visible on desktop, collapsible on mobile */}
          <AnimatePresence initial={false}>
            <motion.div
              id="quick-actions-panel"
              initial={false}
              animate={{
                height: quickActionsExpanded ? "auto" : "auto",
                opacity: 1,
              }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {QUICK_ACTIONS.map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.label}
                      onClick={() => handleLinkClick(action.page)}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        scale: 1.02,
                        borderColor: "rgba(249, 115, 22, 0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md px-4 py-3.5 text-left transition-all duration-300 hover:bg-white/[0.06] hover:border-[#F97316]/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.08)] cursor-pointer"
                      aria-label={action.label}
                    >
                      <div className="flex items-center justify-center size-9 rounded-lg bg-[#F97316]/10 border border-[#F97316]/20 transition-all duration-300 group-hover:bg-[#F97316]/20 group-hover:border-[#F97316]/30 shrink-0">
                        <Icon className="size-4 text-[#F97316]" />
                      </div>
                      <div className="min-w-0">
                        <span className="block font-[family-name:var(--font-plus-jakarta)] text-sm font-semibold text-[#F5F4F0] group-hover:text-[#F97316] transition-colors duration-300 truncate">
                          {action.label}
                        </span>
                      </div>
                      <ArrowRight className="size-3.5 text-[#A1A1AA] ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ============ FEATURED PROJECTS ROW ============ */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.08]" />
            <span className="font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-widest text-[#A1A1AA]">
              Featured Projects
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.08]" />
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-2 px-2">
            {FEATURED_PROJECTS.map((project) => (
              <a
                key={project.id}
                href={`/case-studies/${project.slug}`}
                className="group flex-shrink-0 w-[220px] rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#F97316]/30 hover:bg-white/[0.04]"
                aria-label={`View project: ${project.title}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center rounded-full bg-[#F97316]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#F97316] border border-[#F97316]/20 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <ArrowRight className="size-3.5 text-[#A1A1AA] group-hover:text-[#F97316] group-hover:translate-x-0.5 transition-all duration-300" />
                </div>
                <h4 className="font-[family-name:var(--font-plus-jakarta)] text-sm font-bold text-[#F5F4F0] mb-1.5 group-hover:text-[#F97316] transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#F97316]/70 font-medium">
                  {project.metric}
                </p>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ============ TRUSTED BY LOGOS ROW ============ */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-center font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-widest text-[#A1A1AA]/100 mb-6">
            Trusted by leading companies
          </p>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div
              ref={logosRef}
              className="flex items-center gap-12 animate-marquee-left"
              style={{ width: "max-content" }}
            >
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
                <span
                  key={`${logo}-${i}`}
                  className="flex-shrink-0 font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#A1A1AA]/100 grayscale select-none whitespace-nowrap transition-colors duration-500 hover:text-[#A1A1AA]/500"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* ============ MAIN FOOTER CONTENT ============ */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-12 pb-8 lg:pt-16 lg:pb-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10 lg:flex lg:items-start lg:gap-12"
        >
          {/* Column 1: Brand + Enhanced Newsletter */}
          <motion.div variants={fadeUp} className="min-w-0 sm:col-span-2 lg:flex-1">
            <button
              onClick={() => handleLinkClick("home")}
              className="inline-flex items-center group"
              aria-label="Albos Technologies Pvt Ltd - Home"
            >
              <Image
                src="/images/albos-logo-transparent.png"
                alt="Albos Technologies Pvt Ltd"
                width={371}
                height={99}
                className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </button>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#A1A1AA]">
              Albos Technologies transforms business ideas into powerful digital
              products with creative design, reliable development, smart
              automation, and result-driven digital solutions for every stage of
              growth.
            </p>

            {/* Enhanced Newsletter Card */}
            <div className="mt-6 rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-5 relative overflow-hidden">
              {/* Subtle accent gradient bg */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/[0.04] rounded-full blur-[60px] pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="size-4 text-[#F97316]" />
                  <h4 className="font-[family-name:var(--font-plus-jakarta)] text-sm font-bold text-[#F5F4F0]">
                    Stay Updated
                  </h4>
                </div>

                {/* Email form */}
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#A1A1AA]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setSubscribeError(null);
                      }}
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      placeholder="your@email.com"
                      required
                      disabled={isSubscribing}
                      className="h-9 w-full rounded-lg border bg-white/[0.04] pl-8 pr-3 text-[13px] text-[#F5F4F0] placeholder:text-[#A1A1AA] focus:outline-none transition-all duration-300 disabled:opacity-50"
                      style={{
                        borderColor: inputFocused
                          ? "rgba(249, 115, 22, 0.5)"
                          : "rgba(255, 255, 255, 0.08)",
                        boxShadow: inputFocused
                          ? "0 0 0 3px rgba(249, 115, 22, 0.1), 0 0 15px rgba(249, 115, 22, 0.05)"
                          : "none",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F97316] text-white transition-all duration-300 hover:bg-[#EA580C] hover:shadow-lg hover:shadow-[#F97316]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Subscribe to newsletter"
                  >
                    {isSubscribing ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : subscribed ? (
                      <Check className="size-4" />
                    ) : (
                      <Send className="size-4" />
                    )}
                  </button>
                </form>
                <AnimatePresence>
                  {subscribeError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 flex items-center gap-1.5 text-xs text-red-400 font-[family-name:var(--font-inter)]"
                    >
                      <AlertCircle className="size-3 shrink-0" />
                      {subscribeError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Services */}
          <motion.div variants={fadeUp} className="min-w-0 lg:flex-1">
            <h3 className="font-[family-name:var(--font-plus-jakarta)] text-sm font-bold uppercase tracking-wider text-[#F5F4F0] mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-2 text-sm text-[#A1A1AA] transition-colors duration-300 hover:text-[#F97316] link-underline"
                    aria-label={`${service.title} services`}
                  >
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-[#A1A1AA]/50 group-hover:text-[#F97316]/50 transition-colors duration-300">
                      {service.id}
                    </span>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Company */}
          <motion.div variants={fadeUp} className="min-w-0 lg:flex-1">
            <h3 className="font-[family-name:var(--font-plus-jakarta)] text-sm font-bold uppercase tracking-wider text-[#F5F4F0] mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.page)}
                    className="text-sm text-[#A1A1AA] transition-colors duration-300 hover:text-[#F97316] link-underline"
                    aria-label={link.label}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={fadeUp} className="min-w-0 sm:col-span-2 lg:flex-1">
            <h3 className="font-[family-name:var(--font-plus-jakarta)] text-sm font-bold uppercase tracking-wider text-[#F5F4F0] mb-5">
              Contact
            </h3>
            <div className="space-y-4">
              {/* Phone */}
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat on WhatsApp: ${CONTACT_INFO.phone}`}
                className="link-underline flex items-start gap-3 text-sm text-[#A1A1AA] transition-colors duration-300 hover:text-[#F97316] group"
              >
                <Phone className="size-4 mt-0.5 shrink-0 text-[#A1A1AA] group-hover:text-[#F97316] transition-colors duration-300" />
                <span>{CONTACT_INFO.phone}</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="link-underline flex items-start gap-3 text-sm text-[#A1A1AA] transition-colors duration-300 hover:text-[#F97316] group"
              >
                <Mail className="size-4 mt-0.5 shrink-0 text-[#A1A1AA] group-hover:text-[#F97316] transition-colors duration-300" />
                <span>{CONTACT_INFO.email}</span>
              </a>

              {/* Offices */}
              <div className="space-y-3 pt-2">
                {CONTACT_INFO.offices.map((office) => (
                  <div
                    key={office.city}
                    className="flex items-start gap-3 text-sm text-[#A1A1AA]"
                  >
                    <MapPin className="size-4 mt-0.5 shrink-0 text-[#A1A1AA]/60" />
                    <div>
                      <span className="text-[#F5F4F0]/80 font-medium">
                        {office.city}
                      </span>
                      <br />
                      <span className="text-xs">{office.address}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom row — legal links + socials */}
        <div className="mt-14 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Legal links */}
            <nav
              className="flex flex-wrap items-center gap-x-5 gap-y-3"
              aria-label="Legal"
            >
              <a
                href="/privacy-policy"
                className="text-xs text-[#A1A1AA] transition-colors duration-300 hover:text-[#F97316]"
              >
                Privacy Policy
              </a>
              <span className="size-1 rounded-full bg-[#A1A1AA]/30" />
              <a
                href="/terms-of-use"
                className="text-xs text-[#A1A1AA] transition-colors duration-300 hover:text-[#F97316]"
              >
                Terms of Use
              </a>
              <span className="size-1 rounded-full bg-[#A1A1AA]/30" />
              <a
                href="/sitemap.xml"
                className="text-xs text-[#A1A1AA] transition-colors duration-300 hover:text-[#F97316]"
              >
                Sitemap
              </a>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              <a
                href={CONTACT_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-hover text-[#A1A1AA] transition-all duration-300 hover:text-[#F97316]"
                aria-label="LinkedIn"
              >
                <svg
                  className="size-[18px]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={CONTACT_INFO.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-hover text-[#A1A1AA] transition-all duration-300 hover:text-[#F97316]"
                aria-label="YouTube"
              >
                <svg
                  className="size-[18px]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={CONTACT_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-hover text-[#A1A1AA] transition-all duration-300 hover:text-[#F97316]"
                aria-label="Facebook"
              >
                <svg
                  className="size-[18px]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={CONTACT_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-hover text-[#A1A1AA] transition-all duration-300 hover:text-[#F97316]"
                aria-label="GitHub"
              >
                <svg
                  className="size-[18px]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
          
            </div>
          </div>
        </div>
      </div>

      {/* ============ COPYRIGHT BAR ============ */}
      <div className="relative border-t border-white/[0.06] bg-[#030303]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            {/* Logo + copyright */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/albos-logo-transparent.png"
                alt="Albos Technologies Pvt Ltd"
                width={371}
                height={99}
                className="h-6 w-auto opacity-70"
              />
              <span className="hidden h-4 w-px bg-white/[0.1] sm:block" />
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#A1A1AA]">
                &copy; {new Date().getFullYear()} Albos Technologies Pvt Ltd.
                All rights reserved.
              </p>
            </div>

            {/* Made with love + back to top */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
