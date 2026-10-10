import { describe, expect, it } from "vitest";

import { decideReleaseOutcome } from "./decideReleaseOutcome";

const base = {
  tier: "low",
  attempts: 0,
  blockCount: 0,
  blockedOn: null,
  blockedReason: null,
  verifySignal: null,
} as const;

describe("decideReleaseOutcome", () => {
  it("flags done without a verify signal as unverified", () => {
    expect(decideReleaseOutcome({ ...base, outcome: "done" }).unverified).toBe(
      true,
    );
    const verified = decideReleaseOutcome({
      ...base,
      outcome: "done",
      verifySignal: "exit_code",
    });
    expect(verified.unverified).toBe(false);
    expect(verified.claim.verifySignal).toBe("exit_code");
  });

  it("climbs one tier per failure and hands to a person at the attempt cap", () => {
    const first = decideReleaseOutcome({ ...base, outcome: "failed" });
    expect(first).toMatchObject({ status: "queued", handedToUser: false });
    expect(first.claim.effortTier).toBe("medium");
    const last = decideReleaseOutcome({
      ...base,
      outcome: "failed",
      attempts: 2,
    });
    expect(last).toMatchObject({ status: "blocked", handedToUser: true });
    expect(last.claim.blockedOn).toBe("user");
  });

  it("counts blocks and hands to a person past the block cap", () => {
    const first = decideReleaseOutcome({
      ...base,
      outcome: "blocked",
      blockedOn: "skill",
      blockedReason: "needs a skill",
    });
    expect(first).toMatchObject({
      status: "blocked",
      handedToUser: false,
      blockedReason: "needs a skill",
    });
    expect(first.claim.blockedOn).toBe("skill");
    const capped = decideReleaseOutcome({
      ...base,
      outcome: "blocked",
      blockedOn: "skill",
      blockedReason: "needs a skill",
      blockCount: 3,
    });
    expect(capped.handedToUser).toBe(true);
    expect(capped.claim.blockedOn).toBe("user");
    expect(capped.blockedReason).toContain("blocked 4 times");
  });

  it("released just puts the task back", () => {
    expect(
      decideReleaseOutcome({ ...base, outcome: "released" }),
    ).toMatchObject({
      status: "queued",
      handedToUser: false,
    });
  });
});
