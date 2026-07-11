"use client";

import { useState } from "react";

import DeviceDispatchPolicySelect from "@/features/harness/components/DeviceDispatchPolicySelect";
import {
  formatPairedDeviceTimestamp,
  updateDeviceDispatchPolicy,
  type PairedDevice,
} from "@/features/harness/utils/pairedDevicesApi";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";

interface PairedDevicesListProps {
  readonly devices: readonly PairedDevice[];
  readonly isLoading: boolean;
  readonly onRevokeRequest: (deviceId: string) => void;
  readonly onPolicySaved?: () => void;
}

const toPolicySelection = (
  policy: DispatchPolicyValue | null,
): DispatchPolicyValue | "inherit" => (policy === null ? "inherit" : policy);

export default function PairedDevicesList({
  devices,
  isLoading,
  onRevokeRequest,
  onPolicySaved,
}: PairedDevicesListProps) {
  const [policyDrafts, setPolicyDrafts] = useState<
    Record<string, DispatchPolicyValue | "inherit">
  >({});

  if (isLoading) {
    return (
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Loading devices…
      </p>
    );
  }

  if (devices.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        No paired devices yet.
      </p>
    );
  }

  return (
    <ul className="mt-4 space-y-3">
      {devices.map((device) => {
        const draftPolicy =
          policyDrafts[device.id] ?? toPolicySelection(device.dispatchPolicy);

        return (
          <li
            key={device.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {device.deviceLabel ?? "Local agent"}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Paired {formatPairedDeviceTimestamp(device.claimedAt)}
                {device.lastSeenAt !== null
                  ? ` · Last seen ${formatPairedDeviceTimestamp(device.lastSeenAt)}`
                  : null}
              </p>
              <div className="mt-2">
                <DeviceDispatchPolicySelect
                  value={draftPolicy}
                  onChange={(value) => {
                    setPolicyDrafts((current) => ({
                      ...current,
                      [device.id]: value,
                    }));
                  }}
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
      })}
    </ul>
  );
}
