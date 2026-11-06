import type { PictureRailItem } from "@/components/ui/picture-rail-gallery";
import { tech } from "./tech";

/** Screenshots live in public/projects and are cropped to this shape. */
const SCREENSHOT_ASPECT = 1.6;

/*
 * Each stack comes from the project's package.json, repo languages or what the
 * live site actually loads. Add Inkingi once its site is back up.
 */
export const projectWall: PictureRailItem[] = [
  {
    id: "tembera",
    title: "Tembera",
    description:
      "A digital guide to real places across Rwanda, helping people discover destinations, services and experiences.",
    image: "/projects/tembera.jpg",
    aspect: SCREENSHOT_ASPECT,
    frame: "black",
    drop: 0.04,
    tech: [tech.nextjs, tech.typescript, tech.postgresql, tech.prisma, tech.leaflet],
    href: "https://tembera-rwanda-lyart.vercel.app",
  },
  {
    id: "study-flow",
    title: "Study Flow",
    description:
      "A study workspace combining notes, AI tutoring, quizzes, flashcards and exam preparation.",
    image: "/projects/study-flow.jpg",
    aspect: SCREENSHOT_ASPECT,
    frame: "oak",
    drop: 0.12,
    tech: [tech.nextjs, tech.typescript, tech.supabase, tech.prisma, tech.gemini, tech.tailwind],
    href: "https://studyingflow.vercel.app",
  },
  {
    id: "trace",
    title: "Trace",
    description:
      "A private activity history for Windows. It records which applications you use and when, then lets you search your day. Nothing leaves your machine.",
    image: "/projects/trace.jpg",
    // Levi's own screenshot of the app, kept uncropped.
    aspect: 1683 / 974,
    frame: "black",
    drop: 0.07,
    tech: [tech.electron, tech.react, tech.typescript, tech.tailwind, tech.dotnet, tech.sqlite],
    href: "https://tracedesktop.vercel.app",
  },
  {
    id: "vault",
    title: "Vault",
    description:
      "A minimal password manager. Categorize and search your logins, then lock them behind a master PIN that never leaves your device.",
    image: "/projects/vault.jpg",
    aspect: SCREENSHOT_ASPECT,
    frame: "white",
    drop: 0.02,
    tech: [tech.nextjs, tech.typescript, tech.supabase, tech.prisma, tech.tailwind],
    href: "https://securityvault.vercel.app",
  },
  {
    id: "nga-mis",
    title: "NGA MIS",
    description:
      "The school management platform for New Generation Academy, bringing student, teacher and attendance dashboards into one system.",
    image: "/projects/nga-mis.jpg",
    aspect: SCREENSHOT_ASPECT,
    frame: "black",
    drop: 0.1,
    tech: [tech.react, tech.vite, tech.tailwind],
    href: "https://mis.amashuri.com",
  },
  {
    id: "rwasport",
    title: "RwaSport",
    description:
      "Live scores, fixtures, results and standings, from Rwanda's national leagues to the Amashuri school games.",
    image: "/projects/rwasport.jpg",
    aspect: SCREENSHOT_ASPECT,
    frame: "oak",
    drop: 0,
    tech: [tech.react, tech.vite, tech.typescript, tech.tailwind, tech.express, tech.prisma, tech.capacitor],
    href: "https://rwasport.vercel.app",
  },
  {
    id: "denise",
    title: "Denise Shop",
    artist: "Built with a colleague",
    description:
      "An online store for a Kigali textile shop, selling curtains, fabrics and traditional Rwandan attire, with MTN MoMo payments, delivery across Rwanda and five languages.",
    image: "/projects/denise.jpg",
    aspect: SCREENSHOT_ASPECT,
    frame: "black",
    drop: 0.05,
    tech: [tech.react, tech.vite, tech.typescript, tech.tailwind, tech.express, tech.prisma, tech.postgresql],
    href: "https://www.deniseshop.com",
  },
  {
    id: "rmc",
    title: "Rwanda Muslim Community",
    artist: "Internship",
    description:
      "I joined as an intern on the digital platform of the RMC, the umbrella organization coordinating Islamic activities in Rwanda. It brings together its services, prayer times, news, scholarships and events.",
    image: "/projects/rmc.jpg",
    aspect: SCREENSHOT_ASPECT,
    frame: "white",
    drop: 0.08,
    tech: [tech.nextjs, tech.react, tech.tailwind],
    href: "https://rwandamuslim.org/en",
  },
  {
    id: "cur-mis",
    title: "CUR MIS",
    artist: "Side job",
    description:
      "The management information system of the Catholic University of Rwanda. As a side job, I helped test it and develop new features.",
    image: "/projects/cur-mis.jpg",
    // Wider than the others: this crop leaves out the bank details bar on the page.
    aspect: 2.18,
    frame: "oak",
    drop: 0.06,
    tech: [tech.react, tech.vite, tech.tailwind],
    href: "https://cur.ac.rw/umis/login",
  },
  {
    id: "zibrah",
    title: "Zibrah Code",
    description:
      "Website for the Zibrah Code leadership framework and book: the Geometry of Truth and Wisdom model.",
    image: "/projects/zibrah.jpg",
    aspect: SCREENSHOT_ASPECT,
    frame: "black",
    drop: 0.03,
    tech: [tech.php, tech.tailwind, tech.alpine, tech.javascript],
    href: "https://zibrahcode.com",
  },
  {
    id: "sowise",
    title: "SoW!SE Africa",
    description:
      "Platform for a certified NGO unlocking the potential of African youth through values-based education.",
    image: "/projects/sowise.jpg",
    aspect: SCREENSHOT_ASPECT,
    frame: "oak",
    drop: 0.11,
    tech: [tech.php, tech.gsap, tech.css, tech.javascript],
    href: "https://www.sowiseafrica.org/index",
  },
];
