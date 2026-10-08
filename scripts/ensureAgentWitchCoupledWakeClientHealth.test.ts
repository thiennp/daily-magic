import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { writeAgentWitchHostServices } from "@agent-witch/install-layout";

import {
  ensureAgentWitchCoupledWakeClientHealth,
  isAgentWitchWakeHttpReachable,
} from "./ensureAgentWitchCoupledWakeClientHealth";
import { writeAgentWitchWakePortFile } from "./agentWitchWakePortFile";
import {
  AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  AGENT_WITCH_APP_DIR_NAME,
} from "./agentWitchInstallApp.constants";

vi.mock("./kickstartAgentWitchLaunchAgent", () => ({
  kickstartAgentWitchLaunchAgent: vi.fn(),
}));

import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";

const tempDirs: string[] = [];

afterEach(() => {
  vi.clearAllMocks();
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

const createInstallDir = (): string => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-coupled-health-"));
  tempDirs.push(rootDir);
  const appDir = path.join(rootDir, AGENT_WITCH_APP_DIR_NAME);
  fs.mkdirSync(appDir, { recursive: true });
  fs.writeFileSync(
    path.join(appDir, AGENT_WITCH_APP_BUNDLE_FILE_NAME),
    "export {}",
    "utf8",
  );
  return rootDir;
};

describe("ensureAgentWitchCoupledWakeClientHealth", () => {
  it("OPEN-002: kickstarts client when wake-port file exists but /health is down", async () => {
    const installDir = createInstallDir();
    writeAgentWitchWakePortFile(installDir, 47892);

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
    } as Response);
    vi.mocked(kickstartAgentWitchLaunchAgent).mockResolvedValue({ ok: true });

    const result = await ensureAgentWitchCoupledWakeClientHealth(installDir);

    expect(result.wakePortFileExists).toBe(true);
    expect(result.hollowInstall).toBe(false);
    expect(kickstartAgentWitchLaunchAgent).toHaveBeenCalled();
    expect(result.kickstartedLabels.length).toBeGreaterThan(0);
  });

  it("does not kickstart when wake HTTP health succeeds", async () => {
    const installDir = createInstallDir();
    writeAgentWitchWakePortFile(installDir, 47892);

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
    } as Response);

    const result = await ensureAgentWitchCoupledWakeClientHealth(installDir);

    expect(result.wakeReachable).toBe(true);
    expect(kickstartAgentWitchLaunchAgent).not.toHaveBeenCalled();
  });

  it("reports hollow install without kickstarting", async () => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-hollow-"));
    tempDirs.push(installDir);
    writeAgentWitchWakePortFile(installDir, 47892);

    const result = await ensureAgentWitchCoupledWakeClientHealth(installDir);

    expect(result.hollowInstall).toBe(true);
    expect(result.kickstartedLabels).toEqual([]);
    expect(kickstartAgentWitchLaunchAgent).not.toHaveBeenCalled();
  });
});

describe("isAgentWitchWakeHttpReachable", () => {
  it("returns false when fetch throws", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("ECONNREFUSED"));

    await expect(isAgentWitchWakeHttpReachable(47892)).resolves.toBe(false);
  });
});

describe("ensureAgentWitchCoupledWakeClientHealth per account (AWL-ISO-1)", () => {
  it("kickstarts only the account whose wake server is down", async () => {
    const installDir = createInstallDir();
    // Legacy root wake-port.json nobody listens on any more must not kick every account.
    writeAgentWitchWakePortFile(installDir, 47892);
    const accounts = [
      {
        email: "gmail@example.com",
        launchAgentLabel: "com.agent-witch.aaaaaaaaaaaa",
        systemdUnitName: "agent-witch-aaaaaaaaaaaa.service",
        wakePort: 47901,
      },
      {
        email: "agt@example.com",
        launchAgentLabel: "com.agent-witch.bbbbbbbbbbbb",
        systemdUnitName: "agent-witch-bbbbbbbbbbbb.service",
        wakePort: 47902,
      },
    ];
    writeAgentWitchHostServices(installDir, accounts);
    const agtProfileDir = path.join(installDir, "profiles", "agt@example.com");
    fs.mkdirSync(agtProfileDir, { recursive: true });
    writeAgentWitchWakePortFile(agtProfileDir, 47999);

    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation(async (input) => {
        const url = String(input);
        return { ok: url.includes(":47901/") } as Response;
      });
    vi.mocked(kickstartAgentWitchLaunchAgent).mockResolvedValue({ ok: true });

    const result = await ensureAgentWitchCoupledWakeClientHealth(installDir);

    expect(fetchSpy.mock.calls.map(([url]) => String(url)).sort()).toEqual([
      "http://127.0.0.1:47901/health",
      "http://127.0.0.1:47999/health",
    ]);
    expect(kickstartAgentWitchLaunchAgent).toHaveBeenCalledTimes(1);
    expect(kickstartAgentWitchLaunchAgent).toHaveBeenCalledWith(
      "com.agent-witch.bbbbbbbbbbbb",
    );
    expect(result.kickstartedLabels).toEqual(["com.agent-witch.bbbbbbbbbbbb"]);
    expect(result.ok).toBe(true);
  });
});
