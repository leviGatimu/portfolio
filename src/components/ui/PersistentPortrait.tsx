"use client";

import { useLenis } from "lenis/react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/easing";
import { site } from "@/data/site";
import { usePortraitFloating } from "@/lib/hooks/usePortraitTransition";
import { usePreloaderDone } from "@/lib/hooks/usePreloaderDone";
import MagneticButton from "./MagneticButton";
import PortraitGlitch from "./PortraitGlitch";

/**
 * The Hero portrait's stand-in once Hero has scrolled away: a small avatar
 * that follows down the page, fading out again as Contact arrives. Clicking
 * it scrolls back to the top.
 */
export default function PersistentPortrait() {
  const reduce = useReducedMotion();
  const booted = usePreloaderDone();
  const floating = usePortraitFloating();
  const lenis = useLenis();

  if (reduce) return null;

  const visible = booted && floating;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[9975] md:bottom-8 md:right-8"
      style={{ pointerEvents: visible ? "auto" : "none" }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6, y: visible ? 0 : 12 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <MagneticButton strength={0.3} className="size-14 md:size-16">
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => lenis?.scrollTo(0, { duration: 1.4 })}
          className="block size-14 overflow-hidden rounded-full border border-border md:size-16"
        >
          <PortraitGlitch src="/levi-cutout.png" alt={site.name} priority={false} sizes="64px" />
        </button>
      </MagneticButton>
    </motion.div>
  );
}
