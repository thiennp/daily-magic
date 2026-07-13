import { type DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";

interface PairedDevice {
  readonly id: string;
  readonly deviceLabel: string | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly revokedAt: string | null;
  readonly isActive: boolean;
  readonly dispatchPolicy: DispatchPolicyValue | null;
  readonly isOnline?: boolean;
  readonly lastHeartbeatAt?: string | null;
}

interface LoadedDevicesResult {
  readonly devices: readonly PairedDevice[];
  readonly errorMessage: string | null;
}

export type { LoadedDevicesResult, PairedDevice };

export const formatPairedDeviceTimestamp = (value: string | null): string => {
  if (value === null) {
    return "—";
  }

  return new Date(value).toLocaleString();
};

export const fetchActivePairedDevices =
  async (): Promise<LoadedDevicesResult> => {
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
  };

export const revokePairedDevice = async (
  deviceId: string,
): Promise<boolean> => {
  const response = await fetch(`/api/agent-witch/devices/${deviceId}`, {
    method: "DELETE",
  });

  return response.ok;
};

export const updateDeviceDispatchPolicy = async (
  deviceId: string,
  dispatchPolicy: DispatchPolicyValue | "inherit",
): Promise<boolean> => {
  const response = await fetch(
    `/api/agent-witch/devices/${deviceId}/dispatch-policy`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dispatchPolicy: dispatchPolicy === "inherit" ? null : dispatchPolicy,
      }),
    },
  );

  return response.ok;
};
