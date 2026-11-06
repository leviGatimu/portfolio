export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  logo: string;
  url: string;
  repo?: string;
  tech: string[];
  year: string;
}

export interface RepoLink {
  name: string;
  summary: string;
  url: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tech: string[];
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface TimelineEntry {
  id: string;
  kind: "work" | "education";
  period: string;
  title: string;
  org: string;
  summary: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface Social {
  label: string;
  url: string;
}
