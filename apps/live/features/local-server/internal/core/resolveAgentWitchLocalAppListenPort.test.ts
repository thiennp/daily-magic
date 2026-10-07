import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { AGENT_WITCH_LOCAL_PORTS_IN_USE_MESSAGE } from "./agentWitchLocalAppPortRange.constants";
import {
  canBindAgentWitchLocalAppPort,
  readAgentWitchLocalAppPortFile,
  readAgentWitchLocalAppPortsExhausted,
  resolveAgentWitchLocalAppListenPort,
  resolveAgentWitchLocalAppPortFilePath,
  writeAgentWitchLocalAppPortFile,
} from "./resolveAgentWitchLocalAppListenPort";

const holdPort = (port: number): Promise<net.Server> =>
  new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });

describe("resolveAgentWitchLocalAppListenPort", () => {
  const holders: net.Server[] = [];
  const roots: string[] = [];

  afterEach(async () => {
    await Promise.all(
      holders.splice(0).map(
        (server) =>
          new Promise<void>((resolve) => {
            server.close(() => resolve());
          }),
      ),
    );
    for (const root of roots.splice(0)) {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it("prefers a free saved port inside the range", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-listen-"));
    roots.push(root);
    const profileDir = path.join(root, "profile");
    fs.mkdirSync(profileDir, { recursive: true });
    const range = { start: 59100, end: 59115 };
    // Pick a free port in range, persist it, then resolve.
    let free: number | null = null;
    for (let p = range.start; p <= range.end; p += 1) {
      if (await canBindAgentWitchLocalAppPort(p)) {
        free = p;
        break;
      }
    }
    expect(free).not.toBeNull();
    writeAgentWitchLocalAppPortFile(profileDir, free!);
    const resolved = await resolveAgentWitchLocalAppListenPort({
      profileDir,
      range,
    });
    expect(resolved).toEqual({ ok: true, port: free });
    expect(readAgentWitchLocalAppPortsExhausted(profileDir)).toBe(false);
    expect(readAgentWitchLocalAppPortFile(profileDir)).toBe(free);
  });

  it("exhaust → writes portsExhausted marker (Mac portsInUse path)", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-exhaust-"));
    roots.push(root);
    const profileDir = path.join(root, "profile");
    fs.mkdirSync(profileDir, { recursive: true });
    // Use a tiny synthetic range far from production defaults.
    const range = { start: 59200, end: 59203 };
    for (let p = range.start; p <= range.end; p += 1) {
      holders.push(await holdPort(p));
    }
    const resolved = await resolveAgentWitchLocalAppListenPort({
      profileDir,
      range,
    });
    expect(resolved.ok).toBe(false);
    if (!resolved.ok) {
      expect(resolved.reason).toBe(AGENT_WITCH_LOCAL_PORTS_IN_USE_MESSAGE);
    }
    expect(readAgentWitchLocalAppPortsExhausted(profileDir)).toBe(true);
    expect(readAgentWitchLocalAppPortFile(profileDir)).toBeNull();
    const raw = JSON.parse(
      fs.readFileSync(resolveAgentWitchLocalAppPortFilePath(profileDir), "utf8"),
    ) as { portsExhausted?: boolean };
    expect(raw).toEqual({ portsExhausted: true });
  });

  it("success after exhaust clears the marker", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-clear-"));
    roots.push(root);
    const profileDir = path.join(root, "profile");
    fs.mkdirSync(profileDir, { recursive: true });
    const range = { start: 59300, end: 59303 };
    for (let p = range.start; p <= range.end; p += 1) {
      holders.push(await holdPort(p));
    }
    const exhausted = await resolveAgentWitchLocalAppListenPort({
      profileDir,
      range,
    });
    expect(exhausted.ok).toBe(false);
    expect(readAgentWitchLocalAppPortsExhausted(profileDir)).toBe(true);

    // Free one port and re-resolve.
    const freed = holders.pop()!;
    await new Promise<void>((resolve) => freed.close(() => resolve()));
    const recovered = await resolveAgentWitchLocalAppListenPort({
      profileDir,
      range,
    });
    expect(recovered.ok).toBe(true);
    expect(readAgentWitchLocalAppPortsExhausted(profileDir)).toBe(false);
    if (recovered.ok) {
      expect(readAgentWitchLocalAppPortFile(profileDir)).toBe(recovered.port);
    }
  });
});

describe("portsInUse path (exhaust without /health listener)", () => {
  it("documents that Mac reads portsExhausted from local-app-port.json", () => {
    // Contract: when preflight fails, no HTTP server listens, so /health cannot
    // carry portsExhausted. Mac refreshLocalPortRange / probeHealth must read
    // the marker file instead — covered by readAgentWitchLocalAppPortsExhausted
    // above and Swift readLocalAppPortsExhausted.
    expect(AGENT_WITCH_LOCAL_PORTS_IN_USE_MESSAGE).toBe(
      "Ports for this account are in use.",
    );
  });
});
