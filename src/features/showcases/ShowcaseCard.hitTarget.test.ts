import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("ShowcaseCard hit target", () => {
  it("keeps cover imagery from blocking the card overlay link", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/showcases/ShowcaseCard.tsx"),
      "utf8",
    );

    expect(source).toContain("absolute inset-0");
    expect(source).toMatch(/overflow-hidden rounded-t-2xl pointer-events-none/);
    expect(source).toContain("pointer-events-none");
  });
});
