import type PairedDevice from "@/features/harness/types/PairedDevice.type";

interface LoadedDevicesResult {
  readonly devices: readonly PairedDevice[];
  readonly errorMessage: string | null;
}

export async function fetchActivePairedDevices(): Promise<LoadedDevicesResult> {
  try {
    const response = await fetch("/api/agent-witch/devices");
    const payload: unknown = await response.json();

    if (
      !response.ok ||
      typeof payload !== "object" ||
      payload === null ||
      !Array.isArray((payload as { devices?: unknown }).devices)
    ) {
      return {
        devices: [],
        errorMessage: "Could not load paired devices.",
      };
    }

    return {
      devices: (payload as { devices: PairedDevice[] }).devices.filter(
        (device) => device.isActive,
      ),
      errorMessage: null,
    };
  } catch {
    return {
      devices: [],
      errorMessage: "Could not load paired devices.",
    };
  }
}

export async function revokePairedDevice(deviceId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/agent-witch/devices/${deviceId}`, {
      method: "DELETE",
    });

    return response.ok;
  } catch {
    return false;
  }
}
