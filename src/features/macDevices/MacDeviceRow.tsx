"use client";

import PairedDeviceOnlineBadge from "@/features/harness/components/PairedDeviceOnlineBadge";
import MacDeviceIcon from "@/features/macDevices/MacDeviceIcon";
import MacDeviceNameEditor from "@/features/macDevices/MacDeviceNameEditor";

interface MacDeviceRowProps {
  readonly deviceId: string;
  readonly displayName: string;
  readonly isOnline: boolean;
  readonly detailText?: string;
  readonly isSelected?: boolean;
  readonly onSelect?: () => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
}

export default function MacDeviceRow({
  deviceId,
  displayName,
  isOnline,
  detailText,
  isSelected = false,
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

  if (onSelect !== undefined) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
          isSelected
            ? "border-brand-300 bg-brand-50/60 dark:border-brand-500/40 dark:bg-brand-950/20"
            : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
        }`}
      >
        {content}
      </button>
    );
  }

  return (
    <li className="flex items-start gap-3 rounded-lg border border-gray-200 px-3 py-2.5 dark:border-gray-700">
      {content}
    </li>
  );
}
