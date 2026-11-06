"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useLenis } from "lenis/react";
import { navLinks } from "@/data/nav";
import { site } from "@/data/site";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { cn } from "@/lib/cn";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import MagneticButton from "@/components/ui/MagneticButton";
import RandomLetterSwap from "@/components/ui/random-letter-swap";

const sectionIds = navLinks.map((l) => l.href.slice(1));

export default function Nav() {
  const lenis = useLenis();
  const spied = useScrollSpy(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [atPageEnd, setAtPageEnd] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 80);
    setAtPageEnd(y + window.innerHeight >= document.documentElement.scrollHeight - 2);
  });

  // The footer is too short to reach the spy's band in the middle of the screen.
  const active = atPageEnd ? sectionIds.at(-1) : spied;

  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
  }, [menuOpen, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    lenis?.scrollTo(href, { offset: -72, duration: 1.4 });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[9980] transition-[background-color,border-color] duration-300",
          scrolled
            ? "border-b border-border bg-bg/70 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <div className="flex h-[72px] items-center justify-between px-6 md:px-10">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              lenis?.scrollTo(0, { duration: 1.4 });
            }}
            className="mono-label z-[9975] text-fg"
          >
            {site.name.toUpperCase()} ©
          </a>

          {/* Desktop links */}
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className={cn(
                    "relative py-1 text-sm font-medium transition-colors",
                    isActive ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  <RandomLetterSwap
                    label={link.label}
                    staggerDuration={0.025}
                    transition={{ duration: 0.6, type: "spring" }}
                  />
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-accent-ink"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <MagneticButton className="hidden md:inline-block">
              <a
                href={`mailto:${site.email}`}
                className="mono-label inline-block rounded-full bg-accent px-5 py-2.5 text-on-accent"
              >
                Let&apos;s talk
              </a>
            </MagneticButton>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="relative z-[9975] flex size-9 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <motion.span
                className="block h-px w-5 bg-fg"
                animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="block h-px w-5 bg-fg"
                animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
