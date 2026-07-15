import { describe, expect, it } from "vitest";

import hasUserPairedMac from "@/features/home/utils/hasUserPairedMac";

describe("hasUserPairedMac", () => {
  it("returns true when db flag is set", () => {
    expect(hasUserPairedMac(false, true)).toBe(true);
  });

  it("returns true when live device list is non-empty", () => {
    expect(hasUserPairedMac(true, false)).toBe(true);
  });

  it("returns false when neither signal is set", () => {
    expect(hasUserPairedMac(false, false)).toBe(false);
  });
});
