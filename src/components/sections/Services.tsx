"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Code2, Palette, Database, Building2 } from "lucide-react";
import { services } from "@/data/services";
import { EASE } from "@/lib/easing";
import SectionHeading from "@/components/ui/SectionHeading";
import MaskReveal from "@/components/ui/MaskReveal";

const ICONS: Record<string, typeof Code2> = {
  "web-apps": Code2,
  "design-engineering": Palette,
  backend: Database,
  "org-sites": Building2,
};

export default function Services() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="services" className="px-6 py-28 md:px-10 md:py-36">
      <SectionHeading index="01" label="SERVICES" title="What I do" />

      <div>
        {services.map((service, i) => {
          const isOpen = open === service.id;
          const Icon = ICONS[service.id] ?? Code2;
          return (
            <motion.div
              key={service.id}
              className="border-t border-border last:border-b"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: EASE }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : service.id)}
                aria-expanded={isOpen}
                data-cursor-label={isOpen ? "CLOSE" : "OPEN"}
                className="group flex w-full items-center justify-between gap-4 py-7 text-left md:gap-6 md:py-9"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <motion.div
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-bg md:size-14"
                    animate={{
                      backgroundColor: isOpen ? "var(--accent)" : "var(--bg)",
                      borderColor: isOpen ? "var(--accent)" : "var(--border)",
                      rotate: isOpen ? -8 : 0,
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.5}
                      className={isOpen ? "text-on-accent" : "text-muted"}
                    />
                  </motion.div>
                  <div className="flex items-baseline gap-3 md:gap-5">
                    <span className="mono-label text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Highlighter sweep on hover — the light-mode marker stroke */}
                    <span className="font-display bg-[linear-gradient(var(--accent),var(--accent))] bg-no-repeat text-[clamp(1.6rem,4.2vw,3.75rem)] text-fg transition-[background-size] duration-500 [background-position:0_82%] [background-size:0%_32%] group-hover:[background-size:100%_32%]">
                      <MaskReveal text={service.title.toUpperCase()} by="word" stagger={0.03} />
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="mono-label hidden text-muted md:block">
                    {!isOpen && service.tech.slice(0, 2).join(" / ")}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="shrink-0 text-muted transition-colors group-hover:text-fg"
                  >
                    <ArrowUpRight size={28} strokeWidth={1.25} />
                  </motion.span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-6 pb-10 md:ml-24 md:flex-row md:items-start md:justify-between">
                      <p className="max-w-xl text-base leading-relaxed text-muted">
                        {service.description}
                      </p>
                      <motion.ul
                        className="flex flex-wrap gap-2"
                        initial="hidden"
                        animate="show"
                        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                      >
                        {service.tech.map((t) => (
                          <motion.li
                            key={t}
                            variants={{
                              hidden: { opacity: 0, y: 6 },
                              show: { opacity: 1, y: 0 },
                            }}
                            className="mono-label border border-border px-3 py-1.5 text-muted"
                          >
                            {t}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
