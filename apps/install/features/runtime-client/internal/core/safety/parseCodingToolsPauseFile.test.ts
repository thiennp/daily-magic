import { describe, expect, it } from "vitest";

import { parseCodingToolsPauseFile } from "./parseCodingToolsPauseFile";

describe("parseCodingToolsPauseFile", () => {
  it("treats a missing file as not paused", () => {
    expect(parseCodingToolsPauseFile(null)).toEqual({
      paused: false,
      updatedAt: null,
    });
  });

  it("reads the paused flag and timestamp", () => {
    expect(
      parseCodingToolsPauseFile('{"paused":true,"updatedAt":"2026-10-06"}'),
    ).toEqual({ paused: true, updatedAt: "2026-10-06" });
    expect(parseCodingToolsPauseFile('{"paused":false}').paused).toBe(false);
  });

  it.each(["not json", "{}", '{"paused":"yes"}', "null"])(
    "fails closed (paused) on %s",
    (raw) => {
      expect(parseCodingToolsPauseFile(raw).paused).toBe(true);
    },
  );
});
