import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  resolveAgentWitchAccountLaunchAgentLabel,
  resolveAgentWitchAccountSystemdUnitName,
  writeAgentWitchHostServices,
} from "@agent-witch/install-layout";
import type { AgentWitchHostServicesFile } from "@agent-witch/install-layout/types";

import {
  buildAgentWitchAccountLaunchAgentPlistXml,
  resolveAgentWitchAccountLaunchAgentPlistPath,
} from "./agentWitchAccountLaunchAgent";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";
import { startAgentWitchAccountLaunchAgents } from "./startAgentWitchAccountLaunchAgents";

const GMAIL = "nguyenphongthien@gmail.com";
const AGT = "agt-c7f998a3@agents.agentwitch.com";

const dirs: string[] = [];

afterEach(() => {
  for (const dir of dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

const makeRoot = (): { installDir: string; homeDir: string } => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-iso1-launchd-"));
  dirs.push(root);
  const installDir = path.join(root, ".agent-witch");
  fs.mkdirSync(installDir, { recursive: true });
  return { installDir, homeDir: root };
};

const buildServices = (installDir: string): AgentWitchHostServicesFile => ({
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
});

describe("account LaunchAgents (AWL-ISO-1)", () => {
  it("pins the plist to one account and prefers the profile wake-port.json", () => {
    const { installDir, homeDir } = makeRoot();
    const services = buildServices(installDir);
    const profileDir = path.join(installDir, "profiles", GMAIL);
    fs.mkdirSync(profileDir, { recursive: true });
    fs.writeFileSync(
      path.join(profileDir, "wake-port.json"),
      JSON.stringify({ wakePort: 48123 }),
    );

    const xml = buildAgentWitchAccountLaunchAgentPlistXml({
      installDir,
      homeDir,
      account: services.accounts[0]!,
    });

    expect(xml).toContain(
      `<string>${services.accounts[0]!.launchAgentLabel}</string>`,
    );
    expect(xml).toContain(
      `<key>AGENT_WITCH_HOST_ACCOUNT</key>\n    <string>${GMAIL}</string>`,
    );
    expect(xml).toContain(
      `<key>AGENT_WITCH_PROFILE</key>\n    <string>${GMAIL}</string>`,
    );
    expect(xml).toContain("<string>48123</string>");
    expect(xml.indexOf("AGENT_WITCH_HOST_ACCOUNT")).toBeLessThan(
      xml.indexOf("<key>RunAtLoad</key>"),
    );
  });

  it("bootstraps an unloaded account and kickstarts without -k", async () => {
    const { installDir, homeDir } = makeRoot();
    const services = buildServices(installDir);
    const calls: string[][] = [];
    const loaded = new Set([
      `gui/501/${services.accounts[1]!.launchAgentLabel}`,
    ]);

    const results = await startAgentWitchAccountLaunchAgents({
      installDir,
      services,
      homeDir,
      uid: 501,
      launchctl: async (args) => {
        calls.push([...args]);
        if (args[0] === "print" && !loaded.has(args[1] ?? "")) {
          throw new Error("not loaded");
        }
      },
    });

    expect(results.map((row) => row.ok)).toEqual([true, true]);
    const gmailTarget = `gui/501/${services.accounts[0]!.launchAgentLabel}`;
    const agtTarget = `gui/501/${services.accounts[1]!.launchAgentLabel}`;
    expect(calls).toEqual([
      ["print", gmailTarget],
      [
        "bootstrap",
        "gui/501",
        resolveAgentWitchAccountLaunchAgentPlistPath(
          homeDir,
          services.accounts[0]!.launchAgentLabel,
        ),
      ],
      ["enable", gmailTarget],
      ["kickstart", gmailTarget],
      ["print", agtTarget],
      ["kickstart", agtTarget],
    ]);
    expect(calls.flat()).not.toContain("-k");
    for (const account of services.accounts) {
      expect(
        fs.existsSync(
          resolveAgentWitchAccountLaunchAgentPlistPath(
            homeDir,
            account.launchAgentLabel,
          ),
        ),
      ).toBe(true);
    }
  });

  it("reports a failing account without stopping the others", async () => {
    const { installDir, homeDir } = makeRoot();
    const services = buildServices(installDir);
    const results = await startAgentWitchAccountLaunchAgents({
      installDir,
      services,
      homeDir,
      uid: 501,
      launchctl: async (args) => {
        if (
          args[0] === "kickstart" &&
          args[1]?.endsWith(services.accounts[0]!.launchAgentLabel)
        ) {
          throw new Error("boom");
        }
      },
    });
    expect(results.map((row) => [row.email, row.ok])).toEqual([
      [GMAIL, false],
      [AGT, true],
    ]);
  });

  it("lists one launch target per account once host-services.json exists", () => {
    const { installDir } = makeRoot();
    expect(listAgentWitchLaunchTargets(installDir)).toEqual([
      { profileEmail: null, launchAgentLabel: "com.agent-witch" },
    ]);

    const services = buildServices(installDir);
    writeAgentWitchHostServices(installDir, services.accounts);

    // host-services.json keeps accounts sorted by email.
    expect(listAgentWitchLaunchTargets(installDir)).toEqual(
      [services.accounts[1]!, services.accounts[0]!].map((account) => ({
        profileEmail: account.email,
        launchAgentLabel: account.launchAgentLabel,
      })),
    );
    expect(
      listAgentWitchLaunchTargets(installDir, { onlyAccountEmail: AGT }),
    ).toEqual([
      {
        profileEmail: AGT,
        launchAgentLabel: services.accounts[1]!.launchAgentLabel,
      },
    ]);
  });
});
