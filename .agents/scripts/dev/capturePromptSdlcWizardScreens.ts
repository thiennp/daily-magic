#!/usr/bin/env tsx
import { mkdir } from "node:fs/promises";
import path from "node:path";

import { chromium } from "@playwright/test";

const port = Number(process.env.AWL_PORT ?? "43349");
const baseUrl = `http://127.0.0.1:${port}`;
const outDir =
  process.env.AWL_WIZARD_SCREEN_DIR?.trim() ||
  path.join("/opt/cursor/artifacts", "awl-wizard-full-round");

const shots: readonly { readonly cycleId: string; readonly name: string }[] = [
  {
    cycleId: "demo-wizard-step-2-evaluate",
    name: "wizard-step-2-evaluate-scores",
  },
  { cycleId: "demo-wizard-step-3-separate", name: "wizard-step-3-separate" },
  {
    cycleId: "demo-wizard-step-4-optimize",
    name: "wizard-step-4-optimize-rounds",
  },
  { cycleId: "demo-wizard-final-passed", name: "wizard-final-passed" },
];

const main = async (): Promise<void> => {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 1400 },
  });
  for (const shot of shots) {
    const url = `${baseUrl}/prompt-optimizer?cycle=${encodeURIComponent(shot.cycleId)}`;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(outDir, `${shot.name}.png`),
      fullPage: true,
    });
    console.log(`Wrote ${shot.name}.png`);
  }
  await browser.close();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
