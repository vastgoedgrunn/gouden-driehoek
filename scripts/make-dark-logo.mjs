// Genereert een donkere-achtergrondvariant van het logo:
// - Gouden delen blijven goud (licht opgehelderd zodat ze oplichten).
// - Zwarte/neutrale structuur- en tekstdelen worden warm crème.
// Anti-aliasing (alpha) blijft behouden voor scherpe randen.
import sharp from "sharp";
import path from "node:path";

const src = path.resolve("public/logo/logo.png");
const out = path.resolve("public/logo/logo-dark.png");

// Warme crème tint voor de structuur (genormaliseerd 0..1)
const cream = { r: 247 / 255, g: 241 / 255, b: 228 / 255 };

const img = sharp(src);
const { width, height } = await img.metadata();
const { data } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  if (a === 0) continue;

  // Gouddetectie: warm en voldoende verzadigd/licht.
  const isGold = r > 80 && r >= g && g >= b && r - b > 20;

  if (isGold) {
    // Goud licht ophelderen zodat het op donker oplicht.
    data[i] = Math.min(255, Math.round(r * 1.12));
    data[i + 1] = Math.min(255, Math.round(g * 1.12));
    data[i + 2] = Math.min(255, Math.round(b * 1.1));
  } else {
    // Neutraal/zwart -> crème. Behoud subtiele interne variatie:
    // donkerste delen ~205, lichtste ~255, daarna warm getint.
    const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    const newL = 205 + lum * 50;
    data[i] = Math.round(newL * cream.r);
    data[i + 1] = Math.round(newL * cream.g);
    data[i + 2] = Math.round(newL * cream.b);
  }
}

await sharp(data, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(`Klaar: ${out} (${width}x${height})`);
