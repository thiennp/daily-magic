import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { SHOWCASE_ARTICLES } from "@/features/showcases/showcaseArticleRegistry";
import { isShowcaseTryNextAuthRequired } from "@/features/showcases/resolveShowcaseTryNextHref";

const APP_ROOT = "src/app";

const resolveAppPagePath = (pathname: string): string | null => {
  const clean = pathname.replace(/\/$/, "") || "/";

  if (clean === "/") {
    return join(APP_ROOT, "page.tsx");
  }

  if (clean === "/showcases") {
    return join(APP_ROOT, "showcases/page.tsx");
  }

  if (clean.startsWith("/showcases/")) {
    return join(APP_ROOT, "showcases/[slug]/page.tsx");
  }

  const pagePath = join(APP_ROOT, clean.slice(1), "page.tsx");
  return existsSync(pagePath) ? pagePath : null;
};

describe("showcase article links (SHOWCASES-012)", () => {
  const slugSet = new Set(SHOWCASE_ARTICLES.map((article) => article.slug));

  it("related showcase slugs all exist in the registry", () => {
    const missing: string[] = [];

    for (const article of SHOWCASE_ARTICLES) {
      for (const related of article.relatedShowcases ?? []) {
        if (!slugSet.has(related.slug)) {
          missing.push(`${article.slug} → ${related.slug}`);
        }
      }
    }

    expect(missing).toEqual([]);
  });

  it("tryNext hrefs resolve to real app routes or public showcases", () => {
    const missing: string[] = [];

    for (const article of SHOWCASE_ARTICLES) {
      const href = article.tryNext.href;
      const pathname = new URL(href, "https://example.local").pathname;

      if (pathname.startsWith("/showcases/")) {
        const slug = pathname.slice("/showcases/".length);
        if (!slugSet.has(slug)) {
          missing.push(`${article.slug} tryNext unknown showcase ${href}`);
        }
        continue;
      }

      if (pathname.startsWith("/login")) {
        continue;
      }

      if (!resolveAppPagePath(pathname)) {
        missing.push(`${article.slug} tryNext missing page ${href}`);
      }
    }

    expect(missing).toEqual([]);
  });

  it("stores destination paths for auth-gated CTAs (not pre-wrapped login URLs)", () => {
    const preWrapped = SHOWCASE_ARTICLES.filter((article) =>
      article.tryNext.href.startsWith("/login"),
    ).filter((article) =>
      isShowcaseTryNextAuthRequired(
        new URL(article.tryNext.href, "https://example.local").searchParams.get(
          "callbackUrl",
        ) ?? "",
      ),
    );

    expect(preWrapped.map((article) => article.slug)).toEqual([]);
  });
});
