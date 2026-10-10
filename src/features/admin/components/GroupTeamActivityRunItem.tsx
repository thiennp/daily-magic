import Link from "next/link";

import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import { formatCompanyRunStatus } from "@/features/admin/utils/public-api/presentation";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

export default function GroupTeamActivityRunItem({
  run,
}: {
  readonly run: EnrichedAgentRunRecord;
}) {
  const status = formatCompanyRunStatus(run.status);
  return (
    <li className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-awc-border px-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-awc-fg">
          {run.prompt.split("\n")[0]}
        </p>
        <p className="mt-1 text-xs text-awc-fg-muted">
          {run.writerAgent} · by {run.requesterName ?? run.requesterEmail}
          {" → "}
          {run.executorName ?? run.executorEmail}
        </p>
        <Link
          href={`/reports/${run.id}`}
          className="mt-1 inline-block text-xs font-medium text-awc-blue-700 hover:underline"
        >
          {C.runsViewReport}
        </Link>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${status.className}`}
        >
          {status.label}
        </span>
        <time
          dateTime={run.createdAt}
          title={new Date(run.createdAt).toLocaleString()}
          className="text-xs text-awc-fg-muted"
        >
          {new Date(run.createdAt).toLocaleString()}
        </time>
      </div>
    </li>
  );
}
