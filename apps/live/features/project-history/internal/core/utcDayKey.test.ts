import { describe, expect, it } from "vitest";

import { utcDayKey } from "./utcDayKey";

describe("utcDayKey", () => {
  it("formats a UTC day", () => {
    expect(utcDayKey(Date.parse("2026-10-05T22:15:00.000Z"))).toBe("2026-10-05");
  });
});
