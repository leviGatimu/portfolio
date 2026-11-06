const USER = "leviGatimu";
const REVALIDATE_SECONDS = 3600;
const TIMEOUT_MS = 8000;
const LATEST_REPOS = 4;

export const GITHUB_PROFILE = `https://github.com/${USER}`;

export interface ContributionDay {
  date: string;
  count: number;
  /** GitHub's own intensity bucket, 0 to 4. */
  level: number;
}

export interface LatestRepo {
  name: string;
  description: string | null;
  language: string | null;
  pushedAt: string;
  url: string;
}

export interface GitHubActivity {
  /** Null if GitHub's contribution page couldn't be read. */
  contributions: { total: number; days: ContributionDay[]; currentStreak: number; longestStreak: number } | null;
  publicRepos: number | null;
  latest: LatestRepo[];
}

function request(url: string, headers: HeadersInit = {}) {
  return fetch(url, {
    headers: { "User-Agent": "levi-gatimu-portfolio", ...headers },
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

/** Optional, for a higher API rate limit. Only ever read on the server. */
function apiHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**
 * The calendar has no token-free API, so this reads the fragment GitHub serves
 * for profile pages. It isn't a documented format: anything unexpected returns
 * null and the section simply leaves the graph out.
 */
export function parseContributions(html: string): GitHubActivity["contributions"] {
  const counts = new Map<string, number>();
  for (const [, id, text] of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const match = /^(\d[\d,]*|No) contribution/.exec(text.trim());
    if (match) counts.set(id, match[1] === "No" ? 0 : Number(match[1].replace(/,/g, "")));
  }

  const days: ContributionDay[] = [];
  for (const [cell] of html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)) {
    const date = /data-date="([\d-]+)"/.exec(cell)?.[1];
    const level = /data-level="(\d)"/.exec(cell)?.[1];
    const id = /\bid="([^"]+)"/.exec(cell)?.[1];
    if (date && level && id) days.push({ date, level: Number(level), count: counts.get(id) ?? 0 });
  }
  if (days.length < 7) return null;
  days.sort((a, b) => a.date.localeCompare(b.date));

  let longestStreak = 0;
  let run = 0;
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    longestStreak = Math.max(longestStreak, run);
  }
  // Today not being done yet shouldn't break a streak.
  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) currentStreak++;
    else if (i !== days.length - 1) break;
  }

  const stated = /([\d,]+)\s+contributions?\s+in the last year/.exec(html)?.[1];
  const total = stated ? Number(stated.replace(/,/g, "")) : days.reduce((sum, day) => sum + day.count, 0);
  return { total, days, currentStreak, longestStreak };
}

async function fetchContributions() {
  const response = await request(`${GITHUB_PROFILE.replace("github.com/", "github.com/users/")}/contributions`);
  if (!response.ok) throw new Error(`contributions: ${response.status}`);
  return parseContributions(await response.text());
}

async function fetchPublicRepos() {
  const response = await request(`https://api.github.com/users/${USER}`, apiHeaders());
  if (!response.ok) throw new Error(`user: ${response.status}`);
  const user = (await response.json()) as { public_repos: number };
  return user.public_repos;
}

async function fetchLatest(): Promise<LatestRepo[]> {
  const response = await request(
    `https://api.github.com/users/${USER}/repos?sort=pushed&per_page=12`,
    apiHeaders(),
  );
  if (!response.ok) throw new Error(`repos: ${response.status}`);
  const repos = (await response.json()) as {
    name: string;
    description: string | null;
    language: string | null;
    pushed_at: string;
    html_url: string;
    fork: boolean;
  }[];
  return repos
    .filter((repo) => !repo.fork && repo.name.toLowerCase() !== USER.toLowerCase())
    .slice(0, LATEST_REPOS)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      pushedAt: repo.pushed_at,
      url: repo.html_url,
    }));
}

/** Each source fails on its own, so one outage only removes its own part of the section. */
export async function getGitHubActivity(): Promise<GitHubActivity> {
  const [contributions, publicRepos, latest] = await Promise.allSettled([
    fetchContributions(),
    fetchPublicRepos(),
    fetchLatest(),
  ]);
  return {
    contributions: contributions.status === "fulfilled" ? contributions.value : null,
    publicRepos: publicRepos.status === "fulfilled" ? publicRepos.value : null,
    latest: latest.status === "fulfilled" ? latest.value : [],
  };
}
