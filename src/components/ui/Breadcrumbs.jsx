"use client";

import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs({ items, onNavigate }) {
  // Don't render if only home (e.g. on home page)
  if (items.length <= 1 && (!items[0]?.page || items[0]?.page === "home")) {
    return null;
  }

  const allItems = [{ label: "Home", page: "home" }, ...items];

  return (
    <motion.nav
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="px-6 md:px-12 lg:px-20 pt-24 pb-4"
    >
      <ol
        className="flex items-center gap-1.5 text-sm flex-wrap"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isHome = index === 0;

          return (
            <motion.li
              key={`${item.label}-${index}`}
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Chevron separator (skip for first item) */}
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 text-[#A1A1AA] flex-shrink-0" />
              )}

              {/* Item content */}
              {isLast ? (
                // Current page — plain text, accent color
                <span
                  className="font-[family-name:var(--font-plus-jakarta)] font-semibold text-[#F97316] text-sm"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : isHome ? (
                // Home — icon + label, clickable
                <button
                  onClick={() => onNavigate?.("home")}
                  className="flex items-center gap-1 text-[#71717A] hover:text-[#18181B] transition-colors focus-ring-visible rounded-sm"
                  aria-label="Go to Home"
                >
                  <Home className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline font-[family-name:var(--font-plus-jakarta)] text-sm font-medium">
                    Home
                  </span>
                </button>
              ) : (
                // Intermediate pages — clickable
                <button
                  onClick={() => item.page && onNavigate?.(item.page)}
                  className="text-[#71717A] hover:text-[#18181B] transition-colors font-[family-name:var(--font-plus-jakarta)] text-sm font-medium focus-ring-visible rounded-sm"
                >
                  {item.label}
                </button>
              )}
            </motion.li>
          );
        })}
      </ol>
    </motion.nav>
  );
}
