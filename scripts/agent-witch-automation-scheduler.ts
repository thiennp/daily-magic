import { exitUnlessActiveMacOsConsoleUser } from "./guardMacOsConsoleUser";
import { readLocalAutomationStore } from "./agentWitchLocalAutomationStore";
import { runLocalScheduledAutomationById } from "./agentWitchLocalAutomationRunner";
import { readAgentWitchRunConfig } from "./readAgentWitchRunConfig";

exitUnlessActiveMacOsConsoleUser("agent-witch-automation-scheduler");

const tickScheduledAutomations = async (): Promise<void> => {
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
        `[agent-witch-automation-scheduler] ${automation.name}: ${result.errorMessage ?? "run failed"}\n`,
      );
    }
  }
};

void tickScheduledAutomations();
