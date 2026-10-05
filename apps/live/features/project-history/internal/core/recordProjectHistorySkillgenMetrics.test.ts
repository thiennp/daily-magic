import { describe, expect, it } from "vitest";

import { recordProjectHistorySkillgenMetrics } from "./recordProjectHistorySkillgenMetrics";

describe("recordProjectHistorySkillgenMetrics", () => {
  it("records counts and costs without any body field", () => {
    const event = recordProjectHistorySkillgenMetrics({
      projectId: "p1",
      episodeId: "ep1",
      fromState: "EXTRACT",
      toState: "VALIDATE",
      reason: "extract_ok",
      tokensUsed: 1200,
      openDraftCount: 2,
      nowIso: "2026-10-05T12:00:00.000Z",
    });
    expect(event).toEqual({
      at: "2026-10-05T12:00:00.000Z",
      projectId: "p1",
      episodeId: "ep1",
      fromState: "EXTRACT",
      toState: "VALIDATE",
      reason: "extract_ok",
      tokensUsed: 1200,
      openDraftCount: 2,
    });
    expect(Object.keys(event)).not.toContain("body");
    expect(Object.keys(event)).not.toContain("transcript");
    expect(Object.keys(event)).not.toContain("message");
  });
});
