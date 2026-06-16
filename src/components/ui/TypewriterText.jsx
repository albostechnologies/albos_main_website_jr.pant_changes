"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

export function TypewriterText({
  words,
  className,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000,
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const currentWord = words[currentWordIndex];

  const tick = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentWord.length) {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true);
        timeoutRef.current = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }
  }, [
    displayText,
    isDeleting,
    isPaused,
    currentWord,
    pauseDuration,
    words.length,
  ]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    timeoutRef.current = setTimeout(tick, speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [tick, isDeleting, deletingSpeed, typingSpeed]);

  return (
    <span className={cn("inline-flex", className)}>
      <span>{displayText}</span>
      <span
        className="inline-block w-[2px] ml-0.5 bg-albos-accent animate-pulse"
        style={{ height: "1em" }}
      />
    </span>
  );
}
