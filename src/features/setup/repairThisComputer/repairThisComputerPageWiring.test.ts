import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { REPAIR_THIS_COMPUTER_PAGE_COPY } from "@/features/setup/repairThisComputer/repairThisComputerPageCopy.constant";
import { resolveRepairThisComputerCommands } from "@/features/setup/repairThisComputer/resolveRepairThisComputerCommands";
import { buildAgentWitchRepairCommands } from "@/lib/agentWitch/repair/buildAgentWitchRepairCommands";
import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";

const root = process.cwd();

describe("Repair this computer page wiring", () => {
  it("locks the Product H1 and check hint", () => {
    expect(REPAIR_THIS_COMPUTER_PAGE_COPY.title).toBe(
      "Repair AgentWitch Local on this computer",
    );
    expect(REPAIR_THIS_COMPUTER_PAGE_COPY.checkOkHint).toContain('{"ok":true');
    expect(REPAIR_THIS_COMPUTER_PAGE_COPY.checkOkHint).toContain("wsConnected");
    expect(REPAIR_THIS_COMPUTER_PAGE_COPY.checkOkHint.toLowerCase()).toContain(
      "do not share",
    );
  });

  it("reuses repair + revive builders for Update and Restart", () => {
    const repair = buildAgentWitchRepairCommands(AGENT_WITCH_DEFAULT_ORIGIN);
    const commands = resolveRepairThisComputerCommands();
    expect(commands.updateUnix).toBe(repair.macos);
    expect(commands.updateWindows).toBe(repair.windows);
    expect(commands.updateUnix).toContain("/install/agent-witch-update.sh");
    expect(commands.updateUnix).toContain("| bash");
    expect(commands.updateWindows).toContain("wsl.exe -e bash -lc");
    expect(commands.restartMacos).toContain("launchctl kickstart");
    expect(commands.restartLinux).toContain("systemctl --user restart");
    expect(commands.healthCheck).toContain("127.0.0.1:43347/health");
  });

  it("wires the App route to the page body and metadata", () => {
    const source = readFileSync(
      join(root, "src/app/(app)/setup/repair-this-computer/page.tsx"),
      "utf8",
    );
    expect(source).toContain("RepairThisComputerPageBody");
    expect(source).toContain("/setup/repair-this-computer");
    expect(source).toContain("AppShell");
  });

  it("does not inline update or revive commands in resolve/body", () => {
    const resolveSource = readFileSync(
      join(
        root,
        "src/features/setup/repairThisComputer/resolveRepairThisComputerCommands.ts",
      ),
      "utf8",
    );
    expect(resolveSource).toContain("buildAgentWitchRepairCommands");
    expect(resolveSource).toContain("buildAgentWitchReviveAwlSteps");
    expect(resolveSource).not.toContain("buildAgentWitchUpdateInstallCommand");
    expect(resolveSource).not.toContain("wsl.exe");
    const bodySource = readFileSync(
      join(
        root,
        "src/features/setup/repairThisComputer/RepairThisComputerPageBody.tsx",
      ),
      "utf8",
    );
    expect(bodySource).not.toContain("launchctl kickstart");
    expect(bodySource).toContain("resolveRepairThisComputerCommands");
  });
});
