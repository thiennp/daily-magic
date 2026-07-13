import { describe, expect, it } from "vitest";

import {
  formatLastSeenText,
  formatRelativeTimeAgo,
} from "@/lib/time/formatRelativeTimeAgo";

const NOW_MS = Date.parse("2026-07-13T18:00:00.000Z");

describe("formatRelativeTimeAgo", () => {
  it("returns just now for recent timestamps", () => {
    expect(
      formatRelativeTimeAgo("2026-07-13T17:59:30.000Z", NOW_MS),
    ).toBe("just now");
  });

  it("formats minutes ago", () => {
    expect(
      formatRelativeTimeAgo("2026-07-13T17:45:00.000Z", NOW_MS),
    ).toBe("15 mins ago");
  });

  it("formats hours and minutes ago", () => {
    expect(
      formatRelativeTimeAgo("2026-07-13T16:30:00.000Z", NOW_MS),
    ).toBe("1h 30 mins ago");
  });

  it("prefixes last seen text", () => {
    expect(
      formatLastSeenText("2026-07-13T16:30:00.000Z", NOW_MS),
    ).toBe("Last seen 1h 30 mins ago");
  });
});
