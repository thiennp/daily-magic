import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_CONNECTION_HEALTH_FILE_NAME,
  type AgentWitchConnectionHealth,
} from "./agentWitchConnectionHealth.constants";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const resolveAgentWitchConnectionHealthPath = (
  layout: AgentWitchLocalLayout,
): string => {
  if (layout.profileEmail === null) {
    return path.join(
      layout.installDir,
      AGENT_WITCH_CONNECTION_HEALTH_FILE_NAME,
    );
  }

  return path.join(
    layout.installDir,
    "profiles",
    layout.profileEmail,
    AGENT_WITCH_CONNECTION_HEALTH_FILE_NAME,
  );
};

export const readAgentWitchConnectionHealth = (
  layout: AgentWitchLocalLayout,
): AgentWitchConnectionHealth | null => {
  const healthPath = resolveAgentWitchConnectionHealthPath(layout);
  if (!fs.existsSync(healthPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(healthPath, "utf8"));
    if (!isRecord(parsed) || typeof parsed.lastAckAt !== "string") {
      return null;
    }

    return {
      lastAckAt: parsed.lastAckAt,
      wsUrl: typeof parsed.wsUrl === "string" ? parsed.wsUrl : null,
      connectedAt:
        typeof parsed.connectedAt === "string" ? parsed.connectedAt : null,
    };
  } catch {
    return null;
  }
};

export const writeAgentWitchConnectionHealth = (
  layout: AgentWitchLocalLayout,
  input: {
    readonly wsUrl: string;
    readonly connectedAt?: string | null;
  },
): void => {
  const healthPath = resolveAgentWitchConnectionHealthPath(layout);
  const existing = readAgentWitchConnectionHealth(layout);
  const nowIso = new Date().toISOString();
  const payload: AgentWitchConnectionHealth = {
    lastAckAt: nowIso,
    wsUrl: input.wsUrl,
    connectedAt: input.connectedAt ?? existing?.connectedAt ?? nowIso,
  };

  fs.mkdirSync(path.dirname(healthPath), { recursive: true });
  fs.writeFileSync(healthPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
};

export const isAgentWitchConnectionHealthStale = (
  health: AgentWitchConnectionHealth | null,
  staleAfterMs: number,
  nowMs: number = Date.now(),
): boolean => {
  if (health === null) {
    return true;
  }

  const lastAckMs = Date.parse(health.lastAckAt);
  if (Number.isNaN(lastAckMs)) {
    return true;
  }

  return nowMs - lastAckMs > staleAfterMs;
};
