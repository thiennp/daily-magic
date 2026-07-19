import { describe, expect, it } from "vitest";

import automateForYourselfOrYourTeam from "@/features/showcases/articles/automateForYourselfOrYourTeam.article";
import { enrichShowcaseArticleWithImages } from "@/features/showcases/enrichShowcaseArticleWithImages";
import { resolveShowcaseArticleCoverImage } from "@/features/showcases/resolveShowcaseArticleCoverImage";
import {
  getHomeFeaturedShowcases,
  getHomeMoreShowcases,
} from "@/features/showcases/homeShowcaseRegistry";
import firstAgentTaskIn5Minutes from "@/features/showcases/articles/firstAgentTaskIn5Minutes.article";

describe("resolveShowcaseArticleCoverImage (SHOWCASES-009)", () => {
  it("returns the first section image after enrichment", () => {
    const enriched = enrichShowcaseArticleWithImages(firstAgentTaskIn5Minutes);
    const cover = resolveShowcaseArticleCoverImage(enriched);

    expect(cover?.src).toMatch(/^\/showcases\/.+\.(png|svg)$/);
    expect(cover?.alt.length).toBeGreaterThan(0);
  });

  it("gives every home featured and more-examples card a cover", () => {
    for (const article of [
      ...getHomeFeaturedShowcases(),
      ...getHomeMoreShowcases(),
    ]) {
      expect(resolveShowcaseArticleCoverImage(article)).not.toBeNull();
    }
  });

  it("SHOWCASES-013: automate lead cover shows popular presets SVG", () => {
    const cover = resolveShowcaseArticleCoverImage(
      automateForYourselfOrYourTeam,
    );

    expect(cover?.src).toBe(
      "/showcases/automations/01-home-popular-presets.svg",
    );
    expect(cover?.alt.toLowerCase()).toContain("preset");
  });

  it("SHOWCASES-014: manager-approval card uses approvals SVG, not admin PNG", () => {
    const article = getHomeMoreShowcases().find(
      (entry) => entry.slug === "manager-approves-before-run",
    );
    expect(article).toBeDefined();
    const cover = resolveShowcaseArticleCoverImage(article!);
    expect(cover?.src).toBe("/showcases/topics/08-approvals.svg");
    expect(cover?.alt.toLowerCase()).toMatch(/approval/);
  });
});
