"use client";

import AwcPendingRunApprovalRow from "@/features/projects/settings/runApprovals/AwcPendingRunApprovalRow";
import { RUN_APPROVALS_COPY as C } from "@/features/projects/settings/runApprovals/runApprovalsCopy.constant";
import { useProjectPendingRunApprovals } from "@/features/projects/settings/runApprovals/useProjectPendingRunApprovals";

interface AwcProjectSettingsPendingRunApprovalsSectionProps {
  readonly projectId: string;
}

/**
 * Owner-only reopen list under Settings · Coding tools (below S0-2).
 * Reopens pending run approvals after the live popup was closed.
 */
export default function AwcProjectSettingsPendingRunApprovalsSection({
  projectId,
}: AwcProjectSettingsPendingRunApprovalsSectionProps) {
  const list = useProjectPendingRunApprovals(projectId);

  return (
    <section className="flex flex-col gap-2" aria-labelledby="p-set-ra-h">
      <h3
        id="p-set-ra-h"
        className="text-[13px] font-semibold text-awc-fg-muted dark:text-gray-400"
      >
        {C.heading}
      </h3>
      <p className="text-[13px] text-awc-fg-muted dark:text-gray-400">{C.hint}</p>
      {list.loadState === "loading" ? (
        <p className="text-sm text-awc-fg-muted dark:text-gray-400">{C.loading}</p>
      ) : null}
      {list.loadState === "error" ? (
        <p className="text-sm text-awc-fg-muted dark:text-gray-400">
          {C.loadError}{" "}
          <button
            type="button"
            onClick={list.reload}
            className="font-medium text-awc-fg underline dark:text-gray-200"
          >
            {C.retry}
          </button>
        </p>
      ) : null}
      {list.loadState === "ready" && list.approvals.length === 0 ? (
        <p className="text-sm text-awc-fg-muted dark:text-gray-400">{C.empty}</p>
      ) : null}
      {list.loadState === "ready" && list.approvals.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {list.approvals.map((item) => (
            <AwcPendingRunApprovalRow
              key={item.runId}
              item={item}
              busyRunId={list.busyRunId}
              actionError={list.actionError}
              actionErrorRunId={list.actionErrorRunId}
              onApprove={() => {
                void list.respond(item.runId, "approve");
              }}
              onDeny={() => {
                void list.respond(item.runId, "deny");
              }}
            />
          ))}
        </ul>
      ) : null}
    </section>
  );
}
