import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { resolveAgentWitchConnectionHealthPath } from "./agentWitchConnectionHealth";
import type { AgentWitchDisconnectKind } from "./agentWitchDisconnect";

export const AGENT_WITCH_LAST_DISCONNECT_FILE_NAME = "last-disconnect.json";

/** Why the cloud link is down; surfaced by `/watchdog/status` and AWL. */
export interface AgentWitchLastDisconnect {
  readonly at: string;
  readonly kind: AgentWitchDisconnectKind;
  readonly code: number | null;
  readonly message: string;
  readonly attemptCount: number;
  readonly nextRetryAt: string | null;
}

const DISCONNECT_KINDS: ReadonlySet<string> = new Set([
  "server_down",
  "dns",
  "device_not_linked",
  "closed_before_ack",
  "unknown",
]);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const resolveAgentWitchLastDisconnectPath = (
  layout: AgentWitchLocalLayout,
): string =>
  path.join(
    path.dirname(resolveAgentWitchConnectionHealthPath(layout)),
    AGENT_WITCH_LAST_DISCONNECT_FILE_NAME,
  );

export const readAgentWitchLastDisconnect = (
  layout: AgentWitchLocalLayout,
): AgentWitchLastDisconnect | null => {
  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(resolveAgentWitchLastDisconnectPath(layout), "utf8"),
    );
    if (
      !isRecord(parsed) ||
      typeof parsed.at !== "string" ||
      typeof parsed.kind !== "string" ||
      !DISCONNECT_KINDS.has(parsed.kind)
    ) {
      return null;
    }
    return {
      at: parsed.at,
      kind: parsed.kind as AgentWitchDisconnectKind,
      code: typeof parsed.code === "number" ? parsed.code : null,
      message: typeof parsed.message === "string" ? parsed.message : "",
      attemptCount:
        typeof parsed.attemptCount === "number" ? parsed.attemptCount : 0,
      nextRetryAt:
        typeof parsed.nextRetryAt === "string" ? parsed.nextRetryAt : null,
    };
  } catch {
    return null;
  }
};

export const writeAgentWitchLastDisconnect = (
  layout: AgentWitchLocalLayout,
  entry: AgentWitchLastDisconnect,
): void => {
  try {
    const filePath = resolveAgentWitchLastDisconnectPath(layout);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, `${JSON.stringify(entry, null, 2)}\n`, "utf8");
  } catch {
    // Diagnostics only: never break reconnecting over a write failure.
  }
};

export const clearAgentWitchLastDisconnect = (
  layout: AgentWitchLocalLayout,
): void => {
  fs.rmSync(resolveAgentWitchLastDisconnectPath(layout), { force: true });
};
