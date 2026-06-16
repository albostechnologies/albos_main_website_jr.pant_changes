"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Check,
  ChevronDown,
  ArrowRight,
  Linkedin,
  Github,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { SERVICES, CONTACT_INFO } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const BUDGET_OPTIONS = [
  "Under ₹2 Lakh",
  "₹2L – ₹10L",
  "₹10L – ₹50L",
  "₹50L+",
  "Let's Discuss",
];

const TIMELINE_OPTIONS = [
  "ASAP",
  "Within 1 Month",
  "1–3 Months",
  "Just Exploring",
];

const FAQ_ITEMS = [
  {
    q: "What is your typical project timeline?",
    a: "Our projects typically range from 8-20 weeks depending on scope and complexity. We begin with a detailed discovery phase to establish clear milestones and deliverables.",
  },
  {
    q: "How do you handle communication during a project?",
    a: "We use a combination of daily standups, weekly sprint reviews, and real-time collaboration tools. You'll have a dedicated project manager as your single point of contact.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "We specialize in React, Next.js, Node.js, Python, Java, .NET, AWS, Azure, and GCP. Our team stays current with emerging technologies and can recommend the best stack for your needs.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes, we offer 24/7 support with guaranteed 99.9% uptime SLA. Our maintenance packages include bug fixes, security updates, performance monitoring, and feature enhancements.",
  },
  {
    q: "How do you ensure code quality?",
    a: "We follow strict code review processes, automated testing (unit, integration, E2E), CI/CD pipelines, and maintain comprehensive documentation. Every line of code goes through peer review before deployment.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Absolutely. Our staff augmentation model lets you embed our senior engineers directly into your team. We adapt to your workflows, tools, and processes for seamless integration.",
  },
];

const SERVICE_NAMES = SERVICES.map((s) => s.title);

/* ─── Office Map with SVG World Map ─── */
function OfficeMap() {
  const [hoveredOffice, setHoveredOffice] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const officePositions = [{ city: "Pune", x: 680, y: 200, teamSize: 250 }];

  return (
    <div
      ref={ref}
      className="relative rounded-xl overflow-hidden border border-black/[0.06] bg-[#FAFAFA]"
    >
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="World map showing Albos Technologies Pvt Ltd office locations"
      >
        <rect width="1000" height="500" fill="#FAFAFA" />
        <g opacity="0.03">
          {Array.from({ length: 21 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={i * 50}
              y1="0"
              x2={i * 50}
              y2="500"
              stroke="black"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 50}
              x2="1000"
              y2={i * 50}
              stroke="black"
              strokeWidth="0.5"
            />
          ))}
        </g>
        <motion.path
          d="M560,80 L600,75 L650,80 L700,90 L740,100 L770,115 L780,135 L775,155 L760,170 L740,180 L720,185 L700,190 L680,195 L650,200 L620,195 L600,185 L580,170 L565,150 L555,130 L550,110 L555,95 Z"
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
        />

        {officePositions.map((office) => (
          <g key={office.city}>
            <motion.circle
              cx={office.x}
              cy={office.y}
              r="12"
              fill="none"
              stroke="#F97316"
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView ? { opacity: [0, 0.4, 0], scale: [0.5, 1.5, 2] } : {}
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1.5,
              }}
            />

            <motion.circle
              cx={office.x}
              cy={office.y}
              r="8"
              fill="#F97316"
              opacity={0.1}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.3 }}
            />

            <motion.circle
              cx={office.x}
              cy={office.y}
              r="4"
              fill="#F97316"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{
                duration: 0.3,
                delay: 1.4,
                type: "spring",
                stiffness: 300,
              }}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoveredOffice(office.city)}
              onMouseLeave={() => setHoveredOffice(null)}
            />

            <motion.circle
              cx={office.x}
              cy={office.y}
              r="1.5"
              fill="#FFB380"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 1.5 }}
            />

            {hoveredOffice === office.city && (
              <g>
                <rect
                  x={office.x - 55}
                  y={office.y - 42}
                  width="110"
                  height="32"
                  rx="6"
                  fill="#FFFFFF"
                  stroke="rgba(249,115,22,0.3)"
                  strokeWidth="0.5"
                />
                <text
                  x={office.x}
                  y={office.y - 26}
                  textAnchor="middle"
                  fill="#18181B"
                  fontSize="9"
                  fontFamily="var(--font-plus-jakarta)"
                  fontWeight="700"
                >
                  {office.city}
                </text>
                <text
                  x={office.x}
                  y={office.y - 15}
                  textAnchor="middle"
                  fill="#F97316"
                  fontSize="7"
                  fontFamily="var(--font-inter)"
                >
                  {office.teamSize} members
                </text>
              </g>
            )}
          </g>
        ))}
        <g opacity="0.4">
          <circle cx="870" cy="450" r="3" fill="#F97316" />
          <text
            x="880"
            y="453"
            fill="#A1A1AA"
            fontSize="8"
            fontFamily="var(--font-inter)"
          >
            Office Location
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ─── Social Icon Components ─── */
function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <a
        href={CONTACT_INFO.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full border border-black/[0.08] text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-all duration-300"
        aria-label="LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        href={CONTACT_INFO.social.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full border border-black/[0.08] text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-all duration-300"
        aria-label="Twitter / X"
      >
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={CONTACT_INFO.social.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full border border-black/[0.08] text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-all duration-300"
        aria-label="GitHub"
      >
        <Github className="h-4 w-4" />
      </a>
      <a
        href={CONTACT_INFO.social.dribbble}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full border border-black/[0.08] text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/30 transition-all duration-300"
        aria-label="Dribbble"
      >
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
        >
          <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.81zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.29zm10.335 3.483c-.218.29-1.91 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
        </svg>
      </a>
    </div>
  );
}

