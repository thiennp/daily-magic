import { describe, expect, it } from "vitest";

import { resolveSessionErrorMessage } from "@/features/agent/utils/resolveSessionErrorMessage";

describe("resolveSessionErrorMessage (AGENT-011)", () => {
  it("prefers the last error response while status is error", () => {
    expect(
      resolveSessionErrorMessage({
        liveTerminalStatus: "error",
        isSessionActive: true,
        lastResponse: { text: "No Mac agent connected.", isError: true },
      }),
    ).toBe("No Mac agent connected.");
  });

  it("falls back when status is error without a last error payload", () => {
    expect(
      resolveSessionErrorMessage({
        liveTerminalStatus: "error",
        isSessionActive: true,
        lastResponse: { text: "ok", isError: false },
      }),
    ).toBe("Something went wrong. You can retry without starting over.");
  });

  it("shows inactive-session errors from the last response", () => {
    expect(
      resolveSessionErrorMessage({
        liveTerminalStatus: "idle",
        isSessionActive: false,
        lastResponse: { text: "Unauthorized", isError: true },
      }),
    ).toBe("Unauthorized");
  });

  it("returns null when there is no error", () => {
    expect(
      resolveSessionErrorMessage({
        liveTerminalStatus: "streaming",
        isSessionActive: true,
        lastResponse: { text: "Task sent", isError: false },
      }),
    ).toBeNull();
  });
});
