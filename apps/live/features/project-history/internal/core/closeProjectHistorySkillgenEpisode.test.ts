import { describe, expect, it } from "vitest";

import { closeProjectHistorySkillgenEpisode } from "./closeProjectHistorySkillgenEpisode";

describe("closeProjectHistorySkillgenEpisode", () => {
  const msg = (id: string, createdAtMs: number) => ({ messageId: id, createdAtMs });

  it("waits below count/idle/interval", () => {
    const now = 1_000_000;
    expect(
      closeProjectHistorySkillgenEpisode({
        messages: [msg("m1", now - 60_000)],
        nowMs: now,
        lastClosedAtMs: now - 60_000,
        messageCountCap: 20,
        idleMs: 30 * 60_000,
        maxIntervalMs: 24 * 3_600_000,
      }),
    ).toEqual({ ready: false, reason: "below_triggers" });
  });

  it("closes on message count", () => {
    const now = 1_000_000;
    const messages = Array.from({ length: 20 }, (_, i) =>
      msg(`m${i}`, now - 1_000),
    );
    const result = closeProjectHistorySkillgenEpisode({
      messages,
      nowMs: now,
      lastClosedAtMs: now - 60_000,
    });
    expect(result.ready).toBe(true);
    if (result.ready) {
      expect(result.reason).toBe("count");
      expect(result.messageIds).toHaveLength(20);
    }
  });

  it("closes on idle", () => {
    const now = 1_000_000;
    const result = closeProjectHistorySkillgenEpisode({
      messages: [msg("m1", now - 31 * 60_000)],
      nowMs: now,
      lastClosedAtMs: now - 60_000,
    });
    expect(result).toMatchObject({ ready: true, reason: "idle" });
  });

  it("closes on max interval", () => {
    const now = 1_000_000;
    const result = closeProjectHistorySkillgenEpisode({
      messages: [msg("m1", now - 60_000)],
      nowMs: now,
      lastClosedAtMs: now - 25 * 3_600_000,
    });
    expect(result).toMatchObject({ ready: true, reason: "max_interval" });
  });

  it("returns empty when there are no messages", () => {
    expect(
      closeProjectHistorySkillgenEpisode({
        messages: [],
        nowMs: 1,
        lastClosedAtMs: null,
      }),
    ).toEqual({ ready: false, reason: "empty" });
  });
});
