import { describe, expect, it } from "vitest";

import { mergeSkillStats } from "@/lib/knowledge/mergeSkillStats";
import { parseSkillStats } from "@/lib/knowledge/parseSkillStats";

const skill = (over: Record<string, unknown> = {}) => ({
  skillId: "deploy",
  calls: 2,
  saved: 500,
  baseline: 900,
  samples: 2,
  holdouts: 1,
  estimate: true,
  missRate: 0.5,
  hasScripts: true,
  scriptCount: 2,
  ...over,
});

describe("skill stats", () => {
  it("merges computers: sums calls and savings, estimate under 3 samples", () => {
    const merged = mergeSkillStats([
      {
        skills: [skill()],
        weekly: [{ weekStart: "2026-10-05", chosen: 2, missed: 1 }],
      },
      {
        skills: [
          skill({
            calls: 3,
            saved: 100,
            samples: 2,
            estimate: false,
            missRate: 0,
          }),
        ],
        weekly: [{ weekStart: "2026-10-05", chosen: 1, missed: 0 }],
      },
    ] as never);
    expect(merged.skills[0]).toMatchObject({
      calls: 5,
      saved: 600,
      samples: 4,
      estimate: true,
      missRate: 0.25,
    });
    expect(merged.weekly).toEqual([
      { weekStart: "2026-10-05", chosen: 3, missed: 1 },
    ]);
  });

  it("clears the estimate mark at 3+ measured samples", () => {
    const merged = mergeSkillStats([
      { skills: [skill({ samples: 3, estimate: false })], weekly: [] },
    ] as never);
    expect(merged.skills[0]?.estimate).toBe(false);
  });

  it("parses a heartbeat block and drops malformed entries", () => {
    const parsed = parseSkillStats([
      {
        projectId: "p1",
        skills: [skill(), { skillId: 5 }, skill({ missRate: 3 })],
        weekly: [
          { weekStart: "2026-10-05", chosen: 1, missed: 0 },
          { weekStart: "bad", chosen: 1, missed: 0 },
        ],
      },
      "junk",
    ]);
    expect(parsed).toHaveLength(1);
    expect(parsed[0]?.skills).toHaveLength(1);
    expect(parsed[0]?.weekly).toHaveLength(1);
  });
});
