import { describe, expect, it } from "vitest";

import { buildAgentWitchWakeTerminalCommand } from "./buildAgentWitchWakeTerminalCommand";

describe("buildAgentWitchWakeTerminalCommand", () => {
  it("points at the installed wake shell script", () => {
    expect(buildAgentWitchWakeTerminalCommand()).toBe("~/.agent-witch/wake.sh");
  });
});
