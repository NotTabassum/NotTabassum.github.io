# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A one-page static portfolio for Sumaiya Tabassum, rendered from one typed data file, deployable to GitHub Pages.

**Architecture:** Astro renders `src/data/profile.ts` through one component per section into a single static `index.html`. The only client JS is the theme toggle. Vitest checks the data (privacy and shape rules) and the built HTML (every section present, nothing private leaked).

**Tech Stack:** Astro 5.18.x (Node 20 compatible; Astro 6+ needs Node 22), TypeScript, Vitest 3, plain CSS with custom properties, GitHub Actions → GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-20-portfolio-design.md`

## Global Constraints

- Node v20.20 locally: pin `astro@5.18.2`, `vitest@^3`.
- All content lives in `src/data/profile.ts`; components contain no profile text except section headings.
- Never render a phone number. Never mention AppsCode internal repo/service names (kept only as SHA-256 hashes in `tests/privacy.ts`).
- Email shown: `tabassumoyshee@gmail.com`.
- Site served at root: no Astro `base`. `site` in `astro.config.mjs` is the only place the absolute URL lives (initially `https://nottabassum.github.io`).
- Light + dark themes (system default, toggle overrides, remembered in `localStorage` inside try/catch).
- Mobile-first; no horizontal scroll at 360px width.
- No "Download CV" button.
- Do not create a GitHub repo or push without Sumaiya's go-ahead.

## Review Focus

1. Phone width (360px): long URLs, tag rows and the contest table must wrap, not overflow → Task 5 checks `scrollWidth <= clientWidth` at 360px.
2. JS disabled / storage blocked: page must render fully, theme follows system → Task 2 theme script wrapped in try/catch; Task 5 checks with JS off.
3. Dark mode contrast: accent and muted text readable on dark background → Task 5 visual check both themes.
4. A future edit to `profile.ts` adds a phone number or internal repo name → Task 1 data tests fail.
5. Broken or http links in data → Task 1 test: every URL starts with `https://` (except `mailto:`).

---

### Task 1: Scaffold, profile data, data tests

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `vitest.config.ts`
- Create: `src/data/types.ts`, `src/data/profile.ts`
- Test: `tests/profile.test.ts`

**Interfaces:**
- Produces (`src/data/types.ts`):
  - `Link { label: string; url: string }`
  - `Job { company: string; companyUrl?: string; role: string; type?: string; start: string; end: string | null; location: string; highlights: string[]; links?: Link[] }` (dates as `"YYYY-MM"`; `end: null` = present)
  - `Project { name: string; summary: string; details?: string[]; stack: string[]; links: Link[]; featured?: boolean }`
  - `Rating { site: string; handle: string; url: string; title: string; maxRating?: number }`
  - `Contest { name: string; year: number; place: number; team?: string; url?: string }`
  - `Profile { name; headline; location; pitch; about: string[]; email; links: Link[]; experience: Job[]; projects: Project[]; cp: { ratings: Rating[]; solved: string; contests: Contest[]; problemSetting: { contest: string; problem?: string; role: "Setter" | "Tester"; date: string; url?: string }[]; teaching: string }; skills: { group: string; items: string[] }[]; education: { school: string; degree: string; start: string; end: string; note?: string }[]; updated: string }`
  - `src/data/profile.ts` default-exports `profile: Profile`.

- [ ] **Step 1:** `npm init -y`; install `astro@5.18.2` and dev `vitest@^3 typescript`. Scripts: `dev: astro dev`, `build: astro build`, `preview: astro preview`, `test: vitest run`. `astro.config.mjs`: `site: "https://nottabassum.github.io"`. `.gitignore`: `node_modules`, `dist`, `.astro`.
- [ ] **Step 2: Write failing tests** in `tests/profile.test.ts`:
  - `no phone number`: `JSON.stringify(profile)` does not match `/(\+?880|01[3-9])\d{8}/`.
  - `no internal AppsCode names`: stringified profile contains no denylisted internal name (hashed denylist).
  - `links are https or mailto`: every `url` field found recursively matches `/^(https:\/\/|mailto:)/`.
  - `experience is newest first and AppsCode is current`: `experience[0].company === "AppsCode"`, `experience[0].end === null`, starts are descending.
  - `exactly one featured project, listed first`: `projects.filter(p=>p.featured).length === 1` and `projects[0].featured`.
  - `education graduated June 2025`: `education[0].end === "2025-06"`.
