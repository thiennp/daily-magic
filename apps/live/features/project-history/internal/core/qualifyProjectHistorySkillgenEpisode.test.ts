import { describe, expect, it } from "vitest";

import {
  detectProjectHistorySkillgenOwnerMark,
  detectProjectHistorySkillgenSuccessSignal,
  qualifyProjectHistorySkillgenEpisode,
} from "./qualifyProjectHistorySkillgenEpisode";

describe("qualifyProjectHistorySkillgenEpisode", () => {
  it("accepts an owner mark with at least one message", () => {
    expect(
      qualifyProjectHistorySkillgenEpisode({
        messageCount: 1,
        ownerMarkedSaveAsSkill: true,
        hasSuccessSignal: false,
      }),
    ).toEqual({ ok: true, reason: "owner_mark" });
  });

  it("rejects short episodes without an owner mark", () => {
    expect(
      qualifyProjectHistorySkillgenEpisode({
        messageCount: 2,
        ownerMarkedSaveAsSkill: false,
        hasSuccessSignal: true,
      }),
    ).toEqual({ ok: false, reason: "too_short" });
  });

  it("accepts success signal at min length", () => {
    expect(
      qualifyProjectHistorySkillgenEpisode({
        messageCount: 3,
        ownerMarkedSaveAsSkill: false,
        hasSuccessSignal: true,
      }),
    ).toEqual({ ok: true, reason: "success_signal" });
  });

  it("rejects when there is no success signal", () => {
    expect(
      qualifyProjectHistorySkillgenEpisode({
        messageCount: 5,
        ownerMarkedSaveAsSkill: false,
        hasSuccessSignal: false,
      }),
    ).toEqual({ ok: false, reason: "no_success_signal" });
  });
});

describe("detectProjectHistorySkillgenSuccessSignal", () => {
  it("matches done / tests green / thumbs-up", () => {
    expect(detectProjectHistorySkillgenSuccessSignal("All done here")).toBe(true);
    expect(detectProjectHistorySkillgenSuccessSignal("tests green")).toBe(true);
    expect(detectProjectHistorySkillgenSuccessSignal("thumbs-up")).toBe(true);
    expect(detectProjectHistorySkillgenSuccessSignal("just chatting")).toBe(false);
  });
});

describe("detectProjectHistorySkillgenOwnerMark", () => {
  it("matches save as skill", () => {
    expect(detectProjectHistorySkillgenOwnerMark("please save as skill")).toBe(
      true,
    );
    expect(detectProjectHistorySkillgenOwnerMark("ok")).toBe(false);
  });
});
