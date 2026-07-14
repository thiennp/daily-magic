"use client";

import DeviceDispatchPolicySelect from "@/features/harness/components/DeviceDispatchPolicySelect";
import PairedDeviceOnlineBadge from "@/features/harness/components/PairedDeviceOnlineBadge";
import {
  formatPairedDeviceTimestamp,
  updateDeviceDispatchPolicy,
  type PairedDevice,
} from "@/features/agent-witch/utils/pairedDevicesApi";
import MacDeviceIcon from "@/features/macDevices/MacDeviceIcon";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";

interface PairedDeviceListItemProps {
  readonly device: PairedDevice;
  readonly displayName: string;
  readonly draftPolicy: DispatchPolicyValue | "inherit";
  readonly onDraftPolicyChange: (
    value: DispatchPolicyValue | "inherit",
  ) => void;
  readonly onPolicySaved?: () => void;
  readonly onRevokeRequest: (deviceId: string) => void;
}

export default function PairedDeviceListItem({
  device,
  displayName,
  draftPolicy,
  onDraftPolicyChange,
  onPolicySaved,
  onRevokeRequest,
}: PairedDeviceListItemProps) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <MacDeviceIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {displayName}
            </p>
            <PairedDeviceOnlineBadge isOnline={device.isOnline === true} />
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Paired {formatPairedDeviceTimestamp(device.claimedAt)}
            {device.lastSeenAt !== null
              ? ` · Last seen ${formatPairedDeviceTimestamp(device.lastSeenAt)}`
              : null}
            {device.isOnline === true && device.lastHeartbeatAt
              ? ` · Heartbeat ${formatPairedDeviceTimestamp(device.lastHeartbeatAt)}`
              : null}
          </p>
          <div className="mt-2">
            <DeviceDispatchPolicySelect
              value={draftPolicy}
              onChange={onDraftPolicyChange}
              onSave={() => {
                void (async () => {
                  const didSave = await updateDeviceDispatchPolicy(
                    device.id,
                    draftPolicy,
                  );
                  if (didSave) {
                    onPolicySaved?.();
                  }
                })();
              }}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          onRevokeRequest(device.id);
        }}
        className="inline-flex h-9 items-center justify-center rounded-lg border border-red-200 px-4 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-300 dark:hover:bg-red-950/30"
      >
        Revoke
      </button>
    </li>
  );
}
