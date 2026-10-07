import { describe, expect, it } from "vitest";

import {
  decodeProjectHistoryTimelineCursor,
  encodeProjectHistoryTimelineCursor,
} from "./projectHistoryTimelineCursor";

describe("projectHistoryTimelineCursor", () => {
  it("round-trips { t, id } as opaque base64url JSON", () => {
    const encoded = encodeProjectHistoryTimelineCursor({
      t: "2026-01-02T03:04:05.000Z",
      id: "msg-1",
    });
    expect(encoded.includes("{")).toBe(false);
    expect(decodeProjectHistoryTimelineCursor(encoded)).toEqual({
      t: "2026-01-02T03:04:05.000Z",
      id: "msg-1",
    });
  });

  it("treats blank as omit and garbage as invalid", () => {
    expect(decodeProjectHistoryTimelineCursor(undefined)).toBeNull();
    expect(decodeProjectHistoryTimelineCursor("")).toBeNull();
    expect(decodeProjectHistoryTimelineCursor("   ")).toBeNull();
    expect(decodeProjectHistoryTimelineCursor("not-base64-json")).toBe(
      "invalid",
    );
  });
});
