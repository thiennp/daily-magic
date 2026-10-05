import { describe, expect, it } from "vitest";

import { mergeSkillPitfallsIntoDraftMarkdown } from "./mergeSkillPitfallsIntoDraftMarkdown";

const base = `---
name: deploy-staging
description: Ship to staging.
version: 0.1.0
source_message_ids: [m1]
status: draft
---
## Steps
1. Build
2. Push
`;

describe("mergeSkillPitfallsIntoDraftMarkdown", () => {
  it("creates a Pitfalls section when missing", () => {
    const result = mergeSkillPitfallsIntoDraftMarkdown({
      skillMarkdown: base,
      newPitfallLines: ["- **too few steps:** Avoid repeating this history failure (failed validate)."],
    });
    expect(result.appendedCount).toBe(1);
    expect(result.skillMarkdown).toContain("## Pitfalls");
    expect(result.skillMarkdown).toContain("too few steps");
  });

  it("keeps existing bullets and appends new ones", () => {
    const withSection = `${base}
## Pitfalls
- **old tip:** Keep health checks.
`;
    const result = mergeSkillPitfallsIntoDraftMarkdown({
      skillMarkdown: withSection,
      newPitfallLines: [
        "- **old tip:** Keep health checks.",
        "- **new tip:** Do not skip verify.",
      ],
    });
    expect(result.appendedCount).toBe(1);
    expect(result.totalPitfallBullets).toBe(2);
    const idxOld = result.skillMarkdown.indexOf("old tip");
    const idxNew = result.skillMarkdown.indexOf("new tip");
    expect(idxOld).toBeGreaterThan(-1);
    expect(idxNew).toBeGreaterThan(idxOld);
  });

  it("dedupes by normalized text and respects cap", () => {
    const withSection = `${base}
## Pitfalls
- **A:** one
`;
    const result = mergeSkillPitfallsIntoDraftMarkdown({
      skillMarkdown: withSection,
      newPitfallLines: ["- **a:** one.", "- **b:** two", "- **c:** three"],
      maxBullets: 2,
    });
    expect(result.appendedCount).toBe(1);
    expect(result.totalPitfallBullets).toBe(2);
  });
});
