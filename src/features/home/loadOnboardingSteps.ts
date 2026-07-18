import { buildOnboardingSteps } from "@/features/home/utils/buildOnboardingSteps";
import { fetchOnboardingBootstrap } from "@/features/home/utils/onboardingBootstrapApi";
import hasUserCreatedAutomation from "@/features/home/utils/hasUserCreatedAutomation";
import hasUserCreatedFirstWorkflowOrAgent from "@/features/home/utils/hasUserCreatedFirstWorkflowOrAgent";
import hasUserPairedMac from "@/features/home/utils/hasUserPairedMac";
import hasUserSentFirstTask from "@/features/home/utils/hasUserSentFirstTask";
import syncOnboardingAutomationCreatedFlag from "@/features/home/utils/syncOnboardingAutomationCreatedFlag";
import syncOnboardingFirstTaskSentFlag from "@/features/home/utils/syncOnboardingFirstTaskSentFlag";
import syncOnboardingSetupAcknowledgedFlag from "@/features/home/utils/syncOnboardingSetupAcknowledgedFlag";
import syncOnboardingWorkflowCreatedFlag from "@/features/home/utils/syncOnboardingWorkflowCreatedFlag";
import {
  getPairedDevicesSnapshot,
  refreshPairedDevices,
} from "@/features/agent-witch/pairedDevicesResource";
import { listAgentRunsLocalCache } from "@/features/reports/agentRunLocalCache";
import type { OnboardingStep } from "@/features/home/utils/buildOnboardingSteps";

export type { OnboardingStep } from "@/features/home/utils/buildOnboardingSteps";

export interface LoadedOnboardingState {
  readonly steps: readonly OnboardingStep[];
  readonly setupAcknowledged: boolean;
}

const resolvePairedDeviceCount = async (): Promise<number> => {
  const existing = getPairedDevicesSnapshot();
  if (existing !== null) {
    return existing.devices.length;
  }

  const refreshed = await refreshPairedDevices();
  return refreshed?.devices.length ?? 0;
};

export async function loadOnboardingSteps(): Promise<LoadedOnboardingState> {
  const [
    deviceCount,
    capabilitiesResponse,
    runsResponse,
    bootstrap,
    automationsResponse,
  ] = await Promise.all([
    resolvePairedDeviceCount(),
    fetch("/api/capabilities/mine"),
    fetch("/api/agent-runs"),
    fetchOnboardingBootstrap(),
    fetch("/api/automations"),
  ]);

  syncOnboardingFirstTaskSentFlag(bootstrap.firstTaskSent);
  syncOnboardingAutomationCreatedFlag(bootstrap.automationCreated);
  syncOnboardingWorkflowCreatedFlag(bootstrap.workflowCreated);
  syncOnboardingSetupAcknowledgedFlag(bootstrap.setupAcknowledged);

  const capabilitiesData: unknown = capabilitiesResponse.ok
    ? await capabilitiesResponse.json()
    : null;
  const runsData: unknown = runsResponse.ok ? await runsResponse.json() : null;

  const capabilities =
    typeof capabilitiesData === "object" &&
    capabilitiesData !== null &&
    "capabilities" in capabilitiesData &&
    Array.isArray(
      (capabilitiesData as { capabilities: unknown[] }).capabilities,
    )
      ? (
          capabilitiesData as {
            capabilities: Array<{ type: string; name: string }>;
          }
        ).capabilities
      : [];

  const automationsData: unknown = automationsResponse.ok
    ? await automationsResponse.json()
    : null;

  return {
    setupAcknowledged: bootstrap.setupAcknowledged,
    steps: buildOnboardingSteps({
      hasPairedDevice: hasUserPairedMac(deviceCount > 0, bootstrap.macPaired),
      hasCreatedWorkflowOrAgent: hasUserCreatedFirstWorkflowOrAgent(
        capabilities,
        bootstrap.workflowCreated,
      ),
      hasSentTask: hasUserSentFirstTask(
        typeof runsData === "object" &&
          runsData !== null &&
          "runs" in runsData &&
          Array.isArray((runsData as { runs: unknown[] }).runs)
          ? (runsData as { runs: unknown[] }).runs
          : null,
        listAgentRunsLocalCache().length,
        bootstrap.firstTaskSent,
      ),
      hasScheduledAutomation: hasUserCreatedAutomation(
        automationsData,
        bootstrap.automationCreated,
      ),
    }),
  };
}
