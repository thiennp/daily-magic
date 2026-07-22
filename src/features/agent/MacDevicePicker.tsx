"use client";

import Label from "@/components/form/Label";
import MacDevicePickerLocalInstallModals from "@/features/agent/MacDevicePickerLocalInstallModals";
import MacDevicePickerRows from "@/features/agent/MacDevicePickerRows";
import { deviceMatchesLocalTokenHash } from "@/features/agent-witch/online-wake";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import useThisMacLocalInstallActions from "@/features/home/hooks/useThisMacLocalInstallActions";

interface MacDevicePickerProps {
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly selectedDeviceId: string;
  readonly isLoading: boolean;
  readonly localHostname: string | null;
  readonly localTokenHash: string | null;
  readonly isWakeServerReachable: boolean;
  readonly onChange: (deviceId: string) => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
  readonly onDelete?: (deviceId: string) => void | Promise<void>;
}

export default function MacDevicePicker({
  devices,
  displayNameById,
  selectedDeviceId,
  isLoading,
  localHostname,
  localTokenHash,
  isWakeServerReachable,
  onChange,
  onRenamed,
  onDelete,
}: MacDevicePickerProps) {
  const { serverInstallBundleVersion } = useMyMacDevices();
  const thisMacDevice = devices.find(
    (device) =>
      localTokenHash !== null &&
      deviceMatchesLocalTokenHash(device.tokenHash, localTokenHash),
  );
  const localInstallActions = useThisMacLocalInstallActions({
    wakePort: thisMacDevice?.wakePort ?? null,
  });

  if (isLoading) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Checking which Macs are online…
      </p>
    );
  }

  if (devices.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No Macs connected yet. Connect one from Home → Your Devices.
      </p>
    );
  }

  return (
    <div>
      <Label>Which Mac should run this?</Label>
      <div className="mt-3 space-y-2">
        <MacDevicePickerRows
          devices={devices}
          displayNameById={displayNameById}
          selectedDeviceId={selectedDeviceId}
          serverInstallBundleVersion={serverInstallBundleVersion}
          localHostname={localHostname}
          localTokenHash={localTokenHash}
          isWakeServerReachable={isWakeServerReachable}
          onChange={onChange}
          onRenamed={onRenamed}
          onUpdateLocal={localInstallActions.onUpdateLocal}
          onDeleteLocalScript={localInstallActions.onDeleteLocalScript}
          onDelete={onDelete}
        />
      </div>
      <MacDevicePickerLocalInstallModals
        isUpdateLocalModalOpen={localInstallActions.isUpdateLocalModalOpen}
        isDeleteLocalModalOpen={localInstallActions.isDeleteLocalModalOpen}
        updateLocalCommand={localInstallActions.updateLocalCommand}
        deleteLocalCommand={localInstallActions.deleteLocalCommand}
        wakePort={localInstallActions.wakePort}
        closeUpdateLocalModal={localInstallActions.closeUpdateLocalModal}
        closeDeleteLocalModal={localInstallActions.closeDeleteLocalModal}
      />
    </div>
  );
}
