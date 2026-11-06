"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { site } from "@/data/site";
import { EASE } from "@/lib/easing";
import { usePreloaderDone } from "@/lib/hooks/usePreloaderDone";
import MaskReveal from "@/components/ui/MaskReveal";
import ScrambleText from "@/components/ui/ScrambleText";
import LiveClock from "@/components/ui/LiveClock";
import PortraitGlitch from "@/components/ui/PortraitGlitch";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const booted = usePreloaderDone();
  const reduce = useReducedMotion();

  // Scroll-away: the whole composition lifts and fades as one unit
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Cursor tilt on the portrait
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // The name drifts opposite the portrait's tilt — a cheap parallax that
  // sells the name as sitting in a plane behind the portrait.
  const nameX = useSpring(useTransform(tiltX, [-0.5, 0.5], [18, -18]), {
    stiffness: 150,
    damping: 20,
  });
  const nameY = useSpring(useTransform(tiltY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20,
  });

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-svh flex-col overflow-hidden px-6 pb-10 pt-[100px] md:px-10 md:pb-14"
    >
      {/* Ambient glow behind the composition — outer sets the theme-aware
          ceiling opacity, inner carries the scroll-linked fade + the paint
          itself, so the two multiply via normal opacity compositing. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[70vh] w-[70vh] max-h-[600px] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] blur-3xl dark:opacity-[0.45]"
      >
        <motion.div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            opacity: stageOpacity,
          }}
          initial={{ scale: 0.85 }}
          animate={booted ? { scale: 1 } : {}}
          transition={{ duration: 1.2, ease: EASE }}
        />
      </div>

      {/* Name + portrait composite */}
      <motion.div
        style={{ y: stageY, opacity: stageOpacity }}
        className="relative z-10 flex flex-1 items-center justify-center"
      >
        <div className="relative aspect-square w-[clamp(320px,min(90vw,82svh),980px)]">
          <motion.div className="absolute inset-0" style={{ x: nameX, y: nameY }}>
            <h1 aria-label={`${site.name} — ${site.role}`}>
              <span
                aria-hidden="true"
                className="absolute left-[38%] top-[4%] z-0 -translate-x-1/2 whitespace-nowrap"
              >
                <MaskReveal
                  text={site.firstName}
                  show={booted}
                  baseDelay={0.1}
                  className="font-display text-[clamp(5rem,26vw,16rem)] leading-[0.85] text-fg"
                />
              </span>
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[58%] z-0 -translate-x-1/2 whitespace-nowrap"
              >
                <MaskReveal
                  text={site.lastName}
                  show={booted}
                  baseDelay={0.3}
                  className="font-display text-outline text-[clamp(5rem,26vw,16rem)] leading-[0.85]"
                />
              </span>
            </h1>
          </motion.div>

          {/* Portrait — tilts toward the cursor, glitch-sweeps to color on hover */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{ rotateX, rotateY, transformPerspective: 800 }}
            onMouseMove={reduce ? undefined : onTilt}
            onMouseLeave={() => {
              tiltX.set(0);
              tiltY.set(0);
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
          >
            {/* Grows from the top so the head clears the nav; the hero clips the rest */}
            <div className="absolute inset-0 origin-top scale-110 md:scale-[1.2]">
              <PortraitGlitch src="/levi2.png" alt={site.name} fullColor />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Corner A — Identity: role, location, clocks */}
      <motion.div
        style={{ opacity: metaOpacity }}
        initial={{ opacity: 0, y: 12 }}
        animate={booted ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
        className="relative z-20 mt-8 flex flex-col items-center text-center md:absolute md:bottom-8 md:left-6 md:mt-0 md:items-start md:text-left lg:left-10"
      >
        <span className="relative inline-block">
          <motion.span
            className="absolute inset-0 bg-accent"
            style={{ originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={booted ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
          />
          <motion.span
            className="mono-label relative block px-3 py-2 text-on-accent"
            initial={{ opacity: 0 }}
            animate={booted ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.15, duration: 0.3 }}
          >
            {site.role.toUpperCase()}
          </motion.span>
        </span>

        <p className="mono-label mt-3 text-muted">
          {booted && <ScrambleText text="KIGALI, RWANDA — KENYAN / RWANDAN" delay={200} />}
        </p>

        <div className="mono-label mt-3 flex gap-4 text-muted">
          {site.clocks.map((c) => (
            <p key={c.code}>
              {c.code} <LiveClock utcOffset={c.utcOffset} className="text-fg" />
            </p>
          ))}
        </div>
      </motion.div>

      {/* Corner B — Statement: availability, tagline */}
      <motion.div
        style={{ opacity: metaOpacity }}
        initial={{ opacity: 0, y: 12 }}
        animate={booted ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
        className="relative z-20 mt-6 flex flex-col items-center text-center md:absolute md:bottom-8 md:right-6 md:mt-0 md:items-end md:text-right lg:right-10"
      >
        <p className="mono-label flex items-center gap-2 text-fg">
          <motion.span
            className="inline-block size-1.5 rounded-full bg-accent-ink"
            animate={reduce ? undefined : { opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {site.availability.toUpperCase()}
        </p>

        <p className="font-display mt-3 max-w-[16ch] text-[clamp(1.6rem,4vw,3.2rem)] text-fg md:max-w-[20ch]">
          {site.tagline}
        </p>
      </motion.div>
    </section>
  );
}
