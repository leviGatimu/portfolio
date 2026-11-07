# HANDOFF

## Current Task
Levi's portfolio revamp, built one section at a time. All planned sections are in place.

## Status
Done, and pushed to github.com/leviGatimu/portfolio. Not yet deployed to Vercel as far as this repo knows.

Page order: Hero, Intro ("Hi, I'm Levi"), Things I've Built, Tech Stack, Always Building, What People Say, Get In Touch, Footer.

## Progress
- [x] All sections above
- [ ] Testimonials need real approval before they go live (see notes)
- [ ] Not verified: footer social icon hover and tooltip; rail scrolling and swipe on a real touch device

## Open Decisions For Levi
- Intro says "software and robotics", though the robotics section was rejected.
- The floating avatar still uses `levi-cutout.png` in black and white; only the hero moved to `levi2.png`.
- Hero says "Software Developer", Intro says "full-stack developer".
- The footer's "Stay connected" box sits right under Get In Touch and repeats it.
- Old unmounted sections (`Services`, `Journey`, `SelectedWork`, `About`, `Contact`, `StatsStrip`, `TerminalSection`) can be deleted. `journey.ts` and `stats.ts` dates look wrong, so verify before reusing.

## Working Notes
- Testimonials: `src/data/testimonials.ts`. All three quotes are drafts written for Levi, not things these people said. Never set `approved: true` unless Levi confirms the person agreed to the wording. Unapproved quotes are dev-only by design and don't render in production, and the on-page draft label was removed at Levi's request, so the dev view looks final even though nothing is live.
- GitHub section (`#activity`): `src/lib/github.ts`, cached for 1 hour via `fetch` `next.revalidate` (Cache Components is off). The graph reads GitHub's undocumented profile fragment because the calendar has no token-free API; if that breaks, each source just drops out. Optional `GITHUB_TOKEN` env var only raises the API rate limit.
- Get In Touch is `#contact`. Phone (`site.phone`, +250 prefix assumed from 0798978545) shows as a tel link there and in the footer Contact column. All four testimonials are approved by their authors (per Levi) and live.
- Rail: `ui/picture-rail-gallery.tsx`, data in `src/data/wall.ts`. `visible` (default 4) makes the stage wider than its scroller at md+; phones get a carousel. Dragging scrolls the rail. Navigation is dots and arrows, no scrollbar.
- Tech stacks in `wall.ts` come from repos and live sites. Weakest evidence: NGA MIS (front end seen live, backend unknown) and RMC (Tailwind inferred from class names). Years are left out on purpose.
- `src/data/stack.ts`: Python, Docker, Raspberry Pi and Arduino come from Levi's old site, not a repo. `ToolDockTile` has no default background because `cn` is plain clsx with no tailwind-merge.
- `MaskReveal` and `ContributionGraph` watch visibility on a wrapper: an element clipped to nothing never counts as in view.
- CUR MIS's firewall blocks headless browsers; don't try to get past it. Its screenshot is cropped to leave out the bank details bar.
- Rejected, don't rebuild: Experience section (repeats the rail), 3D Arduino robotics section, halftone footer, text blocks under the Intro.
- Dev traps: the dev server sometimes doesn't generate new Tailwind classes after a component edit (a real content change to `globals.css` or a restart fixes it). A hash-only navigation isn't a reload, so hot-reload glitches can survive it.

## Recently Completed
- Upgraded Next.js to 16.4.5 (audit clean) and changed Eric's quote from "student" to "developer" at his request.
- Added Vercel Analytics to the root layout. Analytics must also be enabled in the Vercel project.
- Removed the "Pushed most recently" repo list from Always Building; stats and graph stay.
- Added Malhot Technologies: owner and COO line in Get In Touch and first frame on the rail (Next.js, React and Tailwind detected from the live site).
- Added Alpha Mugisha as a fourth testimonial; testimonial height is now fixed and autoplay scales with quote length.
- Added phone number and turned on the three approved testimonials.
- Removed the preloader (f5a3749); added L favicon (1939048).
- Added Get In Touch, What People Say and Always Building, then pushed the project to GitHub.
