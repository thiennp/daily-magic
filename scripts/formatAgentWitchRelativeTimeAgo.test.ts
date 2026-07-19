import { describe, expect, it } from "vitest";

import { formatAgentWitchRelativeTimeAgo } from "./formatAgentWitchRelativeTimeAgo";

const NOW_MS = Date.parse("2026-07-19T12:00:00.000Z");

describe("formatAgentWitchRelativeTimeAgo", () => {
  it("returns null for missing or invalid timestamps (AGENT-025)", () => {
    expect(formatAgentWitchRelativeTimeAgo(null, NOW_MS)).toBeNull();
    expect(formatAgentWitchRelativeTimeAgo("not-a-date", NOW_MS)).toBeNull();
  });

  it("formats seconds as just now (AGENT-025)", () => {
    expect(
      formatAgentWitchRelativeTimeAgo("2026-07-19T11:59:30.000Z", NOW_MS),
    ).toBe("just now");
  });

  it("formats minutes ago (AGENT-025)", () => {
    expect(
      formatAgentWitchRelativeTimeAgo("2026-07-19T11:45:00.000Z", NOW_MS),
    ).toBe("15 mins ago");
    expect(
      formatAgentWitchRelativeTimeAgo("2026-07-19T11:59:00.000Z", NOW_MS),
    ).toBe("1 min ago");
  });

  it("formats hours and days ago (AGENT-025)", () => {
    expect(
      formatAgentWitchRelativeTimeAgo("2026-07-19T10:30:00.000Z", NOW_MS),
    ).toBe("1h 30 mins ago");
    expect(
      formatAgentWitchRelativeTimeAgo("2026-07-18T12:00:00.000Z", NOW_MS),
    ).toBe("1 day ago");
    expect(
      formatAgentWitchRelativeTimeAgo("2026-07-12T12:00:00.000Z", NOW_MS),
    ).toBe("1 week ago");
  });
});
