import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "PHP", "Python", "C", "C++"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Motion"],
  },
  {
    label: "Backend & Tools",
    items: ["Node.js", "MySQL", "Supabase", "Git", "Vercel", "Linux"],
  },
];

export const about = {
  /* Rendered word by word on scroll — keep it tight. */
  bio: "I'm a software developer based in Kigali, Rwanda — Kenyan and Rwandan. I design and build web products end to end: school platforms, encrypted storage, digital galleries. My work runs in production for organizations like SoW!SE Africa and New Generation Academy, used daily by real people. I care about software that survives contact with its users — and looks good doing it.",
  currently: [
    { label: "Building", value: "NGA MIS v2.0" },
    { label: "Learning", value: "Systems programming in C" },
    { label: "Open to", value: "Freelance & collaboration" },
  ],
};
