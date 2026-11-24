import { describe, expect, it } from "vitest";
import { collectUrls, containsPhone, findInternalNames, foreignGithubOrgs } from "./privacy";

describe("privacy checks", () => {
  it("catches phone numbers however they are written", () => {
    for (const n of ["01712345678", "+8801712345678", "+880 1712-345678", "01712-345678", "017 1234 5678", "(017) 1234.5678"]) {
      expect(containsPhone(`call ${n} today`), n).toBe(true);
    }
  });

  it("ignores only the numbers explicitly allowed", () => {
    expect(containsPhone("whatsapp +880 1712-345678", ["+8801712345678"])).toBe(false);
    expect(containsPhone("whatsapp +880 1712-345678 or 01812345678", ["+8801712345678"])).toBe(true);
  });

  it("does not flag years, ratings or dates as phone numbers", () => {
    expect(containsPhone("Jan 2020 – Jun 2025, max rating 1533, 1500+ problems, 2026-11-20")).toBe(false);
  });

  it("finds a denylisted internal name without storing it in plain text", () => {
    const hidden = ["b", "3"].join(""); // built at runtime so the word never appears in source
    expect(findInternalNames(`worked on the ${hidden} service`)).toHaveLength(1);
    expect(findInternalNames("worked on billing and authorization")).toHaveLength(0);
  });

  it("collects every url-like field, including schoolUrl", () => {
    const urls = collectUrls({ a: { schoolUrl: "http://x.test" }, b: [{ url: "https://y.test" }], companyUrl: "https://z.test" });
    expect(urls.sort()).toEqual(["http://x.test", "https://y.test", "https://z.test"]);
  });

  it("flags GitHub links outside the allowed accounts", () => {
    expect(foreignGithubOrgs(["https://github.com/NotTabassum/x", "https://github.com/kubeops/pgoutbox/pull/27"])).toEqual([]);
    expect(foreignGithubOrgs(["https://github.com/SomeCompany/secret"])).toEqual(["somecompany"]);
  });
});
