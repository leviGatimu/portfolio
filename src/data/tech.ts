import type { PictureRailTech } from "@/components/ui/picture-rail-gallery";

/** Logos live in public/tech, generated from Simple Icons in each brand's color. */
const logo = (name: string, file: string): PictureRailTech => ({
  name,
  logo: `/tech/${file}.svg`,
});

export const tech = {
  nextjs: logo("Next.js", "nextjs"),
  react: logo("React", "react"),
  typescript: logo("TypeScript", "typescript"),
  javascript: logo("JavaScript", "javascript"),
  vite: logo("Vite", "vite"),
  tailwind: logo("Tailwind CSS", "tailwind"),
  prisma: logo("Prisma", "prisma"),
  postgresql: logo("PostgreSQL", "postgresql"),
  supabase: logo("Supabase", "supabase"),
  leaflet: logo("Leaflet", "leaflet"),
  gemini: logo("Gemini", "gemini"),
  express: logo("Express", "express"),
  capacitor: logo("Capacitor", "capacitor"),
  electron: logo("Electron", "electron"),
  dotnet: logo(".NET", "dotnet"),
  sqlite: logo("SQLite", "sqlite"),
  php: logo("PHP", "php"),
  alpine: logo("Alpine.js", "alpine"),
  gsap: logo("GSAP", "gsap"),
  css: logo("CSS", "css"),
};
