import Link from "next/link";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import Badge from "@/components/ui/badge/Badge";
import { summarizeAgentRunReasonForDisplay } from "@/features/agent/utils/summarizeAgentRunReasonForDisplay";
import HomeAttentionRetryButton from "@/features/home/HomeAttentionRetryButton";
import { formatHomeRunningJobTitle } from "@/features/home/utils/formatHomeRunningJobTitle";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { formatRelativeTimeAgo } from "@/lib/time/formatRelativeTimeAgo";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { PROJECTS_REPORTS_INTENT_HREF } from "@/lib/shell/projectTabIntentHrefs.constant";

interface HomeAttentionRowProps {
  readonly run: AgentRunRecord;
  /** a13083ee: each row shows its age. */
  readonly nowMs?: number;
}

const isPending = (run: AgentRunRecord): boolean =>
  run.status === AgentRunStatus.PENDING_APPROVAL;

/** One design attention row: state pill, title, Open. */
export default function HomeAttentionRow({
  run,
  nowMs,
}: HomeAttentionRowProps) {
  const title = formatHomeRunningJobTitle(run.prompt);
  const age =
    nowMs === undefined ? null : formatRelativeTimeAgo(run.updatedAt, nowMs);
  // 5ca01f06 + aedfe094: known failures read as their next step; legacy rows
  // lose ANSI, CLI banners, [[MARKER]] rules and key=value diagnostics.
  const reason = isPending(run)
    ? ""
    : summarizeAgentRunReasonForDisplay({
        raw: run.denialReason ?? run.resultOutput ?? "",
        writerAgent: run.writerAgent,
      });
  const href =
    run.projectId === null
      ? PROJECTS_REPORTS_INTENT_HREF
      : `/projects/${run.projectId}`;

  return (
    <li className="flex items-center gap-3 py-2">
      <Badge size="sm" color={isPending(run) ? "info" : "error"}>
        {isPending(run) ? "Needs approval" : "Failed"}
      </Badge>
      <div className="min-w-0 flex-1">
        <p className={`truncate font-medium ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          {title}
        </p>
        {reason.length > 0 || age !== null ? (
          <p className="truncate text-[12px] text-awc-fg-muted">
            {[age, reason]
              .filter((part) => part !== null && part.length > 0)
              .join(" · ")}
          </p>
        ) : null}
      </div>
      {isPending(run) ? null : (
        <HomeAttentionRetryButton runId={run.id} title={title} />
      )}
      <Link href={href} className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}>
        Open<span className="sr-only"> {title}</span>
      </Link>
    </li>
  );
}
