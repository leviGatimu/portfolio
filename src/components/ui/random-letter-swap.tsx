"use client";

import { useCallback, useRef } from "react";
import { type AnimationOptions, motion, useAnimate, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

interface RandomLetterSwapProps {
  label: string;
  /** Letters roll downward when true, upward when false. */
  reverse?: boolean;
  transition?: AnimationOptions;
  staggerDuration?: number;
  className?: string;
}

function shuffledIndexes(length: number) {
  const indexes = Array.from({ length }, (_, i) => i);
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes;
}

/**
 * On hover each letter rolls out while its copy rolls in, in a new random order
 * every time. Adapted from cnippet-dev's component on 21st.dev.
 */
export default function RandomLetterSwap({
  label,
  reverse = true,
  transition = { duration: 0.8, type: "spring" },
  staggerDuration = 0.02,
  className,
}: RandomLetterSwapProps) {
  const [scope, animate] = useAnimate();
  const reduceMotion = useReducedMotion();
  const running = useRef(false);

  const swap = useCallback(async () => {
    if (running.current || reduceMotion) return;
    running.current = true;

    await Promise.all(
      shuffledIndexes(label.length).map(async (letter, order) => {
        const timing = { ...transition, delay: order * staggerDuration };
        await Promise.all([
          animate(`.letter-${letter}`, { y: reverse ? "100%" : "-100%" }, timing),
          animate(`.letter-copy-${letter}`, { top: "0%" }, timing),
        ]);
        // Snap both back unseen, ready for the next hover.
        animate(`.letter-${letter}`, { y: 0 }, { duration: 0 });
        animate(`.letter-copy-${letter}`, { top: reverse ? "-100%" : "100%" }, { duration: 0 });
      }),
    );

    running.current = false;
  }, [animate, label, reduceMotion, reverse, staggerDuration, transition]);

  return (
    <motion.span
      ref={scope}
      onHoverStart={swap}
      className={cn("relative flex items-center justify-center overflow-hidden", className)}
    >
      <span className="sr-only">{label}</span>
      {label.split("").map((letter, i) => (
        <span key={i} aria-hidden="true" className="relative flex whitespace-pre">
          <motion.span className={`relative letter-${i}`} style={{ top: 0 }}>
            {letter}
          </motion.span>
          <motion.span
            className={`absolute letter-copy-${i}`}
            style={{ top: reverse ? "-100%" : "100%" }}
          >
            {letter}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
