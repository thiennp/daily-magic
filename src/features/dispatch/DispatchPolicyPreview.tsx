"use client";

import { useEffect, useState } from "react";

import { COMPANY_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import { useHomeSetupEmbedded } from "@/features/home/HomeSetupEmbeddedContext";
import resolveHomeSetupNestedBoxClass from "@/features/home/resolveHomeSetupNestedBoxClass";
import type { EffectiveDispatchPolicyBreakdown } from "@/lib/dispatch/buildEffectiveDispatchPolicyBreakdown";

const POLICY_PREVIEW_BOX_CLASS =
  "mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40";

interface DispatchPolicyPreviewProps {
  readonly deviceId: string;
  readonly groupId: string;
}

const formatPolicy = (value: string | null): string =>
  value === null ? "inherit" : value;

export default function DispatchPolicyPreview({
  deviceId,
  groupId,
}: DispatchPolicyPreviewProps) {
  const embedded = useHomeSetupEmbedded();
  const [breakdown, setBreakdown] =
    useState<EffectiveDispatchPolicyBreakdown | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (deviceId.length > 0) {
      params.set("deviceId", deviceId);
    }
    if (groupId.length > 0) {
      params.set("groupId", groupId);
    }

    void (async () => {
      const response = await fetch(
        `/api/agent-witch/dispatch-policy/effective?${params.toString()}`,
      );
      if (!response.ok) {
        setBreakdown(null);
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "breakdown" in data &&
        typeof (data as { breakdown: EffectiveDispatchPolicyBreakdown })
          .breakdown === "object"
      ) {
        setBreakdown(
          (data as { breakdown: EffectiveDispatchPolicyBreakdown }).breakdown,
        );
      }
    })();
  }, [deviceId, groupId]);

  if (breakdown === null) {
    return null;
  }

  const rows = [
    { label: "Device", value: breakdown.devicePolicy, key: "device" },
    { label: "User", value: breakdown.userPolicy, key: "user" },
    { label: COMPANY_ENTITY_LABEL, value: breakdown.groupPolicy, key: "group" },
    { label: "Default", value: breakdown.defaultPolicy, key: "default" },
  ] as const;

  return (
    <div
      className={resolveHomeSetupNestedBoxClass(
        embedded,
        POLICY_PREVIEW_BOX_CLASS,
        "mt-4",
      )}
    >
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        Effective policy:{" "}
        <span className="capitalize text-brand-600 dark:text-brand-400">
          {breakdown.effective}
        </span>
      </p>
      <ul className="mt-3 space-y-1 text-xs text-gray-600 dark:text-gray-400">
        {rows.map((row) => (
          <li
            key={row.key}
            className={
              breakdown.winningSource === row.key
                ? "font-medium text-gray-800 dark:text-white/90"
                : undefined
            }
          >
            {row.label}: {formatPolicy(row.value)}
            {breakdown.winningSource === row.key ? " · applies" : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
