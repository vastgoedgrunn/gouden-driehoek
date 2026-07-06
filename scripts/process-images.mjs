import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "/tmp/gd_review";
const OUT = path.resolve("public/impressies");

const map = {
  "Artist Impression 1..png": "impressie-01",
  "Artist Impression 2..png": "impressie-02",
  "Artist Impression 3..png": "impressie-03",
  "Artist Impression 4..png": "impressie-04",
  "Artist Impression 5..png": "impressie-05",
  "Artist Impression 6..png": "impressie-06",
  "Artist Impression 7..png": "impressie-07",
  "Artist Impression 8..png": "impressie-08",
  "Artist Impression 9..png": "impressie-09",
  "Artist Impression 10..png": "impressie-10",
  "Artist Impression 11..png": "impressie-11",
  "Artist Impression 12..png": "impressie-12",
  "Artist Impression 13..png": "impressie-13",
};

await mkdir(OUT, { recursive: true });
const files = await readdir(SRC);

for (const file of files) {
  if (!map[file]) continue;
  const base = map[file];
  const input = path.join(SRC, file);

  // Grote webp (max 1920 breed) voor hero/detail
  await sharp(input)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT, `${base}.webp`));

  // Kleinere webp (max 960 breed) voor kaarten/thumbnails
  await sharp(input)
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(OUT, `${base}-sm.webp`));

  console.log(`ok: ${base}`);
}

console.log("Klaar met afbeeldingen ->", OUT);
