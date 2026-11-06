"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import { site } from "@/data/site";
import { EASE } from "@/lib/easing";
import { BOOTED_EVENT, BOOTED_KEY } from "@/lib/hooks/usePreloaderDone";
import MaskReveal from "@/components/ui/MaskReveal";

/**
 * Short, surgical: counter climbs to 100 while the name mask-reveals, then
 * the overlay wipes upward straight into the hero's entrance. Plays once
 * per tab — repeat visits are skipped pre-paint via html[data-booted].
 */
export default function Preloader() {
  const lenis = useLenis();
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;

    const skip =
      sessionStorage.getItem(BOOTED_KEY) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (skip) {
      sessionStorage.setItem(BOOTED_KEY, "1");
      setShow(false);
      window.dispatchEvent(new Event(BOOTED_EVENT));
      return;
    }

    if (!lenis) return; // wait until smooth scroll exists so we can pause it
    started.current = true;
    lenis.stop();

    // Counter climbs in uneven, believable bursts (~1.4s to 100)
    let pct = 0;
    const progressTimer = setInterval(() => {
      pct = Math.min(100, pct + Math.random() * 16 + 6);
      setProgress(Math.floor(pct));
      if (pct >= 100) clearInterval(progressTimer);
    }, 90);

    const doneTimer = setTimeout(() => {
      sessionStorage.setItem(BOOTED_KEY, "1");
      setShow(false);
      window.dispatchEvent(new Event(BOOTED_EVENT));
      lenis.start();
    }, 1900);

    return () => {
      started.current = false;
      clearInterval(progressTimer);
      clearTimeout(doneTimer);
      lenis.start();
    };
  }, [lenis]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader-overlay fixed inset-0 z-[9995] flex flex-col justify-between bg-bg p-6 md:p-10"
          aria-hidden="true"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="mono-label text-muted">{site.coordinates}</p>

          <div className="flex items-center justify-center">
            <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] text-fg">
              <MaskReveal
                text={site.name.toUpperCase()}
                show
                baseDelay={0.15}
                stagger={0.04}
              />
            </h2>
          </div>

          <div className="flex items-end justify-between">
            <p className="mono-label text-muted">PORTFOLIO — 2026</p>
            <p
              className="font-display text-[clamp(3rem,10vw,7rem)] leading-none text-fg tabular-nums"
              suppressHydrationWarning
            >
              {String(progress).padStart(3, "0")}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
