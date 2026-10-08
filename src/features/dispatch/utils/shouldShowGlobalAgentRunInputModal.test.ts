import { describe, expect, it } from "vitest";

import { shouldShowGlobalAgentRunInputModal } from "./shouldShowGlobalAgentRunInputModal";

describe("shouldShowGlobalAgentRunInputModal", () => {
  it("returns false if job history live terminal is active for the run", () => {
    expect(
      shouldShowGlobalAgentRunInputModal("run-1", {
        isAgentRunLiveTerminalActive: () => true,
        isAnyAgentLiveProgressFeedActive: () => false,
        isAgentLiveProgressFeedActive: () => false,
      }),
    ).toBe(false);
  });

  it("returns false if another floater is active", () => {
    expect(
      shouldShowGlobalAgentRunInputModal("run-1", {
        isAgentRunLiveTerminalActive: () => false,
        isAnyAgentLiveProgressFeedActive: () => true,
        isAgentLiveProgressFeedActive: (id) => id === "run-2",
      }),
    ).toBe(false);
  });

  it("returns true if the matching floater is active", () => {
    expect(
      shouldShowGlobalAgentRunInputModal("run-1", {
        isAgentRunLiveTerminalActive: () => false,
        isAnyAgentLiveProgressFeedActive: () => true,
        isAgentLiveProgressFeedActive: (id) => id === "run-1",
      }),
    ).toBe(true);
  });

  it("returns true if no floater is active", () => {
    expect(
      shouldShowGlobalAgentRunInputModal("run-1", {
        isAgentRunLiveTerminalActive: () => false,
        isAnyAgentLiveProgressFeedActive: () => false,
        isAgentLiveProgressFeedActive: () => false,
      }),
    ).toBe(true);
  });
});
