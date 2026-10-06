import { describe, expect, it } from "vitest";

import summarizeOverviewPitfalls from "@/features/projects/overview/summarizeOverviewPitfalls";
import type { ProjectPitfallView } from "@agent-witch/shared/pitfalls";

const pit = (
  partial: Partial<ProjectPitfallView> &
    Pick<ProjectPitfallView, "id" | "severity">,
): ProjectPitfallView => ({
  projectId: "p1",
  symptom: partial.id,
  cause: "",
  avoidance: "",
  check: { kind: "id", value: partial.id },
  keywords: [],
  tags: [],
  source: "project",
  overridesSeed: false,
  hitCount: 0,
  lastSeenAt: null,
  updatedAt: null,
  ...partial,
});

describe("summarizeOverviewPitfalls", () => {
  it("counts Important/Warning/Note; ignores retired; never must-fix", () => {
    const summary = summarizeOverviewPitfalls([
      pit({ id: "a", severity: "block", hitCount: 2 }),
      pit({ id: "b", severity: "warn", hitCount: 1 }),
      pit({ id: "c", severity: "info" }),
      pit({ id: "d", severity: "block", source: "retired" }),
    ]);
    expect(summary).toEqual({
      active: 3,
      important: 1,
      warning: 1,
      note: 1,
      totalHits: 3,
      total: 4,
    });
    expect(JSON.stringify(summary)).not.toMatch(/mustFix|must fix/i);
  });
});
