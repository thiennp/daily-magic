import { applyAutomationSyncLocally } from "./applyAutomationSyncLocally";
import { runLocalScheduledAutomationById } from "./agentWitchLocalAutomationRunner";

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
