import type { Social } from "./types";

export const site = {
  name: "Levi Gatimu",
  firstName: "LEVI",
  lastName: "GATIMU",
  role: "Software Developer",
  tagline: "I design and build web products that ship.",
  email: "getmorelev@gmail.com",
  github: "https://github.com/leviGatimu",
  location: "Kigali, Rwanda",
  coordinates: "1°57′S 30°04′E",
  availability: "Open to work",
  /** City clocks shown in the hero + footer. UTC offsets in hours. */
  clocks: [
    { code: "KGL", city: "Kigali", utcOffset: 2 },
    { code: "NBO", city: "Nairobi", utcOffset: 3 },
  ],
} as const;

export const socials: Social[] = [
  { label: "GitHub", url: "https://github.com/leviGatimu" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/levi-gatimu-a0277836b" },
  { label: "Email", url: "mailto:getmorelev@gmail.com" },
];
