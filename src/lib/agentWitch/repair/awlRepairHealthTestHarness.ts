import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import os from "node:os";
import path from "node:path";

import { buildAgentWitchRepairScriptHealth } from "@/lib/agentWitch/repair/buildAgentWitchRepairScriptHealth";
import { buildAgentWitchRepairScriptPreamble } from "@/lib/agentWitch/repair/buildAgentWitchRepairScriptPreamble";

/** Test-only harness: runs the repair script's real health helpers against a throwaway HOME. */
const servers: http.Server[] = [];
const homes: string[] = [];

export const cleanupAwlRepairHealthHarness = async (): Promise<void> => {
  await Promise.all(
    servers
      .splice(0)
      .map(
        (server) =>
          new Promise<void>((resolve) => server.close(() => resolve())),
      ),
  );
  for (const home of homes.splice(0)) {
    fs.rmSync(home, { recursive: true, force: true });
  }
};

export const uid =
  typeof process.getuid === "function" ? process.getuid() : 501;

export const startHealthServer = async (
  body: Record<string, unknown> = {
    ok: true,
    osUid: uid,
    installRootName: ".agent-witch",
  },
): Promise<number> => {
  const server = http.createServer((_request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(body));
  });
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  return (server.address() as AddressInfo).port;
};

export const makeHome = (files: {
  readonly port?: number;
  readonly range?: { readonly start: number; readonly end: number };
}): string => {
  const home = fs.realpathSync(
    fs.mkdtempSync(path.join(os.tmpdir(), "awl-repair-home-")),
  );
  homes.push(home);
  const profileDir = path.join(
    home,
    ".agent-witch",
    "profiles",
    "me@example.com",
  );
  fs.mkdirSync(profileDir, { recursive: true });
  if (files.port !== undefined) {
    fs.writeFileSync(
      path.join(profileDir, "local-app-port.json"),
      JSON.stringify({ localAppPort: files.port }),
    );
  }
  if (files.range !== undefined) {
    fs.writeFileSync(
      path.join(profileDir, "local-port-range.json"),
      JSON.stringify(files.range, null, 1),
    );
  }
  return home;
};

/**
 * Legacy fallback port for tests: TCP port 1 is never an AWL, so the probe
 * cannot reach a real AgentWitch Local on the host's 43347 (an AWL running on
 * the dev machine must not turn a DOWN expectation into HEALTHY).
 */
export const CLOSED_LEGACY_HEALTH_PORT = 1;

/** Runs the repair script's real health helpers (preamble + preflight) — async so the test server can answer. */
export const runHelpers = (
  home: string,
  commands: string,
  env: Record<string, string> = {},
  options: { readonly legacyHealthPort?: number } = {},
): Promise<{ readonly status: number | null; readonly stdout: string }> => {
  const script = [
    buildAgentWitchRepairScriptPreamble({
      origin: "https://www.agentwitch.com",
      installDirName: ".agent-witch",
      launchAgentPrefix: "com.agent-witch",
      legacyHealthPort: options.legacyHealthPort ?? CLOSED_LEGACY_HEALTH_PORT,
    }),
    buildAgentWitchRepairScriptHealth(),
    `\n${commands}\n`,
  ].join("");
  return new Promise((resolve) => {
    const childEnv = {
      PATH: process.env.PATH ?? "",
      HOME: home,
      ...env,
    } as unknown as NodeJS.ProcessEnv;
    const child = spawn("bash", ["-s"], { env: childEnv });
    const chunks: Buffer[] = [];
    child.stdout.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });
    child.on("close", (status: number | null) =>
      resolve({ status, stdout: Buffer.concat(chunks).toString("utf8") }),
    );
    child.stdin.end(script);
  });
};
