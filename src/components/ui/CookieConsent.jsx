"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("albos-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("albos-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("albos-cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="fixed bottom-0 left-0 right-0 z-[90]"
        >
          {/* Gradient accent line */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#F97316]/30 to-transparent" />

          <div className="border-t border-black/[0.06] bg-[#FAFAFA]/95 backdrop-blur-xl px-6 py-4 md:px-12">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-4 md:gap-6">
              {/* Left: Icon + Text */}
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#F97316]/10 flex items-center justify-center">
                  <Cookie className="size-4 text-[#F97316]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-[family-name:var(--font-plus-jakarta)] text-sm font-bold text-[#18181B]">
                    We value your privacy
                  </h4>
                  <p className="mt-0.5 font-[family-name:var(--font-inter)] text-xs text-[#A1A1AA] leading-relaxed">
                    We use cookies to enhance your browsing experience, serve
                    personalized content, and analyze our traffic. By clicking
                    &quot;Accept&quot;, you consent to our use of cookies.
                  </p>
                </div>
              </div>

              {/* Right: Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleDecline}
                  className="rounded-full border border-black/[0.12] px-5 py-2 font-[family-name:var(--font-inter)] text-xs font-medium text-[#A1A1AA] transition-all duration-300 hover:border-black/[0.25] hover:text-[#18181B] cursor-pointer"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="rounded-full bg-[#F97316] px-5 py-2 font-[family-name:var(--font-inter)] text-xs font-semibold text-white transition-all duration-300 hover:bg-[#EA580C] hover:shadow-lg hover:shadow-[#F97316]/20 cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
