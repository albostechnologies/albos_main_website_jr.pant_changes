"use client";

import { useState } from "react";
import { Check, Mail, Loader2, AlertCircle, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribing(true);
    setSubscribeError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubscribeError(
          data.error || "Something went wrong. Please try again.",
        );
        return;
      }
      setIsSubscribed(true);
    } catch {
      setSubscribeError("Network error. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F97316] via-[#EA580C] to-[#CC4A00]">
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="absolute -top-1/3 -right-1/4 w-[70%] h-[140%] rounded-full bg-[#FB923C]/20 blur-3xl" />

          <div className="relative z-10 px-6 md:px-10 py-10 md:py-14 text-center">
            {/* Social proof */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {["A", "K", "M", "S"].map((initial, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-[#FFFFFF]/20 border-2 border-[#F97316] flex items-center justify-center text-[10px] font-bold text-white"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <span className="text-[11px] text-white/70 font-[family-name:var(--font-inter)]">
                Join 2,500+ subscribers
              </span>
            </div>

            <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-white leading-tight">
              Get insights delivered to your inbox
            </h3>
            <p className="mt-3 text-white/60 text-sm md:text-base font-[family-name:var(--font-inter)] max-w-md mx-auto">
              Weekly deep-dives on engineering, AI, and design. No spam, ever.
            </p>

            {/* Social proof badges */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FFFFFF]/10 px-2.5 py-1 text-[10px] font-semibold text-white/70 font-[family-name:var(--font-inter)]">
                <Check className="h-3 w-3" />
                Free forever
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FFFFFF]/10 px-2.5 py-1 text-[10px] font-semibold text-white/70 font-[family-name:var(--font-inter)]">
                <Users className="h-3 w-3" />
                Community access
              </span>
            </div>

            <AnimatePresence mode="wait">
              {isSubscribed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-6 flex items-center justify-center gap-3 bg-[#FFFFFF]/10 rounded-xl px-6 py-4 max-w-md mx-auto"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFFFFF]/20">
                    <Check className="h-4 w-4 text-white" />
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-white font-semibold">
                    You&apos;re subscribed!
                  </span>
                </motion.div>
              ) : (
                <form
                  key="form"
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setSubscribeError(null);
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      disabled={isSubscribing}
                      placeholder="your@email.com"
                      className={cn(
                        "w-full rounded-xl bg-white/[0.08] border pl-11 pr-4 py-3.5 text-sm font-[family-name:var(--font-inter)] text-white placeholder:text-white/35 outline-none transition-all duration-300 disabled:opacity-50",
                        isFocused
                          ? "border-white/30 bg-white/[0.12] shadow-[0_0_20px_rgba(0,0,0,0.05)]"
                          : "border-white/15",
                      )}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="shrink-0 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#18181B] font-[family-name:var(--font-inter)] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Subscribing…
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {subscribeError && !isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 flex items-center justify-center gap-1.5 text-xs text-white/70 font-[family-name:var(--font-inter)]"
                >
                  <AlertCircle className="size-3 shrink-0" />
                  {subscribeError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
