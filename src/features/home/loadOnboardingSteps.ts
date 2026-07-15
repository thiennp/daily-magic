import hasUserCreatedFirstWorkflowOrAgent from "@/features/home/utils/hasUserCreatedFirstWorkflowOrAgent";
import hasUserSentFirstTask from "@/features/home/utils/hasUserSentFirstTask";
import { getPairedDevicesSnapshot } from "@/features/agent-witch/pairedDevicesResource";
import { listAgentRunsLocalCache } from "@/features/reports/agentRunLocalCache";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

export interface OnboardingStep {
  readonly id: string;
  readonly label: string;
  readonly done: boolean;
  readonly href: string;
}

const readHasPairedDevice = async (): Promise<boolean> => {
  const cached = getPairedDevicesSnapshot();
  if (cached !== null) {
    return cached.devices.length > 0;
  }

  const devicesResponse = await fetch("/api/agent-witch/devices");
  const devicesData: unknown = devicesResponse.ok
    ? await devicesResponse.json()
    : null;

  const devices =
    typeof devicesData === "object" &&
    devicesData !== null &&
    "devices" in devicesData &&
    Array.isArray((devicesData as { devices: unknown[] }).devices)
      ? (devicesData as { devices: Array<{ isActive?: boolean }> }).devices
      : [];

  return devices.some((device) => device.isActive !== false);
};

export async function loadOnboardingSteps(): Promise<
  readonly OnboardingStep[]
> {
  const [hasPairedDevice, capabilitiesResponse, runsResponse] =
    await Promise.all([
      readHasPairedDevice(),
      fetch("/api/capabilities/mine"),
      fetch("/api/agent-runs?scope=mine"),
    ]);

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

  const hasCreatedWorkflowOrAgent =
    hasUserCreatedFirstWorkflowOrAgent(capabilities);

  const hasSentTask = hasUserSentFirstTask(
    typeof runsData === "object" &&
      runsData !== null &&
      "runs" in runsData &&
      Array.isArray((runsData as { runs: unknown[] }).runs)
      ? (runsData as { runs: unknown[] }).runs
      : null,
    listAgentRunsLocalCache().length,
  );

  return [
    {
      id: "pair",
      label: "Connect your Mac",
      done: hasPairedDevice,
      href: "/#your-setup",
    },
    {
      id: "workflow",
      label: "Create your first workflow or agent",
      done: hasCreatedWorkflowOrAgent,
      href: "/library",
    },
    {
      id: "task",
      label: "Send your first task",
      done: hasSentTask,
      href: buildAgentComposerHref(),
    },
  ];
}
