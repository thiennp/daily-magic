import os from "node:os";

import {
  applyAutomationSyncLocally,
  readAgentWitchRunConfig,
  readLocalAutomationStore,
  runLocalScheduledAutomationById,
} from "../../../../../adapters/automationLocal";
import { isAgentWitchWakeServerAllowedOrigin } from "../../../../server/features/cors-origin/public-api/infrastructure";
import { isRecord } from "../../../../server/internal/isRecord";
import type {
  AgentWitchAutomationRunWakeResponse,
  AgentWitchAutomationStatusWakeResponse,
  AgentWitchAutomationSyncWakeResponse,
} from "../public-api/types";

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
