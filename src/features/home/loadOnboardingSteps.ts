export interface OnboardingStep {
  readonly id: string;
  readonly label: string;
  readonly done: boolean;
  readonly href: string;
}

export async function loadOnboardingSteps(): Promise<
  readonly OnboardingStep[]
> {
  const [devicesResponse, targetsResponse, runsResponse] = await Promise.all([
    fetch("/api/agent-witch/devices"),
    fetch("/api/dispatch/targets"),
    fetch("/api/agent-runs?scope=mine"),
  ]);

  const devicesData: unknown = devicesResponse.ok
    ? await devicesResponse.json()
    : null;
  const targetsData: unknown = targetsResponse.ok
    ? await targetsResponse.json()
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

  const groupCount =
    typeof targetsData === "object" &&
    targetsData !== null &&
    "groups" in targetsData &&
    Array.isArray((targetsData as { groups: unknown[] }).groups)
      ? (targetsData as { groups: unknown[] }).groups.length
      : 0;

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
      id: "group",
      label: "Join a team",
      done: groupCount > 0,
      href: "/admin/groups",
    },
    {
      id: "task",
      label: "Send your first task",
      done: hasSentTask,
      href: "/agent",
    },
  ];
}
