import {
  OW_CARD_CLASS,
  OW_CARD_NEEDS_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

interface AwcOneWindowApprovalEntryProps {
  readonly kind: "approval_request" | "approval_result";
  readonly who: string;
  readonly text: string;
  readonly timeLabel: string;
}

/**
 * P1-S5: OW9 `approval_request` / `approval_result` feed rows. The contract
 * lists both kinds but Dispatch produces none yet (run approvals are task
 * rows with awaitingApproval), so this lights up once they arrive. A view of
 * the row's own text only: deciding stays in Approvals (no record id here).
 */
export default function AwcOneWindowApprovalEntry({
  kind,
  who,
  text,
  timeLabel,
}: AwcOneWindowApprovalEntryProps) {
  const copy = ONE_WINDOW_FEED_COPY;
  const waiting = kind === "approval_request";
  return (
    <article
      className={waiting ? OW_CARD_NEEDS_CLASS : OW_CARD_CLASS}
      aria-label={`${copy.approvalKind} at ${timeLabel}`}
      data-ow-window-kind={kind}
    >
      <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[12.5px]">
        <span className="font-semibold uppercase tracking-wide text-awc-fg-subtle">
          {copy.approvalKind}
        </span>
        {waiting ? (
          <span className="rounded-full bg-awc-warn-soft px-2 py-0.5 font-medium text-awc-warn">
            {copy.waitingForYou}
          </span>
        ) : null}
        <span className="text-awc-fg-subtle">{timeLabel}</span>
      </div>
      <p className="whitespace-pre-wrap break-words text-sm text-awc-fg">
        <b>{who}</b> {text}
      </p>
    </article>
  );
}
