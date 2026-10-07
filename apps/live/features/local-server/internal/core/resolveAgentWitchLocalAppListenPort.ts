import fs from "node:fs";
import net from "node:net";
import path from "node:path";

import {
  AGENT_WITCH_LOCAL_APP_PORT_FILE_NAME,
  AGENT_WITCH_LOCAL_PORTS_IN_USE_MESSAGE,
} from "./agentWitchLocalAppPortRange.constants";
import type { AgentWitchLocalAppPortRange } from "./agentWitchLocalAppPortRange.types";
import { isValidAgentWitchLocalAppPort } from "./isValidAgentWitchLocalAppPortRange";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const resolveAgentWitchLocalAppPortFilePath = (
  profileDir: string,
): string => path.join(profileDir, AGENT_WITCH_LOCAL_APP_PORT_FILE_NAME);

export const readAgentWitchLocalAppPortFile = (
  profileDir: string,
): number | null => {
  const filePath = resolveAgentWitchLocalAppPortFilePath(profileDir);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (
      isRecord(parsed) &&
      isValidAgentWitchLocalAppPort(parsed.localAppPort)
    ) {
      return parsed.localAppPort;
    }
  } catch {
    return null;
  }
  return null;
};

/** True when local-app-port.json records a validated portsExhausted marker. */
export const readAgentWitchLocalAppPortsExhausted = (
  profileDir: string,
): boolean => {
  const filePath = resolveAgentWitchLocalAppPortFilePath(profileDir);
  if (!fs.existsSync(filePath)) {
    return false;
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return isRecord(parsed) && parsed.portsExhausted === true;
  } catch {
    return false;
  }
};

export const writeAgentWitchLocalAppPortFile = (
  profileDir: string,
  localAppPort: number,
): void => {
  fs.mkdirSync(profileDir, { recursive: true });
  fs.writeFileSync(
    resolveAgentWitchLocalAppPortFilePath(profileDir),
    `${JSON.stringify({ localAppPort }, null, 2)}\n`,
    "utf8",
  );
};

/**
 * Marker Mac refreshLocalPortRange / probeHealth already understands via
 * portsExhausted on health — and via this file when no listener can start.
 */
export const writeAgentWitchLocalAppPortsExhaustedFile = (
  profileDir: string,
): void => {
  fs.mkdirSync(profileDir, { recursive: true });
  fs.writeFileSync(
    resolveAgentWitchLocalAppPortFilePath(profileDir),
    `${JSON.stringify({ portsExhausted: true }, null, 2)}\n`,
    "utf8",
  );
};

export const canBindAgentWitchLocalAppPort = (
  port: number,
  host = "127.0.0.1",
): Promise<boolean> =>
  new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => {
      resolve(false);
    });
    server.listen(port, host, () => {
      server.close(() => resolve(true));
    });
  });

export type ResolveLocalAppListenPortResult =
  | { readonly ok: true; readonly port: number }
  | { readonly ok: false; readonly reason: typeof AGENT_WITCH_LOCAL_PORTS_IN_USE_MESSAGE };

/**
 * Prefer the previously bound port when still free and inside the range;
 * otherwise the first free port in the account range.
 * On exhaustion writes local-app-port.json `{ portsExhausted: true }` so Mac
 * can set portsInUse without needing a live /health listener.
 */
export const resolveAgentWitchLocalAppListenPort = async (input: {
  readonly profileDir: string;
  readonly range: AgentWitchLocalAppPortRange;
}): Promise<ResolveLocalAppListenPortResult> => {
  const saved = readAgentWitchLocalAppPortFile(input.profileDir);
  if (
    saved !== null &&
    saved >= input.range.start &&
    saved <= input.range.end &&
    (await canBindAgentWitchLocalAppPort(saved))
  ) {
    writeAgentWitchLocalAppPortFile(input.profileDir, saved);
    return { ok: true, port: saved };
  }

  for (let port = input.range.start; port <= input.range.end; port += 1) {
    if (await canBindAgentWitchLocalAppPort(port)) {
      writeAgentWitchLocalAppPortFile(input.profileDir, port);
      return { ok: true, port };
    }
  }

  writeAgentWitchLocalAppPortsExhaustedFile(input.profileDir);
  return { ok: false, reason: AGENT_WITCH_LOCAL_PORTS_IN_USE_MESSAGE };
};
