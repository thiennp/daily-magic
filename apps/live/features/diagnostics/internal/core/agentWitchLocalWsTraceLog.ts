import fs from "node:fs";
import path from "node:path";

import type { AgentWitchTraceFormatError } from "./classifyAgentWitchTraceMessage";
import {
  classifyAgentWitchTraceMessageFromObject,
  classifyAgentWitchTraceMessageFromRaw,
} from "./classifyAgentWitchTraceMessage";
import { redactAgentWitchTraceBody } from "./redactAgentWitchTraceBody";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

const TRACE_LOG_FILE_NAME = "local-ws-trace.ndjson";
const MAX_TRACE_LOG_ENTRIES = 10_000;
const TRACE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

export type AgentWitchLocalWsTraceDirection = "in" | "out" | "local";

export type AgentWitchLocalWsTraceEntry = {
  readonly at: string;
  readonly direction: AgentWitchLocalWsTraceDirection;
  readonly kind: "ws_message" | "ws_error" | "ws_close" | "crash";
  readonly command: string;
  readonly type: string;
  readonly requestId: string | null;
  readonly formatOk: boolean;
  readonly formatError: AgentWitchTraceFormatError | null;
  readonly body: unknown;
};

const resolveTraceLogPath = (layout: AgentWitchLocalLayout): string =>
  path.join(layout.logsDir, TRACE_LOG_FILE_NAME);

const parseTraceLine = (line: string): AgentWitchLocalWsTraceEntry | null => {
  try {
    const parsed: unknown = JSON.parse(line);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("at" in parsed) ||
      !("direction" in parsed) ||
      !("command" in parsed)
    ) {
      return null;
    }
    return parsed as AgentWitchLocalWsTraceEntry;
  } catch {
    return null;
  }
};

const pruneTraceFile = (logPath: string): void => {
  if (!fs.existsSync(logPath)) {
    return;
  }

  const lines = fs.readFileSync(logPath, "utf8").split("\n").filter(Boolean);
  const cutoffMs = Date.now() - TRACE_MAX_AGE_MS;
  const kept = lines.filter((line) => {
    const entry = parseTraceLine(line);
    if (entry === null) {
      return false;
    }
    const atMs = Date.parse(entry.at);
    return Number.isFinite(atMs) && atMs >= cutoffMs;
  });
  const trimmed = kept.slice(-MAX_TRACE_LOG_ENTRIES);
  fs.writeFileSync(
    logPath,
    trimmed.length > 0 ? `${trimmed.join("\n")}\n` : "",
    "utf8",
  );
};

const appendTraceLine = (
  layout: AgentWitchLocalLayout,
  entry: AgentWitchLocalWsTraceEntry,
): void => {
  const logPath = resolveTraceLogPath(layout);
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, `${JSON.stringify(entry)}\n`, "utf8");
  pruneTraceFile(logPath);
};

const buildBodyFromClassification = (
  classification: ReturnType<typeof classifyAgentWitchTraceMessageFromObject>,
): unknown => {
  if (classification.parsed === null) {
    return { _empty: true };
  }

  return redactAgentWitchTraceBody(classification.parsed);
};

export const recordAgentWitchWsTraceFromObject = (
  layout: AgentWitchLocalLayout,
  direction: AgentWitchLocalWsTraceDirection,
  message: Record<string, unknown>,
): void => {
  const classification = classifyAgentWitchTraceMessageFromObject(message);
  appendTraceLine(layout, {
    at: new Date().toISOString(),
    direction,
    kind: "ws_message",
    command: classification.command,
    type: classification.type,
    requestId: classification.requestId,
    formatOk: classification.formatOk,
    formatError: classification.formatError,
    body: buildBodyFromClassification(classification),
  });
};

export const recordAgentWitchWsTraceFromRaw = (
  layout: AgentWitchLocalLayout,
  direction: AgentWitchLocalWsTraceDirection,
  raw: string,
): void => {
  const classification = classifyAgentWitchTraceMessageFromRaw(raw);
  const body =
    classification.parsed === null
      ? { _rawPreview: classification.rawPreview }
      : redactAgentWitchTraceBody(classification.parsed);

  appendTraceLine(layout, {
    at: new Date().toISOString(),
    direction,
    kind: "ws_message",
    command: classification.command,
    type: classification.type,
    requestId: classification.requestId,
    formatOk: classification.formatOk,
    formatError: classification.formatError,
    body,
  });
};

export const recordAgentWitchLocalTraceEvent = (
  layout: AgentWitchLocalLayout,
  input: {
    readonly kind: "ws_error" | "ws_close" | "crash";
    readonly message: string;
    readonly stack?: string;
    readonly code?: number;
    readonly reason?: string;
  },
): void => {
  appendTraceLine(layout, {
    at: new Date().toISOString(),
    direction: "local",
    kind: input.kind,
    command: input.kind,
    type: input.kind,
    requestId: null,
    formatOk: true,
    formatError: null,
    body: redactAgentWitchTraceBody({
      message: input.message,
      ...(input.stack !== undefined ? { stack: input.stack } : {}),
      ...(input.code !== undefined ? { code: input.code } : {}),
      ...(input.reason !== undefined ? { reason: input.reason } : {}),
    }),
  });
};

export const readAgentWitchLocalWsTrace = (
  layout: AgentWitchLocalLayout,
  limit: number = 80,
): AgentWitchLocalWsTraceEntry[] => {
  const logPath = resolveTraceLogPath(layout);
  pruneTraceFile(logPath);
  if (!fs.existsSync(logPath)) {
    return [];
  }

  const lines = fs.readFileSync(logPath, "utf8").split("\n").filter(Boolean);
  const entries: AgentWitchLocalWsTraceEntry[] = [];
  for (const line of lines.slice(-limit)) {
    const entry = parseTraceLine(line);
    if (entry !== null) {
      entries.push(entry);
    }
  }
  return entries.reverse();
};

export const clearAgentWitchLocalWsTrace = (
  layout: AgentWitchLocalLayout,
): void => {
  const logPath = resolveTraceLogPath(layout);
  if (fs.existsSync(logPath)) {
    fs.writeFileSync(logPath, "", "utf8");
  }
};
