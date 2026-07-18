import { applyAutomationSyncLocally } from "./applyAutomationSyncLocally";
import { runLocalScheduledAutomationById } from "./agentWitchLocalAutomationRunner";
import { linkAgentWitchAccountLocally } from "./linkAgentWitchAccountLocally";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const applyPendingAccountLinkFromCloud = async (
  payload: Readonly<Record<string, unknown>>,
): Promise<void> => {
  const linkToken =
    typeof payload.linkToken === "string" ? payload.linkToken.trim() : "";
  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const appOrigin =
    typeof payload.appOrigin === "string" ? payload.appOrigin.trim() : "";

  if (linkToken.length === 0 || email.length === 0 || appOrigin.length === 0) {
    return;
  }

  const result = await linkAgentWitchAccountLocally({
    linkToken,
    appOrigin,
    profileEmail: email,
  });

  if (result.ok) {
    console.log(`[agent-witch] Linked account ${result.email ?? email}`);
    return;
  }

  console.error(
    `[agent-witch] Account link failed: ${result.errorMessage ?? "unknown"}`,
  );
};

export const applyAutomationsSyncFromCloud = (
  payload: Readonly<Record<string, unknown>>,
): void => {
  const automations = Array.isArray(payload.automations)
    ? payload.automations
    : null;
  if (automations === null) {
    console.error("[agent-witch] automations.sync missing automations array.");
    return;
  }

  const result = applyAutomationSyncLocally({ automations });
  if (!result.ok) {
    console.error(
      `[agent-witch] automations.sync failed: ${result.errorMessage ?? "unknown"}`,
    );
    return;
  }

  console.log(
    `[agent-witch] Synced ${result.writtenCount ?? automations.length} automations.`,
  );
};

export const applyAutomationsRunFromCloud = async (
  payload: Readonly<Record<string, unknown>>,
): Promise<void> => {
  const automationId =
    typeof payload.automationId === "string" ? payload.automationId.trim() : "";
  if (automationId.length === 0) {
    console.error("[agent-witch] automations.run missing automationId.");
    return;
  }

  const result = await runLocalScheduledAutomationById(automationId);
  if (!result.ok) {
    console.error(
      `[agent-witch] automations.run failed: ${result.errorMessage ?? "unknown"}`,
    );
    return;
  }

  console.log(`[agent-witch] Ran automation ${automationId}.`);
};

export const readPendingAccountLinkFromAck = (
  payload: unknown,
): Readonly<Record<string, unknown>> | null => {
  if (!isRecord(payload)) {
    return null;
  }

  const pending = payload.pendingAccountLink;
  return isRecord(pending) ? pending : null;
};
