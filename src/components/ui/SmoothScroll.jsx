"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// ─── Context ────────────────────────────────────────────────────────────────
const LenisContext = createContext(null);

// ─── Hook ───────────────────────────────────────────────────────────────────
/** Returns the active Lenis instance (or null if the provider hasn't mounted). */
export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }) {
  const [lenisInstance, setLenisInstance] = useState(null);
  const rafIdRef = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect -- initializing an external library instance that requires the DOM
    setLenisInstance(lenis);

    function raf(time) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
