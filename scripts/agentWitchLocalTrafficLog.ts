import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

const TRAFFIC_LOG_FILE_NAME = "local-ws-traffic.ndjson";
const MAX_TRAFFIC_LOG_ENTRIES = 500;

export type AgentWitchLocalTrafficEntry = {
  readonly at: string;
  readonly direction: "in" | "out" | "local";
  readonly type: string;
  readonly summary: string;
  readonly action?: string;
};

const resolveTrafficLogPath = (layout: AgentWitchLocalLayout): string =>
  path.join(layout.logsDir, TRAFFIC_LOG_FILE_NAME);

export const appendAgentWitchLocalTraffic = (
  layout: AgentWitchLocalLayout,
  entry: Omit<AgentWitchLocalTrafficEntry, "at"> & { readonly at?: string },
): void => {
  const logPath = resolveTrafficLogPath(layout);
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  const line = JSON.stringify({
    at: entry.at ?? new Date().toISOString(),
    direction: entry.direction,
    type: entry.type,
    summary: entry.summary,
    ...(entry.action !== undefined ? { action: entry.action } : {}),
  });
  fs.appendFileSync(logPath, `${line}\n`, "utf8");
};

export const readAgentWitchLocalTraffic = (
  layout: AgentWitchLocalLayout,
  limit: number = MAX_TRAFFIC_LOG_ENTRIES,
): AgentWitchLocalTrafficEntry[] => {
  const logPath = resolveTrafficLogPath(layout);
  if (!fs.existsSync(logPath)) {
    return [];
  }
  const lines = fs.readFileSync(logPath, "utf8").split("\n").filter(Boolean);
  const sliced = lines.slice(-limit);
  const entries: AgentWitchLocalTrafficEntry[] = [];
  for (const line of sliced) {
    try {
      const parsed: unknown = JSON.parse(line);
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "at" in parsed &&
        "direction" in parsed &&
        "type" in parsed &&
        "summary" in parsed
      ) {
        entries.push(parsed as AgentWitchLocalTrafficEntry);
      }
    } catch {
      // skip bad lines
    }
  }
  return entries.reverse();
};

export const clearAgentWitchLocalTraffic = (
  layout: AgentWitchLocalLayout,
): void => {
  const logPath = resolveTrafficLogPath(layout);
  if (fs.existsSync(logPath)) {
    fs.writeFileSync(logPath, "", "utf8");
  }
};
