import { describe, expect, it } from "vitest";

import { isLocalProjectHistoryOn } from "./isLocalProjectHistoryOn";

describe("isLocalProjectHistoryOn", () => {
  it("is true for on states and false for off/missing", () => {
    expect(isLocalProjectHistoryOn("on_ready")).toBe(true);
    expect(isLocalProjectHistoryOn("degraded")).toBe(true);
    expect(isLocalProjectHistoryOn("on_configuring")).toBe(true);
    expect(isLocalProjectHistoryOn("off")).toBe(false);
    expect(isLocalProjectHistoryOn(null)).toBe(false);
  });
});
