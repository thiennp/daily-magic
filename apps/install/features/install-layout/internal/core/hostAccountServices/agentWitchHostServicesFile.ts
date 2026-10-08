import fs from "node:fs";
import path from "node:path";

import { sanitizeProfileEmailForDir } from "../resolveAgentWitchLocalLayout";

import { AGENT_WITCH_HOST_SERVICES_FILE_NAME } from "./hostAccountServices.constant";
import type {
  AgentWitchHostServiceAccount,
  AgentWitchHostServicesFile,
} from "./hostAccountServices.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isValidPort = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value > 0 &&
  value <= 65535;

const parseAccount = (value: unknown): AgentWitchHostServiceAccount | null => {
  if (
    !isRecord(value) ||
    !isNonEmptyString(value.email) ||
    !isNonEmptyString(value.launchAgentLabel) ||
    !isNonEmptyString(value.systemdUnitName) ||
    !isValidPort(value.wakePort)
  ) {
    return null;
  }
  return {
    email: sanitizeProfileEmailForDir(value.email),
    launchAgentLabel: value.launchAgentLabel.trim(),
    systemdUnitName: value.systemdUnitName.trim(),
    wakePort: value.wakePort,
  };
};

const readJson = (filePath: string): unknown => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
};

export const resolveAgentWitchHostServicesFilePath = (
  installDir: string,
): string => path.join(installDir, AGENT_WITCH_HOST_SERVICES_FILE_NAME);

/** Null when missing, malformed or without one valid account row. */
export const readAgentWitchHostServices = (
  installDir: string,
): AgentWitchHostServicesFile | null => {
  const parsed = readJson(resolveAgentWitchHostServicesFilePath(installDir));
  if (
    !isRecord(parsed) ||
    parsed.version !== 1 ||
    parsed.mode !== "per-account" ||
    !Array.isArray(parsed.accounts)
  ) {
    return null;
  }
  const accounts = parsed.accounts.flatMap((row: unknown) => {
    const account = parseAccount(row);
    return account === null ? [] : [account];
  });
  if (accounts.length === 0) {
    return null;
  }
  return {
    version: 1,
    mode: "per-account",
    accounts,
    updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
  };
};

/** Atomic write (tmp + rename); accounts sorted by email. */
export const writeAgentWitchHostServices = (
  installDir: string,
  accounts: readonly AgentWitchHostServiceAccount[],
  now: Date = new Date(),
): AgentWitchHostServicesFile => {
  const file: AgentWitchHostServicesFile = {
    version: 1,
    mode: "per-account",
    accounts: [...accounts].sort((a, b) => a.email.localeCompare(b.email)),
    updatedAt: now.toISOString(),
  };
  const filePath = resolveAgentWitchHostServicesFilePath(installDir);
  fs.mkdirSync(installDir, { recursive: true });
  const tmpPath = `${filePath}.${String(process.pid)}.${String(Date.now())}.tmp`;
  fs.writeFileSync(tmpPath, `${JSON.stringify(file, null, 2)}\n`, "utf8");
  fs.renameSync(tmpPath, filePath);
  return file;
};
