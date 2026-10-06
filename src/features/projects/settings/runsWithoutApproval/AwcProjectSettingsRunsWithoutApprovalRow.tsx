"use client";

import { useState } from "react";

import AwcRunsWithoutApprovalConfirmModal from "@/features/projects/settings/runsWithoutApproval/AwcRunsWithoutApprovalConfirmModal";
import AwcRunsWithoutApprovalSwitch from "@/features/projects/settings/runsWithoutApproval/AwcRunsWithoutApprovalSwitch";
import { RUNS_WITHOUT_APPROVAL_COPY as C } from "@/features/projects/settings/runsWithoutApproval/runsWithoutApprovalCopy.constant";
import { resolveRunsWithoutApprovalToggle } from "@/features/projects/settings/runsWithoutApproval/resolveRunsWithoutApprovalToggle";
import { useProjectRunsWithoutApproval } from "@/features/projects/settings/runsWithoutApproval/useProjectRunsWithoutApproval";

interface AwcProjectSettingsRunsWithoutApprovalRowProps {
  readonly projectId: string;
}

/**
 * Settings · S0-2 "Allow runs without approval" (owner only, default off).
 * ON asks first; OFF saves right away. The server writes the Access log row.
 */
export default function AwcProjectSettingsRunsWithoutApprovalRow({
  projectId,
}: AwcProjectSettingsRunsWithoutApprovalRowProps) {
  const setting = useProjectRunsWithoutApproval(projectId);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onToggle = (): void => {
    const step = resolveRunsWithoutApprovalToggle({
      enabled: setting.enabled,
      busy: setting.saving || setting.loadState !== "ready",
    });
    if (step.kind === "confirm") setConfirmOpen(true);
    if (step.kind === "save") void setting.save(step.value);
  };

  return (
    <section className="flex flex-col gap-2" aria-labelledby="p-set-rwa-h">
      <h3
        id="p-set-rwa-h"
        className="text-[13px] font-semibold text-gray-500 dark:text-gray-400"
      >
        {C.heading}
      </h3>
      <AwcRunsWithoutApprovalSwitch
        loadState={setting.loadState}
        enabled={setting.enabled}
        saving={setting.saving}
        saveFailed={setting.saveFailed}
        onToggle={onToggle}
        onRetry={setting.reload}
      />
      <AwcRunsWithoutApprovalConfirmModal
        isOpen={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          void setting.save(true);
        }}
      />
    </section>
  );
}
