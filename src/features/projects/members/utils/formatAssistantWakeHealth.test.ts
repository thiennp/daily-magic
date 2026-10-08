import { describe, expect, it } from "vitest";

import { formatAssistantWakeHealth as health } from "@/features/projects/members/utils/formatAssistantWakeHealth";

const NOW = new Date(2026, 9, 8, 12, 0).getTime();
const at = (minutesAgo: number): string =>
  new Date(NOW - minutesAgo * 60_000).toISOString();

describe("formatAssistantWakeHealth (P1-S1b)", () => {
  it("failure line: Last wake failed {time}: {reason}", () => {
    const h = health({
      lastWakeAt: at(30),
      lastFailureReason: "HTTP 429",
      nowMs: NOW,
    });
    expect(h.failed).toBe(true);
    expect(h.line).toBe(
      "Last wake failed today 11:30: Grok Bot was busy. Try again in a few minutes.",
    );
    expect(h.line).not.toContain("HTTP");
    const notPostable = health({
      lastWakeAt: null,
      lastFailureReason: "No wake link was saved when this message was sent.",
      nowMs: NOW,
    });
    expect(notPostable.line).toBe(
      "Last wake failed: No wake link was saved when this message was sent.",
    );
    expect(notPostable.offerPaste).toBe(true);
  });

  it("no failure: Registered ✓ · Last wake {ago}, or No wakes yet", () => {
    expect(
      health({ lastWakeAt: at(5), lastFailureReason: null, nowMs: NOW }),
    ).toEqual({
      failed: false,
      line: "Registered ✓ · Last wake 5 min ago",
      offerPaste: false,
    });
    expect(
      health({ lastWakeAt: null, lastFailureReason: null, nowMs: NOW }).line,
    ).toBe("Registered ✓ · No wakes yet");
  });

  it("HTTP 5nn failure hides status code in the line (DF-036)", () => {
    const failed = health({
      lastWakeAt: at(2),
      lastFailureReason: "HTTP 502",
      nowMs: NOW,
    });
    expect(failed).toMatchObject({ failed: true, offerPaste: false });
    expect(failed.line).not.toMatch(/HTTP|502/);
  });
});
