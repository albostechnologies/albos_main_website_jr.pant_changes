import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  MapPin,
  Users,
  Globe,
  Smartphone,
  Boxes,
  Webhook,
  Cpu,
  Gamepad2,
  Megaphone,
  Building2,
  Headset,
  Cloud,
  ShoppingCart,
  ShoppingBag,
  LayoutDashboard,
  Newspaper,
  Briefcase,
  Layers,
  Watch,
  Rocket,
  Sparkles,
  FileCode,
  Landmark,
  Gem,
  Coins,
  Vote,
  Wallet,
  Server,
  Share2,
  Plug,
  ShieldCheck,
  Zap,
  Network,
  Gauge,
  Wifi,
  Camera,
  Glasses,
  Search,
  Target,
  PenTool,
  LineChart,
  Mail,
  Workflow,
  Database,
  PhoneIncoming,
  PhoneOutgoing,
  MessageSquare,
} from "lucide-react";
import {
  getServiceBySlug,
  getServiceSlugs,
  getRelatedServices,
  getServiceImage,
  getServiceOgImage,
} from "@/data/services";
import { PROCESS_STEPS } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceFAQ } from "./ServiceFAQ";
import { TechLogo } from "./TechLogo";

const ICONS = {
  Globe,
  Smartphone,
  Boxes,
  Webhook,
  Cpu,
  Gamepad2,
  Megaphone,
  Building2,
  Headset,
  Cloud,
  ShoppingCart,
  ShoppingBag,
  LayoutDashboard,
  Newspaper,
  Briefcase,
  Layers,
  Watch,
  Rocket,
  FileCode,
  Landmark,
  Gem,
  Coins,
  Vote,
  Wallet,
  Server,
  Share2,
  Plug,
  ShieldCheck,
  Zap,
  Network,
  Gauge,
  Wifi,
  Camera,
  Glasses,
  Users,
  Search,
  Target,
  PenTool,
  LineChart,
  Mail,
  Workflow,
  Database,
  PhoneIncoming,
  PhoneOutgoing,
  MessageSquare,
};

const PROSE = {
  p: "font-[family-name:var(--font-inter)] text-base md:text-[17px] text-[#3F3F46] leading-[1.8] mb-6",
  h2: "font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-[#18181B] mt-10 mb-4 leading-tight tracking-tight",
  lead: "font-[family-name:var(--font-inter)] text-lg md:text-xl text-[#52525B] leading-[1.75] mb-8",
};

