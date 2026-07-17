"use client";

import { useState } from "react";

import MacDeviceOfflineWakeHint from "@/features/agent-witch/macDevices/MacDeviceOfflineWakeHint";
import MacDeviceRowInner from "@/features/agent-witch/macDevices/MacDeviceRowInner";
import { resolveMacPresenceTier } from "@/features/agent-witch/utils/macDevicePresence";

interface MacDeviceRowProps {
  readonly deviceId: string;
  readonly displayName: string;
  readonly isOnline: boolean;
  readonly isConnected?: boolean;
  readonly detailText?: string;
  readonly isSelected?: boolean;
  readonly isWakeServerReachable?: boolean;
  readonly onSelect?: () => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
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
  isSelected = false,
  isWakeServerReachable = false,
  onSelect,
  onRenamed,
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
      isSelected={isSelected}
      isEditing={isEditing}
      onSelect={onSelect}
      onEditingChange={setIsEditing}
      onRenamed={onRenamed}
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
        displayName={displayName}
        isWakeServerReachable={isWakeServerReachable}
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
