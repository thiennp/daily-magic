import { describe, expect, it } from "vitest";

import { shouldShowLiveMacShellInTerminal } from "@/features/agent/utils/shouldShowLiveMacShellInTerminal";

describe("shouldShowLiveMacShellInTerminal", () => {
  it("AGENT-014: keeps Local Mac terminal live for open/opening shells only", () => {
    expect(shouldShowLiveMacShellInTerminal("open")).toBe(true);
    expect(shouldShowLiveMacShellInTerminal("opening")).toBe(true);
    expect(shouldShowLiveMacShellInTerminal("idle")).toBe(false);
    expect(shouldShowLiveMacShellInTerminal("closed")).toBe(false);
    expect(shouldShowLiveMacShellInTerminal("error")).toBe(false);
    expect(shouldShowLiveMacShellInTerminal(undefined)).toBe(false);
  });
});
