import os from "node:os";

import { isAgentWitchWakeServerAllowedOrigin } from "./agentWitchWakeAllowedOrigins";
import { resolveAgentWitchWakePort } from "./agentWitchWakeConstants";
import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";
import { linkAgentWitchAccountLocally } from "./linkAgentWitchAccountLocally";
import { spawnAgentWitchClient } from "./spawnAgentWitchClient";
import { buildAgentWitchWatchdogStatusResponse } from "./buildAgentWitchWatchdogStatus";
import {
  readAgentWitchWatchdogLogs,
  type AgentWitchWatchdogLogEntry,
} from "./agentWitchWatchdogLog";
import {
  reviveAgentWitchWebSocket,
  type AgentWitchReviveResult,
} from "./reviveAgentWitchWebSocket";
import type { AgentWitchWatchdogStatusResponse } from "./buildAgentWitchWatchdogStatus";

export interface AgentWitchWakeHealthResponse {
  readonly ok: true;
  readonly port: number;
  readonly hostname: string;
  readonly profileCount: number;
}

export interface AgentWitchWakeIdentityResponse {
  readonly hostname: string;
  readonly port: number;
  readonly profiles: readonly {
    readonly email: string | null;
    readonly launchAgentLabel: string;
  }[];
}

export interface AgentWitchWakeKickResult {
  readonly launchAgentLabel: string;
  readonly profileEmail: string | null;
  readonly ok: boolean;
  readonly errorMessage?: string;
}

export interface AgentWitchWakeResponse {
  readonly ok: boolean;
  readonly kicked: readonly AgentWitchWakeKickResult[];
}

export interface AgentWitchLinkAccountWakeResponse {
  readonly ok: boolean;
  readonly email?: string;
  readonly errorMessage?: string;
}

export type {
  AgentWitchWatchdogLogEntry,
  AgentWitchWatchdogStatusResponse,
  AgentWitchReviveResult,
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const linkAgentWitchAccountFromWakeServer = async (
  body: unknown,
): Promise<AgentWitchLinkAccountWakeResponse> => {
  if (!isRecord(body)) {
    return { ok: false, errorMessage: "Request body must be a JSON object." };
  }

  const linkToken =
    typeof body.linkToken === "string" ? body.linkToken.trim() : "";
  const appOrigin =
    typeof body.appOrigin === "string" ? body.appOrigin.trim() : "";
  const profileEmail =
    typeof body.profileEmail === "string" ? body.profileEmail.trim() : "";

  if (
    linkToken.length === 0 ||
    appOrigin.length === 0 ||
    profileEmail.length === 0
  ) {
    return {
      ok: false,
      errorMessage: "linkToken, appOrigin, and profileEmail are required.",
    };
  }

  if (!isAgentWitchWakeServerAllowedOrigin(appOrigin)) {
    return {
      ok: false,
      errorMessage: "appOrigin is not an allowed Agent Witch site.",
    };
  }

  return linkAgentWitchAccountLocally({ linkToken, appOrigin, profileEmail });
};

export const buildAgentWitchWakeHealthResponse =
  (): AgentWitchWakeHealthResponse => {
    const targets = listAgentWitchLaunchTargets();
    return {
      ok: true,
      port: resolveAgentWitchWakePort(),
      hostname: os.hostname(),
      profileCount: targets.length,
    };
  };

export const buildAgentWitchWakeIdentityResponse =
  (): AgentWitchWakeIdentityResponse => {
    const targets = listAgentWitchLaunchTargets();
    return {
      hostname: os.hostname(),
      port: resolveAgentWitchWakePort(),
      profiles: targets.map((target) => ({
        email: target.profileEmail,
        launchAgentLabel: target.launchAgentLabel,
      })),
    };
  };

export const wakeAgentWitchLaunchAgents =
  async (): Promise<AgentWitchWakeResponse> => {
    const targets = listAgentWitchLaunchTargets();
    const kicked: AgentWitchWakeKickResult[] = [];

    for (const target of targets) {
      const result = await kickstartAgentWitchLaunchAgent(
        target.launchAgentLabel,
      );
      kicked.push({
        launchAgentLabel: target.launchAgentLabel,
        profileEmail: target.profileEmail,
        ok: result.ok,
        ...(result.errorMessage !== undefined
          ? { errorMessage: result.errorMessage }
          : {}),
      });
    }

    if (!kicked.some((entry) => entry.ok)) {
      const spawned = spawnAgentWitchClient();
      kicked.push({
        launchAgentLabel: "direct-spawn",
        profileEmail: null,
        ok: spawned.ok,
        ...(spawned.errorMessage !== undefined
          ? { errorMessage: spawned.errorMessage }
          : {}),
      });
    }

    return {
      ok: kicked.some((entry) => entry.ok),
      kicked,
    };
  };

export const readAgentWitchWatchdogLogEntries = (
  limit: number = 20,
): readonly AgentWitchWatchdogLogEntry[] => readAgentWitchWatchdogLogs(limit);

export const buildAgentWitchWatchdogStatus =
  buildAgentWitchWatchdogStatusResponse;

export const reviveAgentWitchWebSocketFromWakeServer =
  reviveAgentWitchWebSocket;
