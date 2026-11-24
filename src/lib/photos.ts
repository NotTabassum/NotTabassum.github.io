import type { ImageMetadata } from "astro";

const files = import.meta.glob<{ default: ImageMetadata }>("../assets/photos/*.{jpg,jpeg,png,webp,avif}", { eager: true });

/** Resolves a Photo's file name to the image Astro optimizes at build time. */
export function photoAsset(file: string): ImageMetadata {
  const hit = files[`../assets/photos/${file}`];
  if (!hit) throw new Error(`Photo "${file}" not found in src/assets/photos/`);
  return hit.default;
}
