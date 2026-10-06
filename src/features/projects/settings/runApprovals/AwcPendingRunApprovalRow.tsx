"use client";

import Button from "@/components/ui/button/Button";
import {
  formatDispatchApprovalCardTitle,
  formatDispatchApprovalFolderLine,
} from "@/features/dispatch/utils/formatDispatchApprovalCardTitle";
import { AWC_PENDING_APPROVAL_CARD_COPY } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import { RUN_APPROVALS_COPY as C } from "@/features/projects/settings/runApprovals/runApprovalsCopy.constant";
import { resolveRunApprovalActionReason } from "@/features/projects/settings/runApprovals/resolveRunApprovalActionReason";
import type { RunApprovalListItem } from "@/features/projects/settings/runApprovals/runApprovalListItem.type";

interface AwcPendingRunApprovalRowProps {
  readonly item: RunApprovalListItem;
  readonly busyRunId: string | null;
  readonly actionError: string | null;
  readonly actionErrorRunId: string | null;
  readonly onApprove: () => void;
  readonly onDeny: () => void;
}

/** One pending task row with Approve / Deny (same verbs as the live popup). */
export default function AwcPendingRunApprovalRow({
  item,
  busyRunId,
  actionError,
  actionErrorRunId,
  onApprove,
  onDeny,
}: AwcPendingRunApprovalRowProps) {
  const disabled = busyRunId !== null;
  const reason = resolveRunApprovalActionReason({
    busyRunId,
    actionError,
    actionErrorRunId,
    forRunId: item.runId,
  });
  const title = formatDispatchApprovalCardTitle({
    requester: item.requesterLabel,
    tool: item.tool,
    computerName: item.computerName,
  });
  const folderLine = formatDispatchApprovalFolderLine(item.projectFolder);
  const promptPreview =
    item.prompt.trim().length > 0 ? item.prompt.trim() : C.promptFallback;

  return (
    <li className="rounded-xl border border-gray-200/80 p-3 dark:border-gray-800/80">
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        {title}
      </p>
      {folderLine !== null ? (
        <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400">
          {folderLine}
        </p>
      ) : null}
      <pre className="mt-2 max-h-24 overflow-auto rounded-lg bg-gray-50 p-2 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {promptPreview}
      </pre>
      <div className="mt-3 flex flex-wrap justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onDeny}
          disabled={disabled}
        >
          {AWC_PENDING_APPROVAL_CARD_COPY.deny}
        </Button>
        <Button size="sm" onClick={onApprove} disabled={disabled}>
          {AWC_PENDING_APPROVAL_CARD_COPY.approve}
        </Button>
      </div>
      {reason !== null ? (
        <p role="status" className="mt-2 text-[13px] text-gray-500 dark:text-gray-400">
          {reason}
        </p>
      ) : null}
    </li>
  );
}
