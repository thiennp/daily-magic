import { describe, expect, it } from "vitest";

import { buildAgentWitchSelfUpdateTerminalCommand } from "./buildAgentWitchSelfUpdateTerminalCommand";

describe("buildAgentWitchSelfUpdateTerminalCommand", () => {
  it("uses prod install dir outside the browser", () => {
    expect(buildAgentWitchSelfUpdateTerminalCommand()).toBe(
      "~/.agent-witch/app/command/self-update.sh",
    );
  });

  it("uses local install dir on localhost", () => {
    Object.defineProperty(global, "window", {
      value: { location: { hostname: "localhost" } },
      configurable: true,
    });

    expect(buildAgentWitchSelfUpdateTerminalCommand()).toBe(
      "~/.local-agent-witch/app/command/self-update.sh",
    );
  });
});
