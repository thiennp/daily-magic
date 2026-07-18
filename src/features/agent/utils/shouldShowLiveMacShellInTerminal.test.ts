import { describe, expect, it } from "vitest";

import {
  shouldPreferStreamMirrorOverLiveShell,
  shouldShowLiveMacShellInTerminal,
} from "@/features/agent/utils/shouldShowLiveMacShellInTerminal";

describe("shouldShowLiveMacShellInTerminal", () => {
  it("AGENT-014: keeps Local Mac terminal live for open/opening shells only", () => {
    expect(shouldShowLiveMacShellInTerminal("open")).toBe(true);
    expect(shouldShowLiveMacShellInTerminal("opening")).toBe(true);
    expect(shouldShowLiveMacShellInTerminal("idle")).toBe(false);
    expect(shouldShowLiveMacShellInTerminal("closed")).toBe(false);
    expect(shouldShowLiveMacShellInTerminal("error")).toBe(false);
    expect(shouldShowLiveMacShellInTerminal(undefined)).toBe(false);
  });

  it("AGENT-025: hides empty Live PTY when stream mirror has output", () => {
    expect(
      shouldShowLiveMacShellInTerminal("open", { preferStreamMirror: true }),
    ).toBe(false);
    expect(
      shouldPreferStreamMirrorOverLiveShell({
        streamOutput: "AGENT-024 verify ok.\n",
        hasLiveShellData: false,
        terminalStatus: "streaming",
      }),
    ).toBe(true);
    expect(
      shouldPreferStreamMirrorOverLiveShell({
        streamOutput: "AGENT-024 verify ok.\n",
        hasLiveShellData: true,
        terminalStatus: "streaming",
      }),
    ).toBe(false);
  });
});
