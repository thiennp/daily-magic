"use client";

import { useState, type ReactNode } from "react";

import type { MacPresenceTier } from "@/features/agent-witch/online-wake/public-api/types";
import {
  MacDeviceOfflineWakeHint,
  shouldOfferMacOfflineWakeHint,
} from "@/features/agent-witch/online-wake/public-api/presentation";
import MacDeviceRowHost from "@/features/agent-witch/macDevices/MacDeviceRowHost";
import MacDeviceRowInner from "@/features/agent-witch/macDevices/MacDeviceRowInner";

interface MacDeviceRowProps {
  readonly deviceId: string;
  readonly displayName: string;
  readonly isOnline: boolean;
  readonly isConnected?: boolean;
  readonly presenceTier?: MacPresenceTier;
  readonly detailText?: string;
  readonly detailWarning?: boolean;
  readonly isThisMac?: boolean;
  readonly showAnotherComputerBadge?: boolean;
  readonly isSelected?: boolean;
  readonly isWakeServerReachable?: boolean;
  readonly onSelect?: () => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
  readonly onUpdateLocal?: () => void;
  readonly onDeleteLocalScript?: () => void;
  readonly onSeeLocalLog?: () => void;
  readonly onDelegateTask?: (deviceId: string) => void;
  readonly onOpenShell?: (deviceId: string) => void;
  readonly onDelete?: (deviceId: string) => void | Promise<void>;
  readonly footer?: ReactNode;
}

export default function MacDeviceRow({
  deviceId,
  displayName,
  isOnline,
  isConnected,
  presenceTier,
  detailText,
  detailWarning = false,
  isThisMac = false,
  showAnotherComputerBadge = false,
  isSelected = false,
  isWakeServerReachable = false,
  onSelect,
  onRenamed,
  onUpdateLocal,
  onDeleteLocalScript,
  onSeeLocalLog,
  onDelegateTask,
  onOpenShell,
  onDelete,
  footer,
}: MacDeviceRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  const rowInner = (
    <MacDeviceRowInner
      deviceId={deviceId}
      displayName={displayName}
      isConnected={isConnected ?? false}
      detailText={detailText}
      detailWarning={detailWarning}
      isThisMac={isThisMac}
      showAnotherComputerBadge={showAnotherComputerBadge}
      isSelected={isSelected}
      isEditing={isEditing}
      onSelect={onSelect}
      onEditingChange={setIsEditing}
      onRenamed={onRenamed}
      onUpdateLocal={onUpdateLocal}
      onDeleteLocalScript={onDeleteLocalScript}
      onSeeLocalLog={onSeeLocalLog}
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

  const wrappedRow = shouldOfferMacOfflineWakeHint({
    isOnline,
    isConnected: isConnected ?? false,
    presenceTier,
  }) ? (
    <MacDeviceOfflineWakeHint
      deviceId={deviceId}
      displayName={displayName}
      canRequestRestart={isWakeServerReachable}
      isThisMac={isThisMac}
    >
      {rowInner}
    </MacDeviceOfflineWakeHint>
  ) : (
    rowInner
  );

  return (
    <MacDeviceRowHost onSelect={onSelect} footer={footer}>
      {wrappedRow}
    </MacDeviceRowHost>
  );
}
