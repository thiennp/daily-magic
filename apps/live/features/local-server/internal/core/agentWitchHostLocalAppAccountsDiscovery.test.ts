import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  clearInProcessAgentWitchLocalAppAccountRegistryForTests,
  readAgentWitchHostLocalAppAccountsDiscovery,
  readPreferredAgentWitchLocalAppPortHint,
  registerAgentWitchLocalAppAccountListening,
  resolveAgentWitchHostLocalAppAccountsFilePath,
} from "./agentWitchHostLocalAppAccountsDiscovery";
import { listenAgentWitchLocalAppHttpServer } from "./listenAgentWitchLocalAppHttpServer";
import { readAgentWitchLocalAppPortFile } from "./resolveAgentWitchLocalAppListenPort";

const roots: string[] = [];

afterEach(() => {
  clearInProcessAgentWitchLocalAppAccountRegistryForTests();
  for (const root of roots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

const makeInstall = (): {
  readonly installDir: string;
  readonly profileDir: (email: string) => string;
} => {
  const installDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "awl-host-discovery-"),
  );
  roots.push(installDir);
  return {
    installDir,
    profileDir: (email: string) => {
      const dir = path.join(installDir, "profiles", email);
      fs.mkdirSync(dir, { recursive: true });
      return dir;
    },
  };
};

const holdPort = (port: number): Promise<net.Server> =>
  new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });

describe("agentWitchHostLocalAppAccountsDiscovery (Landing A)", () => {
  it("registers two accounts on distinct ports with legacy shims", () => {
    const { installDir, profileDir } = makeInstall();
    const primaryDir = profileDir("primary@example.com");
    const secondaryDir = profileDir("secondary@example.com");

    registerAgentWitchLocalAppAccountListening({
      installDir,
      profileEmail: "primary@example.com",
      profileDir: primaryDir,
      port: 52001,
    });
    registerAgentWitchLocalAppAccountListening({
      installDir,
      profileEmail: "secondary@example.com",
      profileDir: secondaryDir,
      port: 52002,
    });

    const rows = readAgentWitchHostLocalAppAccountsDiscovery(installDir);
    expect(rows).toHaveLength(2);
    expect(rows.map((row) => row.email).sort()).toEqual([
      "primary@example.com",
      "secondary@example.com",
    ]);
    expect(
      rows.find((row) => row.email === "secondary@example.com")?.port,
    ).toBe(52002);
    expect(readAgentWitchLocalAppPortFile(secondaryDir)).toBe(52002);
    expect(
      fs.existsSync(resolveAgentWitchHostLocalAppAccountsFilePath(installDir)),
    ).toBe(true);
  });

  it("rewrites pid on restart so stale discovery is replaced", () => {
    const { installDir, profileDir } = makeInstall();
    const dir = profileDir("user@example.com");
    const stalePath = resolveAgentWitchHostLocalAppAccountsFilePath(installDir);
    fs.writeFileSync(
      stalePath,
      `${JSON.stringify({
        accounts: [
          {
            email: "user@example.com",
            port: 51999,
            pid: 1,
            startedAt: "2020-01-01T00:00:00.000Z",
          },
        ],
      })}\n`,
    );

    registerAgentWitchLocalAppAccountListening({
      installDir,
      profileEmail: "user@example.com",
      profileDir: dir,
      port: 51999,
    });

    const row = readAgentWitchHostLocalAppAccountsDiscovery(installDir)[0];
    expect(row?.pid).toBe(process.pid);
    expect(row?.pid).not.toBe(1);
  });

  it("readPreferredAgentWitchLocalAppPortHint prefers discovery over legacy shim", () => {
    const { installDir, profileDir } = makeInstall();
    const dir = profileDir("user@example.com");
    fs.writeFileSync(
      path.join(dir, "local-app-port.json"),
      `${JSON.stringify({ localAppPort: 60001 })}\n`,
    );
    registerAgentWitchLocalAppAccountListening({
      installDir,
      profileEmail: "user@example.com",
      profileDir: dir,
      port: 60002,
    });

    expect(
      readPreferredAgentWitchLocalAppPortHint({
        installDir,
        profileEmail: "user@example.com",
        profileDir: dir,
      }),
    ).toBe(60002);
  });
});

describe("listenAgentWitchLocalAppHttpServer", () => {
  const servers: net.Server[] = [];

  afterEach(async () => {
    await Promise.all(
      servers.splice(0).map(
        (server) =>
          new Promise<void>((resolve) => {
            server.close(() => resolve());
          }),
      ),
    );
  });

  it("falls back to an OS-assigned port when the preferred port is busy", async () => {
    const preferred = 52123;
    servers.push(await holdPort(preferred));
    const httpServer = http.createServer();
    const bound = await listenAgentWitchLocalAppHttpServer(httpServer, {
      host: "127.0.0.1",
      preferredPort: preferred,
    });

    expect(bound).not.toBe(preferred);
    expect(bound).toBeGreaterThan(0);
    await new Promise<void>((resolve) => {
      httpServer.close(() => resolve());
    });
  });
});
