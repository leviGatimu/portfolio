"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/easing";
import MaskReveal from "@/components/ui/MaskReveal";

const GREETING = "Hi, I'm Levi.";

export default function Intro() {
  return (
    <section id="about" className="px-6 pb-32 pt-24 md:px-10 md:pb-40 md:pt-32">
      <h2 aria-label={GREETING} className="font-display whitespace-nowrap text-fg">
        <MaskReveal
          text={GREETING.toUpperCase()}
          stagger={0.03}
          className="text-[clamp(4rem,18.5vw,24rem)]"
        />
      </h2>

      <p className="mt-10 max-w-[24ch] text-[clamp(1.75rem,4.4vw,4rem)] font-medium leading-[1.15] tracking-[-0.02em] text-fg md:mt-14">
        I&apos;m a <MarkerStroke text="full-stack developer" /> in Kigali, Rwanda, building across
        software and robotics.
      </p>
    </section>
  );
}

/**
 * Echoes the hero's accent block: a highlighter wipes across the phrase. The
 * plain text underneath stays readable if the wipe never runs. The overlay is
 * hidden from screen readers and text selection so the phrase only counts once.
 */
function MarkerStroke({ text }: { text: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap px-[0.12em]">
      {text}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 select-none bg-accent px-[0.12em] text-on-accent"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
}
