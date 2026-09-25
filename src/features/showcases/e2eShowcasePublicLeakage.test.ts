import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { E2E_SHOWCASE_ARTICLES } from "@/features/showcases/e2eShowcaseArticleRegistry";

const SENSITIVE_E2E_TEST_AUTH_PATTERNS: readonly RegExp[] = [
  /test\*@agentwitch\.com/i,
  /ALLOW_TEST_AUTH/i,
  /\/api\/auth\/test-login/i,
];

const PUBLIC_MARKETING_SOURCES: readonly string[] = [
  "src/features/showcases/ShowcasesIndexPageLayout.tsx",
  "src/features/showcases/homeShowcaseRegistry.ts",
];

/** Testi blocker 1–2 — E2E registry and test-auth strings stay off public marketing surfaces. */
describe("e2e showcase public leakage (Testi P0)", () => {
  it("public marketing layouts do not link to E2E showcase slugs", () => {
    const e2eSlugs = E2E_SHOWCASE_ARTICLES.map((article) => article.slug);
    const offenders: string[] = [];

    for (const relativePath of PUBLIC_MARKETING_SOURCES) {
      const source = readFileSync(join(process.cwd(), relativePath), "utf8");
      for (const slug of e2eSlugs) {
        if (source.includes(slug)) {
          offenders.push(`${relativePath} references ${slug}`);
        }
      }
      if (/E2E verified/i.test(source)) {
        offenders.push(`${relativePath} contains "E2E verified" heading`);
      }
    }

    expect(offenders).toEqual([]);
  });

  it("showcase article page gates metadata for E2E slugs", () => {
    const pageSource = readFileSync(
      join(process.cwd(), "src/app/(app)/showcases/[slug]/page.tsx"),
      "utf8",
    );

    expect(pageSource.includes("isE2eShowcaseSlug(slug)")).toBe(true);
    expect(pageSource.includes("isStaffPageViewer()")).toBe(true);
    expect(pageSource.includes("requireStaffPageAccess()")).toBe(true);
  });

  it("E2E test-auth article copy is only in staff-gated article file", () => {
    const articlePath = join(
      process.cwd(),
      "src/features/showcases/articles/e2eTestAccountSignIn.article.ts",
    );
    const articleSource = readFileSync(articlePath, "utf8");

    for (const pattern of SENSITIVE_E2E_TEST_AUTH_PATTERNS) {
      expect(pattern.test(articleSource)).toBe(true);
    }
  });
});
