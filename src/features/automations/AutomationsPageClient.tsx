"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import AutomationCard from "@/features/automations/AutomationCard";
import AutomationsListLoadErrorPanel from "@/features/automations/AutomationsListLoadErrorPanel";
import CreateAutomationForm from "@/features/automations/CreateAutomationForm";
import { AUTOMATIONS_PAGE_COPY } from "@/features/automations/automationsPageCopy.constant";
import { syncAutomationsToLocalMac } from "@/features/automations/submitAutomationActions";
import { useAutomationsPageData } from "@/features/automations/hooks/useAutomationsPageData";

export default function AutomationsPageClient() {
  const searchParams = useSearchParams();
  const initialCapabilityId = searchParams.get("capabilityId") ?? undefined;
  const [refreshKey, setRefreshKey] = useState(0);
  const [syncWarning, setSyncWarning] = useState<string | null>(null);
  const { automations, capabilities, isLoading, loadFailed, reload } =
    useAutomationsPageData(refreshKey);

  const refreshAndSync = async (): Promise<void> => {
    setRefreshKey((key) => key + 1);
    const syncResult = await syncAutomationsToLocalMac(window.location.origin);
    setSyncWarning(syncResult.ok ? null : AUTOMATIONS_PAGE_COPY.syncFailed);
  };

  return (
    <div className="space-y-6">
      <CreateAutomationForm
        capabilities={capabilities}
        initialCapabilityId={initialCapabilityId}
        onCreated={() => {
          void refreshAndSync();
        }}
      />
      {syncWarning ? (
        <p
          role="status"
          className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200"
        >
          {syncWarning}
        </p>
      ) : null}
      {loadFailed ? (
        <AutomationsListLoadErrorPanel onRetry={reload} />
      ) : isLoading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      ) : automations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 px-4 py-8 text-center dark:border-gray-700">
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            {AUTOMATIONS_PAGE_COPY.emptyTitle}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {AUTOMATIONS_PAGE_COPY.empty}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {automations.map((automation) => (
            <AutomationCard
              key={automation.id}
              automation={automation}
              onChanged={() => {
                void refreshAndSync();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
