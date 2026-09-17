import { readAgentWitchRunConfig } from "@agent-witch/install-runtime-client";

import { runLocalScheduledAutomationById } from "./agentWitchLocalAutomationRunner";
import { readLocalAutomationStore } from "./agentWitchLocalAutomationStore";

export const tickAgentWitchScheduledAutomations = async (): Promise<void> => {
  const config = readAgentWitchRunConfig();
  if (config === null) {
    return;
  }

  const store = readLocalAutomationStore(config.layout);
  const now = Date.now();

  for (const automation of store.automations) {
    if (!automation.enabled || automation.nextRunAt === null) {
      continue;
    }

    if (new Date(automation.nextRunAt).getTime() > now) {
      continue;
    }

    const result = await runLocalScheduledAutomationById(automation.id);
    if (!result.ok) {
      process.stderr.write(
        `[agent-witch] automation ${automation.name}: ${result.errorMessage ?? "run failed"}\n`,
      );
    }
  }
};
