import { mkdir } from "node:fs/promises";
import path from "node:path";

import { chromium } from "@playwright/test";
import sharp from "sharp";

const baseUrl = process.env.SHOWCASE_CAPTURE_BASE_URL ?? "http://localhost:3000";
const trimBackground = "#f8fafc";
const trimThreshold = 32;
const minPadPx = 56;
const padRatio = 0.05;

const groups = [
  {
    demoPath: "/dev-showcase-capture.html",
    folder: "onboarding",
    outputDir: "public/showcases/onboarding",
    screens: [
      "01-home-checklist",
      "02-mac-connected",
      "03-sample-workflow",
      "04-job-history",
      "05-company-rules",
    ],
  },
  {
    demoPath: "/dev-showcase-capture.html",
    folder: "automations",
    outputDir: "public/showcases/automations",
    screens: [
      "01-home-popular-presets",
      "02-new-automation",
      "03-automations-list",
    ],
  },
  {
    demoPath: "/dev-showcase-capture.html",
    folder: "topics",
    outputDir: "public/showcases/topics",
    screens: [
      "01-send-task",
      "02-job-history",
      "03-marketplace",
      "04-automations",
      "05-mobile",
      "06-library",
      "07-reports",
      "08-approvals",
      "09-company-admin",
      "10-leadership",
      "11-concept",
      "12-mac-status",
    ],
  },
  {
    demoPath: "/dev-team-dispatch-demo.html",
    folder: null,
    outputDir: "public/showcases/team-dispatch",
    screens: [
      { id: "01-request-task", tab: "request" },
      { id: "02-approval", tab: "approval" },
      { id: "03-mac-running", tab: "running" },
    ],
  },
];

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

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });
const dimensions = {};

for (const group of groups) {
  await mkdir(path.resolve(group.outputDir), { recursive: true });

  for (const screenEntry of group.screens) {
    const screenId =
      typeof screenEntry === "string" ? screenEntry : screenEntry.id;
    const tabId =
      typeof screenEntry === "string" ? screenEntry : screenEntry.tab;
    const query = group.folder
      ? `?folder=${group.folder}&screen=${screenId}&capture=1`
      : `?screen=${tabId}&capture=1`;
    const url = `${baseUrl}${group.demoPath}${query}`;
    await page.goto(url, { waitUntil: "networkidle" });
    const frame = page.locator(".frame");
    await frame.waitFor({ state: "visible" });
    const box = await frame.boundingBox();

    if (!box) {
      throw new Error(`No .frame for ${screen}`);
    }

    const output = path.resolve(group.outputDir, `${screenId}.png`);
    await page.screenshot({ path: output, clip: box });
    const meta = await trimPng(output);
    dimensions[`${group.outputDir}/${screenId}`] = {
      width: meta.width,
      height: meta.height,
    };
    console.log(`${screenId}: ${meta.width}x${meta.height}`);
  }
}

await browser.close();
console.log(JSON.stringify(dimensions, null, 2));
