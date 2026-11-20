import { describe, expect, it } from "vitest";
import profile from "../src/data/profile";
import { collectUrls, containsPhone, findInternalNames, foreignGithubOrgs } from "./privacy";

const text = JSON.stringify(profile);

describe("profile data", () => {
  it("contains no phone number", () => {
    expect(containsPhone(text)).toBe(false);
  });

  it("contains no internal company names", () => {
    expect(findInternalNames(text)).toEqual([]);
  });

  it("links GitHub only to allowed accounts", () => {
    expect(foreignGithubOrgs(collectUrls(profile))).toEqual([]);
  });

  it("has a valid email", () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i);
  });

  it("uses only https or mailto links", () => {
    const urls = collectUrls(profile);
    expect(urls.length).toBeGreaterThan(10);
    for (const url of urls) expect(url).toMatch(/^(https:\/\/|mailto:)/);
  });

  it("lists experience newest first with AppsCode current", () => {
    const [first] = profile.experience;
    expect(first.company).toBe("AppsCode");
    expect(first.end).toBeNull();
    const starts = profile.experience.map((j) => j.start);
    expect([...starts].sort().reverse()).toEqual(starts);
  });

  it("has exactly one featured project, listed first", () => {
    expect(profile.projects.filter((p) => p.featured)).toHaveLength(1);
    expect(profile.projects[0].featured).toBe(true);
  });

  it("records graduation in June 2025", () => {
    expect(profile.education[0].end).toBe("2025-06");
  });
});
