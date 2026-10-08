import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  resolveAgentWitchAccountLaunchAgentLabel,
  resolveAgentWitchAccountSystemdUnitName,
} from "@agent-witch/install-layout";
import {
  AWI_BUNDLED_COMMAND_DIR,
  type AgentWitchHostServicesFile,
} from "@agent-witch/install-layout/types";

import { resolveAgentWitchSystemdUserUnitDir } from "./agentWitchAccountSystemdUnit";
import { startAgentWitchAccountSystemdUnits } from "./startAgentWitchAccountSystemdUnits";

const GMAIL = "nguyenphongthien@gmail.com";
const AGT = "agt-c7f998a3@agents.agentwitch.com";

const dirs: string[] = [];

afterEach(() => {
  for (const dir of dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("account systemd user units (AWL-ISO-1)", () => {
  it("writes one unit per account, reloads once, then enable + start (never restart)", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-iso1-systemd-"));
    dirs.push(root);
    const installDir = path.join(root, ".agent-witch");
    fs.mkdirSync(installDir, { recursive: true });
    const services: AgentWitchHostServicesFile = {
      version: 1,
      mode: "per-account",
      updatedAt: "2026-10-08T00:00:00.000Z",
      accounts: [GMAIL, AGT].map((email, index) => ({
        email,
        launchAgentLabel: resolveAgentWitchAccountLaunchAgentLabel(
          installDir,
          email,
        ),
        systemdUnitName: resolveAgentWitchAccountSystemdUnitName(email),
        wakePort: 47900 + index,
      })),
    };
    const calls: string[][] = [];
    const systemctl = async (args: readonly string[]): Promise<void> => {
      calls.push([...args]);
    };

    const first = await startAgentWitchAccountSystemdUnits({
      installDir,
      services,
      homeDir: root,
      systemctl,
    });

    expect(first.every((row) => row.ok)).toBe(true);
    const [gmailUnit, agtUnit] = services.accounts.map(
      (account) => account.systemdUnitName,
    );
    expect(calls).toEqual([
      ["daemon-reload"],
      ["enable", gmailUnit],
      ["start", gmailUnit],
      ["enable", agtUnit],
      ["start", agtUnit],
    ]);
    const unit = fs.readFileSync(
      path.join(resolveAgentWitchSystemdUserUnitDir(root), gmailUnit!),
      "utf8",
    );
    expect(unit).toContain(`Environment=AGENT_WITCH_HOST_ACCOUNT=${GMAIL}`);
    expect(unit).toContain(`Environment=AGENT_WITCH_PROFILE=${GMAIL}`);
    expect(unit).toContain("Environment=AGENT_WITCH_WAKE_PORT=47900");
    expect(unit).toContain(
      `ExecStart=${path.join(installDir, AWI_BUNDLED_COMMAND_DIR, "run.sh")}`,
    );

    calls.length = 0;
    await startAgentWitchAccountSystemdUnits({
      installDir,
      services,
      homeDir: root,
      systemctl,
    });
    expect(calls.map((args) => args[0])).toEqual([
      "enable",
      "start",
      "enable",
      "start",
    ]);
    expect(calls.flat()).not.toContain("restart");
  });
});
