"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  countWriterSendReadyMacs,
  hasAnyWriterSendReadyMac,
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
  const requestedDeviceId =
    manualDeviceId ??
    (deviceIdFromQuery.length > 0 ? deviceIdFromQuery : storedDeviceId);
  // A remembered or linked id can point at a device row that a re-pair replaced.
  const preferredDeviceId = devices.some(
    (device) => device.id === requestedDeviceId,
  )
    ? requestedDeviceId
    : "";

  const selectedDeviceId = useMemo(() => {
    if (devices.length === 0) {
      return "";
    }

    const preferredDevice = devices.find(
      (device) => device.id === preferredDeviceId,
    );

    if (preferredDevice !== undefined) {
      return preferredDeviceId;
    }

    return pickDefaultMacDeviceId(devices);
  }, [deviceIdFromQuery, devices, preferredDeviceId]);

  const dispatchReadyMacCount = countWriterSendReadyMacs(devices);

  return {
    devices,
    displayNameById,
    selectedDeviceId,
    setSelectedDeviceId: (deviceId: string) => {
      setManualDeviceId(deviceId);
      writePreferredMacDeviceId(deviceId);
    },
    isLoading,
    hasDispatchReadyMac: hasAnyWriterSendReadyMac(devices),
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
