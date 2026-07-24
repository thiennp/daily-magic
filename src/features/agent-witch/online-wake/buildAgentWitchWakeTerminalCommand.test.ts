import { describe, expect, it } from "vitest";

import { buildAgentWitchWakeTerminalCommand } from "./buildAgentWitchWakeTerminalCommand";

describe("buildAgentWitchWakeTerminalCommand", () => {
  it("uses prod install dir outside the browser", () => {
    expect(buildAgentWitchWakeTerminalCommand()).toBe(
      "~/.agent-witch/app/command/wake.sh",
    );
  });

  it("uses local install dir on localhost", () => {
    Object.defineProperty(global, "window", {
      value: { location: { hostname: "localhost" } },
      configurable: true,
    });

    expect(buildAgentWitchWakeTerminalCommand()).toBe(
      "~/.local-agent-witch/app/command/wake.sh",
    );
  });
});
