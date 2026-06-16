import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Calendar, Clock, Users } from "lucide-react";
import {
  getCaseStudyBySlug,
  getPublishedCaseStudies,
} from "@/data/case-studies";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CaseStudyDetailPageClient } from "./CaseStudyDetailPageClient";

export async function generateStaticParams() {
  return getPublishedCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Case Study Not Found | Albos Technologies Pvt Ltd" };
  }

  const canonicalUrl = `https://albostechnologies.com/case-studies/${study.slug}`;

  return {
    title: `${study.title} Case Study | Albos Technologies Pvt Ltd`,
    description: study.excerpt,
    keywords: [study.category, study.title, "case study", "Albos Technologies"],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${study.title} — Case Study`,
      description: study.excerpt,
      type: "article",
      url: canonicalUrl,
      siteName: "Albos Technologies Pvt Ltd",
      images: study.image ? [{ url: study.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — Case Study`,
      description: study.excerpt,
    },
  };
}

export default async function CaseStudyDetailPage({ params }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const relatedStudies = getPublishedCaseStudies()
    .filter((s) => s.slug !== study.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${study.title} Case Study`,
    description: study.excerpt,
    image: `https://albostechnologies.com${study.image}`,
    author: { "@type": "Organization", name: "Albos Technologies Pvt Ltd" },
    publisher: {
      "@type": "Organization",
      name: "Albos Technologies Pvt Ltd",
      url: "https://albostechnologies.com",
    },
    datePublished: `${study.year}-01-01`,
    keywords: study.techStack.join(", "),
  };

  return (
    <>
      <Navbar activePage="case-studies" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — mirrors blog detail layout */}
      <section className="relative bg-[#18181B] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F97316] via-[#FB923C] to-transparent" />

        <div className="relative mx-auto max-w-4xl px-6 pt-28 pb-12 md:pt-36 md:pb-16 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-sm font-[family-name:var(--font-inter)] text-[#A1A1AA]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#F97316] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="mx-1">/</span>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="hover:text-[#F97316] transition-colors"
                >
                  Case Studies
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="mx-1">/</span>
              </li>
              <li className="text-[#F97316]">{study.category}</li>
            </ol>
          </nav>

          <span className="inline-flex items-center rounded-full bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] font-[family-name:var(--font-inter)]">
            {study.category}
          </span>

          <h1 className="mt-6 font-[family-name:var(--font-plus-jakarta)] text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white leading-[1.1] tracking-tight">
            {study.title}
          </h1>

          <p className="mt-4 text-[#A1A1AA] text-base md:text-lg font-[family-name:var(--font-inter)] leading-relaxed max-w-2xl">
            {study.excerpt}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F97316]/15 border border-[#F97316]/25 px-4 py-2">
            <span className="text-[#F97316] font-[family-name:var(--font-plus-jakarta)] text-lg font-bold">
              {study.result}
            </span>
            <span className="text-[#A1A1AA] text-xs font-[family-name:var(--font-inter)]">
              key outcome
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 md:gap-6 text-xs font-[family-name:var(--font-inter)] text-[#A1A1AA]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {study.year}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {study.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {study.teamSize}
            </span>
            <span>{study.client}</span>
          </div>

          <div className="mt-8 relative rounded-2xl overflow-hidden aspect-[21/9] ring-1 ring-white/10">
            <Image
              src={study.image}
              alt={`${study.title} — ${study.category} case study`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16 lg:py-20">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-[family-name:var(--font-inter)] text-[#71717A] hover:text-[#F97316] transition-colors mb-10 group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Case Studies
          </Link>

          {/* Challenge & solution summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-2xl border border-[#E4E4E7] bg-white p-6">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#18181B] mb-3">
                The challenge
              </h2>
              <p className="text-[#52525B] text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                {study.challenge}
              </p>
            </div>
            <div className="rounded-2xl border border-[#E4E4E7] bg-white p-6">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#18181B] mb-3">
                Our solution
              </h2>
              <p className="text-[#52525B] text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                {study.solution}
              </p>
            </div>
          </div>

          {/* Outcomes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {study.outcomes.map((outcome) => (
              <div
                key={outcome.label}
                className="rounded-xl border border-[#E4E4E7] bg-white p-4 text-center"
              >
                <p className="font-[family-name:var(--font-plus-jakarta)] text-xl md:text-2xl font-bold text-[#F97316]">
                  {outcome.value}
                </p>
                <p className="mt-1 text-[11px] text-[#71717A] font-[family-name:var(--font-inter)]">
                  {outcome.label}
                </p>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="mb-12 flex flex-wrap gap-2">
            {study.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-[#F5F5F0] border border-[#E4E4E7] px-3 py-1 text-xs font-medium text-[#52525B] font-[family-name:var(--font-inter)]"
              >
                {tech}
              </span>
            ))}
          </div>

          <CaseStudyDetailPageClient content={study.content} />

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-[#18181B] p-8 md:p-10 text-center">
            <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-white">
              Build something like {study.title}?
            </h3>
            <p className="mt-3 text-[#A1A1AA] text-sm font-[family-name:var(--font-inter)] max-w-md mx-auto">
              Talk to our team about your product roadmap — we ship enterprise
              software end to end.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold text-white font-[family-name:var(--font-inter)] hover:bg-[#EA580C] transition-colors"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedStudies.length > 0 && (
        <section className="bg-white border-t border-[#E4E4E7] py-16 md:py-20">
          <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-[#18181B] mb-8">
              More case studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedStudies.map((related) => (
                <Link
                  key={related.slug}
                  href={`/case-studies/${related.slug}`}
                  className="group rounded-2xl border border-[#E4E4E7] overflow-hidden hover:border-[#F97316]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] bg-[#18181B]">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F97316]">
                      {related.category}
                    </span>
                    <h3 className="mt-2 font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#18181B] group-hover:text-[#F97316] transition-colors">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#71717A] line-clamp-2 font-[family-name:var(--font-inter)]">
                      {related.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
