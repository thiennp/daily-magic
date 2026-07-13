"use client";

import { useState } from "react";

import PairedDeviceListItem from "@/features/harness/components/PairedDeviceListItem";
import {
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
      {devices.map((device) => (
        <PairedDeviceListItem
          key={device.id}
          device={device}
          draftPolicy={
            policyDrafts[device.id] ?? toPolicySelection(device.dispatchPolicy)
          }
          onDraftPolicyChange={(value) => {
            setPolicyDrafts((current) => ({
              ...current,
              [device.id]: value,
            }));
          }}
          onPolicySaved={onPolicySaved}
          onRevokeRequest={onRevokeRequest}
        />
      ))}
    </ul>
  );
}
