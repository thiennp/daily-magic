import { describe, expect, it } from "vitest";

import {
  decideSkillCheck,
  isSkillCheckpoint,
  MAX_FAILURE_CHECKS,
} from "@/lib/knowledge/skillUses/decideSkillCheck";

const none = { lastCheckedCount: 0, unjudgedFailures: 0, failureChecks: 0 };

describe("isSkillCheckpoint", () => {
  it("follows 2, 3, 5, 8, 13, 21 and then every 21", () => {
    const hits = Array.from({ length: 90 }, (_, i) => i + 1).filter(
      isSkillCheckpoint,
    );
    expect(hits).toEqual([2, 3, 5, 8, 13, 21, 42, 63, 84]);
  });
});

describe("decideSkillCheck", () => {
  it("checks at a checkpoint", () => {
    expect(decideSkillCheck({ ...none, usedCount: 5 })).toBe("checkpoint");
  });

  it("waits between checkpoints", () => {
    expect(decideSkillCheck({ ...none, usedCount: 4 })).toBeNull();
  });

  it("never checks the same count twice", () => {
    expect(
      decideSkillCheck({ ...none, usedCount: 5, lastCheckedCount: 5 }),
    ).toBeNull();
  });

  it("checks early after a failed run, up to the cap", () => {
    const failed = { ...none, usedCount: 1, unjudgedFailures: 1 };
    expect(decideSkillCheck(failed)).toBe("failure");
    expect(
      decideSkillCheck({ ...failed, failureChecks: MAX_FAILURE_CHECKS }),
    ).toBeNull();
  });
});
