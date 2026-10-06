import { describe, expect, it } from "vitest";

import { AGENT_WITCH_REPAIR_WINDOWS_COMMAND } from "@/lib/agentWitch/repair/agentWitchRepairWindowsCommand.constant";
import { buildAgentWitchRepairCommands } from "@/lib/agentWitch/repair/buildAgentWitchRepairCommands";
import { buildAgentWitchUpdateInstallCommand } from "@/lib/agentWitch/buildAgentWitchUpdateInstallCommand";

describe("buildAgentWitchRepairCommands", () => {
  it("AWLR-002: macOS and Linux reuse the update command the Repair manually panel shows", () => {
    const commands = buildAgentWitchRepairCommands(
      "https://www.agentwitch.com/",
    );
    const expected =
      'curl -fsSL "https://www.agentwitch.com/install/agent-witch-update.sh" | bash';

    expect(commands.scriptUrl).toBe(
      "https://www.agentwitch.com/install/agent-witch-update.sh",
    );
    expect(commands.macos).toBe(expected);
    expect(commands.linux).toBe(expected);
    expect(commands.macos).toBe(
      buildAgentWitchUpdateInstallCommand("https://www.agentwitch.com"),
    );
  });

  it("AWLR-002: Windows runs the same script inside WSL like the tray does", () => {
    expect(
      buildAgentWitchRepairCommands("https://www.agentwitch.com").windows,
    ).toBe(AGENT_WITCH_REPAIR_WINDOWS_COMMAND);
    expect(AGENT_WITCH_REPAIR_WINDOWS_COMMAND).toBe(
      'wsl.exe -e bash -lc "set -o pipefail; curl -fsSL https://www.agentwitch.com/install/agent-witch-update.sh | bash"',
    );
  });

  it("AWLR-002: follows the request origin (localhost dev)", () => {
    expect(
      buildAgentWitchRepairCommands("http://localhost:3000").scriptUrl,
    ).toBe("http://localhost:3000/install/agent-witch-update.sh");
  });
});
