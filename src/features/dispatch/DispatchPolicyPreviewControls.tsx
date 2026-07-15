"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

import DispatchPolicyPreview from "@/features/dispatch/DispatchPolicyPreview";
import HomeSetupDivider from "@/features/home/HomeSetupDivider";
import { COMPANY_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import {
  getPairedDevicesSnapshotOrEmpty,
  pairedDevicesResource,
} from "@/features/agent-witch/pairedDevicesResource";
import { useDispatchTargets } from "@/features/dispatch/hooks/useDispatchTargets";

export default function DispatchPolicyPreviewControls() {
  const { groups } = useDispatchTargets();
  const snapshot = useSyncExternalStore(
    pairedDevicesResource.subscribe,
    () => pairedDevicesResource.getSnapshot(),
    () => null,
  );
  const devices = (snapshot ?? getPairedDevicesSnapshotOrEmpty())
    .devices as readonly MyMacDevice[];
  const [preferredDeviceId, setPreferredDeviceId] = useState("");
  const [groupId, setGroupId] = useState("");
  const deviceId = useMemo(() => {
    if (devices.length === 0) {
      return "";
    }

    const preferredExists = devices.some(
      (device) => device.id === preferredDeviceId,
    );

    return preferredExists ? preferredDeviceId : (devices[0]?.id ?? "");
  }, [devices, preferredDeviceId]);
  const resolvedGroupId =
    groupId.length > 0 ? groupId : (groups[0]?.groupId ?? "");

  return (
    <div className="mt-4 space-y-3">
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        Effective policy preview
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs text-gray-600 dark:text-gray-400">
          Device
          <select
            value={deviceId}
            onChange={(event) => {
              setPreferredDeviceId(event.target.value);
            }}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="">Most recent device</option>
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.deviceLabel ?? "Local agent"}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-gray-600 dark:text-gray-400">
          {COMPANY_ENTITY_LABEL} context
          <select
            value={groupId}
            onChange={(event) => {
              setGroupId(event.target.value);
            }}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="">No {COMPANY_ENTITY_LABEL.toLowerCase()}</option>
            {groups.map((group) => (
              <option key={group.groupId} value={group.groupId}>
                {group.groupName}
              </option>
            ))}
          </select>
        </label>
      </div>
      <HomeSetupDivider className="my-4" />
      <DispatchPolicyPreview deviceId={deviceId} groupId={resolvedGroupId} />
    </div>
  );
}
