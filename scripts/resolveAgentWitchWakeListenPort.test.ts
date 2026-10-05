import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@agent-witch/install-macos-launch", () => ({
  syncAgentWitchLaunchAgentPlistWakePort: vi.fn(() => []),
}));

import { syncAgentWitchLaunchAgentPlistWakePort } from "@agent-witch/install-macos-launch";
import { resolveAgentWitchWakeListenPort } from "./resolveAgentWitchWakeListenPort";
import { writeAgentWitchWakePortFile } from "./agentWitchWakePortFile";

const allocateEphemeralPort = (): Promise<number> =>
  new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (address === null || typeof address === "string") {
        server.close(() => reject(new Error("Failed to allocate test port")));
        return;
      }
      const port = address.port;
      server.close((error) => (error ? reject(error) : resolve(port)));
    });
  });

const holdPort = async (port: number): Promise<net.Server> =>
  new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });

describe("resolveAgentWitchWakeListenPort", () => {
  const tempDirs: string[] = [];
  const previousHome = process.env.AGENT_WITCH_HOME;
  const previousWake = process.env.AGENT_WITCH_WAKE_PORT;

  afterEach(() => {
    if (previousHome === undefined) {
      delete process.env.AGENT_WITCH_HOME;
    } else {
      process.env.AGENT_WITCH_HOME = previousHome;
    }
    if (previousWake === undefined) {
      delete process.env.AGENT_WITCH_WAKE_PORT;
    } else {
      process.env.AGENT_WITCH_WAKE_PORT = previousWake;
    }
    for (const dir of tempDirs.splice(0)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
    vi.clearAllMocks();
  });

  it("keeps the wake-port.json value when that port is free", async () => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-listen-"));
    tempDirs.push(installDir);
    process.env.AGENT_WITCH_HOME = installDir;
    const savedPort = await allocateEphemeralPort();
    writeAgentWitchWakePortFile(installDir, savedPort);
    // Drifted LaunchAgent env must lose to wake-port.json.
    process.env.AGENT_WITCH_WAKE_PORT = String(savedPort === 61774 ? 49273 : 61774);

    const port = await resolveAgentWitchWakeListenPort({ attempts: 1 });
    expect(port).toBe(savedPort);
    expect(syncAgentWitchLaunchAgentPlistWakePort).not.toHaveBeenCalled();
  });

  it("rewrites wake-port.json, env and LaunchAgent plists together when forced to move", async () => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-listen-"));
    tempDirs.push(installDir);
    process.env.AGENT_WITCH_HOME = installDir;
    const savedPort = await allocateEphemeralPort();
    writeAgentWitchWakePortFile(installDir, savedPort);
    process.env.AGENT_WITCH_WAKE_PORT = String(savedPort);
    const holder = await holdPort(savedPort);

    try {
      const port = await resolveAgentWitchWakeListenPort({
        attempts: 1,
        retryDelayMs: 1,
      });
      expect(port).not.toBe(savedPort);
      expect(
        JSON.parse(fs.readFileSync(path.join(installDir, "wake-port.json"), "utf8")),
      ).toEqual({ wakePort: port });
      expect(process.env.AGENT_WITCH_WAKE_PORT).toBe(String(port));
      expect(syncAgentWitchLaunchAgentPlistWakePort).toHaveBeenCalledWith(
        expect.objectContaining({ wakePort: port }),
      );
    } finally {
      await new Promise<void>((resolve, reject) => {
        holder.close((error) => (error ? reject(error) : resolve()));
      });
    }
  });
});
