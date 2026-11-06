/* Tiles are small, fixed-size SVG logos, so next/image would add nothing. */
/* eslint-disable @next/next/no-img-element */
"use client";

import { stackGroups, type StackTool } from "@/data/stack";
import { cn } from "@/lib/cn";
import MaskReveal from "@/components/ui/MaskReveal";
import { ToolDock, ToolDockTile, type ToolDockItem } from "@/components/ui/techstack";

const HEADING = "Tech stack";

function toDockItem({ label, file, tile, mono }: StackTool): ToolDockItem {
  return {
    label,
    icon: (
      <ToolDockTile className={tile}>
        <img
          src={`/tech/${file}.svg`}
          alt=""
          draggable={false}
          className={cn(
            "size-[54%] object-contain",
            mono === "white" && "brightness-0 invert",
            mono === "black" && "brightness-0",
          )}
        />
      </ToolDockTile>
    ),
  };
}

export default function TechStack() {
  return (
    <section id="stack" className="px-6 pb-24 md:px-10 md:pb-32">
      <h2
        aria-label={HEADING}
        className="font-display text-[clamp(2.75rem,7vw,6rem)] text-fg"
      >
        <MaskReveal text={HEADING.toUpperCase()} stagger={0.03} />
      </h2>

      <div className="mt-10 grid gap-x-16 gap-y-12 md:mt-14 md:grid-cols-2">
        {stackGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mono-label text-muted">{group.title}</h3>
            {/* The dock reserves room above for its tooltip, which may cover the label. */}
            <ToolDock
              items={group.tools.map(toDockItem)}
              label={group.title}
              size={68}
              overlap={0.02}
              className="-mt-12 justify-start"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
