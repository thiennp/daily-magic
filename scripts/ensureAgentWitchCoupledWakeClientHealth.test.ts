import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

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
