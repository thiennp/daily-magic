import { describe, expect, it } from "vitest";

import {
  formatAssistantWakeHealth as health,
  formatWakeAgo,
  mapWakeFailureReason,
} from "@/features/projects/members/utils/formatAssistantWakeHealth";

const NOW = new Date(2026, 9, 8, 12, 0).getTime();
const at = (minutesAgo: number): string => new Date(NOW - minutesAgo * 60_000).toISOString();

describe("formatAssistantWakeHealth (P1-S1b, Product map)", () => {
  it("maps every stored failure code to plain copy, never the raw code", () => {
    expect(mapWakeFailureReason("HTTP 429")).toEqual({
      text: "Grok Bot was busy. Try again in a few minutes.",
      offerPaste: false,
    });
    expect(mapWakeFailureReason("HTTP 500").text).toBe("Grok Bot had a problem on its side.");
    expect(mapWakeFailureReason("HTTP 503").text).toBe("Grok Bot had a problem on its side.");
    expect(mapWakeFailureReason("HTTP 503").offerPaste).toBe(false);
    expect(mapWakeFailureReason("HTTP 401")).toEqual({ text: "Grok Bot didn't accept the key.", offerPaste: true });
    expect(mapWakeFailureReason("HTTP 403").offerPaste).toBe(true);
    expect(mapWakeFailureReason("Fetch failed (timeout, DNS or refused)")).toEqual({
      text: "Couldn't reach Grok Bot.",
      offerPaste: false,
    });
    expect(mapWakeFailureReason("Not postable")).toEqual({
      text: "This wake link doesn't work anymore.",
      offerPaste: true,
    });
    expect(mapWakeFailureReason("HTTP 418")).toEqual({ text: "Something went wrong.", offerPaste: true });
  });

  it("failure line: Last wake failed {time}: {reason}", () => {
    const h = health({ lastWakeAt: at(30), lastFailureReason: "HTTP 429", nowMs: NOW });
    expect(h.failed).toBe(true);
    expect(h.line).toBe("Last wake failed today 11:30: Grok Bot was busy. Try again in a few minutes.");
    expect(h.line).not.toContain("HTTP");
    const unknown = health({ lastWakeAt: null, lastFailureReason: "Not postable", nowMs: NOW });
    expect(unknown.line).toBe("Last wake failed: This wake link doesn't work anymore.");
    expect(unknown.offerPaste).toBe(true);
  });

  it("no failure: Registered ✓ · Last wake {ago}, or No wakes yet", () => {
    expect(health({ lastWakeAt: at(5), lastFailureReason: null, nowMs: NOW })).toEqual({
      failed: false,
      line: "Registered ✓ · Last wake 5 min ago",
      offerPaste: false,
    });
    expect(health({ lastWakeAt: null, lastFailureReason: null, nowMs: NOW }).line).toBe("No wakes yet");
  });

  it("formatWakeAgo buckets", () => {
    expect(formatWakeAgo(at(0), NOW)).toBe("just now");
    expect(formatWakeAgo(at(59), NOW)).toBe("59 min ago");
    expect(formatWakeAgo(at(180), NOW)).toBe("3 h ago");
    expect(formatWakeAgo(at(60 * 49), NOW)).toBe("2 d ago");
  });
});
