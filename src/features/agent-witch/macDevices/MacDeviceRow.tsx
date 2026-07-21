"use client";

import { useState } from "react";

import {
  MacDeviceOfflineWakeHint,
  resolveMacPresenceTier,
} from "@/features/agent-witch/online-wake";
import MacDeviceRowInner from "@/features/agent-witch/macDevices/MacDeviceRowInner";

interface MacDeviceRowProps {
  readonly deviceId: string;
  readonly displayName: string;
  readonly isOnline: boolean;
  readonly isConnected?: boolean;
  readonly detailText?: string;
  readonly detailWarning?: boolean;
  readonly isThisMac?: boolean;
  readonly isSelected?: boolean;
  readonly isWakeServerReachable?: boolean;
  readonly onSelect?: () => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
  readonly onUpdateLocal?: () => void;
  readonly onDeleteLocalScript?: () => void;
  readonly onDelegateTask?: (deviceId: string) => void;
  readonly onOpenShell?: (deviceId: string) => void;
  readonly onDelete?: (deviceId: string) => void | Promise<void>;
}

export default function MacDeviceRow({
  deviceId,
  displayName,
  isOnline,
  isConnected,
  detailText,
  detailWarning = false,
  isThisMac = false,
  isSelected = false,
  isWakeServerReachable = false,
  onSelect,
  onRenamed,
  onUpdateLocal,
  onDeleteLocalScript,
  onDelegateTask,
  onOpenShell,
  onDelete,
}: MacDeviceRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  const rowInner = (
    <MacDeviceRowInner
      deviceId={deviceId}
      displayName={displayName}
      isOnline={isOnline}
      detailText={detailText}
      detailWarning={detailWarning}
      isThisMac={isThisMac}
      isSelected={isSelected}
      isEditing={isEditing}
      onSelect={onSelect}
      onEditingChange={setIsEditing}
      onRenamed={onRenamed}
      onUpdateLocal={onUpdateLocal}
      onDeleteLocalScript={onDeleteLocalScript}
      onDelegateTask={onDelegateTask}
      onOpenShell={
        onOpenShell
          ? () => {
              onOpenShell(deviceId);
            }
          : undefined
      }
      onDelete={onDelete}
    />
  );

  const wrappedRow =
    resolveMacPresenceTier({ isOnline, isConnected: isConnected ?? false }) ===
    "offline" ? (
      <MacDeviceOfflineWakeHint
        deviceId={deviceId}
        displayName={displayName}
        canRequestRestart={isWakeServerReachable}
      >
        {rowInner}
      </MacDeviceOfflineWakeHint>
    ) : (
      rowInner
    );

  if (onSelect !== undefined) {
    return wrappedRow;
  }

  return <li>{wrappedRow}</li>;
}
