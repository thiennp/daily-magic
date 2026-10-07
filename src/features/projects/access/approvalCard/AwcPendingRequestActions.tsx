import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";

export type PendingBusy = "approving" | "denying" | null;

interface AwcPendingRequestActionsProps {
  readonly busy: PendingBusy;
  readonly approveDisabled: boolean;
  readonly onApprove: () => void;
  readonly onDeny: () => void;
}

const BTN =
  "awc-focus-ring inline-flex min-h-[42px] items-center justify-center rounded-[10px] border px-[18px] py-2.5 text-[14px] font-semibold transition disabled:cursor-not-allowed disabled:border-transparent disabled:bg-awc-disabled-bg disabled:text-awc-disabled-fg";
const BTN_DENY = `${BTN} border-awc-border-strong bg-awc-surface text-awc-fg hover:border-awc-control-border`;
const BTN_APPROVE = `${BTN} border-transparent bg-awc-primary text-white hover:bg-awc-blue-700`;

/** Bottom action row: note, Deny (secondary), Approve (Pine primary). */
export default function AwcPendingRequestActions({
  busy,
  approveDisabled,
  onApprove,
  onDeny,
}: AwcPendingRequestActionsProps) {
  const working = busy !== null;
  return (
    <div className="grid grid-cols-2 items-center gap-2.5 @min-[520px]:flex @min-[520px]:flex-wrap @min-[520px]:justify-end">
      <span className="col-span-2 text-[12.5px] text-awc-fg-muted @min-[520px]:mr-auto">
        {C.removeNote}
      </span>
      <button type="button" className={BTN_DENY} disabled={working} onClick={onDeny}>
        {busy === "denying" ? C.denying : C.deny}
      </button>
      <button
        type="button"
        className={BTN_APPROVE}
        disabled={working || approveDisabled}
        onClick={onApprove}
      >
        {busy === "approving" ? C.approving : C.approve}
      </button>
    </div>
  );
}
