import { join } from "node:path";
import { rmSync, mkdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { AgentWitchHostServicesFile } from "@agent-witch/install-layout/types";
import { startAgentWitchAccountLaunchAgents } from "./startAgentWitchAccountLaunchAgents";

describe("startAgentWitchAccountLaunchAgents", () => {
  it("never restarts a loaded job (no -k on kickstart, no bootout)", async () => {
    const tmpDir = join(__dirname, ".tmp-start-launch-agents");
    rmSync(tmpDir, { recursive: true, force: true });
    mkdirSync(tmpDir, { recursive: true });

    try {
      const services: AgentWitchHostServicesFile = {
        version: 1,
        mode: "per-account",
        updatedAt: "2024-01-01T00:00:00Z",
        accounts: [
          {
            email: "a@x.com",
            wakePort: 1234,
            launchAgentLabel: "com.agent-witch.ax",
            systemdUnitName: "agent-witch-ax.service",
          },
        ],
      };

      const calls: string[][] = [];
      const launchctl = async (args: readonly string[]) => {
        calls.push([...args]);
        if (args[0] === "print") {
          // simulate already loaded
          return;
        }
      };

      const result = await startAgentWitchAccountLaunchAgents({
        installDir: tmpDir,
        services,
        homeDir: tmpDir,
        uid: 501,
        launchctl,
      });

      expect(result).toEqual([
        { email: "a@x.com", service: "com.agent-witch.ax", ok: true },
      ]);

      expect(calls).toEqual([
        ["print", "gui/501/com.agent-witch.ax"],
        ["kickstart", "gui/501/com.agent-witch.ax"],
      ]);
    } finally {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("bootstraps if not loaded", async () => {
    const tmpDir = join(__dirname, ".tmp-start-launch-agents-2");
    rmSync(tmpDir, { recursive: true, force: true });
    mkdirSync(tmpDir, { recursive: true });

    try {
      const services: AgentWitchHostServicesFile = {
        version: 1,
        mode: "per-account",
        updatedAt: "2024-01-01T00:00:00Z",
        accounts: [
          {
            email: "a@x.com",
            wakePort: 1234,
            launchAgentLabel: "com.agent-witch.ax",
            systemdUnitName: "agent-witch-ax.service",
          },
        ],
      };

      const calls: string[][] = [];
      const launchctl = async (args: readonly string[]) => {
        calls.push([...args]);
        if (args[0] === "print") {
          throw new Error("Not loaded");
        }
      };

      const result = await startAgentWitchAccountLaunchAgents({
        installDir: tmpDir,
        services,
        homeDir: tmpDir,
        uid: 501,
        launchctl,
      });

      expect(result).toEqual([
        { email: "a@x.com", service: "com.agent-witch.ax", ok: true },
      ]);

      const plistPath = join(
        tmpDir,
        "Library",
        "LaunchAgents",
        "com.agent-witch.ax.plist",
      );

      expect(calls).toEqual([
        ["print", "gui/501/com.agent-witch.ax"],
        ["bootstrap", "gui/501", plistPath],
        ["enable", "gui/501/com.agent-witch.ax"],
        ["kickstart", "gui/501/com.agent-witch.ax"],
      ]);
    } finally {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
