"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";

import {
  getPairedDevicesSnapshotOrEmpty,
  pairedDevicesResource,
  refreshPairedDevices,
} from "@/features/agent-witch/pairedDevicesResource";
import useSubscribeMacDeviceRevoked from "@/features/agent-witch/macDevices/hooks/useSubscribeMacDeviceRevoked";
import { buildMacDeviceDisplayNameById } from "@/features/agent-witch/utils/resolveMacDeviceDisplayName";
import { useConnectionLab } from "@/features/agent-witch/connection-lab/ConnectionLabContext";

export interface MyMacDevice {
  readonly id: string;
  readonly deviceLabel: string | null;
  readonly displayName: string | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly isConnected: boolean;
  readonly isOnline: boolean;
  readonly lastHeartbeatAt: string | null;
}

const applyDisplayNameOverrides = (
  devices: readonly MyMacDevice[],
  overrides: Readonly<Record<string, string>>,
): readonly MyMacDevice[] =>
  devices.map((device) => {
    const override = overrides[device.id];
    return override === undefined
      ? device
      : { ...device, displayName: override };
  });

const useMyMacDevices = (): {
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly isLoading: boolean;
  readonly devicesHadLoadError: boolean;
  readonly refresh: () => Promise<void>;
  readonly renameDevice: (deviceId: string, displayName: string) => void;
} => {
  const connectionLab = useConnectionLab();
  const [displayNameOverrides, setDisplayNameOverrides] = useState<
    Record<string, string>
  >({});
  const snapshot = useSyncExternalStore(
    pairedDevicesResource.subscribe,
    () => pairedDevicesResource.getSnapshot(),
    () => null,
  );
  const resolvedSnapshot = snapshot ?? getPairedDevicesSnapshotOrEmpty();
  const baseDevices = connectionLab?.mockDevices ?? resolvedSnapshot.devices;
  const devices = useMemo(
    () => applyDisplayNameOverrides(baseDevices, displayNameOverrides),
    [baseDevices, displayNameOverrides],
  );
  const displayNameById = useMemo(
    () => buildMacDeviceDisplayNameById(devices),
    [devices],
  );

  const refresh = useCallback(async (): Promise<void> => {
    if (connectionLab !== null) {
      return;
    }

    await refreshPairedDevices();
  }, [connectionLab]);

  useSubscribeMacDeviceRevoked(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );

  const renameDevice = useCallback((deviceId: string, displayName: string) => {
    setDisplayNameOverrides((current) => ({
      ...current,
      [deviceId]: displayName,
    }));
  }, []);

  return {
    devices,
    displayNameById,
    isLoading: connectionLab !== null ? false : snapshot === null,
    devicesHadLoadError:
      connectionLab?.devicesApiFails ?? resolvedSnapshot.hadError,
    refresh,
    renameDevice,
  };
};

export default useMyMacDevices;
