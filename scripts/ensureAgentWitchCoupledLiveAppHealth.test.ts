import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  ensureAgentWitchCoupledLiveAppHealth,
  isAgentWitchLiveAppHttpReachable,
} from "./ensureAgentWitchCoupledLiveAppHealth";
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
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-live-health-"));
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

describe("ensureAgentWitchCoupledLiveAppHealth", () => {
  it("kickstarts client when AWL /health is down", async () => {
    const installDir = createInstallDir();

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
    } as Response);
    vi.mocked(kickstartAgentWitchLaunchAgent).mockResolvedValue({ ok: true });

    const result = await ensureAgentWitchCoupledLiveAppHealth(installDir);

    expect(result.hollowInstall).toBe(false);
    expect(kickstartAgentWitchLaunchAgent).toHaveBeenCalled();
    expect(result.kickstartedLabels.length).toBeGreaterThan(0);
  });

  it("does not kickstart when AWL health succeeds", async () => {
    const installDir = createInstallDir();

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
    } as Response);

    const result = await ensureAgentWitchCoupledLiveAppHealth(installDir);

    expect(result.liveReachable).toBe(true);
    expect(kickstartAgentWitchLaunchAgent).not.toHaveBeenCalled();
  });

  it("reports hollow install without kickstarting", async () => {
    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "aw-live-hollow-"),
    );
    tempDirs.push(installDir);

    const result = await ensureAgentWitchCoupledLiveAppHealth(installDir);

    expect(result.hollowInstall).toBe(true);
    expect(result.kickstartedLabels).toEqual([]);
    expect(kickstartAgentWitchLaunchAgent).not.toHaveBeenCalled();
  });
});

describe("isAgentWitchLiveAppHttpReachable", () => {
  it("returns false when fetch throws", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("ECONNREFUSED"));

    await expect(isAgentWitchLiveAppHttpReachable()).resolves.toBe(false);
  });
});
