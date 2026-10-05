import { describe, expect, it } from "vitest";

import { stepProjectHistorySkillgenFsm } from "./stepProjectHistorySkillgenFsm";

describe("stepProjectHistorySkillgenFsm", () => {
  it("advances CAPTURING → EPISODE_READY on close ready", () => {
    expect(
      stepProjectHistorySkillgenFsm({
        state: "CAPTURING",
        verdict: { kind: "close", ready: true },
      }),
    ).toEqual({
      ok: true,
      event: "episode_closed",
      nextState: "EPISODE_READY",
    });
  });

  it("stays put when close is not ready", () => {
    expect(
      stepProjectHistorySkillgenFsm({
        state: "CAPTURING",
        verdict: { kind: "close", ready: false },
      }),
    ).toEqual({
      ok: false,
      reason: "not_ready",
      state: "CAPTURING",
    });
  });

  it("routes budget failure to SKIPPED_COST", () => {
    expect(
      stepProjectHistorySkillgenFsm({
        state: "EPISODE_READY",
        verdict: { kind: "budget", ok: false },
      }),
    ).toEqual({
      ok: true,
      event: "budget_exceeded",
      nextState: "SKIPPED_COST",
    });
  });

  it("quarantines on residual secret", () => {
    expect(
      stepProjectHistorySkillgenFsm({
        state: "SCRUBBING",
        verdict: { kind: "scrub", residualSecret: true },
      }),
    ).toEqual({
      ok: true,
      event: "scrub_quarantine",
      nextState: "QUARANTINED",
    });
  });

  it("retries validate once then fails", () => {
    expect(
      stepProjectHistorySkillgenFsm({
        state: "VALIDATE",
        verdict: { kind: "validate", ok: false, attempts: 1 },
      }),
    ).toEqual({
      ok: true,
      event: "validate_retry",
      nextState: "EXTRACT",
    });
    expect(
      stepProjectHistorySkillgenFsm({
        state: "VALIDATE",
        verdict: { kind: "validate", ok: false, attempts: 2 },
      }),
    ).toEqual({
      ok: true,
      event: "validate_fail",
      nextState: "FAILED_VALIDATE",
    });
  });

  it("maps dedup create_new to EXTRACT", () => {
    expect(
      stepProjectHistorySkillgenFsm({
        state: "DEDUP",
        verdict: { kind: "dedup", action: "create_new" },
      }),
    ).toEqual({
      ok: true,
      event: "dedup_novel",
      nextState: "EXTRACT",
    });
  });
});
