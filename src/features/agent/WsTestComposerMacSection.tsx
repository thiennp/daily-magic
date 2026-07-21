"use client";

import SendTaskComposerMacPickerStep from "@/features/agent/SendTaskComposerMacPickerStep";
import WsTestDelegatedMacField from "@/features/agent/WsTestDelegatedMacField";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import useCursorCloudConnection from "@/features/home/hooks/useCursorCloudConnection";

interface WsTestComposerMacSectionProps {
  readonly isLibraryPlaybook: boolean;
  readonly useComposerButtonPicker: boolean;
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly selectedDeviceId: string;
  readonly isLoading: boolean;
  readonly disabled: boolean;
  readonly onDeviceChange: (deviceId: string) => void;
  readonly onDeviceRenamed: (deviceId: string, deviceLabel: string) => void;
  readonly onDeviceDeleted?: (deviceId: string) => void | Promise<void>;
}

export default function WsTestComposerMacSection({
  isLibraryPlaybook,
  useComposerButtonPicker,
  devices,
  displayNameById,
  selectedDeviceId,
  isLoading,
  disabled,
  onDeviceChange,
  onDeviceRenamed,
  onDeviceDeleted,
}: WsTestComposerMacSectionProps) {
  const { localHostname, isWakeServerReachable } = useLocalMacBrowserContext();
  const { summary: cursorCloudSummary } = useCursorCloudConnection();

  return (
    <div
      className={
        isLibraryPlaybook
          ? "rounded-2xl border border-brand-200 bg-brand-50/40 p-4 dark:border-brand-900/40 dark:bg-brand-950/20"
          : undefined
      }
    >
      {isLibraryPlaybook ? (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Running a playbook from your library on your Mac.
        </p>
      ) : null}
      <div className={isLibraryPlaybook ? "mt-4" : undefined}>
        {useComposerButtonPicker ? (
          <SendTaskComposerMacPickerStep
            devices={devices}
            displayNameById={displayNameById}
            isLoading={isLoading}
            localHostname={localHostname}
            isWakeServerReachable={isWakeServerReachable}
            hasCursorCloudConnection={cursorCloudSummary.connected}
            onSelect={onDeviceChange}
          />
        ) : (
          <WsTestDelegatedMacField
            devices={devices}
            displayNameById={displayNameById}
            selectedDeviceId={selectedDeviceId}
            isLoading={isLoading}
            disabled={disabled}
            onDeviceChange={onDeviceChange}
            onDeviceRenamed={onDeviceRenamed}
            onDeviceDeleted={onDeviceDeleted}
          />
        )}
      </div>
    </div>
  );
}
