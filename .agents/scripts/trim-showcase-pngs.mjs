import { existsSync } from "node:fs";
import path from "node:path";

import sharp from "sharp";

const trimBackground = "#f8fafc";
const trimThreshold = 28;
const minPadPx = 88;
const padRatio = 0.07;

const folders = process.argv.slice(2);

if (folders.length === 0) {
  console.error(
    "Usage: node .agents/scripts/trim-showcase-pngs.mjs public/showcases/onboarding ...",
  );
  process.exit(1);
}

const trimPng = async (input) => {
  const trimmed = await sharp(input)
    .trim({ background: trimBackground, threshold: trimThreshold })
    .toBuffer();
  const trimmedMeta = await sharp(trimmed).metadata();
  const padPx = Math.max(
    minPadPx,
    Math.round(Math.min(trimmedMeta.width ?? 0, trimmedMeta.height ?? 0) * padRatio),
  );
  const padded = await sharp(trimmed)
    .extend({
      top: padPx,
      bottom: padPx,
      left: padPx,
      right: padPx,
      background: trimBackground,
    })
    .png()
    .toBuffer();
  const meta = await sharp(padded).metadata();
  await sharp(padded).toFile(input);
  return meta;
};

for (const folder of folders) {
  const dir = path.resolve(folder);
  const entries = await import("node:fs/promises").then((fs) =>
    fs.readdir(dir),
  );

  for (const entry of entries.filter((name) => name.endsWith(".png"))) {
    const input = path.join(dir, entry);
    if (!existsSync(input)) {
      continue;
    }
    const meta = await trimPng(input);
    console.log(`${entry}: ${meta.width}x${meta.height}`);
  }
}
