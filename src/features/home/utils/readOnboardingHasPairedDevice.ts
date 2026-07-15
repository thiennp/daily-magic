import { getPairedDevicesSnapshot } from "@/features/agent-witch/pairedDevicesResource";

const readOnboardingHasPairedDevice = async (): Promise<boolean> => {
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

export default readOnboardingHasPairedDevice;
