import type PairedDevice from "@/features/harness/types/PairedDevice.type";
import { formatPairedDeviceTimestamp } from "@/features/harness/utils/formatPairedDeviceTimestamp";

interface PairedDeviceListItemProps {
  readonly device: PairedDevice;
  readonly onRevoke: (deviceId: string) => void;
}

export default function PairedDeviceListItem({
  device,
  onRevoke,
}: PairedDeviceListItemProps) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700">
      <div>
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          {device.deviceLabel ?? "Local agent"}
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Paired {formatPairedDeviceTimestamp(device.claimedAt)}
          {device.lastSeenAt !== null
            ? ` · Last seen ${formatPairedDeviceTimestamp(device.lastSeenAt)}`
            : null}
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          void onRevoke(device.id);
        }}
        className="inline-flex h-9 items-center justify-center rounded-lg border border-red-200 px-4 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-300 dark:hover:bg-red-950/30"
      >
        Revoke
      </button>
    </li>
  );
}
