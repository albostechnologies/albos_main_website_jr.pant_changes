"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export function ServiceFAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-[#E4E4E7] overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#FAFAFA]"
              aria-expanded={isOpen}
            >
              <span className="font-[family-name:var(--font-plus-jakarta)] text-base font-semibold text-[#18181B]">
                {faq.question}
              </span>
              <Plus
                className={`h-5 w-5 shrink-0 text-[#F97316] transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-[#52525B] font-[family-name:var(--font-inter)]">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
