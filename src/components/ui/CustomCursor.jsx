"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [cursorState, setCursorState] = useState("default");
  const isTouchDevice = useIsTouchDevice();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 40, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const dotSpringConfig = { stiffness: 800, damping: 50, mass: 0.2 };
  const dotSpringX = useSpring(dotX, dotSpringConfig);
  const dotSpringY = useSpring(dotY, dotSpringConfig);

  // Track cursor state
  const stateRef = useRef("default");

  // Trail dots state
  const [trailDots, setTrailDots] = useState([]);
  const trailIdRef = useRef(0);
  const lastTrailTime = useRef(0);

  const updateCursorState = useCallback(() => {
    const el = document.elementFromPoint(cursorX.get(), cursorY.get());
    if (!el) {
      if (stateRef.current !== "default") {
        stateRef.current = "default";
        setCursorState("default");
      }
      return;
    }

    const closestLink = el.closest('a, [role="link"]');
    const closestButton = el.closest(
      'button, [role="button"], [data-magnetic]',
    );

    let newState = "default";
    if (closestLink) newState = "link";
    else if (closestButton) newState = "button";

    if (newState !== stateRef.current) {
      stateRef.current = newState;
      setCursorState(newState);
    }
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
      updateCursorState();

      // Add trail dot (throttled to ~60fps, max 5 dots)
      const now = Date.now();
      if (now - lastTrailTime.current > 30) {
        lastTrailTime.current = now;
        const id = ++trailIdRef.current;
        setTrailDots((prev) => {
          const next = [...prev, { id, x: e.clientX, y: e.clientY }];
          return next.length > 5 ? next.slice(-5) : next;
        });

        // Remove trail dot after 300ms
        setTimeout(() => {
          setTrailDots((prev) => prev.filter((d) => d.id !== id));
        }, 300);
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, dotX, dotY, updateCursorState, isTouchDevice]);

  if (isTouchDevice) return null;

  const ringSize = cursorState === "link" ? 60 : 40;
  const ringBg =
    cursorState === "button" ? "rgba(249, 115, 22, 0.2)" : "rgba(0,0,0,0)";

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Trail dots - only on pointer:fine devices */}
          <div className="pointer-events-none fixed top-0 left-0 z-[9997]">
            {trailDots.map((dot) => (
              <motion.div
                key={dot.id}
                className="absolute rounded-full"
                style={{
                  left: dot.x,
                  top: dot.y,
                  width: 4,
                  height: 4,
                  backgroundColor: "rgba(249, 115, 22, 0.1)",
                  translateX: -2,
                  translateY: -2,
                }}
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            ))}
          </div>

          {/* Dot */}
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
            style={{
              x: dotSpringX,
              y: dotSpringY,
              width: 6,
              height: 6,
              backgroundColor: "#18181B",
              translateX: -3,
              translateY: -3,
              mixBlendMode: "difference",
            }}
          />

          {/* Ring */}
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
            style={{
              x: ringX,
              y: ringY,
              width: ringSize,
              height: ringSize,
              backgroundColor: ringBg,
              border: "1.5px solid rgba(0, 0, 0, 0.5)",
              translateX: -(ringSize / 2),
              translateY: -(ringSize / 2),
              mixBlendMode: "difference",
            }}
            animate={{
              width: ringSize,
              height: ringSize,
              backgroundColor: ringBg,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
