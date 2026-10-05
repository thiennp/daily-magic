import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const sectionSource = readFileSync(
  path.join(
    process.cwd(),
    "src/features/projects/pitfalls/AwcProjectPitfallsSection.tsx",
  ),
  "utf8",
);
const primarySource = readFileSync(
  path.join(
    process.cwd(),
    "src/features/projects/AwcProjectDetailPrimaryColumn.tsx",
  ),
  "utf8",
);
const copySource = readFileSync(
  path.join(
    process.cwd(),
    "src/features/projects/pitfalls/awcProjectPitfallsCopy.constant.ts",
  ),
  "utf8",
);

describe("AwcProjectPitfallsSection wiring", () => {
  it("renders on the project detail primary column after composition", () => {
    expect(primarySource).toMatch(
      /AwcProjectReadOnlyCompositionSections[\s\S]*AwcProjectPitfallsSection[\s\S]*AwcProjectRepoUrlsSection/,
    );
  });

  it("is read-only and deep-links Edit on Mac to the Pitfalls tab", () => {
    expect(sectionSource).toMatch(
      /withProjectEditOnMacTab\([\s\S]*?editCta,[\s\S]*?projectId,[\s\S]*?"pitfalls"/,
    );
    expect(sectionSource).toContain("AwcProjectEditOnMacActions");
    expect(sectionSource).not.toMatch(
      /\b(PUT|POST|upsert|savePitfall|textarea)\b/,
    );
  });

  it("uses Product English without weak admissions or protocol jargon", () => {
    const combined = `${sectionSource}\n${copySource}`;
    expect(combined).not.toMatch(
      /\b(API|endpoint|JSON|HMAC|beta|experimental|unverified|not yet)\b/i,
    );
    expect(copySource).toContain("Known traps in this project");
    expect(copySource).toContain("Fix");
    expect(copySource).toContain("Triggers");
  });
});
