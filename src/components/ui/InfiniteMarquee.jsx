"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useMediaQuery";

export function InfiniteMarquee({
  items,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className,
  itemClassName,
}) {
  const reducedMotion = useReducedMotion();

  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  const duplicated = [...items, ...items];

  if (reducedMotion) {
    return (
      <div className={cn("flex items-center gap-8 overflow-hidden", className)}>
        {items.map((item, i) => (
          <span
            key={i}
            className={cn(
              "shrink-0 text-sm uppercase tracking-widest text-albos-muted font-mono",
              itemClassName,
            )}
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden", className)} aria-hidden="true">
      <div
        className={cn(
          "flex items-center gap-8 whitespace-nowrap w-max",
          animationClass,
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {duplicated.map((item, i) => (
          <span
            key={i}
            className={cn(
              "shrink-0 text-sm uppercase tracking-widest text-albos-muted font-mono flex items-center gap-8",
              itemClassName,
            )}
          >
            <span className="transition-colors duration-300">{item}</span>
            <span className="inline-block h-1 w-1 rounded-full bg-albos-accent/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
