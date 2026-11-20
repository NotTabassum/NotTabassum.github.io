# Portfolio site — design

Date: 2026-11-20 · Owner: Sumaiya Tabassum (GitHub `NotTabassum`)

## Intent

One public home for Sumaiya's whole professional profile. Anyone who needs to
know her — recruiters, companies, universities, collaborators — lands on one
link and finds everything: who she is, where she works and what she built
there, her projects, her competitive-programming record, skills, education,
and how to reach her. The link goes in her CV, LinkedIn, GitHub and email
signature.

Why: her profile is scattered (LinkedIn, GitHub, Codeforces, CodeChef) and her
CV has gone stale. The site must be easy to keep current.

## Goals

- Every section of her profile on one page, readable in under a minute, with
  depth available for whoever wants it.
- Updating it means editing one data file and pushing.
- Fast, works well on a phone, light and dark themes.

## Non-goals

- Generating or updating the CV (PDF/Overleaf). Out of scope for now; the site
  has no "Download CV" button until a current CV exists.
- Blog, CMS, analytics, contact form backend.
- Buying the custom domain (Sumaiya buys it herself).

## Anti-goals (a failure even if it works)

- Leaking AppsCode private material: no internal repo/service names,
  code, internal screenshots, customer names, or figures.
- Publishing her phone number.
- Looking like a generic template, or being so stylised it hurts readability.
- Content that drifts out of date because it's buried in markup.

## Content source

LinkedIn (`/in/sumaiya-tabassum00`) and GitHub (`NotTabassum`, plus her PRs in
AppsCode orgs) as of 2026-11-20. The Overleaf/Drive CVs are reference only
(layout and phrasing ideas), not the source of truth.

## Sections (single page, in this order)

1. **Hero** — name; "Backend Software Engineer · Go · Competitive Programmer";
   Dhaka, Bangladesh; one-line pitch; links: email, GitHub, LinkedIn,
   Codeforces, CodeChef.
2. **About** — 2–3 sentences: backend engineer at AppsCode working on
   authorization, sync and billing for a Kubernetes cloud platform; competitive
   programmer and problem setter; RUET CSE.
3. **Experience**
   - **AppsCode** — Software Engineer (Backend), Jun 2025 – present, Dhaka.
     Outcome-level bullets, public technology names allowed:
     - Fine-grained, relationship-based access control (OpenFGA) for a
       multi-tenant cloud platform: custom roles, org/client-org permissions.
     - Event-driven outbox sync service (Go, PostgreSQL, NATS) keeping the
       database and authorization store consistent: per-entity sync state,
       automatic re-sync when the authorization model changes, reconnection
       handling.
     - Billing features: usage persisted with bucket backups, billing summary
       dashboard, end-of-month usage projection, contract-expiry email alerts.
     - PostgreSQL operations: PgPool support, failover-enabled logical
       replication slots (public PR: `kubeops/pgoutbox`), Postgres 17 upgrade,
       one-command dev setup.
   - **Vivasoft Limited** — Associate Software Engineer (Backend), part-time,
     Nov 2024 – May 2025, Rajshahi. Go backend work; joined via Weekdemy training.
4. **Projects** — featured card first, then a grid.
   - **Featured: WealthTracker (Expense Tracker)** — Go backend, React web app
     (Vercel), React Native Android app (Play Store builds). Add transactions by
     pasting bank messages, budgets, DPS, wishlist, Google sign-in, encrypted
     storage.
   - Multi-tenant e-commerce SaaS backend — Go, PostgreSQL, Redis.
   - Message Parser — microservice that extracts transactions from bank SMS.
   - Wardrobe app — Go backend + web + mobile.
   - Meal Management — Go, Echo, GORM, MySQL, JWT.
   - Fingerprint Attendance System — Arduino, C++.
   - Each: name, one-line description, stack tags, repo link (live link where
     one exists).
5. **Competitive programming**
   - Ratings: Codeforces Specialist, max 1533 (`Aurora__`); CodeChef 4★, max
     1824; AtCoder 7 Kyu; 1500+ problems solved.
   - Contests: Ada Lovelace NGPC 2022 — 6th; NGPC 2021 — 12th; RUET CodeSmash —
     6th; Breaking Code '23 (MBSTU) — 16th; NGPC 2022 — 17th; SEC Inter
     University Junior 2022 — 32nd. Standings links.
   - Problem setting/testing: CodeChef Starters 150 (Replacing Game); Code To
     Save A Mother 2021 (Sum & Multiple); tester, Codeforces Round 925 and
     CodeTON Round 8.
   - Taught CP sessions and set contests for RUET students.
6. **Skills** — grouped: Languages (Go, C, C++, Python, TypeScript); Backend &
   data (PostgreSQL, MySQL, Redis, NATS, OpenFGA, Gin, Echo, GORM); Frontend &
   mobile (React, React Native); Other (Algorithms & data structures, deep
   learning).
7. **Education** — BSc in CSE, Rajshahi University of Engineering & Technology,
   Jan 2020 – Jun 2025 (graduated). Thesis: deep-learning fingerprint recognition.
8. **Contact / footer** — email and profile links again; "last updated" date.

## Look

Clean, text-first, light code-editor flavour: monospace for section labels,
tags and small accents; a readable sans/serif for body text; one accent
colour; generous whitespace. Light and dark themes following the system, with a
toggle. Mobile-first, no horizontal scroll. Minimal JavaScript (theme toggle
only). Accessible contrast and semantic HTML.

## Approaches considered

- **A. Astro static site, content in one typed data file — chosen.** Fast plain
  HTML, almost no JS, content separated from markup so updates are one-file
  edits.
- B. Hand-written single HTML page — simplest, but every update means editing
  markup; works against "easy to keep current".
- C. Next.js/React — more machinery than a static profile needs; slower and
  more to maintain.

## Decided

- Astro, all content in `src/data/profile.ts` (typed), components render it.
- Deploy to GitHub Pages via GitHub Actions.
- Email shown publicly; phone not shown.
- Repo `NotTabassum.github.io`, so the site serves at the root
  (`https://nottabassum.github.io/`) with no Astro `base` — and keeps working
  unchanged once a custom domain is attached.
- Custom domain later (e.g. `sumaiyatabassum.dev`): the site must work at a
  root path; adding the domain = a `public/CNAME` file + DNS records, no rebuild
  of structure. Absolute URLs (canonical, Open Graph) come from one `site`
  setting so switching domains is a one-line change.

## Left to the builder

- Astro version compatible with the local Node (v20.20); exact fonts and
  colours within the look above; component breakdown; small details like
  favicon and Open Graph tags (should be included).
- Creating the GitHub repo and pushing require Sumaiya's explicit go-ahead;
  build and verify everything locally first.

Approved by Sumaiya on 2026-11-20.
