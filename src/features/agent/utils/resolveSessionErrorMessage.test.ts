import { describe, expect, it } from "vitest";

import { resolveSessionErrorMessage } from "@/features/agent/utils/resolveSessionErrorMessage";

describe("resolveSessionErrorMessage (AGENT-011)", () => {
  it("prefers the last error response while status is error", () => {
    expect(
      resolveSessionErrorMessage({
        liveTerminalStatus: "error",
        lastResponse: { text: "No Mac agent connected.", isError: true },
      }),
    ).toBe("No Mac agent connected.");
  });

  it("uses the terminal output when status is error without a last error", () => {
    expect(
      resolveSessionErrorMessage({
        liveTerminalStatus: "error",
        liveTerminalOutput: "$ task\nNo Mac agent connected.\n",
        lastResponse: { text: "Request accepted.", isError: false },
      }),
    ).toBe("No Mac agent connected.");
  });

  it("falls back when status is error without a last error payload", () => {
    expect(
      resolveSessionErrorMessage({
        liveTerminalStatus: "error",
        lastResponse: { text: "ok", isError: false },
      }),
    ).toBe("Something went wrong. You can retry without starting over.");
  });

  it("shows lastResponse errors even while a shell session is active", () => {
    expect(
      resolveSessionErrorMessage({
        liveTerminalStatus: "idle",
        lastResponse: {
          text: "No Mac is connected for your account.",
          isError: true,
        },
      }),
    ).toBe("No Mac is connected for your account.");
  });

  it("returns null when there is no error", () => {
    expect(
      resolveSessionErrorMessage({
        liveTerminalStatus: "streaming",
        lastResponse: { text: "Task sent", isError: false },
      }),
    ).toBeNull();
  });
});
