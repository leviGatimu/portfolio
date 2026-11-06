/*
 * Levi's stack, from his project repos and the toolbox on his previous site.
 * `tile` is the tile's color; `mono` turns the colored logo white or black so
 * it reads on a brand-colored tile.
 */
export interface StackTool {
  label: string;
  file: string;
  tile: string;
  mono?: "white" | "black";
}

export interface StackGroup {
  title: string;
  tools: StackTool[];
}

export const stackGroups: StackGroup[] = [
  {
    title: "Languages",
    tools: [
      { label: "TypeScript", file: "typescript", tile: "bg-[#3178c6]", mono: "white" },
      { label: "JavaScript", file: "javascript", tile: "bg-[#f7df1e]", mono: "black" },
      { label: "PHP", file: "php", tile: "bg-[#777bb4]", mono: "white" },
      { label: "Python", file: "python", tile: "bg-white" },
      { label: "C# / .NET", file: "dotnet", tile: "bg-[#512bd4]", mono: "white" },
    ],
  },
  {
    title: "Frontend",
    tools: [
      { label: "React", file: "react", tile: "bg-[#20232a]" },
      { label: "Next.js", file: "nextjs", tile: "bg-black", mono: "white" },
      { label: "Vite", file: "vite", tile: "bg-white" },
      { label: "Tailwind CSS", file: "tailwind", tile: "bg-[#0f172a]" },
      { label: "Framer Motion", file: "motion", tile: "bg-white", mono: "black" },
      { label: "GSAP", file: "gsap", tile: "bg-[#0e100f]" },
    ],
  },
  {
    title: "Backend & data",
    tools: [
      { label: "Node.js", file: "nodejs", tile: "bg-white" },
      { label: "Express", file: "express", tile: "bg-[#222222]", mono: "white" },
      { label: "Prisma", file: "prisma", tile: "bg-white" },
      { label: "PostgreSQL", file: "postgresql", tile: "bg-[#4169e1]", mono: "white" },
      { label: "MySQL", file: "mysql", tile: "bg-white" },
      { label: "Supabase", file: "supabase", tile: "bg-[#171717]" },
      { label: "SQLite", file: "sqlite", tile: "bg-[#003b57]", mono: "white" },
    ],
  },
  {
    title: "Tools & hardware",
    tools: [
      { label: "Git", file: "git", tile: "bg-[#f05032]", mono: "white" },
      { label: "GitHub", file: "github", tile: "bg-[#0d1117]", mono: "white" },
      { label: "Docker", file: "docker", tile: "bg-[#2496ed]", mono: "white" },
      { label: "Vercel", file: "vercel", tile: "bg-black", mono: "white" },
      { label: "Figma", file: "figma", tile: "bg-white" },
      { label: "Electron", file: "electron", tile: "bg-[#2b2e3a]", mono: "white" },
      { label: "Raspberry Pi", file: "raspberrypi", tile: "bg-[#a22846]", mono: "white" },
      { label: "Arduino", file: "arduino", tile: "bg-[#00979d]", mono: "white" },
    ],
  },
];
