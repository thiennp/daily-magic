"use client";

import {
  OW_CARD_CLASS,
  OW_CARD_NEEDS_CLASS,
  OW_PRIMARY_BUTTON_CLASS,
  OW_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import AwcOneWindowApprovalStatusPill from "@/features/projects/messenger/oneWindow/AwcOneWindowApprovalStatusPill";
import AwcOneWindowApprovalResult from "@/features/projects/messenger/oneWindow/AwcOneWindowApprovalResult";
import AwcOneWindowApprovalRows from "@/features/projects/messenger/oneWindow/AwcOneWindowApprovalRows";
import { AwcProjectMembersInfoTip } from "@/features/projects/members/public-api/presentation";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

export type OneWindowApprovalKind = "run" | "join";
export type OneWindowApprovalStatus =
  "waiting" | "timedout" | "approved" | "denied";

export type OneWindowApprovalCardModel = {
  readonly id: string;
  readonly kind: OneWindowApprovalKind;
  readonly title: string;
  readonly whoLabel: string;
  readonly action: string;
  readonly folder?: string;
  readonly duration?: string;
  readonly computerLabel?: string;
  readonly email?: string;
  readonly status: OneWindowApprovalStatus;
  readonly timeLabel: string;
  readonly expiresLabel?: string;
  readonly note?: string;
  readonly decidedAt?: string;
  /** Assistant / person name for "Ask {name} again". */
  readonly whoName?: string;
};

interface AwcOneWindowApprovalCardProps {
  readonly model: OneWindowApprovalCardModel;
  readonly onApprove?: (id: string) => void;
  readonly onDeny?: (id: string) => void;
  /** Timed-out run approvals: nudge the assistant to ask again. */
  readonly onAskAgain?: (id: string) => void;
}

/** In-feed approval card — view of an existing record (Approve / Deny). */
export default function AwcOneWindowApprovalCard({
  model,
  onApprove,
  onDeny,
  onAskAgain,
}: AwcOneWindowApprovalCardProps) {
  const copy = ONE_WINDOW_FEED_COPY;
  const waiting = model.status === "waiting";
  const kindLab =
    model.kind === "run" ? copy.approvalRunKind : copy.approvalJoinKind;

  return (
    <article
      className={waiting ? OW_CARD_NEEDS_CLASS : OW_CARD_CLASS}
      aria-label={`Approval: ${model.title}`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2 text-[12.5px]">
        <span className="font-semibold uppercase tracking-wide text-awc-fg-subtle">
          {kindLab}
        </span>
        <AwcOneWindowApprovalStatusPill status={model.status} />
        <span className="ml-auto text-awc-fg-subtle">{model.timeLabel}</span>
        <AwcProjectMembersInfoTip id={`ow-appr-tip-${model.id}`}>
          {copy.approvalTip}
        </AwcProjectMembersInfoTip>
      </div>
      <h3 className="m-0 text-[15px] font-semibold text-awc-fg">
        {model.title}
      </h3>
      <p className="mt-1 text-[13px] text-awc-fg-muted">{model.whoLabel}</p>
      <AwcOneWindowApprovalRows model={model} />
      {waiting ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={OW_PRIMARY_BUTTON_CLASS}
            onClick={() => onApprove?.(model.id)}
          >
            {copy.approve}
          </button>
          <button
            type="button"
            className={OW_SECONDARY_BUTTON_CLASS}
            onClick={() => onDeny?.(model.id)}
          >
            {copy.deny}
          </button>
          {model.expiresLabel !== undefined ? (
            <span className="text-[12.5px] text-awc-fg-subtle">
              {model.expiresLabel}
            </span>
          ) : null}
        </div>
      ) : null}
      <AwcOneWindowApprovalResult model={model} />
      {model.note !== undefined ? (
        <p className="mt-2 text-[13px] text-awc-fg-muted">{model.note}</p>
      ) : null}
      {model.status === "timedout" && onAskAgain !== undefined ? (
        <button
          type="button"
          className={`mt-2 ${OW_SECONDARY_BUTTON_CLASS}`}
          onClick={() => onAskAgain(model.id)}
        >
          {copy.askAgain.replace("{name}", model.whoName ?? "")}
        </button>
      ) : null}
    </article>
  );
}
