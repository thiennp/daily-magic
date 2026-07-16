import { describe, expect, it } from "vitest";

import { LEADERSHIP_SHOWCASE_ARTICLES } from "@/features/showcases/listLeadershipShowcaseArticles";
import { isLeadershipShowcaseCategory } from "@/features/showcases/listLeadershipShowcaseArticles";

describe("leadership showcase articles", () => {
  it("marks leadership category consistently", () => {
    for (const article of LEADERSHIP_SHOWCASE_ARTICLES) {
      expect(isLeadershipShowcaseCategory(article.category)).toBe(true);
      expect(article.slug.length).toBeGreaterThan(0);
      expect(article.sections.length).toBeGreaterThan(0);
    }
  });

  it("uses unique slugs", () => {
    const slugs = LEADERSHIP_SHOWCASE_ARTICLES.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
