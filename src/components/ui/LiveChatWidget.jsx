"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const QUICK_REPLIES = [
  "Schedule a Call",
  "Get a Quote",
  "Technical Support",
  "General Inquiry",
];

const BOT_RESPONSE =
  "Thanks for reaching out! A member of our team will get back to you shortly. In the meantime, feel free to explore our services.";

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      text: "Hi! \u{1F44B} How can we help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Bot responds after a typing indicator delay
    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        id: `bot-${Date.now()}`,
        text: BOT_RESPONSE,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1500);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-8 z-50 flex flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl shadow-black/10 md:w-[380px] md:h-[520px] w-[calc(100vw-2rem)] h-[70vh] max-h-[520px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/[0.06] bg-[#FAFAFA] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F97316]">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#18181B]">
                    Albos Technologies Pvt Ltd
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                    <span className="text-xs text-emerald-400">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#A1A1AA] transition-colors hover:bg-black/[0.06] hover:text-[#18181B]"
                aria-label="Minimize chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#F97316] text-white rounded-br-md"
                        : "bg-[#F5F5F0] text-[#18181B] rounded-bl-md border border-black/[0.06]"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="mt-1 text-[10px] text-[#A1A1AA]">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-black/[0.06] bg-[#F5F5F0] px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-[#A1A1AA] animate-bounce [animation-delay:0ms]" />
                    <span className="h-2 w-2 rounded-full bg-[#A1A1AA] animate-bounce [animation-delay:150ms]" />
                    <span className="h-2 w-2 rounded-full bg-[#A1A1AA] animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && !isTyping && (
              <div className="flex flex-wrap gap-2 px-4 pb-3">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="rounded-full border border-[#F97316]/30 bg-[#F97316]/10 px-3 py-1.5 text-xs font-medium text-[#F97316] transition-all hover:bg-[#F97316]/20 hover:border-[#F97316]/50"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input area */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-black/[0.06] bg-[#FAFAFA] px-4 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm text-[#18181B] placeholder-[#A1A1AA] outline-none"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F97316] text-white transition-all hover:bg-[#EA580C] disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#F97316] text-white shadow-lg shadow-[#F97316]/25 transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA]"
            aria-label="Open live chat"
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#F97316] animate-ping opacity-20" />
            <MessageCircle className="h-6 w-6 relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
