import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { resolveAgentWitchInstallDir } from "./resolveAgentWitchLocalLayout";

export const AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME = "self-update-log.ndjson";

export const AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES = 100;

export type AgentWitchSelfUpdateLogEvent =
  "check_complete" | "update_applied" | "update_failed";

export interface AgentWitchSelfUpdateLogEntry {
  readonly id: string;
  readonly recordedAt: string;
  readonly event: AgentWitchSelfUpdateLogEvent;
  readonly ok: boolean;
  readonly message: string;
  readonly localBundleVersion: string | null;
  readonly remoteBundleVersion: string | null;
}

export const resolveAgentWitchSelfUpdateLogPath = (
  installDir: string = resolveAgentWitchInstallDir(),
): string => path.join(installDir, AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME);

export const appendAgentWitchSelfUpdateLog = (
  input: Omit<AgentWitchSelfUpdateLogEntry, "id" | "recordedAt"> & {
    readonly recordedAt?: string;
  },
  installDir: string = resolveAgentWitchInstallDir(),
): AgentWitchSelfUpdateLogEntry => {
  const entry: AgentWitchSelfUpdateLogEntry = {
    id: randomUUID(),
    recordedAt: input.recordedAt ?? new Date().toISOString(),
    event: input.event,
    ok: input.ok,
    message: input.message,
    localBundleVersion: input.localBundleVersion,
    remoteBundleVersion: input.remoteBundleVersion,
  };

  const logPath = resolveAgentWitchSelfUpdateLogPath(installDir);
  fs.mkdirSync(path.dirname(logPath), { recursive: true });

  const existingLines = fs.existsSync(logPath)
    ? fs
        .readFileSync(logPath, "utf8")
        .split("\n")
        .filter((line) => line.trim().length > 0)
    : [];

  const nextLines = [
    ...existingLines.slice(
      Math.max(
        0,
        existingLines.length - AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES + 1,
      ),
    ),
    JSON.stringify(entry),
  ];

  fs.writeFileSync(logPath, `${nextLines.join("\n")}\n`, "utf8");
  return entry;
};

export const readAgentWitchSelfUpdateLogs = (
  limit: number = 20,
  installDir: string = resolveAgentWitchInstallDir(),
): readonly AgentWitchSelfUpdateLogEntry[] => {
  const logPath = resolveAgentWitchSelfUpdateLogPath(installDir);
  if (!fs.existsSync(logPath)) {
    return [];
  }

  const parsedEntries = fs
    .readFileSync(logPath, "utf8")
    .split("\n")
    .flatMap((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.length === 0) {
        return [];
      }

      try {
        return [JSON.parse(trimmedLine) as AgentWitchSelfUpdateLogEntry];
      } catch {
        return [];
      }
    });

  return parsedEntries.slice(Math.max(0, parsedEntries.length - limit));
};
