import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { enrichShowcaseArticleWithImages } from "@/features/showcases/enrichShowcaseArticleWithImages";
import { SHOWCASE_ARTICLES } from "@/features/showcases/showcaseArticleRegistry";
import { SHOWCASE_ARTICLE_TOPIC_SCREEN_BY_SLUG } from "@/features/showcases/showcaseArticleTopicScreenMap.constant";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const listArticleImages = (
  article: ShowcaseArticle,
): readonly { readonly src: string }[] =>
  article.sections.flatMap((section) =>
    section.image ? [{ src: section.image.src }] : [],
  );

const publicSrcToFilePath = (src: string): string =>
  path.join(process.cwd(), "public", src.replace(/^\//, ""));

const assertValidShowcaseSvg = (contents: string): void => {
  if (!contents.trimStart().startsWith("<svg")) {
    throw new Error("Expected SVG root element");
  }

  if (/&(?!amp;|lt;|gt;|quot;|apos;|#[0-9]+;|#x[0-9A-Fa-f]+;)/.test(contents)) {
    throw new Error("SVG contains an unescaped ampersand");
  }
};

describe("showcase article images", () => {
  it("maps every article without inline images to a topic screen", () => {
    for (const article of SHOWCASE_ARTICLES) {
      const hasInlineImage = article.sections.some(
        (section) => section.image !== undefined,
      );

      if (hasInlineImage) {
        continue;
      }

      expect(SHOWCASE_ARTICLE_TOPIC_SCREEN_BY_SLUG[article.slug]).toBeTruthy();
    }
  });

  it("gives every article at least one image after enrichment", () => {
    for (const article of SHOWCASE_ARTICLES) {
      const enriched = enrichShowcaseArticleWithImages(article);
      const images = listArticleImages(enriched);

      expect(images.length).toBeGreaterThan(0);
    }
  });

  it("resolves enriched image src paths to files under public/", () => {
    for (const article of SHOWCASE_ARTICLES) {
      const enriched = enrichShowcaseArticleWithImages(article);

      for (const image of listArticleImages(enriched)) {
        expect(image.src).toMatch(/^\/showcases\/.+\.(svg|png)$/);
        const filePath = publicSrcToFilePath(image.src);
        expect(existsSync(filePath)).toBe(true);

        if (image.src.endsWith(".svg")) {
          const contents = readFileSync(filePath, "utf8");
          expect(() => assertValidShowcaseSvg(contents)).not.toThrow();
        }
      }
    }
  });
});
