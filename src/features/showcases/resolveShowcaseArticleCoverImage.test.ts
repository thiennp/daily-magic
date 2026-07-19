import { describe, expect, it } from "vitest";

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

    expect(cover?.src).toMatch(/^\/showcases\/.+\.png$/);
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
});
