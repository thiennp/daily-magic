import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import {
  formatPendingApprovalMode,
  formatPendingApprovalWhoLine,
} from "@/features/projects/access/approvalCard/formatPendingApprovalCard";
import type { PendingApprovalCardMeta } from "@/lib/projects/acl/approvalCard/PendingApprovalCardMeta.type";

interface AwcPendingApprovalDetailsProps {
  readonly assistantName: string;
  readonly card: PendingApprovalCardMeta;
}

const labelClass = "text-[11px] font-semibold text-gray-500 dark:text-gray-400";
const valueClass = "text-[12px] text-gray-700 dark:text-gray-200";

/** Who is asking / What it can do / mode — read-only; never grants access. */
export default function AwcPendingApprovalDetails({
  assistantName,
  card,
}: AwcPendingApprovalDetailsProps) {
  const mode = formatPendingApprovalMode(card);
  return (
    <dl className="mt-2 space-y-1.5" data-pending-approval-card>
      <div>
        <dt className={labelClass}>{C.whoLabel}</dt>
        <dd className={valueClass}>
          {formatPendingApprovalWhoLine({ assistantName, card })}
        </dd>
      </div>
      <div>
        <dt className={labelClass}>{C.canDoLabel}</dt>
        <dd className={valueClass}>{C.canDoBody}</dd>
      </div>
      {mode !== null ? (
        <div>
          <dd className={valueClass} data-pending-approval-mode>
            {mode}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
