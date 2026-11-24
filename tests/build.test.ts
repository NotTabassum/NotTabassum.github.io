import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import profile from "../src/data/profile";
import { containsPhone, findInternalNames } from "./privacy";

let html = "";

beforeAll(() => {
  execSync("npx astro build", { stdio: "pipe", timeout: 120_000 });
  html = readFileSync("dist/index.html", "utf8");
}, 130_000);

const indexOf = (needle: string) => html.indexOf(needle);

describe("built page: shell and hero", () => {
  it("puts the name in the h1 and the title", () => {
    expect(html).toMatch(new RegExp(`<h1[^>]*>[^<]*${profile.name}`));
    expect(html).toMatch(new RegExp(`<title>[^<]*${profile.name}`));
  });

  it("has canonical and Open Graph tags from the site setting", () => {
    expect(html).toContain('rel="canonical" href="https://nottabassum.github.io/"');
    expect(html).toContain('property="og:title"');
    expect(html).toContain('property="og:description"');
  });

  it("links the email and every profile link", () => {
    expect(html).toContain(`to=${encodeURIComponent(profile.email)}`);
    for (const l of profile.links) expect(html).toContain(`href="${l.url}"`);
  });

  it("never shows a phone number or an internal company name", () => {
    expect(containsPhone(html, profile.whatsapp ? [profile.whatsapp] : [])).toBe(false);
    expect(findInternalNames(html)).toEqual([]);
  });

  it("sets the theme before paint without failing when storage is blocked", () => {
    const head = html.slice(0, indexOf("</head>"));
    expect(head).toMatch(/try\s*{[^}]*sessionStorage/);
  });
});

describe("built page: experience and projects", () => {
  it("has both sections", () => {
    expect(html).toContain('id="experience"');
    expect(html).toContain('id="projects"');
  });

  it("lists AppsCode before Vivasoft with a Present range", () => {
    expect(indexOf("AppsCode")).toBeGreaterThan(-1);
    expect(indexOf("AppsCode")).toBeLessThan(indexOf("Vivasoft"));
    expect(html).toContain("Jun 2025 – Present");
  });

  it("gives every project an equal, numbered row, WealthTracker first", () => {
    const rows = html.match(/<li class="row[^"]*"/g) ?? [];
    expect(rows).toHaveLength(profile.projects.length);
    expect(html).toMatch(/01 · [^<]*<\/p>\s*<h3[^>]*>WealthTracker/);
  });

  it("shows every project name", () => {
    for (const p of profile.projects) expect(html).toContain(p.name);
  });

  it("links public repos and never links a private one", () => {
    expect(html).toContain('href="https://github.com/NotTabassum/meal-management"');
    const rows = html.split(/<li class="row/).slice(1);
    for (const p of profile.projects.filter((p) => p.private)) {
      const row = rows.find((r) => r.includes(`>${p.name}</h3>`));
      expect(row, p.name).toBeDefined();
      expect(row, p.name).not.toContain("github.com/NotTabassum");
    }
  });
});

describe("built page: cp, skills, education, contact", () => {
  it("orders the later sections after projects", () => {
    const order = ["projects", "cp", "skills", "education", "contact"].map((id) => indexOf(`id="${id}"`));
    expect(order.every((i) => i > -1)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("shows max ratings and every contest", () => {
    expect(html).toContain("1533");
    expect(html).toContain("1824");
    for (const c of profile.cp.contests) expect(html).toContain(c.name.replace(/'/g, "&#39;"));
  });

  it("credits set and tested problems", () => {
    expect(html).toContain("Replacing Game");
    expect(html).toContain("CodeTON Round 8");
  });

  it("shows the graduation month in education", () => {
    const edu = html.slice(indexOf('id="education"'), indexOf('id="contact"'));
    expect(edu).toContain("Jun 2025");
  });

  it("dates the footer from the data", () => {
    expect(html).toMatch(/Last updated[^<]*<[^>]*>?[^<]*Nov 2026|Last updated[^<]*Nov 2026/);
  });
});

describe("built page: text details", () => {
  it("joins a contest and its problem without a stray space", () => {
    expect(html).toMatch(/Starters 150<\/a><span[^>]*>: “Replacing Game”/);
  });
});
