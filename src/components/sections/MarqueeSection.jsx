"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollRevealParallax } from "@/components/ui/ScrollRevealParallax";
import { CLIENT_LOGOS } from "@/lib/constants";

const clientNames = CLIENT_LOGOS;

export function MarqueeSection() {
  return (
    <section className="relative bg-albos-dark py-20 overflow-hidden">
      {/* Subtle top/bottom border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
        {/* Label */}
        <ScrollReveal direction="up" className="mb-12">
          <SectionLabel label="Key Clients" />
        </ScrollReveal>
      </div>

      {/* Marquee rows */}
      <ScrollRevealParallax>
        <div className="flex flex-col gap-4">
          {/* Top row — scrolls left */}
          <InfiniteMarquee
            items={[...clientNames]}
            direction="left"
            speed={35}
            pauseOnHover
            itemClassName="text-albos-light/70 text-base md:text-lg font-[family-name:var(--font-plus-jakarta)] font-semibold tracking-[0.15em] hover:[&>span:first-child]:text-albos-accent hover:text-albos-light"
          />

          {/* Bottom row — scrolls right */}
          <InfiniteMarquee
            items={[...clientNames]}
            direction="right"
            speed={40}
            pauseOnHover
            itemClassName="text-albos-light/70 text-base md:text-lg font-[family-name:var(--font-plus-jakarta)] font-semibold tracking-[0.15em] hover:[&>span:first-child]:text-albos-accent hover:text-albos-light"
          />
        </div>
      </ScrollRevealParallax>
    </section>
  );
}
