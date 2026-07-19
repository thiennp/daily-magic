import { describe, expect, it } from "vitest";

import { resolveIsSendTaskSessionActive } from "@/features/agent/utils/resolveIsSendTaskSessionActive";

describe("resolveIsSendTaskSessionActive", () => {
  it("AGENT-029: finished writer sessions do not block the Start picker", () => {
    expect(
      resolveIsSendTaskSessionActive({
        hasWriterSession: true,
        liveTerminalStatus: "finished",
        macShellStatus: "idle",
      }),
    ).toBe(false);
  });

  it("keeps in-progress writer sessions on the live panel", () => {
    expect(
      resolveIsSendTaskSessionActive({
        hasWriterSession: true,
        liveTerminalStatus: "streaming",
        macShellStatus: "idle",
      }),
    ).toBe(true);
  });

  it("keeps an open Mac shell active even without a writer session", () => {
    expect(
      resolveIsSendTaskSessionActive({
        hasWriterSession: false,
        liveTerminalStatus: "idle",
        macShellStatus: "open",
      }),
    ).toBe(true);
  });
});
