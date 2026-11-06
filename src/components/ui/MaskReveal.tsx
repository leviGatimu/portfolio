"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easing";
import { cn } from "@/lib/cn";

interface MaskRevealProps {
  text: string;
  by?: "char" | "word";
  className?: string;
  /** Controlled mode: animate when this is true (e.g. on page load).
   *  Omit to animate on scroll into view. */
  show?: boolean;
  baseDelay?: number;
  stagger?: number;
  duration?: number;
}

/**
 * The house text entrance: each unit rises out of an overflow mask with a
 * slight rotation. Ported from the old site's StaggeredHeadline.
 */
export default function MaskReveal({
  text,
  by = "char",
  className,
  show,
  baseDelay = 0,
  stagger = 0.045,
  duration = 0.8,
}: MaskRevealProps) {
  const units = by === "char" ? text.split("") : text.split(" ");
  const ref = useRef<HTMLSpanElement>(null);
  // Watched on the whole word: a thin hidden letter such as "I" can sit entirely
  // inside its clipping mask and would never count as in view on its own.
  // The bottom-only margin keeps left-edge letters from being excluded.
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const revealed = show ?? inView;

  return (
    <span ref={ref} className={cn("inline-block", className)} aria-label={text}>
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.08em] align-top"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 8 }}
            animate={revealed ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 8 }}
            transition={{
              duration,
              delay: baseDelay + i * stagger,
              ease: EASE,
            }}
          >
            {unit === " " ? " " : unit}
            {by === "word" && i < units.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