/* ─── Contact Method Card ─── */
function ContactMethodCard({ icon, label, value, href, subtext }) {
  const content = (
    <div className="group flex items-start gap-4 rounded-xl border border-black/[0.06] bg-black/[0.02] p-4 md:p-5 transition-all duration-300 hover:bg-[#F97316] hover:border-[#F97316] cursor-pointer">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/[0.06] text-[#F97316] shrink-0 group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div className="min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A1A1AA] group-hover:text-white/60 font-[family-name:var(--font-inter)] transition-colors duration-300">
          {label}
        </span>
        <p className="mt-0.5 text-[#18181B] text-sm md:text-base font-medium font-[family-name:var(--font-inter)] group-hover:text-white transition-colors duration-300 truncate">
          {value}
        </p>
        {subtext && (
          <p className="mt-0.5 text-[#A1A1AA] text-xs font-[family-name:var(--font-inter)] group-hover:text-white/60 transition-colors duration-300">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }
  return content;
}

/* ─── Form Input ─── */
function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  id,
}) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#52525B] font-[family-name:var(--font-inter)]"
      >
        {label} {required && <span className="text-[#F97316]">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border bg-[#F9FAFB] px-4 py-3 text-sm text-[#18181B] placeholder:text-[#9CA3AF] font-[family-name:var(--font-inter)] focus:outline-none focus:ring-2 transition-all duration-300",
          error
            ? "border-red-400 focus:ring-red-400/30"
            : "border-[#E5E7EB] focus:border-[#F97316]/50 focus:ring-[#F97316]/20 focus:shadow-[0_0_15px_rgba(249,115,22,0.08)] focus:bg-white",
        )}
      />

      {error && (
        <p className="text-xs text-red-500 font-[family-name:var(--font-inter)]">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Form Select ─── */
function FormSelect({
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  id,
  options,
}) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  return (
    <div className="space-y-1.5 relative" ref={ref}>
      <label
        htmlFor={inputId}
        className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#52525B] font-[family-name:var(--font-inter)]"
      >
        {label} {required && <span className="text-[#F97316]">*</span>}
      </label>
      <button
        id={inputId}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full rounded-lg border bg-[#F9FAFB] px-4 py-3 text-sm text-left font-[family-name:var(--font-inter)] focus:outline-none focus:ring-2 transition-all duration-300 flex items-center justify-between",
          error
            ? "border-red-400 focus:ring-red-400/30"
            : "border-[#E5E7EB] focus:border-[#F97316]/50 focus:ring-[#F97316]/20 focus:bg-white",
          !value && "text-[#9CA3AF]",
        )}
      >
        <span>{value || placeholder}</span>
        <ChevronDown
          className={cn(
            "size-4 text-[#9CA3AF] transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-1 z-20 bg-white border border-[#E5E7EB] rounded-lg shadow-xl shadow-black/10 max-h-56 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-2.5 text-left text-sm font-[family-name:var(--font-inter)] transition-colors duration-150 hover:bg-[#F97316]/5 hover:text-[#F97316]",
                  value === option
                    ? "bg-[#F97316]/10 text-[#F97316] font-semibold"
                    : "text-[#18181B]",
                )}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {error && (
        <p className="text-xs text-red-500 font-[family-name:var(--font-inter)]">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Form Textarea ─── */
function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  id,
  rows = 4,
}) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#52525B] font-[family-name:var(--font-inter)]"
      >
        {label} {required && <span className="text-[#F97316]">*</span>}
      </label>
      <textarea
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "w-full rounded-lg border bg-[#F9FAFB] px-4 py-3 text-sm text-[#18181B] placeholder:text-[#9CA3AF] font-[family-name:var(--font-inter)] focus:outline-none focus:ring-2 transition-all duration-300 resize-none",
          error
            ? "border-red-400 focus:ring-red-400/30"
            : "border-[#E5E7EB] focus:border-[#F97316]/50 focus:ring-[#F97316]/20 focus:shadow-[0_0_15px_rgba(249,115,22,0.08)] focus:bg-white",
        )}
      />

      {error && (
        <p className="text-xs text-red-500 font-[family-name:var(--font-inter)]">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── FAQ Item ─── */
function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div
      className={cn(
        "border-b border-black/[0.06] transition-all duration-300",
        isOpen && "border-l-2 border-l-[#F97316]",
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 md:py-6 text-left group pl-4 md:pl-5"
      >
        <span
          className={cn(
            "font-[family-name:var(--font-plus-jakarta)] text-base md:text-lg font-semibold pr-4 transition-colors duration-300",
            isOpen
              ? "text-[#18181B]"
              : "text-[#18181B]/80 group-hover:text-[#18181B]",
          )}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0"
        >
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-colors duration-300",
              isOpen
                ? "text-[#F97316]"
                : "text-[#A1A1AA] group-hover:text-[#F97316]/60",
            )}
          />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 md:pb-6 pl-4 md:pl-5 text-[#71717A] text-sm md:text-base leading-relaxed font-[family-name:var(--font-inter)] max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── FAQ Accordion ─── */
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="divide-y divide-white/[0.06]">
      {FAQ_ITEMS.map((item, i) => (
        <FAQItem
          key={i}
          question={item.q}
          answer={item.a}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}

/* ─── Main Section ─── */
export function ContactSection({ onNavigate }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    timeline: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const updateField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  /* ─── Validation ─── */
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.service) newErrors.service = "Please select a service";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          services: [form.service],
          budget: form.budget,
          timeline: form.timeline,
          description: form.description,
          source: "",
          nda: false,
          privacy: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setIsSubmitted(true);
    } catch {
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Decorative dot-grid background */}
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      {/* ─── Split Layout ─── */}
      <div className="flex flex-col lg:flex-row">
        {/* LEFT COLUMN — Contact Info */}
        <div className="relative bg-[#FAFAFA] w-full lg:w-5/12 py-16 md:py-20 lg:py-36 px-6 md:px-12 lg:px-16 xl:px-20">
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent lg:right-auto lg:w-[200%]" />

          <div className="relative z-10 max-w-lg">
            <ScrollReveal direction="left">
              <SectionLabel label="Let's Build Together" />
              <h1 className="mt-5 font-[family-name:var(--font-plus-jakarta)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#18181B] leading-[1.1]">
                Start Your Project
              </h1>
              <p className="mt-4 text-[#A1A1AA] text-base md:text-lg font-[family-name:var(--font-inter)]">
                From idea to launch — we handle every layer.
              </p>
            </ScrollReveal>

            {/* Contact Methods */}
            <div className="mt-8 md:mt-10 space-y-3">
              <ScrollReveal direction="left" delay={0.1}>
                <ContactMethodCard
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone / WhatsApp"
                  value={CONTACT_INFO.phone}
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.15}>
                <ContactMethodCard
                  icon={<Mail className="h-4 w-4" />}
                  label="Project inquiries"
                  value={CONTACT_INFO.projectEmail}
                  href={`mailto:${CONTACT_INFO.projectEmail}`}
                />
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.2}>
                <ContactMethodCard
                  icon={<MessageCircle className="h-4 w-4" />}
                  label="Live Chat"
                  value="Chat with us"
                  subtext="Mon–Sat: 10AM–7PM IST"
                />
              </ScrollReveal>
            </div>

            {/* Office Locations */}
            <ScrollReveal direction="left" delay={0.25} className="mt-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#A1A1AA] font-[family-name:var(--font-inter)] mb-4">
                Our Offices
              </h3>
              <div className="space-y-4">
                {CONTACT_INFO.offices.map((office) => (
                  <div
                    key={office.city}
                    className="flex items-start gap-3 group"
                  >
                    <MapPin className="h-4 w-4 mt-0.5 text-[#F97316]/60 shrink-0" />
                    <div>
                      <span className="text-[#18181B] text-sm font-semibold font-[family-name:var(--font-plus-jakarta)] group-hover:text-[#F97316] transition-colors duration-300">
                        {office.city}
                      </span>
                      <p className="text-[#A1A1AA] text-xs font-[family-name:var(--font-inter)] mt-0.5">
                        {office.address}
                      </p>
                      <p className="text-[#A1A1AA]/60 text-[11px] font-[family-name:var(--font-inter)]">
                        {office.teamSize} team members
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Interactive Office Map */}
            <ScrollReveal direction="left" delay={0.3} className="mt-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#A1A1AA] font-[family-name:var(--font-inter)] mb-4">
                Global Presence
              </h3>
              <OfficeMap />
            </ScrollReveal>

            {/* Social Links */}
            <ScrollReveal direction="left" delay={0.35} className="mt-8">
              <SocialLinks />
            </ScrollReveal>

            {/* Response Time */}
            <ScrollReveal direction="left" delay={0.35} className="mt-8">
              <div className="flex items-center gap-3 text-sm text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                Response time: within 24 hours
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* RIGHT COLUMN — Direct Contact Form */}
        <div className="relative bg-white w-full lg:w-7/12 py-16 md:py-20 lg:py-36 px-6 md:px-12 lg:px-16 xl:px-20">
          {/* Gradient accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F97316] via-[#FB923C] to-transparent" />
          <div className="absolute top-[2px] left-0 right-0 h-px bg-black/[0.04]" />

          <div
            className="relative z-10 max-w-2xl mx-auto lg:mx-0"
            data-contact-form
          >
            {!isSubmitted ? (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Form Title */}
                <div className="mb-8 md:mb-10">
                  <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-[#18181B] text-center lg:text-left">
                    Tell Us About Your Project
                  </h2>
                  <p className="mt-2 text-[#71717A] text-sm font-[family-name:var(--font-inter)] text-center lg:text-left">
                    Fill in the details below and we&apos;ll get back to you
                    within 24 hours.
                  </p>
                </div>

                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <FormInput
                    label="Your Name"
                    value={form.name}
                    onChange={(v) => updateField("name", v)}
                    placeholder="Rahul Sharma"
                    required
                    error={errors.name}
                  />

                  <FormInput
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(v) => updateField("email", v)}
                    placeholder="rahul@company.com"
                    required
                    error={errors.email}
                  />
                </div>

                {/* Row 2: Phone & Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-4 md:mt-5">
                  <FormInput
                    label="Phone / WhatsApp"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => updateField("phone", v)}
                    placeholder="+91 98765 43210"
                    error={errors.phone}
                  />

                  <FormInput
                    label="Company"
                    value={form.company}
                    onChange={(v) => updateField("company", v)}
                    placeholder="Startup or Company Name"
                    error={errors.company}
                  />
                </div>

                {/* Row 3: Service Needed (Full Width Dropdown) */}
                <div className="mt-4 md:mt-5">
                  <FormSelect
                    label="Service Needed"
                    value={form.service}
                    onChange={(v) => updateField("service", v)}
                    placeholder="Select a service..."
                    required
                    error={errors.service}
                    options={SERVICE_NAMES}
                  />
                </div>

                {/* Row 4: Budget & Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-4 md:mt-5">
                  <FormSelect
                    label="Budget Range"
                    value={form.budget}
                    onChange={(v) => updateField("budget", v)}
                    placeholder="Select budget range..."
                    options={BUDGET_OPTIONS}
                    error={errors.budget}
                  />

                  <FormSelect
                    label="Timeline"
                    value={form.timeline}
                    onChange={(v) => updateField("timeline", v)}
                    placeholder="When to start?"
                    options={TIMELINE_OPTIONS}
                    error={errors.timeline}
                  />
                </div>

                {/* Row 5: Project Details */}
                <div className="mt-4 md:mt-5">
                  <FormTextarea
                    label="Project Details"
                    value={form.description}
                    onChange={(v) => updateField("description", v)}
                    placeholder="What are you building? Describe your project, goals, and any specific requirements..."
                    rows={5}
                    error={errors.description}
                  />
                </div>

                {/* Submit Error */}
                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mt-4 flex items-center gap-2 text-sm text-red-500 font-[family-name:var(--font-inter)]"
                    >
                      <AlertCircle className="size-4 shrink-0" />
                      {submitError}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full flex items-center justify-center gap-2 rounded-lg bg-[#F97316] px-6 py-4 font-[family-name:var(--font-inter)] text-base font-semibold text-white transition-all duration-300 hover:bg-[#EA580C] hover:shadow-[0_0_40px_rgba(249,115,22,0.35),0_0_80px_rgba(249,115,22,0.15)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none"
                  >
                    {/* Glow layer */}
                    <span className="absolute inset-0 rounded-lg bg-[#F97316] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50" />
                    <span className="relative">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="size-5 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        "Send Project Brief"
                      )}
                    </span>
                    {!isSubmitting && (
                      <ArrowRight className="size-5 relative transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </button>
                </div>

                {/* Privacy note */}
                <p className="mt-4 text-center text-[11px] text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                  By submitting, you agree to our Privacy Policy. We&apos;ll
                  never share your data.
                </p>
              </motion.form>
            ) : (
              /* ─── Success State ─── */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="flex items-center justify-center w-20 h-20 rounded-full bg-[#F97316]/10 mb-6"
                >
                  <Check className="w-10 h-10 text-[#F97316]" />
                </motion.div>
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-[#18181B]">
                  Project Brief Received!
                </h3>
                <p className="mt-3 text-[#71717A] text-base font-[family-name:var(--font-inter)] max-w-md">
                  Thank you, {form.name || "there"}! Our team will review your
                  project details and reach out within 24 hours.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] px-5 py-3 text-sm font-semibold text-[#18181B] font-[family-name:var(--font-inter)] hover:border-[#F97316]/30 hover:text-[#F97316] transition-all duration-300"
                  >
                    <Phone className="size-4" />
                    Chat on WhatsApp
                  </a>
                  <a
                    href={`mailto:${CONTACT_INFO.projectEmail}`}
                    className="flex items-center gap-2 rounded-lg bg-[#F97316] px-5 py-3 text-sm font-semibold text-white font-[family-name:var(--font-inter)] hover:bg-[#EA580C] transition-all duration-300"
                  >
                    <Mail className="size-4" />
                    Send Email
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ─── FAQ Section ─── */}
      <div className="bg-[#FAFAFA] py-16 md:py-20 px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <SectionLabel label="FAQ" />
            <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-[#18181B] text-center">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-[#71717A] text-base font-[family-name:var(--font-inter)] text-center max-w-xl mx-auto">
              Everything you need to know about working with Albos Technologies
              Pvt Ltd.
            </p>
          </ScrollReveal>
          <div className="mt-10">
            <FAQAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}
