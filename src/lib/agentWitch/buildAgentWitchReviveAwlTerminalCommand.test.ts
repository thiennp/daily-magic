import { describe, expect, it } from "vitest";

import { buildAgentWitchReviveAwlTerminalCommand } from "./buildAgentWitchReviveAwlTerminalCommand";

describe("buildAgentWitchReviveAwlTerminalCommand", () => {
  it("uses production install dir and launch agent on agentwitch.com", () => {
    const command =
      buildAgentWitchReviveAwlTerminalCommand("www.agentwitch.com");
    expect(command).toContain('AW_HOME="$HOME/.agent-witch"');
    expect(command).toContain("com.agent-witch");
    expect(command).toContain("local-app-port.json");
    expect(command).toContain("/health");
    expect(command).not.toContain("43347");
  });

  it("uses local install dir on localhost", () => {
    const command = buildAgentWitchReviveAwlTerminalCommand("localhost");
    expect(command).toContain('AW_HOME="$HOME/.local-agent-witch"');
    expect(command).toContain("com.local-agent-witch");
  });
});
