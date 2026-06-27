"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollRevealParallax } from "@/components/ui/ScrollRevealParallax";
import { CLIENT_LOGOS } from "@/lib/constants";

const clientNames = CLIENT_LOGOS;

export function MarqueeSection() {
  return (
    <section className="relative bg-transparent py-5 overflow-hidden">
      {/* Subtle top/bottom border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />

      {/* Marquee rows */}
      <ScrollRevealParallax>
        <div
          className="flex flex-col gap-4"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.50)", // Light black shadow
          }}
        >
          {/* Top row — scrolls left */}
          <InfiniteMarquee
            items={[...clientNames]}
            direction="left"
            speed={35}
            pauseOnHover
            itemClassName="text-[#F97316] text-base md:text-md font-[family-name:var(--font-plus-jakarta)] font-semibold tracking-[0.15em] hover:[&>span:first-child]:text-albos-accent hover:text-albos-light"
          />

          {/* Bottom row — scrolls right */}
          <InfiniteMarquee
            items={[...clientNames]}
            direction="right"
            speed={40}
            pauseOnHover
            itemClassName="text-[#F97316] text-base md:text-md font-[family-name:var(--font-plus-jakarta)] font-semibold tracking-[0.15em] hover:[&>span:first-child]:text-albos-accent hover:text-albos-light"
          />
        </div>
      </ScrollRevealParallax>
    </section>
  );
}
