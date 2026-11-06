"use client";

import { useEffect, useState } from "react";

export const BOOTED_EVENT = "lg:booted";
export const BOOTED_KEY = "lg-booted";

/**
 * Lets sections (the Hero) hold their entrance until the preloader has
 * lifted. Resolves immediately on repeat visits in the same tab and for
 * reduced-motion users. A fallback timeout guarantees it always resolves.
 */
export function usePreloaderDone() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (
      sessionStorage.getItem(BOOTED_KEY) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDone(true);
      return;
    }
    const onDone = () => setDone(true);
    window.addEventListener(BOOTED_EVENT, onDone);
    const fallback = setTimeout(onDone, 3000);
    return () => {
      window.removeEventListener(BOOTED_EVENT, onDone);
      clearTimeout(fallback);
    };
  }, []);

  return done;
}
