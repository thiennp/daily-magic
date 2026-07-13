import hasUserCreatedFirstWorkflowOrAgent from "@/features/home/utils/hasUserCreatedFirstWorkflowOrAgent";

export interface OnboardingStep {
  readonly id: string;
  readonly label: string;
  readonly done: boolean;
  readonly href: string;
}

export async function loadOnboardingSteps(): Promise<
  readonly OnboardingStep[]
> {
  const [devicesResponse, capabilitiesResponse, runsResponse] =
    await Promise.all([
      fetch("/api/agent-witch/devices"),
      fetch("/api/capabilities/mine"),
      fetch("/api/agent-runs?scope=mine"),
    ]);

  const devicesData: unknown = devicesResponse.ok
    ? await devicesResponse.json()
    : null;
  const capabilitiesData: unknown = capabilitiesResponse.ok
    ? await capabilitiesResponse.json()
    : null;
  const runsData: unknown = runsResponse.ok ? await runsResponse.json() : null;

  const devices =
    typeof devicesData === "object" &&
    devicesData !== null &&
    "devices" in devicesData &&
    Array.isArray((devicesData as { devices: unknown[] }).devices)
      ? (devicesData as { devices: Array<{ isActive?: boolean }> }).devices
      : [];

  const hasPairedDevice = devices.some((device) => device.isActive !== false);

  const capabilities =
    typeof capabilitiesData === "object" &&
    capabilitiesData !== null &&
    "capabilities" in capabilitiesData &&
    Array.isArray((capabilitiesData as { capabilities: unknown[] }).capabilities)
      ? (
          capabilitiesData as {
            capabilities: Array<{ type: string; name: string }>;
          }
        ).capabilities
      : [];

  const hasCreatedWorkflowOrAgent =
    hasUserCreatedFirstWorkflowOrAgent(capabilities);

  const hasSentTask =
    typeof runsData === "object" &&
    runsData !== null &&
    "runs" in runsData &&
    Array.isArray((runsData as { runs: unknown[] }).runs) &&
    (runsData as { runs: unknown[] }).runs.length > 0;

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
      href: "/agent",
    },
  ];
}
