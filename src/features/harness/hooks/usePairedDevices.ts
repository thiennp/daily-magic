import { useCallback, useEffect, useState } from "react";

import type PairedDevice from "@/features/harness/types/PairedDevice.type";
import {
  fetchActivePairedDevices,
  revokePairedDevice,
} from "@/features/harness/utils/pairedDevicesApi";

interface UsePairedDevicesResult {
  readonly devices: readonly PairedDevice[];
  readonly isLoading: boolean;
  readonly message: string | null;
  readonly revokeDevice: (deviceId: string) => Promise<void>;
}

export function usePairedDevices(): UsePairedDevicesResult {
  const [devices, setDevices] = useState<readonly PairedDevice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

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

  const revokeDevice = useCallback(
    async (deviceId: string) => {
      setIsLoading(true);
      setMessage(null);

      const revoked = await revokePairedDevice(deviceId);

      if (!revoked) {
        setMessage("Could not revoke this device.");
        setIsLoading(false);
        return;
      }

      setMessage("Device revoked. Re-pair after reinstalling the local agent.");
      await reloadDevices();
    },
    [reloadDevices],
  );

  return {
    devices,
    isLoading,
    message,
    revokeDevice,
  };
}
