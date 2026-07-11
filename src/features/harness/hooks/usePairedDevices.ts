import { useCallback, useEffect, useState } from "react";

import {
  fetchActivePairedDevices,
  revokePairedDevice,
  type PairedDevice,
} from "@/features/harness/utils/pairedDevicesApi";

interface UsePairedDevicesResult {
  readonly devices: readonly PairedDevice[];
  readonly isLoading: boolean;
  readonly message: string | null;
  readonly pendingDeviceId: string | null;
  readonly pendingDevice: PairedDevice | undefined;
  readonly requestRevoke: (deviceId: string) => void;
  readonly cancelRevoke: () => void;
  readonly confirmRevoke: () => Promise<void>;
}

export function usePairedDevices(): UsePairedDevicesResult {
  const [devices, setDevices] = useState<readonly PairedDevice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [pendingDeviceId, setPendingDeviceId] = useState<string | null>(null);

  const reloadDevices = useCallback(async () => {
    const result = await fetchActivePairedDevices();
    setDevices(result.devices);
    setMessage(result.errorMessage);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void (async () => {
      await reloadDevices();
    })();
  }, [reloadDevices]);

  const pendingDevice = devices.find((device) => device.id === pendingDeviceId);

  const confirmRevoke = useCallback(async () => {
    if (pendingDeviceId === null) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const didRevoke = await revokePairedDevice(pendingDeviceId);

      if (!didRevoke) {
        setMessage("Could not revoke this device.");
        setIsLoading(false);
        return;
      }

      setMessage("Device revoked. Re-pair after reinstalling the local agent.");
      setPendingDeviceId(null);
      await reloadDevices();
    } catch {
      setMessage("Could not revoke this device.");
      setIsLoading(false);
    }
  }, [pendingDeviceId, reloadDevices]);

  return {
    devices,
    isLoading,
    message,
    pendingDeviceId,
    pendingDevice,
    requestRevoke: setPendingDeviceId,
    cancelRevoke: () => {
      setPendingDeviceId(null);
    },
    confirmRevoke,
  };
}
