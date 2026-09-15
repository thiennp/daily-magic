"use client";

import { useSyncExternalStore } from "react";

import {
  getPairedDevicesSnapshotOrEmpty,
  pairedDevicesResource,
} from "@/features/agent-witch/pairedDevicesResource";
import { resolveHomeMacStatusSummary } from "@/features/home/utils/resolveHomeMacStatusSummary";

const TONE_CLASS_MAP: Record<
  ReturnType<typeof resolveHomeMacStatusSummary>["tone"],
  string
> = {
  online:
    "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100",
  sleeping:
    "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100",
  offline:
    "border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-100",
  none: "border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-100",
};

export default function HomeMacStatusBanner() {
  const snapshot = useSyncExternalStore(
    pairedDevicesResource.subscribe,
    () => pairedDevicesResource.getSnapshot(),
    () => null,
  );
  const devices = (snapshot ?? getPairedDevicesSnapshotOrEmpty()).devices;
  const summary = resolveHomeMacStatusSummary(devices);

  return (
    <div
      className={`mt-4 rounded-xl border px-4 py-3 ${TONE_CLASS_MAP[summary.tone]}`}
      role="status"
    >
      <p className="text-sm font-semibold">{summary.label}</p>
      <p className="mt-1 text-sm opacity-90">{summary.detail}</p>
    </div>
  );
}
