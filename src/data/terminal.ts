/**
 * Static command outputs for the terminal section. Commands with behavior
 * (theme, sudo hire-me, fly, clear) are implemented in TerminalSection.
 */
export const terminalOutputs: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  whoami         who is this guy",
    "  stack          languages & tools",
    "  work           live products",
    "  contact        reach me",
    "  theme <mode>   light | dark — watch the site change",
    "  sudo hire-me   you know what this does",
    "  fly            ✈",
    "  clear          wipe the screen",
  ],
  whoami: [
    "LEVI GATIMU — software developer.",
    "Kenyan / Rwandan, based in Kigali.",
    "I build web products that run in production:",
    "school platforms, encrypted storage, digital galleries.",
    "Design-minded. Detail-obsessed. Shipping since day one.",
  ],
  stack: [
    "Languages   TypeScript · JavaScript · PHP · Python · C · C++",
    "Frontend    React · Next.js · Tailwind CSS · Motion",
    "Backend     Node.js · MySQL · Supabase",
    "Tools       Git · Vercel · Linux",
  ],
  work: [
    "NGA MIS v2.0      ngaportal.sowiseafrica.org",
    "Inkingi Art Space inkingi.sowiseafrica.org",
    "SoW!SE Africa     sowiseafrica.org",
    "Zibrah Code       zibrahcode.sowiseafrica.org",
    "Vault             encrypted password manager",
    "+ github.com/leviGatimu",
  ],
  contact: [
    "email   getmorelev@gmail.com",
    "github  github.com/leviGatimu",
    "base    Kigali, Rwanda (GMT+2)",
  ],
};

export const terminalIntro = [
  "levi@kigali:~$ — interactive. type 'help' to look around.",
];
