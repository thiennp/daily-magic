import { buildOnboardingSteps } from "@/features/home/utils/buildOnboardingSteps";
import { fetchOnboardingAutomationCreated } from "@/features/home/utils/onboardingAutomationCreatedApi";
import hasUserCreatedAutomation from "@/features/home/utils/hasUserCreatedAutomation";
import hasUserCreatedFirstWorkflowOrAgent from "@/features/home/utils/hasUserCreatedFirstWorkflowOrAgent";
import hasUserPairedMac from "@/features/home/utils/hasUserPairedMac";
import hasUserSentFirstTask from "@/features/home/utils/hasUserSentFirstTask";
import { fetchOnboardingFirstTaskSent } from "@/features/home/utils/onboardingFirstTaskSentApi";
import { fetchOnboardingMacPaired } from "@/features/home/utils/onboardingMacPairedApi";
import syncOnboardingAutomationCreatedFlag from "@/features/home/utils/syncOnboardingAutomationCreatedFlag";
import syncOnboardingFirstTaskSentFlag from "@/features/home/utils/syncOnboardingFirstTaskSentFlag";
import { listAgentRunsLocalCache } from "@/features/reports/agentRunLocalCache";

export type { OnboardingStep } from "@/features/home/utils/buildOnboardingSteps";

const parseActiveDeviceCount = (devicesData: unknown): number => {
  const devices =
    typeof devicesData === "object" &&
    devicesData !== null &&
    "devices" in devicesData &&
    Array.isArray((devicesData as { devices: unknown[] }).devices)
      ? (devicesData as { devices: Array<{ isActive?: boolean }> }).devices
      : [];

  return devices.filter((device) => device.isActive !== false).length;
};

export async function loadOnboardingSteps() {
  const [
    devicesResponse,
    capabilitiesResponse,
    runsResponse,
    dbFirstTaskSent,
    automationsResponse,
    dbAutomationCreated,
    dbMacPaired,
  ] = await Promise.all([
    fetch("/api/agent-witch/devices"),
    fetch("/api/capabilities/mine"),
    fetch("/api/agent-runs"),
    fetchOnboardingFirstTaskSent(),
    fetch("/api/automations"),
    fetchOnboardingAutomationCreated(),
    fetchOnboardingMacPaired(),
  ]);

  syncOnboardingFirstTaskSentFlag(dbFirstTaskSent);
  syncOnboardingAutomationCreatedFlag(dbAutomationCreated);

  const devicesData: unknown = devicesResponse.ok
    ? await devicesResponse.json()
    : null;
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

  return buildOnboardingSteps({
    hasPairedDevice: hasUserPairedMac(
      parseActiveDeviceCount(devicesData) > 0,
      dbMacPaired,
    ),
    hasCreatedWorkflowOrAgent: hasUserCreatedFirstWorkflowOrAgent(capabilities),
    hasSentTask: hasUserSentFirstTask(
      typeof runsData === "object" &&
        runsData !== null &&
        "runs" in runsData &&
        Array.isArray((runsData as { runs: unknown[] }).runs)
        ? (runsData as { runs: unknown[] }).runs
        : null,
      listAgentRunsLocalCache().length,
      dbFirstTaskSent,
    ),
    hasScheduledAutomation: hasUserCreatedAutomation(
      automationsData,
      dbAutomationCreated,
    ),
  });
}
