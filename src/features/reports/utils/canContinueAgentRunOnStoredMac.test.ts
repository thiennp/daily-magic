import { describe, expect, it } from "vitest";

import { canContinueAgentRunOnStoredMac } from "@/features/reports/utils/canContinueAgentRunOnStoredMac";

describe("canContinueAgentRunOnStoredMac", () => {
  it("allows continue when the run stored a Mac id", () => {
    expect(canContinueAgentRunOnStoredMac("mac-1")).toBe(true);
  });

  it("blocks continue when the Mac id is missing", () => {
    expect(canContinueAgentRunOnStoredMac(null)).toBe(false);
    expect(canContinueAgentRunOnStoredMac(undefined)).toBe(false);
    expect(canContinueAgentRunOnStoredMac("")).toBe(false);
  });
});
