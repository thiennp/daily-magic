import fs from "node:fs";
import path from "node:path";

import { AGENT_WITCH_HOST_LOCAL_APP_ACCOUNTS_FILE_NAME } from "./agentWitchHostLocalAppAccountsDiscovery.constant";
import type {
  AgentWitchHostLocalAppAccountDiscoveryRow,
  AgentWitchHostLocalAppAccountsDiscoveryFile,
} from "./agentWitchHostLocalAppAccountsDiscovery.type";
import {
  readAgentWitchLocalAppPortFile,
  writeAgentWitchLocalAppPortFile,
} from "./resolveAgentWitchLocalAppListenPort";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isValidPort = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value > 0 &&
  value <= 65535;

const isValidEmail = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const parseDiscoveryRow = (
  value: unknown,
): AgentWitchHostLocalAppAccountDiscoveryRow | null => {
  if (!isRecord(value)) {
    return null;
  }
  if (
    !isValidEmail(value.email) ||
    !isValidPort(value.port) ||
    typeof value.pid !== "number" ||
    !Number.isInteger(value.pid) ||
    value.pid <= 0 ||
    typeof value.startedAt !== "string" ||
    value.startedAt.length === 0
  ) {
    return null;
  }
  return {
    email: value.email.trim(),
    port: value.port,
    pid: value.pid,
    startedAt: value.startedAt,
  };
};

export const resolveAgentWitchHostLocalAppAccountsFilePath = (
  installDir: string,
): string =>
  path.join(installDir, AGENT_WITCH_HOST_LOCAL_APP_ACCOUNTS_FILE_NAME);

const atomicWriteJson = (filePath: string, payload: unknown): void => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmpPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.renameSync(tmpPath, filePath);
};

/** In-process registry so monolith can merge rows before each atomic write. */
const inProcessAccountRows = new Map<
  string,
  AgentWitchHostLocalAppAccountDiscoveryRow
>();

export const readAgentWitchHostLocalAppAccountsDiscovery = (
  installDir: string,
): readonly AgentWitchHostLocalAppAccountDiscoveryRow[] => {
  const filePath = resolveAgentWitchHostLocalAppAccountsFilePath(installDir);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!isRecord(parsed) || !Array.isArray(parsed.accounts)) {
      return [];
    }
    return parsed.accounts.flatMap((row) => {
      const parsedRow = parseDiscoveryRow(row);
      return parsedRow === null ? [] : [parsedRow];
    });
  } catch {
    return [];
  }
};

export const writeAgentWitchHostLocalAppAccountsDiscovery = (
  installDir: string,
  accounts: readonly AgentWitchHostLocalAppAccountDiscoveryRow[],
): void => {
  const sorted = [...accounts].sort((a, b) => a.email.localeCompare(b.email));
  const payload: AgentWitchHostLocalAppAccountsDiscoveryFile = {
    accounts: sorted,
  };
  atomicWriteJson(
    resolveAgentWitchHostLocalAppAccountsFilePath(installDir),
    payload,
  );
};

/** Hint for the next bind only — never treated as authoritative while listening. */
export const readPreferredAgentWitchLocalAppPortHint = (input: {
  readonly installDir: string;
  readonly profileEmail: string;
  readonly profileDir: string;
}): number | null => {
  const fromDiscovery = readAgentWitchHostLocalAppAccountsDiscovery(
    input.installDir,
  ).find((row) => row.email === input.profileEmail);
  if (fromDiscovery !== undefined) {
    return fromDiscovery.port;
  }
  return readAgentWitchLocalAppPortFile(input.profileDir);
};

export const registerAgentWitchLocalAppAccountListening = (input: {
  readonly installDir: string;
  readonly profileEmail: string;
  readonly profileDir: string;
  readonly port: number;
}): void => {
  if (!isValidPort(input.port) || !isValidEmail(input.profileEmail)) {
    throw new Error("Invalid local app account discovery row");
  }
  const row: AgentWitchHostLocalAppAccountDiscoveryRow = {
    email: input.profileEmail.trim(),
    port: input.port,
    pid: process.pid,
    startedAt: new Date().toISOString(),
  };
  inProcessAccountRows.set(row.email, row);
  writeAgentWitchHostLocalAppAccountsDiscovery(input.installDir, [
    ...inProcessAccountRows.values(),
  ]);
  writeAgentWitchLocalAppPortFile(input.profileDir, input.port);
};

export const clearInProcessAgentWitchLocalAppAccountRegistryForTests =
  (): void => {
    inProcessAccountRows.clear();
  };
