import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { STYLEGUIDE_SECTIONS } from "@/features/styleguide/styleguideSections.constant";

const STYLEGUIDE_PAGE_PATH = join(process.cwd(), "src/app/styleguide/page.tsx");

/** UX-P2a — staff styleguide drops demo video section. */
describe("styleguide sections (UX-P2a)", () => {
  it("does not mount VideosSection or Rick Astley embeds", () => {
    const pageSource = readFileSync(STYLEGUIDE_PAGE_PATH, "utf8");

    expect(pageSource).not.toContain("VideosSection");
    expect(pageSource).not.toContain("youtube.com");
    expect(STYLEGUIDE_SECTIONS.map((section) => section.id)).not.toContain(
      "videos",
    );
  });
});
