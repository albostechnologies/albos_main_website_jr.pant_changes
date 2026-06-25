"use client";

import { motion } from "framer-motion";

export function LoadingSkeleton({
  className = "",
  variant = "text",
  width,
  height,
  count = 1,
}) {
  const variantStyles = {
    text: "h-4 rounded-md w-full",
    card: "h-48 rounded-2xl w-full",
    circle: "rounded-full",
    rect: "rounded-xl w-full",
  };

  const baseStyle = variantStyles[variant];
  const style = { width: width || undefined, height: height || undefined };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className={`skeleton ${baseStyle} ${className}`}
          style={style}
        />
      ))}
    </>
  );
}

export function SectionSkeleton() {
  return (
    <div className="py-16 md:py-20 lg:py-28 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px] space-y-8">
        <LoadingSkeleton variant="text" className="w-24 h-3" />
        <LoadingSkeleton variant="text" className="w-2/3 h-10" />
        <LoadingSkeleton variant="text" className="w-1/2 h-10" />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoadingSkeleton variant="card" count={3} />
        </div>
      </div>
    </div>
  );
}
