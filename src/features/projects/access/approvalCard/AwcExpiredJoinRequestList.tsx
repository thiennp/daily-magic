import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import {
  formatExpiredJoinRequestBody,
  pendingAssistantName,
} from "@/features/projects/access/approvalCard/formatPendingApprovalCard";
import type { AwcProjectAccessPending } from "@/features/projects/access/hooks/loadAwcProjectAccess";

interface AwcExpiredJoinRequestListProps {
  readonly expired: readonly AwcProjectAccessPending[];
}

/** Expired join requests (last 24h): no Approve / Deny — must start again. */
export default function AwcExpiredJoinRequestList({
  expired,
}: AwcExpiredJoinRequestListProps) {
  if (expired.length === 0) return null;
  return (
    <ul className="mt-2 space-y-2" data-expired-join-requests>
      {expired.map((req) => (
        <li
          key={req.id}
          className="rounded-md border border-gray-200/80 p-2 text-sm dark:border-gray-800/80"
        >
          <span className="block text-gray-800 dark:text-white/90">
            {pendingAssistantName(req)}
          </span>
          <span className="mt-0.5 block text-[12px] font-semibold text-gray-600 dark:text-gray-300">
            {C.expiredTitle}
          </span>
          <span className="block text-[12px] text-gray-500 dark:text-gray-400">
            {formatExpiredJoinRequestBody(req.approvalCard)}
          </span>
        </li>
      ))}
    </ul>
  );
}
