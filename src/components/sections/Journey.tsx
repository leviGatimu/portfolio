"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { journey } from "@/data/journey";
import type { TimelineEntry } from "@/data/types";
import { EASE } from "@/lib/easing";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/cn";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Experience + education as one pinned timeline: entries crossfade while a
 * progress line draws down. Static list on mobile / reduced motion.
 * Same rule as the gallery: keep this at page-flow top level (sticky).
 */
export default function Journey() {
  const isDesktop = useMediaQuery("(min-width: 900px)");
  const reduce = useReducedMotion();

  return (
    <section id="journey">
      {isDesktop && !reduce ? <PinnedTimeline /> : <StaticTimeline />}
    </section>
  );
}

function KindBadge({ kind }: { kind: TimelineEntry["kind"] }) {
  return (
    <span
      className={cn(
        "mono-label border px-2.5 py-1",
        kind === "work"
          ? "border-accent-ink text-accent-ink"
          : "border-border text-muted",
      )}
    >
      {kind === "work" ? "WORK" : "EDUCATION"}
    </span>
  );
}

function PinnedTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });

  return (
    <div ref={ref} style={{ height: `${journey.length * 80 + 20}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden px-6 pt-24 md:px-10">
        <SectionHeading
          index="04"
          label="JOURNEY"
          title="The road so far"
          size="md"
        />

        <div className="relative mt-8 flex-1">
          {/* Progress line */}
          <div className="absolute bottom-8 left-0 top-0 w-px bg-border">
            <motion.div
              className="h-full w-px origin-top bg-accent-ink"
              style={{ scaleY: smooth }}
            />
          </div>

          {journey.map((entry, i) => (
            <PinnedEntry
              key={entry.id}
              entry={entry}
              index={i}
              total={journey.length}
              progress={smooth}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PinnedEntry({
  entry,
  index,
  total,
  progress,
}: {
  entry: TimelineEntry;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const w = end - start;
  const first = index === 0;
  const last = index === total - 1;

  const opacity = useTransform(
    progress,
    [start, start + w * 0.25, end - w * 0.25, end],
    [first ? 1 : 0, 1, 1, last ? 1 : 0],
  );
  const y = useTransform(
    progress,
    [start, start + w * 0.25, end - w * 0.25, end],
    [first ? 0 : 60, 0, 0, last ? 0 : -60],
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 grid items-center gap-10 pl-10 md:grid-cols-[1fr_1.5fr] md:pl-16"
    >
      <div>
        <p className="font-display text-outline text-[clamp(4rem,9vw,8rem)] leading-none">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="mono-label mt-4 text-muted">{entry.period}</p>
      </div>

      <div>
        <KindBadge kind={entry.kind} />
        <h3 className="font-display mt-5 text-[clamp(1.8rem,3.5vw,3rem)] text-fg">
          {entry.title.toUpperCase()}
        </h3>
        <p className="mono-label mt-2 text-accent-ink">{entry.org}</p>
        <p className="mt-6 max-w-lg leading-relaxed text-muted">
          {entry.summary}
        </p>
      </div>
    </motion.div>
  );
}

function StaticTimeline() {
  return (
    <div className="px-6 py-28 md:px-10">
      <SectionHeading index="04" label="JOURNEY" title="The road so far" />
      <div className="border-l border-border">
        {journey.map((entry, i) => (
          <motion.div
            key={entry.id}
            className="relative py-10 pl-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: EASE }}
          >
            <span className="absolute -left-[3px] top-14 size-[5px] rounded-full bg-accent-ink" />
            <div className="flex flex-wrap items-center gap-3">
              <KindBadge kind={entry.kind} />
              <span className="mono-label text-muted">{entry.period}</span>
            </div>
            <h3 className="font-display mt-4 text-3xl text-fg">
              {entry.title.toUpperCase()}
            </h3>
            <p className="mono-label mt-1 text-accent-ink">{entry.org}</p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
              {entry.summary}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