- [ ] **Step 3:** Run `npm test` → FAIL (profile missing).
- [ ] **Step 4:** Write `types.ts` and `profile.ts` with the spec's content (sections 1–8 of the spec, verbatim facts). Values the spec pins:
  - headline `"Backend Software Engineer · Go · Competitive Programmer"`, location `"Dhaka, Bangladesh"`.
  - links: GitHub `https://github.com/NotTabassum`, LinkedIn `https://www.linkedin.com/in/sumaiya-tabassum00/`, Codeforces `https://codeforces.com/profile/Aurora__`, CodeChef `https://www.codechef.com/users/sumaiya1903045`, AtCoder `https://atcoder.jp/users/freedom_seeker`.
  - AppsCode: start `2025-06`, url `https://appscode.com`; Vivasoft: `2024-11`–`2025-05`, `Part-time`, Rajshahi, url `https://vivasoftltd.com`; public PR link `https://github.com/kubeops/pgoutbox/pulls?q=author%3ANotTabassum`.
  - Projects (order): WealthTracker (featured), E-commerce SaaS backend , Message Parser, Wardrobe, Meal Management, Fingerprint Attendance System.
  - Contests with standings URLs: alngpc-2022 (6), ngpc-2021 (12), CodeSmash `https://toph.co/contests/training/kdze4d6/standings` (6, 2020), mbstu-cse-inter-department-2023 (16), national-girls-programming-contest-2022 (17), sec-inter-university-junior-2022 (32) — all `https://toph.co/c/<slug>/standings`.
  - problemSetting: CodeChef Starters 150 / Replacing Game / Setter / 2024-09 / `https://www.codechef.com/problems/REPLACEGAME`; Code To Save A Mother / Sum & Multiple / Setter / 2021-05 / `https://toph.co/p/sum-multiple`; Codeforces Round 925 / Tester / 2024-02 / `https://codeforces.com/blog/entry/125787`; CodeTON Round 8 / Tester / 2024-03 / `https://codeforces.com/blog/entry/126265`.
  - education: RUET, `BSc in Computer Science & Engineering`, `2020-01`–`2025-06`, note `Thesis: faster, more accurate fingerprint recognition with deep learning`.
  - `updated: "2026-11-20"`.
- [ ] **Step 5:** `npm test` → all PASS.
- [ ] **Step 6:** Commit `feat: scaffold Astro site and profile data`.

### Task 2: Layout, theme, Hero and About

**Files:**
- Create: `src/layouts/Base.astro`, `src/styles/global.css`, `src/components/ThemeToggle.astro`, `src/components/Hero.astro`, `src/components/About.astro`, `src/components/Section.astro`, `src/pages/index.astro`, `public/favicon.svg`
- Test: `tests/build.test.ts`

**Interfaces:**
- Consumes: `profile` from Task 1.
- Produces: `Section.astro` props `{ id: string; label: string }` with a `<slot/>`; renders `<section id={id} aria-labelledby={id+"-h"}>` with heading `<h2 id={id+"-h"}>` showing the label in mono with a leading `// `. Section ids used by later tasks: `about`, `experience`, `projects`, `cp`, `skills`, `education`, `contact`.
- Produces: `src/lib/format.ts` `formatMonth(ym: string): string` → `"Jun 2025"`; `formatRange(start: string, end: string | null): string` → `"Jun 2025 – Present"`.

