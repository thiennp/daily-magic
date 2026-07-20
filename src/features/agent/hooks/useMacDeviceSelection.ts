"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  canDispatchToMac,
  pickDefaultMacDeviceId,
} from "@/features/agent-witch/online-wake";
import { SEND_TASK_DEVICE_ID_QUERY_PARAM } from "@/features/agent/constants/sendTaskModalQuery.constant";
import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import {
  readPreferredMacDeviceId,
  writePreferredMacDeviceId,
} from "@/features/agent/utils/preferredMacDeviceStorage";

const useMacDeviceSelection = (): {
  readonly devices: ReturnType<typeof useMyMacDevices>["devices"];
  readonly displayNameById: ReturnType<
    typeof useMyMacDevices
  >["displayNameById"];
  readonly selectedDeviceId: string;
  readonly setSelectedDeviceId: (deviceId: string) => void;
  readonly isLoading: boolean;
  readonly hasDispatchReadyMac: boolean;
  readonly dispatchReadyMacCount: number;
  readonly devicesHadLoadError: boolean;
  readonly serverInstallBundleVersion: string | null;
  readonly refreshDevices: () => Promise<void>;
  readonly renameDevice: ReturnType<typeof useMyMacDevices>["renameDevice"];
  readonly isOwnDeviceDispatch: boolean;
  readonly hasRememberedMacSelection: boolean;
} => {
  const {
    devices,
    displayNameById,
    isLoading,
    devicesHadLoadError,
    serverInstallBundleVersion,
    refresh: refreshDevices,
    renameDevice,
  } = useMyMacDevices();
  const searchParams = useSearchParams();
  const deviceIdFromQuery =
    searchParams.get(SEND_TASK_DEVICE_ID_QUERY_PARAM) ?? "";
  const [manualDeviceId, setManualDeviceId] = useState<string | null>(null);
  const [storedDeviceId] = useState(readPreferredMacDeviceId);
  const preferredDeviceId =
    manualDeviceId ??
    (deviceIdFromQuery.length > 0 ? deviceIdFromQuery : storedDeviceId);

  const selectedDeviceId = useMemo(() => {
    if (devices.length === 0) {
      return "";
    }

    const preferredStillExists = devices.some(
      (device) => device.id === preferredDeviceId,
    );

    return preferredStillExists
      ? preferredDeviceId
      : pickDefaultMacDeviceId(devices);
  }, [devices, preferredDeviceId]);

  const dispatchReadyMacCount = devices.filter((device) =>
    canDispatchToMac(device),
  ).length;

  return {
    devices,
    displayNameById,
    selectedDeviceId,
    setSelectedDeviceId: (deviceId: string) => {
      setManualDeviceId(deviceId);
      writePreferredMacDeviceId(deviceId);
    },
    isLoading,
    hasDispatchReadyMac: dispatchReadyMacCount > 0,
    dispatchReadyMacCount,
    devicesHadLoadError,
    serverInstallBundleVersion,
    refreshDevices,
    renameDevice,
    isOwnDeviceDispatch: deviceIdFromQuery.length > 0,
    hasRememberedMacSelection:
      !isLoading &&
      storedDeviceId.length > 0 &&
      devices.some((device) => device.id === storedDeviceId),
  };
};

export default useMacDeviceSelection;
