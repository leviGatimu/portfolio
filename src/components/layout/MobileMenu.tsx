"use client";

import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import { navLinks } from "@/data/nav";
import { EASE } from "@/lib/easing";
import MaskReveal from "@/components/ui/MaskReveal";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const lenis = useLenis();

  const go = (href: string) => {
    onClose();
    // let Lenis restart before scrolling
    setTimeout(() => lenis?.scrollTo(href, { offset: -72, duration: 1.4 }), 50);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9970] flex flex-col justify-center bg-bg px-8"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <button
                    onClick={() => go(link.href)}
                    className="font-display block text-[clamp(3rem,14vw,5.5rem)] text-fg"
                  >
                    <MaskReveal
                      text={link.label.toUpperCase()}
                      show={open}
                      baseDelay={0.25 + i * 0.06}
                      stagger={0.02}
                      duration={0.6}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <motion.p
            className="mono-label mt-12 text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Kigali, Rwanda — open to work
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
