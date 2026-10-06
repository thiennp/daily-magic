import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { AUTOMATION_SHOWCASE_SCREEN } from "@/features/showcases/automationShowcaseScreens.constant";
import { E2E_SHOWCASE_ARTICLES } from "@/features/showcases/e2eShowcaseArticleRegistry";
import { resolveShowcaseCoverSrc } from "@/features/showcases/resolveShowcaseCoverSrc";
import { ONBOARDING_SHOWCASE_SCREEN } from "@/features/showcases/onboardingShowcaseScreens.constant";
import { SHOWCASE_TOPIC_SCREEN } from "@/features/showcases/showcaseTopicScreens.constant";
import botToBot from "@/features/showcases/articles/botToBot.article";
import { resolveShowcaseArticleCoverImage } from "@/features/showcases/resolveShowcaseArticleCoverImage";
import { enrichShowcaseArticleWithImages } from "@/features/showcases/enrichShowcaseArticleWithImages";
import { SHOWCASE_ARTICLES } from "@/features/showcases/showcaseArticleRegistry";

const publicFileExists = (src: string): boolean =>
  existsSync(path.join(process.cwd(), "public", src.replace(/^\//u, "")));

describe("resolveShowcaseCoverSrc (SHOWCASES-013/014)", () => {
  it("uses curated SVGs for card covers so labels stay readable", () => {
    expect(
      resolveShowcaseCoverSrc({
        automationScreenId: AUTOMATION_SHOWCASE_SCREEN.HOME_POPULAR_PRESETS,
        src: "/showcases/automations/01-home-popular-presets.png",
        alt: "Popular workflow preset cards",
        caption: "Popular workflows",
      }),
    ).toBe("/showcases/automations/01-home-popular-presets.svg");

    expect(
      resolveShowcaseCoverSrc({
        topicScreenId: SHOWCASE_TOPIC_SCREEN.APPROVALS,
        src: "/showcases/topics/08-approvals.png",
        alt: "Sensitive task waiting for manager approval.",
        caption: "Sensitive task waiting for manager approval.",
      }),
    ).toBe("/showcases/topics/08-approvals.svg");

    expect(
      resolveShowcaseCoverSrc({
        screenId: ONBOARDING_SHOWCASE_SCREEN.SAMPLE_WORKFLOW,
        src: "/showcases/onboarding/03-sample-workflow.png",
        alt: "Weekly status workflow",
        caption: "Weekly status",
      }),
    ).toBe("/showcases/onboarding/03-sample-workflow.svg");
  });

  it("BUG-007: E2E verified card covers keep PNG src (no missing .svg swap)", () => {
    for (const article of E2E_SHOWCASE_ARTICLES) {
      const image = article.sections.find(
        (section) => section.image !== undefined,
      )?.image;
      expect(image).toBeDefined();
      expect(resolveShowcaseCoverSrc(image!)).toBe(image!.src);
      expect(image!.src).toMatch(/^\/showcases\/e2e\/.+\.png$/u);
    }
  });

  it("bot-to-bot cover keeps the shipped PNG (no missing .svg swap)", () => {
    const cover = resolveShowcaseArticleCoverImage(botToBot);
    expect(cover?.src).toBe("/showcases/bot-to-bot/diagram-flow-sequence.png");
    expect(publicFileExists(cover!.src)).toBe(true);
  });

  it("every showcase card cover src maps to a file in public/", () => {
    for (const article of SHOWCASE_ARTICLES) {
      const cover = resolveShowcaseArticleCoverImage(
        enrichShowcaseArticleWithImages(article),
      );
      expect(cover, article.slug).not.toBeNull();
      expect(publicFileExists(cover!.src), cover!.src).toBe(true);
    }
  });
});
