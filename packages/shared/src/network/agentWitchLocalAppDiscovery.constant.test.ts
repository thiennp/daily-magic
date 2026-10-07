import { execFile } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

import {
  AGENT_WITCH_LOCAL_APP_PORT_DISCOVERY_SENTENCE,
  buildAgentWitchLocalHealthCheckCommand,
} from "./agentWitchLocalAppDiscovery.constant";

const run = promisify(execFile);
const cleanups: Array<() => void> = [];

afterEach(() => {
  cleanups.splice(0).forEach((cleanup) => cleanup());
});

const startHealthServer = async (): Promise<number> => {
  const server = http.createServer((_request, response) => {
    response.end('{"ok":true}');
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  cleanups.push(() => server.close());
  return (server.address() as AddressInfo).port;
};

const homeWithSavedPort = (installDirName: string, port: number): string => {
  const home = mkdtempSync(join(tmpdir(), "awl-df033-"));
  cleanups.push(() => rmSync(home, { recursive: true, force: true }));
  const profile = join(home, installDirName, "profiles", "a@example.com");
  mkdirSync(profile, { recursive: true });
  writeFileSync(
    join(profile, "local-app-port.json"),
    `{"localAppPort": ${port}}\n`,
  );
  return home;
};

describe("buildAgentWitchLocalHealthCheckCommand (DF-033)", () => {
  it("never hard-codes the legacy 43347 port", () => {
    expect(buildAgentWitchLocalHealthCheckCommand()).not.toContain("43347");
    expect(AGENT_WITCH_LOCAL_APP_PORT_DISCOVERY_SENTENCE).not.toContain(
      "43347",
    );
    expect(AGENT_WITCH_LOCAL_APP_PORT_DISCOVERY_SENTENCE).toContain(
      "local-app-port.json",
    );
  });

  it.each([".agent-witch", ".local-agent-witch"])(
    "reaches /health on the port saved under ~/%s",
    async (installDirName) => {
      const port = await startHealthServer();
      const home = homeWithSavedPort(installDirName, port);
      const { stdout } = await run(
        "bash",
        ["-c", buildAgentWitchLocalHealthCheckCommand(installDirName)],
        { env: { ...process.env, HOME: home }, timeout: 10_000 },
      );
      expect(stdout).toBe('{"ok":true}');
    },
  );
});
