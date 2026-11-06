"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import ParticleText from "@/components/ui/ParticleText";
import CopyCard from "@/components/ui/CopyCard";
import LiveClock from "@/components/ui/LiveClock";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Contact() {
  const fancy = useMediaQuery("(hover: hover) and (pointer: fine) and (min-width: 768px)");
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="px-6 py-28 md:px-10 md:py-36">
      <motion.p
        className="mono-label text-accent-ink"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.5 }}
      >
        [06] — CONTACT
      </motion.p>

      {/* The headline is a particle field — run your cursor through it */}
      <div className="relative mt-6 h-[34vh] md:h-[46vh]">
        {fancy && !reduce ? (
          <>
            <ParticleText text="LET'S TALK" />
            <h2 className="sr-only">Let&apos;s talk</h2>
          </>
        ) : (
          <h2 className="font-display flex h-full items-center justify-center text-center text-[clamp(3.5rem,14vw,12rem)] leading-none text-fg">
            LET&apos;S TALK
          </h2>
        )}
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
        <CopyCard label="EMAIL" value={site.email} copyText={site.email} />

        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-3 border border-border bg-surface p-6 transition-colors hover:border-fg"
        >
          <span className="mono-label text-muted">GITHUB</span>
          <span className="flex items-center justify-between gap-3">
            <span className="truncate text-base text-fg md:text-lg">
              leviGatimu
            </span>
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              className="shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
            />
          </span>
          <span className="mono-label text-accent-ink">SEE THE CODE</span>
        </a>

        <div className="flex flex-col gap-3 border border-border bg-surface p-6">
          <span className="mono-label text-muted">BASE</span>
          <span className="truncate text-base text-fg md:text-lg">
            {site.location}
          </span>
          <span className="mono-label text-accent-ink">
            GMT+2 — <LiveClock utcOffset={2} />
          </span>
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <MagneticButton strength={0.25}>
          <a
            href={`mailto:${site.email}?subject=Let's work together`}
            className="font-display inline-block bg-accent px-12 py-6 text-[clamp(1.4rem,3vw,2.4rem)] text-on-accent transition-transform duration-300 hover:scale-[1.03]"
          >
            START A PROJECT
          </a>
        </MagneticButton>
      </div>
    </section>
  );
}
