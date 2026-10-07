import {
  formatPendingResolved,
  type PendingDecision,
} from "@/features/projects/access/approvalCard/formatPendingApprovalCard";

interface AwcPendingResolvedRowProps {
  readonly decision: PendingDecision;
  readonly nickname: string;
  readonly requester: string;
}

const CHECK = "M5 12.5l4.5 4.5L19 7.5";
const CROSS = "M6 6l12 12M18 6 6 18";

/** After Approve / Deny succeeded: one calm status row (no Undo). */
export default function AwcPendingResolvedRow({
  decision,
  nickname,
  requester,
}: AwcPendingResolvedRowProps) {
  const ok = decision === "approved";
  const { title, sub } = formatPendingResolved(decision, { nickname, requester });
  return (
    <li
      className="flex items-center gap-3 rounded-[14px] border border-awc-border bg-awc-tile-2 px-4 py-4 @min-[520px]:px-5"
      role="status"
      data-pending-resolved={decision}
    >
      <span
        className={`grid size-8 shrink-0 place-items-center rounded-full ${
          ok ? "bg-awc-accent-soft" : "bg-awc-fill"
        }`}
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          className={`size-4 fill-none ${ok ? "stroke-awc-blue-800" : "stroke-awc-fg-muted"}`}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={ok ? CHECK : CROSS} />
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <b className="block font-semibold text-awc-fg">{title}</b>
        <span className="text-[13px] text-awc-fg-muted">{sub}</span>
      </span>
    </li>
  );
}