function SectionHeader({ label, title, description }) {
  return (
    <div className="mb-10">
      <p className="text-xs uppercase tracking-[0.15em] text-[#F97316] font-[family-name:var(--font-jetbrains-mono)] font-semibold mb-3">
        {label}
      </p>
      <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-[#18181B] tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[#71717A] text-base font-[family-name:var(--font-inter)] leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

function RelatedServiceCard({ service }) {
  const ServiceIcon = ICONS[service.icon] ?? Globe;
  const image = getServiceImage(service.slug);
  const displayCaps = service.capabilities.slice(0, 3);

  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <article className="relative overflow-hidden rounded-2xl bg-white border border-[#E4E4E7] card-hover-lift h-full flex flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#18181B]">
          <Image
            src={image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] font-[family-name:var(--font-inter)]">
              <ServiceIcon className="size-3" />
              Service {service.id}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#18181B] leading-snug line-clamp-2 group-hover:text-[#F97316] transition-colors duration-300">
            {service.title}
          </h3>
          <p className="mt-2 text-[#71717A] text-sm leading-relaxed font-[family-name:var(--font-inter)] line-clamp-2 flex-1">
            {service.tagline}
          </p>
          <div className="mt-4 flex items-center justify-between text-[11px] text-[#A1A1AA] font-[family-name:var(--font-inter)]">
            <span>{service.metric}</span>
            <span>{service.locations.join(", ")}</span>
          </div>
          {displayCaps.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {displayCaps.map((cap) => (
                <span
                  key={cap}
                  className="inline-flex items-center rounded-full bg-[#F5F5F0] px-2.5 py-0.5 text-[10px] font-medium text-[#71717A] font-[family-name:var(--font-inter)]"
                >
                  {cap}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found | Albos Technologies Pvt Ltd" };
  }

  const canonicalUrl = `https://albostechnologies.com/services/${service.slug}`;
  const seo = service.seo || {};
  const metaTitle =
    seo.metaTitle || `${service.title} Services | Albos Technologies Pvt Ltd`;
  const metaDescription = seo.metaDescription || service.description;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [
      ...(seo.keywords || []),
      ...(seo.focusKeyword ? [seo.focusKeyword] : []),
      service.title,
      ...service.capabilities,
      ...service.techStack,
      "Albos Technologies",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
      url: canonicalUrl,
      siteName: "Albos Technologies Pvt Ltd",
      images: [{ url: getServiceOgImage(service.slug) }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const related = getRelatedServices(service.slug, 3);
  const Icon = ICONS[service.icon] ?? Globe;
  const heroImage = getServiceImage(service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: `https://albostechnologies.com/services/${service.slug}`,
    areaServed: service.locations,
    provider: {
      "@type": "Organization",
      name: "Albos Technologies Pvt Ltd",
      url: "https://albostechnologies.com",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} capabilities`,
      itemListElement: service.capabilities.map((capability) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: capability },
      })),
    },
  };

  const faqJsonLd =
    service.faqs?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  const bodyParagraphs =
    service.content?.length > 0 ? service.content : [service.description];

  return (
    <>
      <Navbar activePage="services" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* ─── Service Hero (blog-style) ─── */}
      <section className="relative bg-[#18181B] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -top-1/4 -right-1/4 w-[60%] h-[120%] rounded-full bg-[#F97316]/[0.06] blur-3xl" />
        <div className="absolute -bottom-1/3 -left-1/4 w-[40%] h-[80%] rounded-full bg-[#F97316]/[0.04] blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20 pt-28 md:pt-36 lg:pt-44 pb-12 md:pb-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm font-[family-name:var(--font-inter)] text-[#A1A1AA]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#F97316] transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="mx-1">/</span>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#F97316] transition-colors duration-200"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="mx-1">/</span>
              </li>
              <li className="text-white/60 truncate max-w-[240px]">
                {service.title}
              </li>
            </ol>
          </nav>

          <span className="inline-flex items-center gap-2 rounded-full bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] font-[family-name:var(--font-inter)]">
            <Icon className="size-3.5" />
            Service {service.id}
          </span>

          <h1 className="mt-6 font-[family-name:var(--font-plus-jakarta)] text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white leading-[1.1] tracking-tight max-w-4xl">
            {service.title}
          </h1>

          <p className="mt-4 text-[#A1A1AA] text-base md:text-lg font-[family-name:var(--font-inter)] leading-relaxed max-w-2xl">
            {service.tagline}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#FB923C] flex items-center justify-center text-white shadow-lg shadow-[#F97316]/20">
                <Icon className="size-5" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm font-[family-name:var(--font-inter)]">
                  Albos Technologies
                </p>
                <p className="text-[#A1A1AA] text-xs font-[family-name:var(--font-inter)]">
                  {service.metric}
                </p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-white/10" />

            <div className="flex items-center gap-4 text-xs font-[family-name:var(--font-inter)] text-[#A1A1AA]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5 text-[#F97316]" />
                {service.locations.join(", ")}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#A1A1AA]/40" />
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-3.5 text-[#F97316]" />
                {service.techStack.slice(0, 3).join(" · ")}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold text-white font-[family-name:var(--font-inter)] transition-all hover:bg-[#EA580C] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] active:scale-95"
            >
              Start a project
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white font-[family-name:var(--font-inter)] transition-all hover:border-[#F97316]/50 hover:text-[#F97316]"
            >
              All services
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-8 relative rounded-2xl overflow-hidden aspect-[21/9] ring-1 ring-white/10">
            <Image
              src={heroImage}
              alt={`${service.title} — Albos Technologies`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* ─── Article Body (blog-style narrow column) ─── */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-[var(--container-max)] px-6 py-12 md:py-16 lg:py-20">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-[family-name:var(--font-inter)] text-[#71717A] hover:text-[#F97316] transition-colors duration-200 mb-10 group"
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
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
            Back to Services
          </Link>

          <p className={PROSE.p}>{service.overview}</p>

          {bodyParagraphs.map((paragraph, i) => (
            <p key={i} className={PROSE.p}>
              {paragraph}
            </p>
          ))}

          {service.contentSections?.map((section) => (
            <article key={section.heading}>
              <h2 className={PROSE.h2}>{section.heading}</h2>
              {section.paragraphs.map((paragraph, pi) => (
                <p key={pi} className={PROSE.p}>
                  {paragraph}
                </p>
              ))}
            </article>
          ))}

          {/* Key outcomes */}
          <div className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {service.outcomes.map((outcome) => (
              <div
                key={outcome.label}
                className="rounded-2xl border border-[#E4E4E7] bg-white p-5 text-center"
              >
                <p className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-[#F97316]">
                  {outcome.value}
                </p>
                <p className="mt-1 text-xs text-[#71717A] font-[family-name:var(--font-inter)]">
                  {outcome.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ─── Related services (blog-style) ─── */}
      {related.length > 0 && (
        <section className="bg-[#FAFAFA] pb-16 md:pb-20">
          <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
            <SectionHeader label="Explore More" title="Related services" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((other) => (
                <RelatedServiceCard key={other.slug} service={other} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-[#18181B] p-10 text-center md:p-14">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F97316] to-transparent" />
            <div className="pointer-events-none absolute -bottom-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F97316]/10 blur-[120px]" />
            <h2 className="relative font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-white">
              Ready to start your {service.title} project?
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-sm text-[#A1A1AA] font-[family-name:var(--font-inter)]">
              Tell us what you&apos;re building. We&apos;ll put the right team on
              it and ship.
            </p>
            <Link
              href="/contact"
              className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-[#F97316] px-7 py-3.5 text-sm font-semibold text-white font-[family-name:var(--font-inter)] transition-all hover:bg-[#EA580C] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] active:scale-95"
            >
              Talk to our team
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
