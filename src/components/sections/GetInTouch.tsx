"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Mail, MoveRight } from "lucide-react";
import { site, socials } from "@/data/site";
import MagneticButton from "@/components/ui/MagneticButton";

const WORDS = ["real", "useful", "fast", "bold", "together"];
const WORD_MS = 2200;
const LINKEDIN = socials.find((social) => social.label === "LinkedIn")?.url;

export default function GetInTouch() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [word, setWord] = useState(0);

  // Only rolls while someone can see it.
  useEffect(() => {
    if (!inView || reduce) return;
    const timer = window.setTimeout(() => setWord((index) => (index + 1) % WORDS.length), WORD_MS);
    return () => window.clearTimeout(timer);
  }, [word, inView, reduce]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="flex flex-col items-center px-6 pb-28 pt-12 text-center md:px-10 md:pb-40 md:pt-20"
    >
      <p className="mono-label flex items-center gap-2 text-fg">
        <span className="inline-block size-1.5 rounded-full bg-accent-ink" aria-hidden="true" />
        Get in touch · {site.availability}
      </p>

      <h2
        aria-label={`Let's build something ${WORDS[0]}.`}
        className="font-display mt-8 w-full text-[clamp(3.25rem,11vw,11rem)] text-fg"
      >
        <span aria-hidden="true" className="block">
          Let&apos;s build something
        </span>
        <span aria-hidden="true" className="relative block overflow-hidden pb-[0.06em] text-accent-ink">
          {/* Holds the line's height; the words themselves are positioned over it. */}
          &nbsp;
          {WORDS.map((text, index) => (
            <motion.span
              key={text}
              className="absolute inset-x-0 top-0"
              initial={false}
              animate={
                word === index
                  ? { y: "0%", opacity: 1 }
                  : { y: word > index ? "-110%" : "110%", opacity: 0 }
              }
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 14 }}
            >
              {text}
            </motion.span>
          ))}
        </span>
      </h2>

      <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-fg md:text-xl">
        Got a project, an internship, or a question about how something was built? Send me a
        message. I reply.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <MagneticButton>
          <a
            href={`mailto:${site.email}`}
            className="mono-label flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-on-accent"
          >
            <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
            Email me
          </a>
        </MagneticButton>
        {LINKEDIN && (
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label flex items-center gap-3 rounded-full border border-border px-7 py-4 text-fg transition-colors hover:border-fg"
          >
            Connect on LinkedIn
            <MoveRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </a>
        )}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2 text-sm text-muted sm:flex-row sm:gap-6">
        <a href={`mailto:${site.email}`} className="transition-colors hover:text-fg">
          {site.email}
        </a>
        <a href={`tel:${site.phone.replaceAll(" ", "")}`} className="transition-colors hover:text-fg">
          {site.phone}
        </a>
      </div>

      <p className="mt-10 max-w-[46ch] border-t border-border pt-6 text-sm leading-relaxed text-muted">
        Need a whole team? I own{" "}
        <a
          href="https://malhot.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg underline decoration-accent-ink underline-offset-4 transition-colors hover:text-accent-ink"
        >
          Malhot Technologies
        </a>
        , a software company in Kigali, and I&apos;m its COO.
      </p>
    </section>
  );
}
