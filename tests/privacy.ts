import { createHash } from "node:crypto";

/**
 * Bangladeshi mobile numbers (01[3-9] + 8 digits, optionally +880), however they
 * are spaced or punctuated. Separators are stripped before matching.
 * `allowed` lists numbers published on purpose; only those exact numbers are ignored.
 */
export function containsPhone(text: string, allowed: string[] = []): boolean {
  let digits = text.replace(/[\s().\-–]/g, "");
  for (const n of allowed) {
    const local = n.replace(/\D/g, "").replace(/^880/, "0");
    digits = digits.split(local).join("");
  }
  return /01[3-9]\d{8}/.test(digits);
}

/**
 * Internal company names that must never be published. Stored as SHA-256 hashes
 * of the lowercased word so this public repo does not itself reveal them.
 * To add one: printf %s "name" | shasum -a 256
 */
const INTERNAL_NAME_HASHES = new Set([
  "76a8277347f52530e1cf979175a178980b3a180d176165c985d85f7e142f1eed",
  "3ff8943f6abf7b018486305145adcc795acaab5713a8deac6d548dbd5353cc3f",
  "ea639389de67e4511ab2c81d16076e364b5c17ed46730f039b321a52ad8889a4",
  "8127f02540daf628c1dc0fb446a572bfa719a20a40700ec271e8040bca357748",
  "560f3817fb174da61daf95391887f24359cf21e2fabfd7eedf24f668960ad676",
]);

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

/** Returns the hashes of any denylisted words found in `text`. */
export function findInternalNames(text: string): string[] {
  const words = new Set(text.toLowerCase().match(/[a-z0-9]+(?:-[a-z0-9]+)*/g) ?? []);
  return [...words].map(sha256).filter((h) => INTERNAL_NAME_HASHES.has(h));
}

/** Every string under a key named `url` or ending in `Url`, at any depth. */
export function collectUrls(value: unknown, out: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((v) => collectUrls(v, out));
  else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (/(^url|Url)$/.test(k) && typeof v === "string") out.push(v);
      else collectUrls(v, out);
    }
  }
  return out;
}

/** GitHub accounts the site may link to. Anything else could be a private org. */
const ALLOWED_GITHUB_ORGS = new Set(["nottabassum", "kubeops"]);

export function foreignGithubOrgs(urls: string[]): string[] {
  return urls
    .map((u) => u.match(/^https:\/\/github\.com\/([^/?#]+)/i)?.[1]?.toLowerCase())
    .filter((org): org is string => !!org && !ALLOWED_GITHUB_ORGS.has(org));
}
