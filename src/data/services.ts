import type { Service } from "./types";

export const services: Service[] = [
  {
    id: "web-apps",
    title: "Web Applications",
    description:
      "Full product builds — data model, auth, dashboards and admin panels, deployed and maintained in production.",
    tech: ["Next.js", "React", "Supabase", "MySQL"],
  },
  {
    id: "design-engineering",
    title: "Design Engineering",
    description:
      "Interfaces with motion, precision and detail that make a product feel expensive. This site is the demo.",
    tech: ["Motion", "Tailwind CSS", "Canvas", "TypeScript"],
  },
  {
    id: "backend",
    title: "Backend, Data & Auth",
    description:
      "APIs, databases and secure authentication that hold up after launch — including end-to-end encryption.",
    tech: ["Node.js", "PHP", "MySQL", "Supabase"],
  },
  {
    id: "org-sites",
    title: "Sites for Orgs & Brands",
    description:
      "Fast, maintainable websites for organizations that need to look serious — schools, NGOs, studios.",
    tech: ["Next.js", "PHP", "SEO", "Vercel"],
  },
];
