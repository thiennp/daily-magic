"use client";

import { useState } from "react";

import MacDeviceOfflineWakeHint from "@/features/agent-witch/macDevices/MacDeviceOfflineWakeHint";
import MacDeviceRowMainContent from "@/features/agent-witch/macDevices/MacDeviceRowMainContent";
import MacDeviceRowMenu from "@/features/agent-witch/macDevices/MacDeviceRowMenu";
import confirmMacDeviceRevoke from "@/features/agent-witch/macDevices/utils/confirmMacDeviceRevoke";
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
  onDelete,
}: MacDeviceRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  const mainContent = (
    <MacDeviceRowMainContent
      deviceId={deviceId}
      displayName={displayName}
      isOnline={isOnline}
      isConnected={isConnected}
      detailText={detailText}
      isEditing={isEditing}
      isSelected={isSelected}
      onEditingChange={setIsEditing}
      onRenamed={onRenamed}
    />
  );

  const rowSurfaceClassName =
    onSelect !== undefined && isSelected
      ? "bg-brand-50/60 dark:bg-brand-950/20"
      : "hover:bg-gray-50 dark:hover:bg-white/[0.03]";

  const rowInner = (
    <div
      className={`group flex w-full items-center gap-3 rounded-lg py-1 ${rowSurfaceClassName}`}
    >
      {onSelect !== undefined ? (
        <div
          role="button"
          tabIndex={0}
          className="min-w-0 flex-1 text-left"
          onClick={onSelect}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSelect();
            }
          }}
        >
          {mainContent}
        </div>
      ) : (
        mainContent
      )}
      {isEditing ? null : (
        <MacDeviceRowMenu
          onEdit={() => {
            setIsEditing(true);
          }}
          onDelete={
            onDelete
              ? () => {
                  confirmMacDeviceRevoke(displayName, deviceId, onDelete);
                }
              : undefined
          }
        />
      )}
    </div>
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
