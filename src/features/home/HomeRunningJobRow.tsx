"use client";

import { useState } from "react";

import { useComposerApprovalWaitingLabel } from "@/features/agent/hooks/useComposerApprovalWaitingLabel";
import AgentRunStatusBadge from "@/features/reports/AgentRunStatusBadge";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  resolveHomeRunningJobBadgeClassName,
  resolveHomeRunningJobBadgeOverride,
} from "@/features/home/utils/resolveHomeRunningJobBadgeOverride";
import { formatHomeRunningJobAliveLabel } from "@/features/home/utils/formatHomeRunningJobAliveLabel";
import { formatHomeRunningJobTitle } from "@/features/home/utils/formatHomeRunningJobTitle";
import { deleteAgentRunHistory } from "@/features/reports/utils/deleteAgentRunHistory";
import { TrashBinIcon } from "@/icons";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

interface HomeRunningJobRowProps {
  readonly run: AgentRunRecord;
  readonly nowMs: number;
  readonly onExpand: (runId: string) => void;
}

export default function HomeRunningJobRow({
  run,
  nowMs,
  onExpand,
}: HomeRunningJobRowProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const approvalWaitingLabel = useComposerApprovalWaitingLabel({
    activeRunId: run.id,
    isWaitingApproval: run.status === AgentRunStatus.PENDING_APPROVAL,
  });
  const badgeLabelOverride = resolveHomeRunningJobBadgeOverride({
    run,
    approvalWaitingLabel,
  });
  const badgeClassNameOverride = resolveHomeRunningJobBadgeClassName({
    run,
    approvalWaitingLabel,
  });

  const handleDelete = (): void => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);
    void deleteAgentRunHistory(run.id).finally(() => {
      setIsDeleting(false);
    });
  };

  return (
    <li className="flex items-stretch gap-2">
      <button
        type="button"
        onClick={() => {
          onExpand(run.id);
        }}
        className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-left transition hover:border-brand-300 hover:bg-brand-50/40 dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-brand-500/40 dark:hover:bg-brand-500/5"
      >
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-gray-900 dark:text-white/90">
            {formatHomeRunningJobTitle(run.prompt)}
          </span>
          <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
            {run.reportSummary !== null &&
            run.reportSummary !== undefined &&
            run.reportSummary.trim().length > 0
              ? `${run.reportSummary.trim()} · `
              : ""}
            {formatHomeRunningJobAliveLabel({
              lastRunHeartbeatAt: run.lastRunHeartbeatAt,
              startedAt: run.startedAt,
              createdAt: run.createdAt,
              nowMs,
            })}
            {" · Click to expand"}
          </span>
        </span>
        <AgentRunStatusBadge
          status={run.status}
          labelOverride={badgeLabelOverride}
          classNameOverride={badgeClassNameOverride}
        />
      </button>
      <button
        type="button"
        aria-label={`Delete ${formatHomeRunningJobTitle(run.prompt)}`}
        disabled={isDeleting}
        onClick={handleDelete}
        className="inline-flex shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white px-3 text-gray-500 transition hover:border-error-200 hover:bg-error-50 hover:text-error-600 disabled:opacity-50 dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-error-900/40 dark:hover:bg-error-950/20 dark:hover:text-error-400"
      >
        <TrashBinIcon className="h-4 w-4" />
      </button>
    </li>
  );
}
