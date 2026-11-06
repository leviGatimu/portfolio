import type { Project, RepoLink } from "./types";

/** Flagship work — shown in the pinned horizontal gallery. */
export const projects: Project[] = [
  {
    id: "nga-mis",
    title: "NGA MIS v2.0",
    description:
      "Education management platform for a private academy — grading, assessments and institutional communication in one system.",
    role: "Design & development",
    logo: "/nga-logo.png",
    url: "https://www.ngaportal.sowiseafrica.org/index",
    tech: ["PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    year: "2025",
  },
  {
    id: "inkingi",
    title: "Inkingi Art Space",
    description:
      "Digital gallery and creative hub for the next generation of Rwandan artists, with a dedicated artist portal.",
    role: "Design & development",
    logo: "/inkingi-logo.svg",
    url: "https://inkingi.sowiseafrica.org/",
    tech: ["PHP", "JavaScript", "CSS", "Artist Portal"],
    year: "2024",
  },
  {
    id: "vault",
    title: "Vault",
    description:
      "End-to-end encrypted password manager and file storage. Zero-knowledge by design — the server never sees a secret.",
    role: "Product & engineering",
    logo: "/supabase.svg",
    url: "https://vault-d6t62wayb-levigatimus-projects.vercel.app/",
    repo: "https://github.com/leviGatimu/Vault",
    tech: ["Next.js", "React", "Supabase", "Encryption"],
    year: "2024",
  },
  {
    id: "sowise",
    title: "SoW!SE Africa",
    description:
      "Platform for a certified NGO unlocking the potential of African youth through values-based education.",
    role: "Design & development",
    logo: "/sowise-logo.png",
    url: "https://www.sowiseafrica.org/index",
    tech: ["PHP", "JavaScript", "Tailwind CSS"],
    year: "2024",
  },
  {
    id: "zibrah",
    title: "Zibrah Code",
    description:
      "Interactive web experience mapping leadership decisions and conflict escalation — the Geometry of Truth and Wisdom model.",
    role: "Design & development",
    logo: "/zibrah-logo.png",
    url: "https://zibrahcode.sowiseafrica.org/",
    tech: ["React", "Next.js", "Tailwind CSS"],
    year: "2025",
  },
  {
    id: "sticky-notes",
    title: "Sticky Notes",
    description:
      "Browser-based task board — create, drag and manage virtual sticky notes. Small tool, daily users.",
    role: "Design & development",
    logo: "/javascript.svg",
    url: "https://levigatimu.github.io/Homework-to-do-list/",
    repo: "https://github.com/leviGatimu/Homework-to-do-list",
    tech: ["JavaScript", "CSS", "GitHub Pages"],
    year: "2023",
  },
];

/** The archive — open-source repos worth a look. */
export const archive: RepoLink[] = [
  {
    name: "Flux",
    summary: "State management library with zero dependencies",
    url: "https://github.com/leviGatimu/Flux",
  },
  {
    name: "Corex",
    summary: "Web architecture framework",
    url: "https://github.com/leviGatimu/Corex",
  },
  {
    name: "NGA-MIS",
    summary: "School management information system",
    url: "https://github.com/leviGatimu/NGA-MIS",
  },
  {
    name: "Boho",
    summary: "Restaurant ordering & reservation platform",
    url: "https://github.com/leviGatimu/Boho-restuarant",
  },
  {
    name: "BestBuy",
    summary: "E-commerce platform with payments",
    url: "https://github.com/leviGatimu/bestbuy",
  },
];
