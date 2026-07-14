import { notifyMacDeviceRevoked } from "@/features/agent-witch/macDevices/macDeviceRevokedEvent";
import { type DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";

import {
  getPairedDevicesSnapshot,
  refreshPairedDevices,
} from "@/features/agent-witch/pairedDevicesResource";

interface PairedDevice {
  readonly id: string;
  readonly deviceLabel: string | null;
  readonly displayName?: string | null;
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
      const cached = getPairedDevicesSnapshot();
      if (cached !== null) {
        return {
          devices: cached.devices as PairedDevice[],
          errorMessage: cached.hadError
            ? "Could not load paired devices."
            : null,
        };
      }

      const refreshed = await refreshPairedDevices();
      if (refreshed === null) {
        return {
          devices: [],
          errorMessage: "Could not load paired devices.",
        };
      }

      return {
        devices: refreshed.devices as PairedDevice[],
        errorMessage: refreshed.hadError
          ? "Could not load paired devices."
          : null,
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

  if (response.ok) {
    notifyMacDeviceRevoked(deviceId);
  }

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
