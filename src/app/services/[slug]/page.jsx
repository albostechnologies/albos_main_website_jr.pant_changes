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
} from "@/data/services";
import { PROCESS_STEPS } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ServiceFAQ } from "./ServiceFAQ";
import { TechLogo } from "./TechLogo";

const ICONS = {
  // service hero icons
  Globe,
  Smartphone,
  Boxes,
  Webhook,
  Cpu,
  Gamepad2,
  Megaphone,
  Building2,
  Headset,
  // "what we build" icons
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
      images: [{ url: `/images/services/${service.slug}.jpg` }],
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

  return (
    <>
      <Navbar activePage="services" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-[#18181B]">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F97316] via-[#FB923C] to-transparent" />
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#F97316]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-[var(--container-max)] px-6 pt-28 pb-14 md:pt-36 md:pb-20 lg:px-20">
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
                  href="/services"
                  className="hover:text-[#F97316] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="mx-1">/</span>
              </li>
              <li className="text-[#F97316]">{service.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex items-center gap-4">
                <span className="animate-float flex size-14 items-center justify-center rounded-2xl border border-[#F97316]/25 bg-[#F97316]/10 shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                  <Icon className="size-7 text-[#F97316]" />
                </span>
                <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium text-[#F97316]/70">
                  <Sparkles className="size-3.5" />
                  {service.id} / Service
                </span>
              </div>

              <h1 className="mt-6 font-[family-name:var(--font-plus-jakarta)] text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-white">
                {service.title}
              </h1>

              <p className="mt-4 max-w-xl text-base md:text-lg font-[family-name:var(--font-inter)] leading-relaxed text-[#A1A1AA]">
                {service.tagline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#F97316] px-7 py-3.5 text-sm font-semibold text-white font-[family-name:var(--font-inter)] transition-all hover:bg-[#EA580C] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] active:scale-95"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white font-[family-name:var(--font-inter)] transition-all hover:border-[#F97316]/50 hover:text-[#F97316]"
                >
                  All services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-[family-name:var(--font-inter)] text-[#A1A1AA]">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-[#F97316]" />
                  {service.metric}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#F97316]" />
                  {service.locations.join(", ")}
                </span>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
              <Image
                src={`/images/services/${service.slug}.jpg`}
                alt={`${service.title} at Albos Technologies`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 540px"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Overview ===== */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-[var(--container-max)] px-6 py-16 md:py-20 lg:px-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <ScrollReveal>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-[0.2em] text-[#F97316]">
                Overview
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold tracking-tight text-[#18181B]">
                What we do
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="space-y-5">
              <p className="text-base md:text-lg leading-relaxed text-[#52525B] font-[family-name:var(--font-inter)]">
                {service.overview}
              </p>
              {service.content && service.content.length > 0 ? (
                service.content.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-[#71717A] font-[family-name:var(--font-inter)]"
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-base leading-relaxed text-[#71717A] font-[family-name:var(--font-inter)]">
                  {service.description}
                </p>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== What we build ===== */}
      {service.whatWeBuild && service.whatWeBuild.length > 0 && (
        <section className="border-t border-[#E4E4E7] bg-white">
          <div className="mx-auto max-w-[var(--container-max)] px-6 py-16 md:py-20 lg:px-20">
            <ScrollReveal>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-[0.2em] text-[#F97316]">
                Solutions
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold tracking-tight text-[#18181B]">
                What we build
              </h2>
            </ScrollReveal>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {service.whatWeBuild.map((item, i) => {
                const BuildIcon = ICONS[item.icon] ?? Sparkles;
                return (
                  <ScrollReveal
                    key={item.title}
                    delay={i * 0.06}
                    className="h-full"
                  >
                    <div className="group h-full rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#F97316]/40 hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                      <span className="flex size-12 items-center justify-center rounded-xl bg-[#F97316]/10 text-[#F97316] transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#F97316] group-hover:text-white">
                        <BuildIcon className="size-6" />
                      </span>
                      <h3 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-base font-bold text-[#18181B]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#71717A] font-[family-name:var(--font-inter)]">
                        {item.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== Capabilities ===== */}
      <section className="border-t border-[#E4E4E7] bg-[#FAFAFA]">
        <div className="mx-auto max-w-[var(--container-max)] px-6 py-16 md:py-20 lg:px-20">
          <ScrollReveal>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-[0.2em] text-[#F97316]">
              Capabilities
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold tracking-tight text-[#18181B]">
              What we deliver
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((capability, i) => (
              <ScrollReveal
                key={capability}
                delay={i * 0.05}
                className="h-full"
              >
                <div className="group flex h-full items-start gap-3 rounded-2xl border border-[#E4E4E7] bg-white p-5 transition-all duration-300 hover:border-[#F97316]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#F97316]/10 text-[#F97316] transition-colors group-hover:bg-[#F97316] group-hover:text-white">
                    <Check className="size-3.5" />
                  </span>
                  <span className="font-[family-name:var(--font-plus-jakarta)] text-sm font-semibold text-[#18181B]">
                    {capability}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Technology ===== */}
      <section className="border-t border-[#E4E4E7] bg-white">
        <div className="mx-auto max-w-[var(--container-max)] px-6 py-16 md:py-20 lg:px-20">
          <ScrollReveal>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-[0.2em] text-[#F97316]">
              Stack
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold tracking-tight text-[#18181B]">
              Technology we use
            </h2>
          </ScrollReveal>

          {service.techCategories && service.techCategories.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.techCategories.map((cat, i) => (
                <ScrollReveal
                  key={cat.category}
                  delay={i * 0.06}
                  className="h-full"
                >
                  <div className="h-full rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-6">
                    <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold uppercase tracking-wider text-[#F97316]">
                      {cat.category}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {cat.items.map((tech) => (
                        <li
                          key={tech}
                          className="group/tech flex items-center gap-2.5 text-sm text-[#52525B] font-[family-name:var(--font-inter)]"
                        >
                          <TechLogo
                            name={tech}
                            className="group-hover/tech:scale-125"
                          />
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="group/tech inline-flex items-center gap-2 rounded-full border border-[#E4E4E7] bg-[#FAFAFA] px-4 py-2 text-sm font-medium text-[#52525B] font-[family-name:var(--font-inter)] transition-colors hover:border-[#F97316]/40 hover:bg-white"
                  >
                    <TechLogo
                      name={tech}
                      className="group-hover/tech:scale-125"
                    />
                    {tech}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ===== Process ===== */}
      <section className="border-t border-[#E4E4E7] bg-[#FAFAFA]">
        <div className="mx-auto max-w-[var(--container-max)] px-6 py-16 md:py-20 lg:px-20">
          <ScrollReveal>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-[0.2em] text-[#F97316]">
              Process
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold tracking-tight text-[#18181B]">
              How we work
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal
                key={step.number}
                delay={i * 0.08}
                className="h-full"
              >
                <div className="relative h-full rounded-2xl border border-[#E4E4E7] bg-white p-6">
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-2xl font-bold text-[#F97316]/30">
                    {step.number}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#18181B]">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-wider text-[#F97316]">
                    {step.duration}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#52525B] font-[family-name:var(--font-inter)]">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Outcomes ===== */}
      <section className="border-t border-[#E4E4E7] bg-white">
        <div className="mx-auto max-w-[var(--container-max)] px-6 py-16 md:py-20 lg:px-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {service.outcomes.map((outcome, i) => (
              <ScrollReveal
                key={outcome.label}
                delay={i * 0.1}
                className="h-full"
              >
                <div className="h-full rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8 text-center transition-all duration-300 hover:border-[#F97316]/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
                  <p className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-bold text-[#F97316]">
                    {outcome.value}
                  </p>
                  <p className="mt-2 text-sm text-[#71717A] font-[family-name:var(--font-inter)]">
                    {outcome.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why choose us ===== */}
      {service.whyChooseUs && service.whyChooseUs.length > 0 && (
        <section className="border-t border-[#E4E4E7] bg-[#FAFAFA]">
          <div className="mx-auto max-w-[var(--container-max)] px-6 py-16 md:py-20 lg:px-20">
            <ScrollReveal>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-[0.2em] text-[#F97316]">
                Why Albos
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold tracking-tight text-[#18181B]">
                Why teams choose us
              </h2>
            </ScrollReveal>
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {service.whyChooseUs.map((item, i) => (
                <ScrollReveal
                  key={item.title}
                  delay={i * 0.07}
                  className="h-full"
                >
                  <div className="group flex h-full gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-6 transition-all duration-300 hover:border-[#F97316]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F97316]/10 text-[#F97316] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F97316] group-hover:text-white">
                      <Check className="size-4" />
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-plus-jakarta)] text-base font-bold text-[#18181B]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#71717A] font-[family-name:var(--font-inter)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ ===== */}
      <section className="border-t border-[#E4E4E7] bg-white">
        <div className="mx-auto max-w-[var(--container-max)] px-6 py-16 md:py-20 lg:px-20">
          <ScrollReveal className="mb-10 text-center">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-[0.2em] text-[#F97316]">
              FAQ
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold tracking-tight text-[#18181B]">
              Frequently asked questions
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ServiceFAQ faqs={service.faqs} />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== Related ===== */}
      {related.length > 0 && (
        <section className="border-t border-[#E4E4E7] bg-[#FAFAFA]">
          <div className="mx-auto max-w-[var(--container-max)] px-6 py-16 md:py-20 lg:px-20">
            <ScrollReveal>
              <h2 className="mb-8 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold tracking-tight text-[#18181B]">
                Explore other services
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((other, i) => {
                const OtherIcon = ICONS[other.icon] ?? Globe;
                return (
                  <ScrollReveal
                    key={other.slug}
                    delay={i * 0.08}
                    className="h-full"
                  >
                    <Link
                      href={`/services/${other.slug}`}
                      className="group block h-full rounded-2xl border border-[#E4E4E7] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#F97316]/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
                    >
                      <span className="flex size-11 items-center justify-center rounded-xl border border-[#F97316]/20 bg-[#F97316]/10 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#F97316]">
                        <OtherIcon className="size-5 text-[#F97316] transition-colors group-hover:text-white" />
                      </span>
                      <h3 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#18181B] group-hover:text-[#F97316] transition-colors">
                        {other.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#71717A] font-[family-name:var(--font-inter)]">
                        {other.tagline}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F97316] font-[family-name:var(--font-inter)]">
                        Learn more
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-20">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-[#18181B] p-10 text-center md:p-14">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F97316] to-transparent" />
              <div className="pointer-events-none absolute -bottom-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F97316]/10 blur-[120px]" />
              <h2 className="relative font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-white">
                Ready to start your {service.title} project?
              </h2>
              <p className="relative mx-auto mt-3 max-w-md text-sm text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                Tell us what you&apos;re building. We&apos;ll put the right team
                on it and ship.
              </p>
              <Link
                href="/contact"
                className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-[#F97316] px-7 py-3.5 text-sm font-semibold text-white font-[family-name:var(--font-inter)] transition-all hover:bg-[#EA580C] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] active:scale-95"
              >
                Talk to our team
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
