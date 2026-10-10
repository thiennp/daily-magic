"use client";

import Link from "next/link";

import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import Badge from "@/components/ui/badge/Badge";
import { formatAgentLiveProgressLastMacUpdate } from "@/features/agent/utils/formatAgentLiveProgressLastMacUpdate";
import HomeAttentionRetryButton from "@/features/home/HomeAttentionRetryButton";
import { formatHomeRunningJobTitle } from "@/features/home/utils/public-api/presentation";
import { buildProjectTabHash } from "@/lib/shell/buildNavConsolidationRedirect";
import { PROJECTS_REPORTS_INTENT_HREF } from "@/lib/shell/projectTabIntentHrefs.constant";
import { resolveAgentRunLastAliveMs } from "@/lib/dispatch/isAgentRunSilentPastStall";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/**
 * 6253aa7e: a run with no sign of life for hours is shown as Stalled (not
 * In progress) with Retry and Open report, instead of a live row.
 */
export default function HomeStalledJobRow({
  run,
  nowMs,
}: {
  readonly run: AgentRunRecord;
  readonly nowMs: number;
}) {
  const title = formatHomeRunningJobTitle(run.prompt);
  const lastAliveMs = resolveAgentRunLastAliveMs(run);
  const since =
    lastAliveMs === null
      ? null
      : formatAgentLiveProgressLastMacUpdate(Math.max(0, nowMs - lastAliveMs));
  const reportHref =
    run.projectId === null
      ? PROJECTS_REPORTS_INTENT_HREF
      : `/projects/${run.projectId}${buildProjectTabHash("reports", { report: run.id })}`;

  return (
    <li className="flex items-center gap-3 rounded-xl border border-awc-border bg-white px-3 py-2.5 dark:border-gray-800 dark:bg-white/[0.02]">
      <Badge size="sm" color="warning">
        Stalled
      </Badge>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-awc-fg dark:text-white/90">
          {title}
        </span>
        <span className="mt-0.5 block text-xs text-awc-fg-muted dark:text-gray-400">
          {since === null
            ? "No update from your computer for a long time."
            : `Last update from your computer ${since}.`}
        </span>
      </span>
      <HomeAttentionRetryButton runId={run.id} title={title} />
      <Link href={reportHref} className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}>
        Open report<span className="sr-only"> {title}</span>
      </Link>
    </li>
  );
}
