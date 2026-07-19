import { describe, expect, it } from "vitest";

import { SHOWCASE_ARTICLES } from "@/features/showcases/showcaseArticleRegistry";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

/** SHOWCASES-011 — marketing articles must stay benefit-first, not apology/demo copy. */
const BANNED_MARKETING_PHRASE_PATTERNS: readonly RegExp[] = [
  /\blimits?\b/i,
  /\bdemo\b/i,
  /\bsample\b/i,
  /\bcaveat/i,
  /\bworkaround/i,
  /\bdummy\b/i,
  /\bfake\b/i,
  /\bnot yet\b/i,
  /\bdoes not work yet\b/i,
  /\bwhat we do not do yet\b/i,
  /\bhonest limit/i,
];

const collectMarketingStrings = (
  article: ShowcaseArticle,
): readonly string[] => {
  const strings: string[] = [
    article.title,
    article.subtitle,
    article.category,
    ...article.whatYouNeed,
    article.tryNext.label,
    ...(article.relatedShowcases?.map((link) => link.label) ?? []),
  ];

  for (const section of article.sections) {
    if (section.heading) {
      strings.push(section.heading);
    }
    if (section.paragraphs) {
      strings.push(...section.paragraphs);
    }
    if (section.bullets) {
      strings.push(...section.bullets);
    }
    if (section.image) {
      strings.push(section.image.alt, section.image.caption);
    }
  }

  return strings;
};

describe("showcase marketing copy (SHOWCASES-011)", () => {
  it("avoids limit/demo/sample/apology phrasing in all articles", () => {
    const offenders: string[] = [];

    for (const article of SHOWCASE_ARTICLES) {
      for (const text of collectMarketingStrings(article)) {
        for (const pattern of BANNED_MARKETING_PHRASE_PATTERNS) {
          if (pattern.test(text)) {
            offenders.push(`${article.slug}: "${text}" (~${pattern})`);
          }
        }
      }
    }

    expect(offenders).toEqual([]);
  });
});
