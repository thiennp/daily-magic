import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { MARKETING_INTEGRATION_ITEMS } from "@/features/marketing/marketingIntegrationItems.constant";
import { SHOWCASE_ARTICLES } from "@/features/showcases/showcaseArticleRegistry";

const PUBLIC_SHOWCASES_DIR = join(process.cwd(), "public/showcases");
const HOME_ONBOARDING_SETUP_COMPLETE_PATH = join(
  process.cwd(),
  "src/features/home/HomeOnboardingSetupCompletePanel.tsx",
);
const HOME_ONBOARDING_MAIN_STEP_PATH = join(
  process.cwd(),
  "src/features/home/constants/homeOnboardingMainStepContent.constant.ts",
);

/** Magi Desi polish — Library / Reports nav nouns (not Job history / Open Library chips). */
describe("Magi Desi product vocab (showcases + home CTAs)", () => {
  it("home onboarding and setup-complete links use Library and Reports labels", () => {
    const setupComplete = readFileSync(
      HOME_ONBOARDING_SETUP_COMPLETE_PATH,
      "utf8",
    );
    const mainStep = readFileSync(HOME_ONBOARDING_MAIN_STEP_PATH, "utf8");

    expect(setupComplete).toContain("Library →");
    expect(setupComplete).toContain("Reports →");
    expect(setupComplete).not.toContain("Open Library");
    expect(setupComplete).not.toContain("View job history");
    expect(mainStep).toContain('ctaLabel: "Library"');
    expect(mainStep).not.toContain("Open Library");
  });

  it("marketing integration row lists Reports not Job history", () => {
    expect(MARKETING_INTEGRATION_ITEMS).toContain("Reports");
    expect(MARKETING_INTEGRATION_ITEMS).not.toContain("Job history");
  });

  it("showcase taxonomy chips avoid Job history and Open Library CTAs", () => {
    const bannedCategory = new Set([
      "Job history",
      "Playbooks",
      "Open Library",
    ]);
    const bannedTryNext = /^Open (Library|Job history)/;

    for (const article of SHOWCASE_ARTICLES) {
      expect(bannedCategory.has(article.category)).toBe(false);
      expect(article.tryNext.label).not.toMatch(bannedTryNext);
    }
  });

  it("showcase marketing SVG mock H1s use Reports not Job history", () => {
    const reportsSvg = readFileSync(
      join(PUBLIC_SHOWCASES_DIR, "topics/02-job-history.svg"),
      "utf8",
    );
    const onboardingReportsSvg = readFileSync(
      join(PUBLIC_SHOWCASES_DIR, "onboarding/04-job-history.svg"),
      "utf8",
    );

    expect(reportsSvg).not.toMatch(/Job history/);
    expect(reportsSvg).toContain("Reports");
    expect(onboardingReportsSvg).not.toMatch(/>\s*Job history\s*</);
    expect(onboardingReportsSvg).toContain("Reports");
  });
});
