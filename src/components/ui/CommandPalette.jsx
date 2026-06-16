"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Home,
  Briefcase,
  BookOpen,
  Users,
  Cpu,
  Building2,
  Mail,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PAGES = [
  {
    key: "home",
    label: "Home",
    icon: Home,
    description: "Main page with hero, stats & case studies",
  },
  {
    key: "services",
    label: "Services",
    icon: Briefcase,
    description: "Software, web, mobile, AI & cloud",
  },
  {
    key: "case-studies",
    label: "Case Studies",
    icon: Layers,
    description: "500+ projects across 40 countries",
  },
  {
    key: "about",
    label: "About",
    icon: Users,
    description: "Our story, team & mission",
  },
  {
    key: "technologies",
    label: "Technologies",
    icon: Cpu,
    description: "Full-stack expertise & R&D",
  },
  {
    key: "industries",
    label: "Industries",
    icon: Building2,
    description: "Domain-specific solutions",
  },
  {
    key: "blog",
    label: "Blog",
    icon: BookOpen,
    description: "Insights, engineering & AI articles",
  },
  {
    key: "contact",
    label: "Contact",
    icon: Mail,
    description: "Start your project today",
  },
];

export function CommandPalette({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  // Refs for event listener access — updated via effects
  const isOpenRef = useRef(false);
  const onNavigateRef = useRef(onNavigate);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);

  const filteredPages = useMemo(
    () =>
      PAGES.filter(
        (page) =>
          page.label.toLowerCase().includes(query.toLowerCase()) ||
          page.description.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  // Clamp activeIndex when filtered results change
  const safeActiveIndex = Math.min(
    activeIndex,
    Math.max(filteredPages.length - 1, 0),
  );

  const openPalette = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    setIsOpen(true);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Keyboard shortcut listener — uses refs to access latest state without effect setState
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpenRef.current) {
          setIsOpen(false);
        } else {
          setQuery("");
          setActiveIndex(0);
          setIsOpen(true);
          requestAnimationFrame(() => {
            inputRef.current?.focus();
          });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Body scroll lock — DOM update only, no setState
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSelect = useCallback((key) => {
    setIsOpen(false);
    onNavigateRef.current?.(key);
  }, []);

  const handleQueryChange = useCallback((value) => {
    setQuery(value);
    setActiveIndex(0);
  }, []);

  // Keyboard navigation within the palette
  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filteredPages.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filteredPages[safeActiveIndex]) {
      e.preventDefault();
      handleSelect(filteredPages[safeActiveIndex].key);
    } else if (e.key === "Escape") {
      closePalette();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={closePalette}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-[20%] z-[101] w-[90vw] max-w-[560px] -translate-x-1/2 rounded-2xl border border-black/[0.08] bg-white/98 backdrop-blur-xl shadow-2xl shadow-black/10 overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-black/[0.06]">
              <Search className="size-5 text-[#A1A1AA] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search pages..."
                className="flex-1 bg-transparent text-[#18181B] placeholder:text-[#A1A1AA] text-sm font-[family-name:var(--font-inter)] outline-none"
              />

              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md bg-black/[0.06] px-2 py-1 text-[10px] text-[#A1A1AA] font-[family-name:var(--font-jetbrains-mono)] border border-black/[0.06]">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[320px] overflow-y-auto scrollbar-thin p-2">
              {filteredPages.length === 0 ? (
                <div className="py-10 text-center text-sm text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                  No results found
                </div>
              ) : (
                filteredPages.map((page, i) => {
                  const Icon = page.icon;
                  const isActive = i === safeActiveIndex;
                  return (
                    <motion.button
                      key={page.key}
                      onClick={() => handleSelect(page.key)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors duration-150 cursor-pointer",
                        isActive
                          ? "bg-[#F97316]/10 text-[#18181B]"
                          : "text-[#71717A] hover:bg-black/[0.04]",
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center size-9 rounded-lg shrink-0 transition-colors duration-150",
                          isActive
                            ? "bg-[#F97316]/20 text-[#F97316]"
                            : "bg-black/[0.04] text-[#A1A1AA]",
                        )}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className={cn(
                            "block text-sm font-semibold font-[family-name:var(--font-plus-jakarta)] transition-colors duration-150",
                            isActive ? "text-[#18181B]" : "text-[#71717A]",
                          )}
                        >
                          {page.label}
                        </span>
                        <span className="block text-[11px] text-[#A1A1AA] font-[family-name:var(--font-inter)] truncate">
                          {page.description}
                        </span>
                      </div>
                      {isActive && (
                        <ArrowRight className="size-4 text-[#F97316] shrink-0" />
                      )}
                    </motion.button>
                  );
                })
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-black/[0.06] text-[10px] text-[#A1A1AA]/60 font-[family-name:var(--font-inter)]">
              <span>Navigate with ↑↓ &bull; Enter to select</span>
              <span>&#8984;K to toggle</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
