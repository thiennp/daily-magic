import { describe, expect, it } from "vitest";

import { resolveStatusSectionSessionError } from "@/features/agent/utils/resolveStatusSectionSessionError";

const CAPPED =
  "Failed to prepare codex: Codex isn't signed in on this computer. Run codex login in a terminal there, or pick another c…";

describe("resolveStatusSectionSessionError (d7110873)", () => {
  it("drops the capped duplicate once the run panel shows the outcome", () => {
    expect(
      resolveStatusSectionSessionError({
        sessionErrorMessage: CAPPED,
        liveTerminalRunId: "34fd80ea",
        liveTerminalStatus: "error",
      }),
    ).toBeNull();
    expect(
      resolveStatusSectionSessionError({
        sessionErrorMessage: CAPPED,
        liveTerminalRunId: null,
        liveTerminalStatus: "waiting_approval",
      }),
    ).toBeNull();
  });

  it("keeps a send error when no run panel is showing", () => {
    expect(
      resolveStatusSectionSessionError({
        sessionErrorMessage: "Your computer is offline.",
        liveTerminalRunId: null,
        liveTerminalStatus: "idle",
      }),
    ).toBe("Your computer is offline.");
  });
});
