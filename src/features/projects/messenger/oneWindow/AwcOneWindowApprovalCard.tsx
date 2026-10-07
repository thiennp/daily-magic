"use client";

import {
  OW_CARD_CLASS,
  OW_CARD_NEEDS_CLASS,
  OW_PRIMARY_BUTTON_CLASS,
  OW_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

export type OneWindowApprovalKind = "run" | "join";
export type OneWindowApprovalStatus =
  | "waiting"
  | "timedout"
  | "approved"
  | "denied";

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
};

interface AwcOneWindowApprovalCardProps {
  readonly model: OneWindowApprovalCardModel;
  readonly onApprove?: (id: string) => void;
  readonly onDeny?: (id: string) => void;
}

/** In-feed approval card — view of an existing record (Approve / Deny). */
export default function AwcOneWindowApprovalCard({
  model,
  onApprove,
  onDeny,
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
        {waiting ? (
          <span className="rounded-full bg-awc-warn-soft px-2 py-0.5 text-awc-warn">
            {copy.waitingForYou}
          </span>
        ) : null}
        {model.status === "timedout" ? (
          <span className="rounded-full bg-awc-tile-2 px-2 py-0.5 text-awc-fg-muted">
            {copy.timedOut}
          </span>
        ) : null}
        <span className="ml-auto text-awc-fg-subtle">{model.timeLabel}</span>
      </div>
      <h3 className="m-0 text-[15px] font-semibold text-awc-fg">{model.title}</h3>
      <p className="mt-1 text-[13px] text-awc-fg-muted">{model.whoLabel}</p>
      <dl className="mt-2 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 text-[13px]">
        <dt className="text-awc-fg-subtle">Wants to</dt>
        <dd className="m-0 text-awc-fg">{model.action}</dd>
        {model.folder !== undefined ? (
          <>
            <dt className="text-awc-fg-subtle">Folder</dt>
            <dd className="m-0 font-mono text-[12.5px] text-awc-fg">{model.folder}</dd>
          </>
        ) : null}
        {model.computerLabel !== undefined ? (
          <>
            <dt className="text-awc-fg-subtle">Computer</dt>
            <dd className="m-0 text-awc-fg">{model.computerLabel}</dd>
          </>
        ) : null}
      </dl>
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
            <span className="text-[12.5px] text-awc-fg-subtle">{model.expiresLabel}</span>
          ) : null}
        </div>
      ) : null}
      {model.note !== undefined ? (
        <p className="mt-2 text-[13px] text-awc-fg-muted">{model.note}</p>
      ) : null}
    </article>
  );
}
