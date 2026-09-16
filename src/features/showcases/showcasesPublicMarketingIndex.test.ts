import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { E2E_SHOWCASE_ARTICLES } from "@/features/showcases/e2eShowcaseArticleRegistry";

/** COPY-P0c — E2E walkthrough cards stay routable but off the public marketing index. */
describe("showcases public marketing index (COPY-P0c)", () => {
  it("does not import or render the E2E verified section", () => {
    const layoutSource = readFileSync(
      join(
        process.cwd(),
        "src/features/showcases/ShowcasesIndexPageLayout.tsx",
      ),
      "utf8",
    );

    expect(layoutSource.includes("E2E_SHOWCASE_ARTICLES")).toBe(false);
    expect(layoutSource.includes("E2E verified")).toBe(false);
  });

  it("keeps E2E articles available in the registry for direct routes", () => {
    const slugs = E2E_SHOWCASE_ARTICLES.map((article) => article.slug);
    expect(slugs).toContain("e2e-test-account-sign-in");
  });
});
