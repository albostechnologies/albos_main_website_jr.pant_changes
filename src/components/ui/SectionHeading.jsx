"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${align === "center" ? "text-center" : ""} ${className}`}
    >
      {label && (
        <div className={align === "center" ? "flex justify-center" : ""}>
          <SectionLabel label={label} />
        </div>
      )}
      <h2
        className="mt-4 font-[family-name:var(--font-plus-jakarta)] font-extrabold leading-tight tracking-tight text-[#18181B]"
        style={{ fontSize: "var(--fs-h2)" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-4 font-[family-name:var(--font-inter)] text-[#71717A] text-base md:text-lg leading-relaxed max-w-2xl"
          style={align === "center" ? { margin: "1rem auto 0" } : {}}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
