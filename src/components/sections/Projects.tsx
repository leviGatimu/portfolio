"use client";

import { useLenis } from "lenis/react";
import { projectWall } from "@/data/wall";
import MaskReveal from "@/components/ui/MaskReveal";
import PictureRailGallery from "@/components/ui/picture-rail-gallery";

const HEADING = "Things I've built";

export default function Projects() {
  const lenis = useLenis();

  return (
    <div id="work" className="pb-24 md:pb-32">
      <h2
        aria-label={HEADING}
        className="font-display mb-10 px-6 text-[clamp(2.75rem,7vw,6rem)] text-fg md:mb-14 md:px-10"
      >
        <MaskReveal text={HEADING.toUpperCase()} stagger={0.03} />
      </h2>
      <PictureRailGallery
        items={projectWall}
        caption="Drag the rail to see more. Pick a project to open it."
        // Lenis would keep scrolling the page behind the open project.
        onOpenChange={(index) => (index === null ? lenis?.start() : lenis?.stop())}
      />
    </div>
  );
}
