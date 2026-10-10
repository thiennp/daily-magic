import {
  buildOnboardingSteps,
  fetchOnboardingBootstrap,
  hasUserCreatedAutomation,
  hasUserCreatedFirstWorkflowOrAgent,
  hasUserPairedMac,
  hasUserSentFirstTask,
  syncOnboardingAutomationCreatedFlag,
  syncOnboardingFirstTaskSentFlag,
  syncOnboardingSetupAcknowledgedFlag,
  syncOnboardingWorkflowCreatedFlag,
} from "@/features/home/utils/public-api/presentation";
import {
  getPairedDevicesSnapshot,
  refreshPairedDevices,
} from "@/features/agent-witch/public-api/presentation";
import { listAgentRunsLocalCache } from "@/features/reports/public-api/presentation";
import type { OnboardingStep } from "@/features/home/utils/public-api/types";

export type { OnboardingStep } from "@/features/home/utils/public-api/types";

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
