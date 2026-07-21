import { describe, expect, it } from "vitest";

import { isProcessAlive } from "./isProcessAlive";

describe("isProcessAlive", () => {
  it("returns false for non-positive pids", () => {
    expect(isProcessAlive(0)).toBe(false);
    expect(isProcessAlive(-1)).toBe(false);
  });

  it("returns true for the current process", () => {
    expect(isProcessAlive(process.pid)).toBe(true);
  });
});
