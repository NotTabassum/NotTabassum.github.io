# Sumaiya Tabassum — portfolio

One page with my whole professional profile: experience, projects, competitive
programming, skills, education and contact. Built with [Astro](https://astro.build),
published on GitHub Pages.

## Updating the site

Everything on the page comes from **`src/data/profile.ts`**.

1. Edit `src/data/profile.ts` (a new job goes first in `experience`, a new project in `projects`, etc.).
2. Change `updated` to today's date.
3. Run `npm test` — it checks the data (no phone number, no internal company names,
   only https links) and builds the page.
4. Commit and push to `main`. GitHub Actions tests, builds and publishes it in about a minute.

## Running it locally

```sh
npm install
npm run dev      # http://localhost:4321, reloads as you edit
npm test         # data checks + full build checks
npm run build    # static site in dist/
npm run preview  # serve dist/
```

Needs Node 20 or newer.

## First-time publishing

1. Create a public GitHub repo named **`NotTabassum.github.io`** and push this project to its `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The site goes live at `https://nottabassum.github.io/`.

## Adding a custom domain (e.g. `sumaiyatabassum.dev`)

1. Buy the domain from any registrar (Cloudflare, Namecheap, Porkbun…).
2. In the registrar's DNS settings add:
   - four `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - one `CNAME` record for `www` → `nottabassum.github.io`
3. In this project:
   - create `public/CNAME` containing just the domain, e.g. `sumaiyatabassum.dev`
   - change `site` in `astro.config.mjs` to `https://sumaiyatabassum.dev`
   - the build test checks the canonical URL — update it in `tests/build.test.ts` too
   - commit and push.
4. In the repo: **Settings → Pages → Custom domain** → enter the domain, wait for the
   DNS check, then tick **Enforce HTTPS**.

DNS can take up to a day to spread; usually it's minutes.
