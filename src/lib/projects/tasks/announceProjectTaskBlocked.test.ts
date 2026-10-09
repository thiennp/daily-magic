import { describe, expect, it } from "vitest";

import {
  composeBlockedChatSummary,
  readBlockedReason,
} from "@/lib/projects/tasks/announceProjectTaskBlocked";

describe("readBlockedReason", () => {
  it("returns the trimmed reason, null when missing or blank", () => {
    expect(readBlockedReason({ blockedReason: "  need API key " })).toBe(
      "need API key",
    );
    expect(readBlockedReason({ blockedReason: "  " })).toBeNull();
    expect(readBlockedReason({ blockedReason: 3 })).toBeNull();
    expect(readBlockedReason(null)).toBeNull();
  });
});

describe("composeBlockedChatSummary", () => {
  it("names the task and reason, clipped to 200 chars", () => {
    expect(composeBlockedChatSummary("Ship board", "no access")).toBe(
      "Blocked: Ship board — no access",
    );
    const long = composeBlockedChatSummary("T", "x".repeat(500));
    expect(long.length).toBe(200);
    expect(long.endsWith("…")).toBe(true);
  });
});
