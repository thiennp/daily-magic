"use client";

import PairedDeviceOnlineBadge from "@/features/harness/components/PairedDeviceOnlineBadge";
import MacDeviceIcon from "@/features/agent-witch/macDevices/MacDeviceIcon";
import MacDeviceNameEditor from "@/features/agent-witch/macDevices/MacDeviceNameEditor";
import MacDeviceOfflineWakeHint from "@/features/agent-witch/macDevices/MacDeviceOfflineWakeHint";

interface MacDeviceRowProps {
  readonly deviceId: string;
  readonly displayName: string;
  readonly isOnline: boolean;
  readonly detailText?: string;
  readonly isSelected?: boolean;
  readonly isWakeServerReachable?: boolean;
  readonly onSelect?: () => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
}

export default function MacDeviceRow({
  deviceId,
  displayName,
  isOnline,
  detailText,
  isSelected = false,
  isWakeServerReachable = false,
  onSelect,
  onRenamed,
}: MacDeviceRowProps) {
  const content = (
    <>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
        <MacDeviceIcon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <MacDeviceNameEditor
            deviceId={deviceId}
            displayName={displayName}
            onRenamed={onRenamed}
          />
          <PairedDeviceOnlineBadge isOnline={isOnline} />
        </div>
        {detailText ? (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {detailText}
          </p>
        ) : null}
      </div>
    </>
  );

  const rowClassName =
    onSelect !== undefined
      ? `flex w-full items-start gap-3 rounded-lg px-1 py-1 text-left transition ${
          isSelected
            ? "bg-brand-50/60 dark:bg-brand-950/20"
            : "hover:bg-gray-50 dark:hover:bg-white/[0.03]"
        }`
      : "flex items-start gap-3";

  const row =
    onSelect !== undefined ? (
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect();
          }
        }}
        className={rowClassName}
      >
        {content}
      </div>
    ) : (
      <div className={rowClassName}>{content}</div>
    );

  const wrappedRow =
    isOnline === false ? (
      <MacDeviceOfflineWakeHint
        displayName={displayName}
        isWakeServerReachable={isWakeServerReachable}
      >
        {row}
      </MacDeviceOfflineWakeHint>
    ) : (
      row
    );

  if (onSelect !== undefined) {
    return wrappedRow;
  }

  return <li>{wrappedRow}</li>;
}
