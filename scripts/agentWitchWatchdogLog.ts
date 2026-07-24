import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import type { AgentWitchReviveTargetResult } from "./agentWitchRevive.types";
import {
  resolveAgentWitchInstallDir,
  resolveAgentWitchLocalLayout,
  resolveAgentWitchLogsDir,
} from "./resolveAgentWitchLocalLayout";

export const AGENT_WITCH_WATCHDOG_LOG_FILE_NAME = "watchdog-log.ndjson";

export const AGENT_WITCH_WATCHDOG_LOG_MAX_ENTRIES = 200;

export type AgentWitchWatchdogLogEvent =
  | "check_complete"
  | "revive_triggered"
  | "revive_failed"
  | "reinstall_triggered"
  | "reinstall_failed";

export interface AgentWitchWatchdogLogEntry {
  readonly id: string;
  readonly recordedAt: string;
  readonly event: AgentWitchWatchdogLogEvent;
  readonly ok: boolean;
  readonly message: string;
  readonly targets: readonly AgentWitchReviveTargetResult[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const resolveAgentWitchWatchdogLogPath = (
  installDir: string = resolveAgentWitchInstallDir(),
): string => {
  const layout = resolveAgentWitchLocalLayout();
  const logsDir =
    layout.installDir === installDir
      ? layout.logsDir
      : resolveAgentWitchLogsDir({
          installDir,
          profileEmail: layout.profileEmail,
        });

  return path.join(logsDir, AGENT_WITCH_WATCHDOG_LOG_FILE_NAME);
};

const parseWatchdogLogLine = (
  line: string,
): AgentWitchWatchdogLogEntry | null => {
  const trimmedLine = line.trim();
  if (trimmedLine.length === 0) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(trimmedLine);
    if (!isRecord(parsed)) {
      return null;
    }

    if (
      typeof parsed.id !== "string" ||
      typeof parsed.recordedAt !== "string" ||
      typeof parsed.event !== "string" ||
      typeof parsed.ok !== "boolean" ||
      typeof parsed.message !== "string" ||
      !Array.isArray(parsed.targets)
    ) {
      return null;
    }

    return {
      id: parsed.id,
      recordedAt: parsed.recordedAt,
      event: parsed.event as AgentWitchWatchdogLogEvent,
      ok: parsed.ok,
      message: parsed.message,
      targets: parsed.targets as AgentWitchReviveTargetResult[],
    };
  } catch {
    return null;
  }
};

export const appendAgentWitchWatchdogLog = (
  input: Omit<AgentWitchWatchdogLogEntry, "id" | "recordedAt"> & {
    readonly recordedAt?: string;
  },
  installDir: string = resolveAgentWitchInstallDir(),
): AgentWitchWatchdogLogEntry => {
  const entry: AgentWitchWatchdogLogEntry = {
    id: randomUUID(),
    recordedAt: input.recordedAt ?? new Date().toISOString(),
    event: input.event,
    ok: input.ok,
    message: input.message,
    targets: input.targets,
  };

  const logPath = resolveAgentWitchWatchdogLogPath(installDir);
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
        existingLines.length - AGENT_WITCH_WATCHDOG_LOG_MAX_ENTRIES + 1,
      ),
    ),
    JSON.stringify(entry),
  ];

  fs.writeFileSync(logPath, `${nextLines.join("\n")}\n`, "utf8");
  return entry;
};

export const readAgentWitchWatchdogLogs = (
  limit: number = 20,
  installDir: string = resolveAgentWitchInstallDir(),
): readonly AgentWitchWatchdogLogEntry[] => {
  const logPath = resolveAgentWitchWatchdogLogPath(installDir);
  if (!fs.existsSync(logPath)) {
    return [];
  }

  const parsedEntries = fs
    .readFileSync(logPath, "utf8")
    .split("\n")
    .flatMap((line) => {
      const entry = parseWatchdogLogLine(line);
      return entry === null ? [] : [entry];
    });

  return parsedEntries.slice(Math.max(0, parsedEntries.length - limit));
};
