import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  readAgentWitchHostServices,
  resolveAgentWitchHostServicesFilePath,
  writeAgentWitchHostServices,
} from "./agentWitchHostServicesFile";
import { ensureAgentWitchAccountWakePort } from "./ensureAgentWitchAccountWakePort";
import {
  resolveAgentWitchAccountHash,
  resolveAgentWitchAccountLaunchAgentLabel,
  resolveAgentWitchAccountSystemdUnitName,
} from "./resolveAgentWitchAccountServiceNames";
import {
  resolveAgentWitchHostAccountFromEnv,
  resolveAgentWitchHostProcessScope,
} from "./resolveAgentWitchHostProcessScope";
import { resolveAgentWitchWakePortDir } from "./resolveAgentWitchWakePortDir";

const GMAIL = "nguyenphongthien@gmail.com";
const AGT = "agt-c7f998a3@agents.agentwitch.com";

const account = (email: string, wakePort: number) => ({
  email,
  launchAgentLabel: `com.agent-witch.${resolveAgentWitchAccountHash(email)}`,
  systemdUnitName: resolveAgentWitchAccountSystemdUnitName(email),
  wakePort,
});

describe("host account services (AWL-ISO-1)", () => {
  const dirs: string[] = [];
  const makeInstallDir = (name = ".agent-witch"): string => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-iso1-"));
    dirs.push(root);
    const installDir = path.join(root, name);
    fs.mkdirSync(installDir, { recursive: true });
    return installDir;
  };

  beforeEach(() => {
    dirs.length = 0;
  });

  afterEach(() => {
    for (const dir of dirs) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("derives a stable 12-hex hash, label and unit per account", () => {
    const installDir = makeInstallDir();
    const hash = resolveAgentWitchAccountHash(GMAIL);
    expect(hash).toMatch(/^[0-9a-f]{12}$/);
    expect(resolveAgentWitchAccountHash(` ${GMAIL.toUpperCase()} `)).toBe(hash);
    expect(resolveAgentWitchAccountHash(AGT)).not.toBe(hash);
    expect(resolveAgentWitchAccountLaunchAgentLabel(installDir, GMAIL)).toBe(
      `com.agent-witch.${hash}`,
    );
    expect(resolveAgentWitchAccountSystemdUnitName(GMAIL)).toBe(
      `agent-witch-${hash}.service`,
    );
  });

  it("uses the local-dev prefix for a .local-agent-witch install", () => {
    const installDir = makeInstallDir(".local-agent-witch");
    expect(resolveAgentWitchAccountLaunchAgentLabel(installDir, GMAIL)).toBe(
      `com.local-agent-witch.${resolveAgentWitchAccountHash(GMAIL)}`,
    );
  });

  it("round-trips host-services.json sorted by email and rejects malformed files", () => {
    const installDir = makeInstallDir();
    expect(readAgentWitchHostServices(installDir)).toBeNull();
    writeAgentWitchHostServices(
      installDir,
      [account(GMAIL, 40001), account(AGT, 40002)],
      new Date("2026-10-08T15:00:00.000Z"),
    );
    const file = readAgentWitchHostServices(installDir);
    expect(file?.accounts.map((row) => row.email)).toEqual([AGT, GMAIL]);
    expect(file?.updatedAt).toBe("2026-10-08T15:00:00.000Z");

    const filePath = resolveAgentWitchHostServicesFilePath(installDir);
    fs.writeFileSync(filePath, "not json");
    expect(readAgentWitchHostServices(installDir)).toBeNull();
    fs.writeFileSync(
      filePath,
      JSON.stringify({
        version: 1,
        mode: "per-account",
        accounts: [{ email: GMAIL }],
      }),
    );
    expect(readAgentWitchHostServices(installDir)).toBeNull();
  });

  it("resolves account / launcher / monolith scope (AGENT_WITCH_PROFILE alone stays monolith)", () => {
    const installDir = makeInstallDir();
    expect(
      resolveAgentWitchHostProcessScope({
        installDir,
        env: { AGENT_WITCH_PROFILE: GMAIL },
      }),
    ).toEqual({ kind: "monolith" });
    expect(
      resolveAgentWitchHostProcessScope({
        installDir,
        env: { AGENT_WITCH_HOST_ACCOUNT: ` ${GMAIL.toUpperCase()} ` },
      }),
    ).toEqual({ kind: "account", email: GMAIL });
    writeAgentWitchHostServices(installDir, [account(GMAIL, 40001)]);
    expect(
      resolveAgentWitchHostProcessScope({ installDir, env: {} }).kind,
    ).toBe("launcher");
    expect(
      resolveAgentWitchHostAccountFromEnv({ AGENT_WITCH_HOST_ACCOUNT: "  " }),
    ).toBeNull();
  });

  it("puts the account wake-port.json in the profile dir", () => {
    const installDir = makeInstallDir();
    expect(resolveAgentWitchWakePortDir(installDir, {})).toBe(installDir);
    expect(
      resolveAgentWitchWakePortDir(installDir, {
        AGENT_WITCH_HOST_ACCOUNT: GMAIL,
      }),
    ).toBe(path.join(installDir, "profiles", GMAIL));
  });

  it("reuses a saved account wake port, else allocates one avoiding taken ports", async () => {
    const installDir = makeInstallDir();
    const queue = [47892, 41000, 42000];
    const allocatePort = (): Promise<number> =>
      Promise.resolve(queue.shift() ?? 43000);

    const allocated = await ensureAgentWitchAccountWakePort({
      installDir,
      email: GMAIL,
      avoidPorts: [47892],
      allocatePort,
    });
    expect(allocated).toBe(41000);
    expect(
      JSON.parse(
        fs.readFileSync(
          path.join(installDir, "profiles", GMAIL, "wake-port.json"),
          "utf8",
        ),
      ),
    ).toEqual({ wakePort: 41000 });

    const reused = await ensureAgentWitchAccountWakePort({
      installDir,
      email: GMAIL,
      allocatePort,
    });
    expect(reused).toBe(41000);
    expect(queue).toEqual([42000]);
  });
});