- [ ] **Step 1: Failing test** `tests/build.test.ts`: `beforeAll` runs `npx astro build` (execSync, timeout 120s), reads `dist/index.html`. Tests: contains profile.name in `<h1>`; contains `<title>` with name; contains `og:title` and `<link rel="canonical" href="https://nottabassum.github.io/">`; has `id="about"`; contains `mailto:tabassumoyshee@gmail.com`; does not match phone regex. Plus unit tests for `formatMonth("2025-06") === "Jun 2025"` and `formatRange("2025-06", null) === "Jun 2025 – Present"`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement. Design tokens on `:root` (bg, surface, text, muted, accent, border), dark values under `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])` and again under `:root[data-theme="dark"]`. Fonts from Google Fonts: `JetBrains Mono` (labels, tags, dates) and `Inter` (body). Content column max 46rem, 16px side gutter. Inline head script sets `data-theme` from `localStorage` in try/catch before paint. Hero: name, headline, location, pitch, icon-less text links row (`email · GitHub · LinkedIn · Codeforces · CodeChef`), a mono "cursor" accent. Meta description from pitch; OG tags; favicon = monogram "ST" in accent.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `feat: base layout, theming, hero and about`.

### Task 3: Experience and Projects

**Files:**
- Create: `src/components/Experience.astro`, `src/components/Projects.astro`, `src/components/Tag.astro`
- Modify: `src/pages/index.astro`, `tests/build.test.ts`

**Interfaces:** Consumes `Section`, `formatRange`, `profile.experience`, `profile.projects`.

- [ ] **Step 1: Failing tests:** `id="experience"` and `id="projects"` present; `"AppsCode"` appears before `"Vivasoft"`; text `Jun 2025 – Present` present; `"WealthTracker"` inside an element with class `featured`; every project name from `profile.projects` appears; private projects render no repo link.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. Experience: timeline list, company (linked) + role + type, right-aligned mono date range (stacks under on narrow screens), location, bullet highlights, optional links. Projects: featured project as a wide card with details list; others in a responsive grid (`repeat(auto-fill, minmax(16rem, 1fr))`), each with summary, `Tag` chips for stack, and links.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: experience and projects sections`.

### Task 4: Competitive programming, Skills, Education, Contact

**Files:**
- Create: `src/components/CompetitiveProgramming.astro`, `src/components/Skills.astro`, `src/components/Education.astro`, `src/components/Contact.astro`
- Modify: `src/pages/index.astro`, `tests/build.test.ts`

- [ ] **Step 1: Failing tests:** ids `cp`, `skills`, `education`, `contact` present, in that order after `projects`; `"1533"` and `"1824"` present; six contest names present; `"Replacing Game"` present; `"Jun 2025"` inside education; footer contains `Last updated` and `Nov 2026`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. CP: rating stat row (site, title, max rating, linked handle), contests as a two-column list (name/year · place as `#6`), problem setting/testing list, teaching line. Skills: groups with Tag chips. Education: one entry with note. Contact: short invitation line + email + links; footer with last-updated date.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: CP, skills, education and contact sections`.

### Task 5: Visual verification

- [ ] **Step 1:** `npm run build && npm run preview` (background). Open in Chrome (new tab).
- [ ] **Step 2:** At 360px and 1280px widths, light and dark: screenshot; run JS `document.documentElement.scrollWidth <= document.documentElement.clientWidth` → `true`.
- [ ] **Step 3:** Toggle theme, reload → choice persists. Check contrast by eye in both themes.
- [ ] **Step 4:** Fix anything found; re-run `npm test`; commit `fix: visual polish` if changed. Close tabs, stop preview.

### Task 6: Deployment workflow and README

**Files:**
- Create: `.github/workflows/deploy.yml`, `README.md`

- [ ] **Step 1:** Workflow on push to `main` + `workflow_dispatch`: checkout, `withastro/action@v3` (node 20), then `actions/deploy-pages@v4`; permissions `pages: write`, `id-token: write`; runs `npm test` before build.
- [ ] **Step 2:** README: how to update (edit `src/data/profile.ts`, bump `updated`, `npm test`, push); local dev commands; how to attach a custom domain (buy domain → add `public/CNAME` with the domain → change `site` in `astro.config.mjs` → DNS: `A` records to `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` and `CNAME www → nottabassum.github.io` → set domain + "Enforce HTTPS" in repo Settings → Pages).
- [ ] **Step 3:** `npm test && npm run build` → pass.
- [ ] **Step 4:** Commit `chore: GitHub Pages deploy workflow and README`.
- [ ] **Step 5:** Stop. Report to Sumaiya; ask before creating `NotTabassum/NotTabassum.github.io` and pushing.
