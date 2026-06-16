"use client";

import { useEffect, useMemo, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { cn } from "@/lib/utils";

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Split a markdown document into the intro (text before the first "## ") and a
// list of top-level "## " sections. "### " sub-headings stay inside their parent.
function parse(markdown) {
  const blocks = markdown.split(/\n(?=## )/);
  let intro = "";
  const sections = [];

  for (const block of blocks) {
    if (block.startsWith("## ")) {
      const nl = block.indexOf("\n");
      const title = (nl === -1 ? block.slice(3) : block.slice(3, nl)).trim();
      const body = nl === -1 ? "" : block.slice(nl + 1).trim();
      sections.push({ id: slugify(title), title, body });
    } else {
      intro += block;
    }
  }

  return { intro: intro.trim(), sections };
}

export function LegalDoc({ markdown }) {
  const { intro, sections } = useMemo(() => parse(markdown), [markdown]);
  const [activeId, setActiveId] = useState("");

  // Scroll-spy: highlight the section currently near the top of the viewport.
  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const handleTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-6 py-12 md:py-16 lg:px-20 lg:py-20">
      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-14">
        {/* Table of contents */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="mb-4 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A1A1AA]">
              On this page
            </p>
            <nav className="flex flex-col border-l border-[#E4E4E7]">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => handleTocClick(e, s.id)}
                  className={cn(
                    "-ml-px border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors duration-200",
                    activeId === s.id
                      ? "border-[#F97316] font-medium text-[#F97316]"
                      : "border-transparent text-[#71717A] hover:border-[#F97316]/40 hover:text-[#18181B]",
                  )}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Document body */}
        <article className="min-w-0 max-w-3xl">
          {intro && (
            <ScrollReveal>
              <MarkdownRenderer content={intro} />
            </ScrollReveal>
          )}

          {sections.map((s, i) => (
            <ScrollReveal key={s.id} delay={Math.min(i * 0.03, 0.15)}>
              <section
                id={s.id}
                className="scroll-mt-28 border-t border-[#E4E4E7] pt-8 first:border-t-0 first:pt-2"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-5 w-1 shrink-0 rounded-full bg-[#F97316]" />
                  <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold leading-tight tracking-tight text-[#18181B] md:text-[1.75rem]">
                    {s.title}
                  </h2>
                </div>
                <div className="mt-4">
                  <MarkdownRenderer content={s.body} />
                </div>
              </section>
            </ScrollReveal>
          ))}
        </article>
      </div>
    </div>
  );
}
