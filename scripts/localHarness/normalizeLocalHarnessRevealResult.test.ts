import { describe, expect, it } from "vitest";

import { normalizeLocalHarnessRevealResult } from "./normalizeLocalHarnessRevealResult";
import type { LocalHarnessRevealResult } from "./revealLocalHarnessCandidates.types";

describe("normalizeLocalHarnessRevealResult", () => {
  it("fills missing relativePath from sourceRoot and sourcePath", () => {
    const reveal = {
      scanRoots: ["/Users/me"],
      sets: [
        {
          proposedSlug: "demo",
          proposedName: "demo",
          sourceRoot: "/Users/me/demo/.cursor",
          repoPath: "/Users/me/demo",
          items: [
            {
              id: "x",
              kind: "rule" as const,
              title: "rule",
              sourcePath: "/Users/me/demo/.cursor/rules/a.mdc",
              selected: true,
            },
          ],
        },
      ],
    } as unknown as LocalHarnessRevealResult;

    const normalized = normalizeLocalHarnessRevealResult(reveal);
    expect(normalized.sets[0]?.items[0]?.relativePath).toBe("rules/a.mdc");
  });
});
