import Link from "next/link";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import Badge from "@/components/ui/badge/Badge";
import { formatHomeRunningJobTitle } from "@/features/home/utils/formatHomeRunningJobTitle";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { PROJECTS_REPORTS_INTENT_HREF } from "@/lib/shell/projectTabIntentHrefs.constant";

interface HomeAttentionRowProps {
  readonly run: AgentRunRecord;
}

const isPending = (run: AgentRunRecord): boolean =>
  run.status === AgentRunStatus.PENDING_APPROVAL;

/** One design attention row: state pill, title, Open. */
export default function HomeAttentionRow({ run }: HomeAttentionRowProps) {
  const title = formatHomeRunningJobTitle(run.prompt);
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
      </div>
      <Link href={href} className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}>
        Open<span className="sr-only"> {title}</span>
      </Link>
    </li>
  );
}
