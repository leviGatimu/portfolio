"use client";

import { useSyncExternalStore, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { useLenis } from "lenis/react";
import { useTheme } from "next-themes";
import { ArrowUp, Moon, Send, Sun } from "lucide-react";
import { footerLinks } from "@/data/footer";
import { site, socials } from "@/data/site";
import { animateThemeChange } from "@/lib/themeTransition";

const subscribeToNothing = () => () => {};

export default function Footer() {
  const lenis = useLenis();

  const followHashLink = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    lenis?.scrollTo(href, { offset: -72, duration: 1.4 });
  };

  return (
    <footer className="relative overflow-hidden border-t border-border px-6 py-12 md:px-10">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <h2 className="font-display mb-4 text-4xl text-fg">Stay connected</h2>
          <p className="mb-6 max-w-[34ch] text-sm leading-relaxed text-muted">
            Write me a message and it opens in your email app, ready to send.
          </p>
          <MessageForm />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 top-0 size-24 rounded-full bg-accent/10 blur-2xl"
          />
        </div>

        <div>
          <ColumnTitle>Quick links</ColumnTitle>
          <nav aria-label="Footer" className="space-y-2 text-sm">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={(e) => followHashLink(e, link.href)}
                className="block w-fit text-fg transition-colors hover:text-accent-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <ColumnTitle>Contact</ColumnTitle>
          <address className="space-y-2 text-sm not-italic text-fg">
            <p>{site.location}</p>
            <p>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-accent-ink"
              >
                {site.email}
              </a>
            </p>
            <p>{site.availability}</p>
          </address>
        </div>

        <div>
          <ColumnTitle>Follow</ColumnTitle>
          <ul className="mb-6 flex gap-4">
            {socials
              .filter((social) => social.url.startsWith("http"))
              .map((social) => (
                <li key={social.label} className="group relative">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
                  >
                    <BrandIcon label={social.label} />
                  </a>
                  <span
                    aria-hidden="true"
                    className="mono-label pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap bg-fg px-2 py-1 text-bg opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
                  >
                    {social.label}
                  </span>
                </li>
              ))}
          </ul>
          <ThemeSwitch />
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center md:flex-row">
        <p className="text-sm text-muted">© 2026 {site.name}. All rights reserved.</p>
        <button
          type="button"
          onClick={() => lenis?.scrollTo(0, { duration: 1.6 })}
          className="flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent-ink"
        >
          Back to top
          <ArrowUp size={14} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}

function ColumnTitle({ children }: { children: ReactNode }) {
  return <h3 className="mono-label mb-4 text-muted">{children}</h3>;
}

/** There is no backend, so the message is handed to the visitor's email app. */
function MessageForm() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = new FormData(e.currentTarget).get("message");
    const params = new URLSearchParams({
      subject: "Hello from your portfolio",
      body: String(message),
    });
    // mailto expects %20 for spaces; URLSearchParams writes them as "+".
    window.location.href = `mailto:${site.email}?${params.toString().replaceAll("+", "%20")}`;
  };

  return (
    <form onSubmit={onSubmit} className="relative max-w-sm">
      <label htmlFor="footer-message" className="sr-only">
        Your message
      </label>
      <input
        id="footer-message"
        name="message"
        type="text"
        required
        placeholder="Say hello"
        className="h-10 w-full rounded-full border border-border bg-transparent pl-4 pr-12 text-sm text-fg placeholder:text-muted"
      />
      <button
        type="submit"
        aria-label="Open in email app"
        className="absolute right-1 top-1 flex size-8 items-center justify-center rounded-full bg-accent text-on-accent transition-transform hover:scale-105"
      >
        <Send size={16} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </form>
  );
}

function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  // The stored theme is unknown on the server, so show dark until hydrated.
  const hydrated = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const isDark = !hydrated || resolvedTheme === "dark";

  const onToggle = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    animateThemeChange(isDark ? "light" : "dark", setTheme, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  return (
    <div className="flex items-center gap-2 text-fg">
      <Sun size={16} strokeWidth={1.5} aria-hidden="true" />
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Dark mode"
        onClick={onToggle}
        className="flex h-6 w-11 items-center rounded-full border-2 border-transparent bg-surface-2 transition-colors aria-checked:bg-accent"
      >
        <span
          className={`block size-5 rounded-full bg-fg transition-transform dark:bg-on-accent ${
            isDark ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <Moon size={16} strokeWidth={1.5} aria-hidden="true" />
    </div>
  );
}

/** Lucide 1.x dropped brand logos, so these two are drawn here. */
function BrandIcon({ label }: { label: string }) {
  if (label === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
        <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.15c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
