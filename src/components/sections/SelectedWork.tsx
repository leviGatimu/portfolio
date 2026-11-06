"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects, archive } from "@/data/projects";
import type { Project } from "@/data/types";
import { EASE } from "@/lib/easing";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Showstopper: on desktop the section pins to the viewport and vertical
 * scroll drives the card track sideways. IMPORTANT: this section must stay
 * at page-flow top level — an ancestor animating transform/filter would
 * re-root the position:sticky and kill the pin.
 */
export default function SelectedWork() {
  const isDesktop = useMediaQuery("(min-width: 900px)");
  const reduce = useReducedMotion();

  return (
    <section id="work">
      {isDesktop && !reduce ? <HorizontalGallery /> : <MobileStack />}
      <ArchiveStrip />
    </section>
  );
}

function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () =>
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  // Iris wipe — the section "opens up" the instant the pin engages, timed to
  // the raw (unsprung) progress so it snaps in sync with the scroll itself.
  // Built from a numeric value + useMotionTemplate rather than interpolating
  // between two clip-path strings directly — the latter doesn't clamp past
  // its input range and produces a stuck/regrowing circle later in the scroll.
  const irisRadius = useTransform(scrollYProgress, [0, 0.06], [140, 0]);
  const irisClip = useMotionTemplate`circle(${irisRadius}% at 50% 50%)`;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIndex(
      Math.min(projects.length, Math.max(1, Math.ceil(v * projects.length))),
    );
  });

  return (
    <div ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-24">
        <div className="flex items-end justify-between px-6 md:px-10">
          <SectionHeading
            index="02"
            label="SELECTED WORK"
            title="Work"
            size="md"
          />
          <p className="mono-label pb-2 text-muted">
            {String(index).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </p>
        </div>

        <div className="relative flex flex-1 items-center">
          <motion.div
            ref={trackRef}
            className="flex w-max items-center gap-6 px-6 will-change-transform md:gap-10 md:px-10"
            style={{ x }}
          >
            {projects.map((project, i) => (
              <GalleryCard
                key={project.id}
                project={project}
                index={i}
                total={projects.length}
                progress={smooth}
              />
            ))}
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 bg-bg"
            style={{ clipPath: irisClip }}
          />
        </div>

        {/* Track progress */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
          style={{ scaleX: smooth }}
        />
      </div>
    </div>
  );
}

function GalleryCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const w = end - start;
  const edge = w * 0.3;
  const first = index === 0;
  const last = index === total - 1;
  const range = [start, start + edge, end - edge, end];

  const scale = useTransform(progress, range, [first ? 1 : 0.82, 1, 1, last ? 1 : 0.82]);
  const opacity = useTransform(progress, range, [first ? 1 : 0.35, 1, 1, last ? 1 : 0.35]);
  const rotate = useTransform(progress, range, [first ? 0 : 6, 0, 0, last ? 0 : -6]);
  const y = useTransform(progress, range, [first ? 0 : 26, 0, 0, last ? 0 : -26]);

  return (
    <motion.div style={{ scale, opacity, rotate, y }} className="shrink-0">
      <WorkCard project={project} horizontal />
    </motion.div>
  );
}

function MobileStack() {
  return (
    <div className="px-6 py-28 md:px-10">
      <SectionHeading index="02" label="SELECTED WORK" title="Work" />
      <div className="flex flex-col gap-12">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: EASE }}
          >
            <WorkCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function WorkCard({
  project,
  horizontal = false,
}: {
  project: Project;
  horizontal?: boolean;
}) {
  return (
    <article
      className={
        horizontal
          ? "flex h-[min(58vh,620px)] w-[min(72vw,960px)] shrink-0 flex-col border border-border bg-surface"
          : "flex flex-col border border-border bg-surface"
      }
    >
      {/* Media — logo framed on a quiet tile; the cursor becomes VIEW here */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-label="VIEW"
        aria-label={`Visit ${project.title}`}
        className={
          horizontal
            ? "group relative flex flex-1 items-center justify-center overflow-hidden bg-surface-2"
            : "group relative flex h-56 items-center justify-center overflow-hidden bg-surface-2 sm:h-72"
        }
      >
        <span className="mono-label absolute left-5 top-5 text-muted">
          {project.year}
        </span>
        <span className="mono-label absolute right-5 top-5 text-muted">
          {project.role.toUpperCase()}
        </span>
        <Image
          src={project.logo}
          alt=""
          width={200}
          height={200}
          className="h-24 w-auto max-w-[60%] object-contain transition-transform duration-500 ease-out group-hover:scale-105 md:h-32"
        />
      </a>

      <div className="flex flex-col gap-4 p-6 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-display text-[clamp(1.6rem,3vw,2.6rem)] text-fg">
            {project.title.toUpperCase()}
          </h3>
          <span className="flex items-center gap-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label flex items-center gap-1 text-accent-ink transition-opacity hover:opacity-70"
            >
              VISIT <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label flex items-center gap-1 text-muted transition-colors hover:text-fg"
              >
                CODE <ArrowUpRight size={13} strokeWidth={1.5} />
              </a>
            )}
          </span>
        </div>

        <p className="max-w-lg text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="mono-label border border-border px-2.5 py-1 text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ArchiveStrip() {
  return (
    <div className="px-6 pb-28 pt-16 md:px-10">
      <motion.p
        className="mono-label mb-8 text-accent-ink"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        [02.5] — MORE IN THE ARCHIVE
      </motion.p>
      <div>
        {archive.map((repo, i) => (
          <motion.a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-baseline justify-between gap-4 border-t border-border py-5 last:border-b"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
          >
            <span className="flex items-baseline gap-5 transition-transform duration-300 group-hover:translate-x-2">
              <span className="font-display text-xl text-fg md:text-2xl">
                {repo.name.toUpperCase()}
              </span>
              <span className="hidden text-sm text-muted sm:inline">
                {repo.summary}
              </span>
            </span>
            <span className="mono-label flex shrink-0 items-center gap-1 text-muted transition-colors group-hover:text-accent-ink">
              GITHUB <ArrowUpRight size={13} strokeWidth={1.5} />
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
