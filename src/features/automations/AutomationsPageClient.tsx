"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import AutomationCard from "@/features/automations/AutomationCard";
import CreateAutomationForm from "@/features/automations/CreateAutomationForm";
import { AUTOMATIONS_PAGE_COPY } from "@/features/automations/automationsPageCopy.constant";
import { syncAutomationsToLocalMac } from "@/features/automations/submitAutomationActions";
import { useAutomationsPageData } from "@/features/automations/hooks/useAutomationsPageData";

export default function AutomationsPageClient() {
  const searchParams = useSearchParams();
  const initialCapabilityId = searchParams.get("capabilityId") ?? undefined;
  const [refreshKey, setRefreshKey] = useState(0);
  const [syncWarning, setSyncWarning] = useState<string | null>(null);
  const { automations, capabilities, isLoading } =
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
        <p className="text-sm text-amber-700 dark:text-amber-300">
          {syncWarning}
        </p>
      ) : null}
      {isLoading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      ) : automations.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {AUTOMATIONS_PAGE_COPY.empty}
        </p>
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
