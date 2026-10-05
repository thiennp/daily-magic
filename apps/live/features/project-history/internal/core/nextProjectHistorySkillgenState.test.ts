import { describe, expect, it } from "vitest";

import { nextProjectHistorySkillgenState } from "./nextProjectHistorySkillgenState";

describe("nextProjectHistorySkillgenState", () => {
  it("allows the happy-path edges", () => {
    expect(nextProjectHistorySkillgenState("CAPTURING", "episode_closed")).toEqual({
      ok: true,
      state: "EPISODE_READY",
    });
    expect(nextProjectHistorySkillgenState("EPISODE_READY", "budget_ok")).toEqual({
      ok: true,
      state: "SCRUBBING",
    });
    expect(nextProjectHistorySkillgenState("SCRUBBING", "scrub_ok")).toEqual({
      ok: true,
      state: "TRIAGE",
    });
    expect(nextProjectHistorySkillgenState("VALIDATE", "validate_retry")).toEqual({
      ok: true,
      state: "EXTRACT",
    });
  });

  it("rejects illegal edges", () => {
    expect(nextProjectHistorySkillgenState("CAPTURING", "budget_ok")).toEqual({
      ok: false,
      from: "CAPTURING",
      event: "budget_ok",
    });
    expect(nextProjectHistorySkillgenState("QUARANTINED", "scrub_ok").ok).toBe(false);
  });

  it("keeps EPISODE_READY when the draft cap is reached", () => {
    expect(
      nextProjectHistorySkillgenState("EPISODE_READY", "draft_cap_reached"),
    ).toEqual({ ok: true, state: "EPISODE_READY" });
  });
});
