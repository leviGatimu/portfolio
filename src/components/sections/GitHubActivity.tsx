import { Suspense } from "react";
import { getGitHubActivity, GITHUB_PROFILE } from "@/lib/github";
import ContributionGraph from "@/components/ui/ContributionGraph";
import MaskReveal from "@/components/ui/MaskReveal";

const HEADING = "Always building";

const pushedFormat = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default function GitHubActivity() {
  return (
    <section id="activity" className="px-6 pb-24 md:px-10 md:pb-32">
      <h2 aria-label={HEADING} className="font-display text-[clamp(2.75rem,7vw,6rem)] text-fg">
        <MaskReveal text={HEADING.toUpperCase()} stagger={0.03} />
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-fg">
        Live from{" "}
        <a
          href={GITHUB_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-accent-ink decoration-2 underline-offset-4 transition-colors hover:text-accent-ink"
        >
          my GitHub
        </a>
        , refreshed every hour.
      </p>
      {/* GitHub can be slow; this never holds up the rest of the page. */}
      <Suspense
        fallback={
          <p className="mono-label mt-12 flex h-64 items-center text-muted">Checking GitHub…</p>
        }
      >
        <Activity />
      </Suspense>
    </section>
  );
}

async function Activity() {
  const { contributions, publicRepos, latest } = await getGitHubActivity();

  const stats = [
    contributions && { value: contributions.total, label: "Contributions this year" },
    contributions && { value: contributions.longestStreak, label: "Longest streak, in days" },
    contributions && { value: contributions.currentStreak, label: "Current streak, in days" },
    publicRepos !== null && { value: publicRepos, label: "Public repositories" },
  ].filter((stat) => !!stat);

  if (!stats.length && !latest.length) {
    return (
      <p className="mt-8 text-fg">
        GitHub isn&apos;t responding right now, so see everything on{" "}
        <a href={GITHUB_PROFILE} className="underline decoration-accent-ink decoration-2 underline-offset-4">
          my profile
        </a>
        .
      </p>
    );
  }

  return (
    <>
      {stats.length > 0 && (
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 md:mt-14 md:flex md:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-2">
              <dt className="mono-label text-muted">{stat.label}</dt>
              <dd className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-fg">
                {stat.value.toLocaleString("en")}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {contributions && (
        <div className="mt-10 md:mt-14">
          <ContributionGraph days={contributions.days} total={contributions.total} />
        </div>
      )}

      {latest.length > 0 && (
        <div className="mt-14 md:mt-20">
          <h3 className="mono-label mb-6 text-muted">Pushed most recently</h3>
          <ul>
            {latest.map((repo) => (
              <li key={repo.name} className="border-t border-border last:border-b">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-2 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_16rem] md:items-baseline md:gap-8 md:py-6"
                >
                  <span className="min-w-0">
                    {/* Highlighter sweep on hover, the same stroke as the rest of the site */}
                    <span className="font-display bg-[linear-gradient(var(--accent),var(--accent))] bg-no-repeat text-[clamp(1.5rem,2.6vw,2.25rem)] text-fg transition-[background-size] duration-500 [background-position:0_82%] [background-size:0%_32%] group-hover:[background-size:100%_32%]">
                      {repo.name}
                    </span>
                  </span>
                  <span className="line-clamp-2 min-w-0 text-[15px] leading-snug text-muted">
                    {repo.description ?? repo.language ?? "View on GitHub"}
                  </span>
                  <span className="mono-label whitespace-nowrap text-fg md:text-right">
                    {repo.language && <span className="text-muted">{repo.language} · </span>}
                    {pushedFormat.format(new Date(repo.pushedAt))} ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
