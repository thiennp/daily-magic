import { applyAutomationSyncLocally } from "./applyAutomationSyncLocally";
import { runLocalScheduledAutomationById } from "./agentWitchLocalAutomationRunner";
import { readLocalAutomationStore } from "./agentWitchLocalAutomationStore";
import { readAgentWitchRunConfig } from "./readAgentWitchRunConfig";
import os from "node:os";

import { isAgentWitchWakeServerAllowedOrigin } from "./agentWitchWakeAllowedOrigins";
import { resolveAgentWitchWakePort } from "./agentWitchWakeConstants";
import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";
import { parseHarnessInstallBundle } from "./parseHarnessInstallBundle";
import { applyHarnessInstallLocally } from "./applyHarnessInstallLocally";
import { linkAgentWitchAccountLocally } from "./linkAgentWitchAccountLocally";
import { spawnAgentWitchClient } from "./spawnAgentWitchClient";
import { buildAgentWitchWatchdogStatusResponse } from "./buildAgentWitchWatchdogStatus";
import type { AgentWitchWatchdogStatusResponse } from "./buildAgentWitchWatchdogStatus";
import {
  readAgentWitchWatchdogLogs,
  type AgentWitchWatchdogLogEntry,
} from "./agentWitchWatchdogLog";
import {
  buildAgentWitchSelfUpdateStatus,
  runAgentWitchSelfUpdate,
} from "./agentWitchSelfUpdate";
import { readAgentWitchSelfUpdateLogs } from "./agentWitchSelfUpdateLog";
import {
  reviveAgentWitchWebSocket,
  type AgentWitchReviveResult,
} from "./reviveAgentWitchWebSocket";

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

export interface AgentWitchHarnessInstallWakeResponse {
  readonly ok: boolean;
  readonly writtenItemCount?: number;
  readonly errorMessage?: string;
}

export interface AgentWitchAutomationSyncWakeResponse {
  readonly ok: boolean;
  readonly writtenCount?: number;
  readonly errorMessage?: string;
}

export interface AgentWitchAutomationRunWakeResponse {
  readonly ok: boolean;
  readonly errorMessage?: string;
}

export interface AgentWitchAutomationStatusWakeResponse {
  readonly ok: true;
  readonly hostname: string;
  readonly automationCount: number;
  readonly enabledCount: number;
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

export const installHarnessFromWakeServer = (
  body: unknown,
): AgentWitchHarnessInstallWakeResponse => {
  if (!isRecord(body)) {
    return { ok: false, errorMessage: "Request body must be a JSON object." };
  }

  const appOrigin =
    typeof body.appOrigin === "string" ? body.appOrigin.trim() : "";
  const profileEmail =
    typeof body.profileEmail === "string" ? body.profileEmail.trim() : "";
  const bundle = parseHarnessInstallBundle(body.bundle);

  if (appOrigin.length === 0) {
    return { ok: false, errorMessage: "appOrigin is required." };
  }

  if (!isAgentWitchWakeServerAllowedOrigin(appOrigin)) {
    return {
      ok: false,
      errorMessage: "appOrigin is not an allowed Agent Witch site.",
    };
  }

  if (bundle === null) {
    return {
      ok: false,
      errorMessage: "bundle.name, bundle.slug, and bundle.items are required.",
    };
  }

  const result = applyHarnessInstallLocally({
    bundle,
    ...(profileEmail.length > 0 ? { profileEmail } : {}),
  });

  if (!result.ok) {
    return {
      ok: false,
      errorMessage: result.errorMessage ?? "Harness install failed.",
    };
  }

  return {
    ok: true,
    writtenItemCount: result.writtenItemCount,
  };
};

export const syncAutomationsFromWakeServer = (
  body: unknown,
): AgentWitchAutomationSyncWakeResponse => {
  if (!isRecord(body)) {
    return { ok: false, errorMessage: "Request body must be a JSON object." };
  }

  const appOrigin =
    typeof body.appOrigin === "string" ? body.appOrigin.trim() : "";
  const profileEmail =
    typeof body.profileEmail === "string" ? body.profileEmail.trim() : "";
  const automations = Array.isArray(body.automations) ? body.automations : null;

  if (appOrigin.length === 0) {
    return { ok: false, errorMessage: "appOrigin is required." };
  }

  if (!isAgentWitchWakeServerAllowedOrigin(appOrigin)) {
    return {
      ok: false,
      errorMessage: "appOrigin is not an allowed Agent Witch site.",
    };
  }

  if (automations === null) {
    return { ok: false, errorMessage: "automations must be an array." };
  }

  const result = applyAutomationSyncLocally({
    automations,
    ...(profileEmail.length > 0 ? { profileEmail } : {}),
  });

  if (!result.ok) {
    return {
      ok: false,
      errorMessage: result.errorMessage ?? "Automation sync failed.",
    };
  }

  return { ok: true, writtenCount: result.writtenCount };
};

export const runAutomationFromWakeServer = async (
  body: unknown,
): Promise<AgentWitchAutomationRunWakeResponse> => {
  if (!isRecord(body)) {
    return { ok: false, errorMessage: "Request body must be a JSON object." };
  }

  const appOrigin =
    typeof body.appOrigin === "string" ? body.appOrigin.trim() : "";
  const automationId =
    typeof body.automationId === "string" ? body.automationId.trim() : "";

  if (appOrigin.length === 0 || automationId.length === 0) {
    return {
      ok: false,
      errorMessage: "appOrigin and automationId are required.",
    };
  }

  if (!isAgentWitchWakeServerAllowedOrigin(appOrigin)) {
    return {
      ok: false,
      errorMessage: "appOrigin is not an allowed Agent Witch site.",
    };
  }

  return runLocalScheduledAutomationById(automationId);
};

export const buildAgentWitchAutomationStatusFromWakeServer =
  (): AgentWitchAutomationStatusWakeResponse => {
    const config = readAgentWitchRunConfig();
    const store =
      config !== null
        ? readLocalAutomationStore(config.layout)
        : { version: 1 as const, automations: [] };

    return {
      ok: true,
      hostname: os.hostname(),
      automationCount: store.automations.length,
      enabledCount: store.automations.filter((entry) => entry.enabled).length,
    };
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

/** Kickstart Agent Witch, verify WS health, and reinstall from install script when revive fails. */
export const restartAgentWitchFromWakeServer = reviveAgentWitchWebSocket;

export const buildAgentWitchSelfUpdateStatusFromWakeServer =
  buildAgentWitchSelfUpdateStatus;

export const readAgentWitchSelfUpdateLogEntries = (
  limit: number = 20,
): ReturnType<typeof readAgentWitchSelfUpdateLogs> =>
  readAgentWitchSelfUpdateLogs(limit);

export const runAgentWitchSelfUpdateFromWakeServer = (input?: {
  readonly force?: boolean;
}): ReturnType<typeof runAgentWitchSelfUpdate> =>
  runAgentWitchSelfUpdate(input);
