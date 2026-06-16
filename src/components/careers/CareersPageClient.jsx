"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Loader2,
  AlertCircle,
  MapPin,
  Briefcase,
  DollarSign,
  Mail,
  Phone,
  Target,
  Code2,
  Eye,
  Shield,
  BookOpen,
  Users,
  Search,
  Globe,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { COMPANY_VALUES, CONTACT_INFO } from "@/lib/constants";

/* ─── Types ─── */

/* ─── Icon Mapping ─── */
const VALUE_ICONS = {
  Target,
  Code2,
  Eye,
  Shield,
  BookOpen,
  Users,
};

/* ─── Department Colors ─── */
const DEPARTMENT_COLORS = {
  Engineering: {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/20",
  },
  Design: {
    bg: "bg-pink-500/10",
    text: "text-pink-600",
    border: "border-pink-500/20",
  },
  DevOps: {
    bg: "bg-amber-500/10",
    text: "text-amber-600",
    border: "border-amber-500/20",
  },
  "AI/ML": {
    bg: "bg-purple-500/10",
    text: "text-purple-600",
    border: "border-purple-500/20",
  },
  "Quality Assurance": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600",
    border: "border-emerald-500/20",
  },
  "Business Development": {
    bg: "bg-cyan-500/10",
    text: "text-cyan-600",
    border: "border-cyan-500/20",
  },
  Marketing: {
    bg: "bg-rose-500/10",
    text: "text-rose-600",
    border: "border-rose-500/20",
  },
};

const DEFAULT_DEPT_COLOR = {
  bg: "bg-[#F97316]/10",
  text: "text-[#F97316]",
  border: "border-[#F97316]/20",
};

/* ─── Filter Options ─── */
const DEPARTMENTS = [
  "All",
  "Engineering",
  "Design",
  "DevOps",
  "AI/ML",
  "Quality Assurance",
  "Business Development",
  "Marketing",
];
const JOB_TYPES = ["All Types", "Full-time", "Internship", "Contract"];
const EXPERIENCE_OPTIONS = ["0-1", "1-2", "2-4", "4-6", "6-10", "10+"];
const NOTICE_PERIOD_OPTIONS = [
  "Immediate",
  "15 days",
  "30 days",
  "60 days",
  "90 days",
];
const SOURCE_OPTIONS = [
  "LinkedIn",
  "Naukri",
  "Referral",
  "Company Website",
  "Other",
];

/* ─── Perks Data ─── */
const PERKS = [
  { icon: Users, label: "250+ Engineers" },
  { icon: Globe, label: "12+ Industries" },
  { icon: Clock, label: "Flexible Hours" },
  { icon: GraduationCap, label: "Learning Budget" },
];

/* ─── Date Formatting ─── */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ─── Department Badge ─── */
function DepartmentBadge({ department }) {
  const colors = DEPARTMENT_COLORS[department] || DEFAULT_DEPT_COLOR;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] font-[family-name:var(--font-inter)] border",
        colors.bg,
        colors.text,
        colors.border,
      )}
    >
      {department}
    </span>
  );
}

/* ─── Job Type Badge ─── */
function JobTypeBadge({ type }) {
  const typeColors = {
    "Full-time": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    Internship: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    Contract: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    "Part-time": "bg-violet-500/10 text-violet-600 border-violet-500/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] font-[family-name:var(--font-inter)] border",
        typeColors[type] ||
          "bg-[#F97316]/10 text-[#F97316] border-[#F97316]/20",
      )}
    >
      {type}
    </span>
  );
}

/* ─── Value Card ─── */
function ValueCard({ value }) {
  const IconComponent = VALUE_ICONS[value.icon] || Target;
  return (
    <div className="group relative rounded-xl bg-white border border-black/[0.06] p-6 transition-all duration-300 hover:border-[#F97316]/20 hover:shadow-lg hover:shadow-[#F97316]/[0.04] hover:-translate-y-1">
      <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#F97316]/10 text-[#F97316] transition-colors duration-300 group-hover:bg-[#F97316] group-hover:text-white">
        <IconComponent className="h-5 w-5" />
      </div>
      <h3 className="font-[family-name:var(--font-plus-jakarta)] text-base font-bold text-[#18181B] mb-2">
        {value.title}
      </h3>
      <p className="text-[#52525B] text-sm leading-relaxed font-[family-name:var(--font-inter)]">
        {value.description}
      </p>
    </div>
  );
}

