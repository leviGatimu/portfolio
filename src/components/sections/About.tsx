"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { about, skillGroups } from "@/data/skills";
import { site } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="px-6 py-28 md:px-10 md:py-36">
      <motion.p
        className="mono-label text-accent-ink"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.5 }}
      >
        [03] — ABOUT
      </motion.p>

      <div className="mt-12 grid gap-16 lg:grid-cols-[minmax(280px,380px)_1fr] lg:gap-24">
        {/* Sticky portrait */}
        <div className="relative hidden lg:block">
          <div className="sticky top-28">
            <div className="relative">
              <div className="absolute -bottom-3 -left-3 h-full w-full border border-accent-ink" />
              <div className="relative aspect-square overflow-hidden border border-border">
                <Image
                  src="/levi.jpg"
                  alt={site.name}
                  fill
                  sizes="(min-width: 1024px) 380px, 0px"
                  className="object-cover grayscale transition-[filter] duration-500 hover:grayscale-0"
                />
              </div>
            </div>
            <p className="mono-label mt-6 text-muted">
              {site.name.toUpperCase()} — {site.coordinates}
            </p>
          </div>
        </div>

        <div>
          {/* The bio surfaces word by word as you read down */}
          <WordReveal text={about.bio} />

          <div className="mt-20 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="mono-label mb-6 text-accent-ink">CURRENTLY</h3>
              {about.currently.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-t border-border py-4 last:border-b"
                >
                  <span className="mono-label text-muted">
                    {row.label.toUpperCase()}
                  </span>
                  <span className="text-right text-sm text-fg">{row.value}</span>
                </div>
              ))}
            </div>

            <div>
              <h3 className="mono-label mb-6 text-accent-ink">STACK</h3>
              {skillGroups.map((group) => (
                <div key={group.label} className="border-t border-border py-4 last:border-b">
                  <p className="mono-label mb-3 text-muted">
                    {group.label.toUpperCase()}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="mono-label border border-border px-2.5 py-1 text-fg transition-colors hover:border-accent-ink hover:text-accent-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Each word's opacity is mapped to its own slice of the scroll progress. */
function WordReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="max-w-3xl text-[clamp(1.4rem,2.6vw,2.2rem)] font-medium leading-[1.35] text-fg"
    >
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}
