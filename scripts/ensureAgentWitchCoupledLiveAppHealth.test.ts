import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  ensureAgentWitchCoupledLiveAppHealth,
  findAgentWitchLiveAppReachablePort,
  isAgentWitchLiveAppHttpReachable,
  resolveAgentWitchLiveAppHealthPorts,
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
    writeDiscoveryPortFiles(installDir, {
      email: "me@example.com",
      port: 65400,
    });
    mockHealthOnlyOn(65400);

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

const writeDiscoveryPortFiles = (
  installDir: string,
  input: {
    readonly email: string;
    readonly port: number;
  },
): void => {
  const profileDir = path.join(installDir, "profiles", input.email);
  fs.mkdirSync(profileDir, { recursive: true });
  fs.writeFileSync(
    path.join(installDir, "local-app-accounts.json"),
    JSON.stringify({
      accounts: [
        {
          email: input.email,
          port: input.port,
          pid: process.pid,
          startedAt: new Date().toISOString(),
        },
      ],
    }),
  );
  fs.writeFileSync(
    path.join(profileDir, "local-app-port.json"),
    JSON.stringify({ localAppPort: input.port }),
  );
};

/** fetch mock: only `healthyPort` answers; everything else is ECONNREFUSED. */
const mockHealthOnlyOn = (healthyPort: number, body: unknown = { ok: true }) =>
  vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
    const url = String(input);
    if (url === `http://127.0.0.1:${healthyPort}/health`) {
      return new Response(JSON.stringify(body), { status: 200 });
    }
    throw new Error("ECONNREFUSED");
  });

describe("ensureAgentWitchCoupledLiveAppHealth — host discovery ports", () => {
  it("does not kickstart a healthy server on its discovered port", async () => {
    const installDir = createInstallDir();
    writeDiscoveryPortFiles(installDir, {
      email: "me@example.com",
      port: 65376,
    });
    const fetchSpy = mockHealthOnlyOn(65376);

    const result = await ensureAgentWitchCoupledLiveAppHealth(installDir);

    expect(result.liveReachable).toBe(true);
    expect(result.reachablePort).toBe(65376);
    expect(kickstartAgentWitchLaunchAgent).not.toHaveBeenCalled();
    expect(String(fetchSpy.mock.calls[0]?.[0])).toBe(
      "http://127.0.0.1:65376/health",
    );
    expect(
      fetchSpy.mock.calls.some((c) => String(c[0]).includes(":43347/")),
    ).toBe(false);
  });

  it("finds a server when legacy shim lists the live port (stale discovery row)", async () => {
    const installDir = createInstallDir();
    const profileDir = path.join(installDir, "profiles", "me@example.com");
    fs.mkdirSync(profileDir, { recursive: true });
    fs.writeFileSync(
      path.join(installDir, "local-app-accounts.json"),
      JSON.stringify({
        accounts: [
          {
            email: "me@example.com",
            port: 65376,
            pid: 1,
            startedAt: "2020-01-01T00:00:00.000Z",
          },
        ],
      }),
    );
    fs.writeFileSync(
      path.join(profileDir, "local-app-port.json"),
      JSON.stringify({ localAppPort: 65383 }),
    );
    mockHealthOnlyOn(65383);

    const result = await ensureAgentWitchCoupledLiveAppHealth(installDir);

    expect(result.reachablePort).toBe(65383);
    expect(kickstartAgentWitchLaunchAgent).not.toHaveBeenCalled();
  });

  it("kickstarts when nothing answers on any candidate port", async () => {
    const installDir = createInstallDir();
    writeDiscoveryPortFiles(installDir, {
      email: "me@example.com",
      port: 65376,
    });
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("ECONNREFUSED"));
    vi.mocked(kickstartAgentWitchLaunchAgent).mockResolvedValue({ ok: true });

    const result = await ensureAgentWitchCoupledLiveAppHealth(installDir);

    expect(result.liveReachable).toBe(false);
    expect(kickstartAgentWitchLaunchAgent).toHaveBeenCalled();
  });

  it("ignores another macOS user's AWL answering on a candidate port", async () => {
    const uid = typeof process.getuid === "function" ? process.getuid() : 501;
    mockHealthOnlyOn(65376, { ok: true, osUid: uid + 1 });

    await expect(
      findAgentWitchLiveAppReachablePort([65376, 65377]),
    ).resolves.toBeNull();
  });

  it("resolves discovery ports and legacy shims for the install", () => {
    const installDir = createInstallDir();
    writeDiscoveryPortFiles(installDir, {
      email: "me@example.com",
      port: 65380,
    });

    const ports = resolveAgentWitchLiveAppHealthPorts(installDir);

    expect(ports[0]).toBe(65380);
    expect(ports).not.toContain(43347);
  });
});

describe("isAgentWitchLiveAppHttpReachable", () => {
  it("returns false when fetch throws", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("ECONNREFUSED"));

    await expect(isAgentWitchLiveAppHttpReachable()).resolves.toBe(false);
  });
});
