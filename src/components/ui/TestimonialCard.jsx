"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function TestimonialCard({ quote, author, role, company, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative rounded-2xl border border-black/[0.06] bg-albos-mid/50 p-6 md:p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#F97316]/20 hover:bg-albos-mid/80 card-hover-lift"
    >
      {/* Quote icon */}
      <Quote className="size-8 text-[#F97316]/20 mb-4" />

      {/* Quote text */}
      <p className="font-[family-name:var(--font-inter)] text-[#71717A] leading-relaxed text-sm md:text-base italic">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3 pt-4 border-t border-black/[0.06]">
        {/* Avatar placeholder */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F97316]/10 border border-[#F97316]/20">
          <span className="font-[family-name:var(--font-plus-jakarta)] text-sm font-bold text-[#F97316]">
            {author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-[family-name:var(--font-plus-jakarta)] text-sm font-bold text-[#18181B]">
            {author}
          </p>
          <p className="font-[family-name:var(--font-inter)] text-xs text-[#A1A1AA]">
            {role}, {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