/* ─── Job Card ─── */
function JobCard({ job, isExpanded, onToggle, onApply }) {
  return (
    <div
      className={cn(
        "relative rounded-xl bg-white border transition-all duration-300",
        job.featured
          ? "border-l-[3px] border-l-[#F97316] border-t border-r border-b border-t-black/[0.06] border-r-black/[0.06] border-b-black/[0.06] shadow-md shadow-[#F97316]/[0.04]"
          : "border-black/[0.06] hover:border-[#F97316]/20 hover:shadow-lg hover:shadow-[#F97316]/[0.03]",
      )}
    >
      {/* Main Card Content */}
      <div className="p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Left: Job Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              {job.featured && (
                <span className="inline-flex items-center rounded-full bg-[#F97316]/15 text-[#F97316] border border-[#F97316]/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] font-[family-name:var(--font-inter)]">
                  Featured
                </span>
              )}
              <DepartmentBadge department={job.department} />
              <JobTypeBadge type={job.type} />
            </div>

            <h3
              className="font-[family-name:var(--font-plus-jakarta)] text-lg md:text-xl font-bold text-[#18181B] leading-tight cursor-pointer hover:text-[#F97316] transition-colors duration-300"
              onClick={onToggle}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onToggle();
                }
              }}
            >
              {job.title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#71717A] font-[family-name:var(--font-inter)]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" />
                {job.experience}
              </span>
              {job.salary && (
                <span className="inline-flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" />
                  {job.salary}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {formatDate(job.postedAt)}
              </span>
            </div>

            {/* Skills Pills */}
            {job.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.skills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-md bg-[#F5F5F0] px-2.5 py-1 text-[11px] font-medium text-[#52525B] font-[family-name:var(--font-inter)]"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills.length > 6 && (
                  <span className="inline-flex items-center rounded-md bg-[#F5F5F0] px-2.5 py-1 text-[11px] font-medium text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                    +{job.skills.length - 6} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <button
              onClick={onApply}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-white font-[family-name:var(--font-inter)] transition-all duration-300 hover:bg-[#EA580C] hover:shadow-lg hover:shadow-[#F97316]/20 active:scale-[0.97]"
            >
              Apply Now
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onToggle}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#A1A1AA] font-[family-name:var(--font-inter)] hover:text-[#F97316] transition-colors duration-300"
              aria-expanded={isExpanded}
              aria-label={
                isExpanded ? "Collapse job details" : "Expand job details"
              }
            >
              {isExpanded ? "Less" : "Details"}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  isExpanded && "rotate-180",
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-black/[0.06] px-5 md:px-6 py-5 md:py-6">
              {/* Description */}
              <div className="mb-5">
                <h4 className="font-[family-name:var(--font-plus-jakarta)] text-sm font-bold text-[#18181B] uppercase tracking-[0.08em] mb-3">
                  About this role
                </h4>
                <div className="text-[#52525B] text-sm leading-relaxed font-[family-name:var(--font-inter)] space-y-3">
                  {job.description.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              {job.requirements.length > 0 && (
                <div className="mb-5">
                  <h4 className="font-[family-name:var(--font-plus-jakarta)] text-sm font-bold text-[#18181B] uppercase tracking-[0.08em] mb-3">
                    Requirements
                  </h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[#52525B] font-[family-name:var(--font-inter)]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#F97316] shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {job.benefits.length > 0 && (
                <div>
                  <h4 className="font-[family-name:var(--font-plus-jakarta)] text-sm font-bold text-[#18181B] uppercase tracking-[0.08em] mb-3">
                    Benefits
                  </h4>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[#52525B] font-[family-name:var(--font-inter)]"
                      >
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* All Skills */}
              {job.skills.length > 6 && (
                <div className="mt-5">
                  <h4 className="font-[family-name:var(--font-plus-jakarta)] text-sm font-bold text-[#18181B] uppercase tracking-[0.08em] mb-3">
                    All Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-md bg-[#FFF7ED] border border-[#F97316]/20 px-2.5 py-1 text-[11px] font-medium text-[#F97316] font-[family-name:var(--font-inter)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Application Form ─── */
function ApplicationForm({ jobs }) {
  const [applicationType, setApplicationType] = useState("listed");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [customRoleTitle, setCustomRoleTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [experience, setExperience] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileError, setResumeFileError] = useState(null);
  const [noticePeriod, setNoticePeriod] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [source, setSource] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const selectedJob = jobs.find((j) => j.id === selectedJobId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    if (!resumeFile && !resumeUrl.trim()) {
      setSubmitError(
        "Please upload your resume (PDF, DOC, or DOCX) or provide a resume link.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      if (phone) formData.append("phone", phone.trim());
      if (currentCompany)
        formData.append("currentCompany", currentCompany.trim());
      if (experience) formData.append("experience", experience.trim());
      if (linkedinUrl) formData.append("linkedinUrl", linkedinUrl.trim());
      if (portfolioUrl) formData.append("portfolioUrl", portfolioUrl.trim());
      if (resumeUrl) formData.append("resumeUrl", resumeUrl.trim());
      if (noticePeriod) formData.append("noticePeriod", noticePeriod.trim());
      if (expectedSalary)
        formData.append("expectedSalary", expectedSalary.trim());
      if (source) formData.append("source", source.trim());
      if (coverLetter) formData.append("coverLetter", coverLetter.trim());
      if (resumeFile) formData.append("resume", resumeFile);

      if (applicationType === "listed") {
        if (!selectedJobId) {
          setSubmitError("Please select a job position.");
          setIsSubmitting(false);
          return;
        }
        formData.append("jobId", selectedJobId);
        formData.append("jobTitle", selectedJob?.title || "");
        formData.append("customRole", "false");
      } else {
        if (!customRoleTitle.trim()) {
          setSubmitError("Please specify the role you are applying for.");
          setIsSubmitting(false);
          return;
        }
        formData.append("customRole", "true");
        formData.append("customRoleTitle", customRoleTitle.trim());
        formData.append("jobId", "custom");
        formData.append("jobTitle", customRoleTitle.trim());
      }

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg bg-white border border-black/[0.08] px-4 py-3 text-sm font-[family-name:var(--font-inter)] text-[#18181B] placeholder:text-[#A1A1AA] outline-none transition-all duration-300 focus:border-[#F97316]/40 focus:ring-2 focus:ring-[#F97316]/10";

  const selectClass =
    'w-full rounded-lg bg-white border border-black/[0.08] px-4 py-3 text-sm font-[family-name:var(--font-inter)] text-[#18181B] outline-none transition-all duration-300 focus:border-[#F97316]/40 focus:ring-2 focus:ring-[#F97316]/10 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23A1A1AA%22%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E")] bg-[position:right_12px_center] bg-no-repeat';

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-white border border-black/[0.06] p-8 md:p-12 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-6">
          <Check className="h-8 w-8 text-emerald-500" />
        </div>
        <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#18181B] mb-3">
          Application Submitted!
        </h3>
        <p className="text-[#52525B] text-sm font-[family-name:var(--font-inter)] max-w-md mx-auto leading-relaxed">
          Thank you for applying
          {applicationType === "listed" && selectedJob
            ? ` for ${selectedJob.title}`
            : ""}
          . Our HR team will review your application and get back to you within
          5 business days.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8">
      {/* Application Type Toggle */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#18181B] font-[family-name:var(--font-plus-jakarta)] mb-3">
          I want to apply for:
        </label>
        <div className="flex rounded-lg border border-black/[0.08] overflow-hidden">
          <button
            type="button"
            onClick={() => setApplicationType("listed")}
            className={cn(
              "flex-1 px-4 py-2.5 text-sm font-medium font-[family-name:var(--font-inter)] transition-all duration-300",
              applicationType === "listed"
                ? "bg-[#F97316] text-white"
                : "bg-white text-[#71717A] hover:text-[#18181B]",
            )}
          >
            A listed role
          </button>
          <button
            type="button"
            onClick={() => setApplicationType("custom")}
            className={cn(
              "flex-1 px-4 py-2.5 text-sm font-medium font-[family-name:var(--font-inter)] transition-all duration-300",
              applicationType === "custom"
                ? "bg-[#F97316] text-white"
                : "bg-white text-[#71717A] hover:text-[#18181B]",
            )}
          >
            A custom role
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Selection / Custom Role */}
        {applicationType === "listed" ? (
          <div>
            <label
              htmlFor="jobSelect"
              className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
            >
              Position <span className="text-[#F97316]">*</span>
            </label>
            <select
              id="jobSelect"
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              required
              className={selectClass}
            >
              <option value="">Select a position...</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} — {job.department}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label
              htmlFor="customRoleTitle"
              className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
            >
              Role you are applying for{" "}
              <span className="text-[#F97316]">*</span>
            </label>
            <input
              id="customRoleTitle"
              type="text"
              value={customRoleTitle}
              onChange={(e) => setCustomRoleTitle(e.target.value)}
              required
              placeholder="e.g. Product Manager, Data Analyst..."
              className={inputClass}
            />
          </div>
        )}

        {/* Full Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
            >
              Full Name <span className="text-[#F97316]">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="John Doe"
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
            >
              Email <span className="text-[#F97316]">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
              className={inputClass}
            />
          </div>
        </div>

        {/* Phone & Current Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
            >
              Phone / WhatsApp
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="currentCompany"
              className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
            >
              Current Company
            </label>
            <input
              id="currentCompany"
              type="text"
              value={currentCompany}
              onChange={(e) => setCurrentCompany(e.target.value)}
              placeholder="Acme Corp"
              className={inputClass}
            />
          </div>
        </div>

        {/* Experience & LinkedIn */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
            >
              Years of Experience
            </label>
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className={selectClass}
            >
              <option value="">Select...</option>
              {EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} years
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="linkedinUrl"
              className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
            >
              LinkedIn Profile URL
            </label>
            <input
              id="linkedinUrl"
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className={inputClass}
            />
          </div>
        </div>

        {/* Portfolio */}
        <div>
          <label
            htmlFor="portfolioUrl"
            className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
          >
            Portfolio / GitHub URL
          </label>
          <input
            id="portfolioUrl"
            type="url"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            placeholder="https://github.com/..."
            className={inputClass}
          />
        </div>

        {/* Resume file upload */}
        <div>
          <label
            htmlFor="resumeFile"
            className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
          >
            Resume / CV <span className="text-[#F97316]">*</span>
          </label>
          <input
            id="resumeFile"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setResumeFileError(null);
              if (!file) {
                setResumeFile(null);
                return;
              }
              const ext = file.name
                .slice(file.name.lastIndexOf("."))
                .toLowerCase();
              if (![".pdf", ".doc", ".docx"].includes(ext)) {
                setResumeFile(null);
                setResumeFileError("Please upload a PDF, DOC, or DOCX file.");
                e.target.value = "";
                return;
              }
              if (file.size > 5 * 1024 * 1024) {
                setResumeFile(null);
                setResumeFileError("Resume must be 5 MB or smaller.");
                e.target.value = "";
                return;
              }
              setResumeFile(file);
            }}
            className={cn(
              inputClass,
              "file:mr-4 file:rounded-md file:border-0 file:bg-[#F97316]/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-[#F97316] hover:file:bg-[#F97316]/20",
            )}
          />

          {resumeFile && (
            <p className="mt-1.5 text-xs text-[#52525B] font-[family-name:var(--font-inter)]">
              Selected: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(0)}{" "}
              KB)
            </p>
          )}
          {resumeFileError && (
            <p className="mt-1.5 text-xs text-red-600 font-[family-name:var(--font-inter)]">
              {resumeFileError}
            </p>
          )}
          <p className="mt-1.5 text-xs text-[#A1A1AA] font-[family-name:var(--font-inter)]">
            PDF, DOC, or DOCX — max 5 MB. Attached to the email sent to our HR
            team.
          </p>
        </div>

        {/* Optional resume link */}
        <div>
          <label
            htmlFor="resumeUrl"
            className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
          >
            Resume link (optional)
          </label>
          <input
            id="resumeUrl"
            type="url"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            placeholder="https://drive.google.com/... (if you also host it online)"
            className={inputClass}
          />
        </div>

        {/* Notice Period & Expected Salary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="noticePeriod"
              className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
            >
              Notice Period
            </label>
            <select
              id="noticePeriod"
              value={noticePeriod}
              onChange={(e) => setNoticePeriod(e.target.value)}
              className={selectClass}
            >
              <option value="">Select...</option>
              {NOTICE_PERIOD_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="expectedSalary"
              className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
            >
              Expected Salary
            </label>
            <input
              id="expectedSalary"
              type="text"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              placeholder="e.g. ₹12L PA"
              className={inputClass}
            />
          </div>
        </div>

        {/* Source */}
        <div>
          <label
            htmlFor="source"
            className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
          >
            How did you hear about us?
          </label>
          <select
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className={selectClass}
          >
            <option value="">Select...</option>
            {SOURCE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Cover Letter */}
        <div>
          <label
            htmlFor="coverLetter"
            className="block text-sm font-medium text-[#18181B] font-[family-name:var(--font-inter)] mb-1.5"
          >
            Cover Letter
          </label>
          <textarea
            id="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows={4}
            placeholder="Tell us why you'd be a great fit..."
            className={cn(inputClass, "resize-y min-h-[100px]")}
          />
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 text-sm text-red-600 font-[family-name:var(--font-inter)]"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {submitError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-[#F97316] px-6 py-3.5 text-sm font-semibold text-white font-[family-name:var(--font-inter)] transition-all duration-300 hover:bg-[#EA580C] hover:shadow-lg hover:shadow-[#F97316]/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting…
            </span>
          ) : (
            "Submit Application"
          )}
        </button>

        {/* Privacy Note */}
        <p className="text-center text-[11px] text-[#A1A1AA] font-[family-name:var(--font-inter)] leading-relaxed">
          By submitting, you agree to our privacy policy. Your data will be used
          solely for recruitment purposes and will not be shared with third
          parties.
        </p>
      </form>
    </div>
  );
}

/* ─── Empty State ─── */
function EmptyState() {
  return (
    <div className="py-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F5F5F0] mb-6">
        <Search className="h-7 w-7 text-[#A1A1AA]" />
      </div>
      <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-bold text-[#18181B] mb-2">
        No positions found
      </h3>
      <p className="text-[#52525B] font-[family-name:var(--font-inter)] text-sm max-w-md mx-auto">
        No open positions match your current filters. Try adjusting the
        department or job type, or check back soon for new openings.
      </p>
    </div>
  );
}

/* ─── Main Client Component ─── */
export function CareersPageClient({ jobs }) {
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [activeJobType, setActiveJobType] = useState("All Types");
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [applyToJobId, setApplyToJobId] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleDepartmentChange = useCallback((dept) => {
    setActiveDepartment(dept);
    setHasInteracted(true);
  }, []);

  const handleJobTypeChange = useCallback((type) => {
    setActiveJobType(type);
    setHasInteracted(true);
  }, []);

  const handleApply = useCallback((jobId) => {
    setApplyToJobId(jobId);
    // Scroll to form
    const formSection = document.getElementById("application-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const deptMatch =
      activeDepartment === "All" || job.department === activeDepartment;
    const typeMatch =
      activeJobType === "All Types" || job.type === activeJobType;
    return deptMatch && typeMatch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Navbar activePage="careers" />

      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#18181B] overflow-hidden">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial gradient glow */}
        <div className="absolute -top-1/2 -right-1/4 w-[60%] h-[150%] rounded-full bg-[#F97316]/[0.04] blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[40%] h-[120%] rounded-full bg-[#F97316]/[0.03] blur-[80px] pointer-events-none" />

        <div className="relative z-10 pt-28 md:pt-36 pb-20 md:pb-28">
          <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm font-[family-name:var(--font-inter)]">
                <li>
                  <Link
                    href="/"
                    className="text-[#A1A1AA] hover:text-[#F97316] transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-[#A1A1AA]/40">/</li>
                <li className="text-[#FAFAFA] font-medium">Careers</li>
              </ol>
            </nav>

            {/* Section Label */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#F97316] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F97316]" />
              </span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-[#F97316] font-semibold">
                Careers
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FAFAFA] leading-[1.05] tracking-tight">
              Build the Future <span className="text-gradient">with Us</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-[#A1A1AA] text-lg md:text-xl font-[family-name:var(--font-inter)] max-w-2xl leading-relaxed">
              Join Albos Technologies Pvt Ltd and shape the next generation of
              enterprise software. Work on meaningful projects with a team that
              values craft, ownership, and growth.
            </p>

            {/* Perks Highlight Row */}
            <div className="mt-8 flex flex-wrap gap-3">
              {PERKS.map((perk) => {
                const Icon = perk.icon;
                return (
                  <span
                    key={perk.label}
                    className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/[0.08] px-4 py-2 text-sm font-medium text-[#FAFAFA]/80 font-[family-name:var(--font-inter)]"
                  >
                    <Icon className="h-4 w-4 text-[#F97316]" />
                    {perk.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Culture / Why Join Us Section ─── */}
      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-[#F97316] font-semibold">
              Our Culture
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#18181B] leading-tight">
              Why Albos?
            </h2>
            <p className="mt-4 text-[#52525B] text-base md:text-lg font-[family-name:var(--font-inter)] max-w-2xl mx-auto leading-relaxed">
              Six principles that define how we build, collaborate, and grow —
              every single day.
            </p>
          </div>

          {/* Value Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {COMPANY_VALUES.map((value) => (
              <ValueCard key={value.title} value={value} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Open Positions Section ─── */}
      <section className="py-16 md:py-24 bg-[#FAFAFA]" id="open-positions">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          {/* Section Header */}
          <div className="mb-8 md:mb-10">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-[#F97316] font-semibold">
              Open Positions
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#18181B] leading-tight">
              Find Your Role
            </h2>
          </div>

          {/* Department Filter Pills */}
          <div className="mb-4 flex flex-wrap items-center gap-2 md:gap-3">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => handleDepartmentChange(dept)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium font-[family-name:var(--font-inter)] transition-all duration-300",
                  activeDepartment === dept
                    ? "bg-[#F97316] text-white shadow-lg shadow-[#F97316]/20"
                    : "border border-black/[0.08] text-[#A1A1AA] hover:border-[#F97316]/30 hover:text-[#F97316] hover:bg-[#F97316]/[0.04]",
                )}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Type Filter Pills */}
          <div className="mb-8 flex flex-wrap items-center gap-2 md:gap-3">
            {JOB_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => handleJobTypeChange(type)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium font-[family-name:var(--font-inter)] transition-all duration-300",
                  activeJobType === type
                    ? "bg-[#18181B] text-white"
                    : "border border-black/[0.08] text-[#71717A] hover:border-[#18181B]/20 hover:text-[#18181B]",
                )}
              >
                {type}
              </button>
            ))}
            <span className="ml-auto text-xs font-medium text-[#A1A1AA] font-[family-name:var(--font-inter)] hidden sm:inline-block">
              {filteredJobs.length} position
              {filteredJobs.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Job Listings */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeDepartment}-${activeJobType}`}
              initial={hasInteracted ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {filteredJobs.length > 0 ? (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isExpanded={expandedJobId === job.id}
                      onToggle={() =>
                        setExpandedJobId((prev) =>
                          prev === job.id ? null : job.id,
                        )
                      }
                      onApply={() => handleApply(job.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── Application Form Section ─── */}
      <section className="py-16 md:py-24 bg-[#F5F5F0]" id="application-form">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Info */}
            <div>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-[#F97316] font-semibold">
                Apply Now
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-bold text-[#18181B] leading-tight">
                Ready to join
                <br />
                the team?
              </h2>
              <p className="mt-4 text-[#52525B] text-base font-[family-name:var(--font-inter)] leading-relaxed">
                Fill out the form and our talent acquisition team will review
                your application. We typically respond within 5 business days.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href={`mailto:${CONTACT_INFO.hrEmail}`}
                  className="flex items-center gap-3 text-sm font-[family-name:var(--font-inter)] text-[#52525B] hover:text-[#F97316] transition-colors duration-300"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#F97316]/10 text-[#F97316]">
                    <Mail className="h-4 w-4" />
                  </span>
                  {CONTACT_INFO.hrEmail}
                </a>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Chat on WhatsApp: ${CONTACT_INFO.phone}`}
                  className="flex items-center gap-3 text-sm font-[family-name:var(--font-inter)] text-[#52525B] hover:text-[#F97316] transition-colors duration-300"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#F97316]/10 text-[#F97316]">
                    <Phone className="h-4 w-4" />
                  </span>
                  {CONTACT_INFO.phone}
                </a>
                <Link
                  href={`https://www.linkedin.com/company/albos-technologies`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-[family-name:var(--font-inter)] text-[#52525B] hover:text-[#F97316] transition-colors duration-300"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#F97316]/10 text-[#F97316]">
                    <ExternalLink className="h-4 w-4" />
                  </span>
                  Follow us on LinkedIn
                </Link>
              </div>

              {/* Selected Job Highlight */}
              {applyToJobId && (
                <div className="mt-8 p-4 rounded-xl bg-white border border-[#F97316]/20">
                  <p className="text-xs font-medium text-[#F97316] font-[family-name:var(--font-inter)] uppercase tracking-[0.08em] mb-1">
                    Applying for
                  </p>
                  <p className="font-[family-name:var(--font-plus-jakarta)] text-base font-bold text-[#18181B]">
                    {jobs.find((j) => j.id === applyToJobId)?.title}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Form */}
            <ApplicationForm jobs={jobs} />
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <Footer />
    </div>
  );
}
