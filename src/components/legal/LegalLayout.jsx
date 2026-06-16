import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LegalDoc } from "./LegalDoc";

export function LegalLayout({
  icon: Icon,
  eyebrow,
  title,
  dateLabel,
  dateValue,
  activePage,
  markdown,
}) {
  return (
    <>
      <Navbar activePage={activePage} />

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

        <div className="relative mx-auto max-w-[var(--container-max)] px-6 pt-28 pb-14 md:pt-36 md:pb-16 lg:px-20">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-sm font-[family-name:var(--font-inter)] text-[#A1A1AA]">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[#F97316]"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="mx-1">/</span>
              </li>
              <li className="text-[#F97316]">{title}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-4">
            <span className="animate-float flex size-14 items-center justify-center rounded-2xl border border-[#F97316]/25 bg-[#F97316]/10 shadow-[0_0_30px_rgba(249,115,22,0.15)]">
              <Icon className="size-7 text-[#F97316]" />
            </span>
            <span className="rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#F97316] font-[family-name:var(--font-inter)]">
              {eyebrow}
            </span>
          </div>

          <h1 className="mt-6 font-[family-name:var(--font-plus-jakarta)] text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-white">
            {title}
          </h1>

          <p className="mt-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#A1A1AA]">
            {dateLabel}: {dateValue}
          </p>
        </div>
      </section>

      {/* ===== Body ===== */}
      <section className="bg-[#FAFAFA]">
        <LegalDoc markdown={markdown} />
      </section>

      <Footer />
    </>
  );
}
