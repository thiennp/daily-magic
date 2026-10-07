"use client";

import { HUMAN_INVITE_EMAIL_COPY } from "@/features/projects/access/humanInvites/humanInviteEmailCopy.constant";
import type { HumanInviteListItem } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanAwaitingApprovalRowProps = {
  readonly invite: HumanInviteListItem;
  readonly busy?: boolean;
  readonly onApprove?: (inviteId: string, name: string) => void;
  readonly onDeny?: (inviteId: string, name: string) => void;
};

/** Same chrome + buttons as the assistant "Wants to join" row (AwcProjectAccessPendingRow). */
const BTN_DENY =
  "awc-focus-ring inline-flex items-center justify-center rounded-lg border border-awc-border-strong bg-awc-surface px-3 py-1.5 text-[13px] font-semibold text-awc-fg transition hover:bg-awc-tile disabled:opacity-60";
const BTN_APPROVE =
  "awc-focus-ring inline-flex items-center justify-center rounded-lg border border-awc-blue-600 bg-awc-primary px-3 py-1.5 text-[13px] font-semibold text-white transition hover:opacity-90 disabled:opacity-60";

/** Person accepted an invite that needs owner Approve — Deny + Approve. */
export default function AwcHumanAwaitingApprovalRow({
  invite,
  busy = false,
  onApprove,
  onDeny,
}: AwcHumanAwaitingApprovalRowProps) {
  const copy = HUMAN_INVITE_EMAIL_COPY;
  const name =
    invite.acceptedDisplayName?.trim() || invite.email?.trim() || "Someone";
  const showEmail = invite.email !== null && invite.email.trim() !== name;

  return (
    <li
      className="rounded-[10px] border border-awc-accent-soft-2 bg-awc-accent-soft p-2.5"
      data-human-invite-awaiting
    >
      <div className="flex flex-wrap items-center gap-2.5 text-sm">
        <span
          className="grid size-8 shrink-0 place-items-center rounded-full bg-awc-tile-2 text-[13px] font-semibold text-awc-fg-muted"
          aria-hidden
        >
          {name.slice(0, 1).toUpperCase()}
        </span>
        <span className="min-w-0 flex-1 text-awc-fg">
          <span className="block truncate font-semibold">{name}</span>
          <span className="mt-0.5 block text-[12.5px] font-normal text-awc-fg-subtle">
            {copy.wantsToJoin}
            {showEmail ? ` · ${invite.email}` : ""}
            {` · ${invite.role === "viewer" ? "Viewer" : "Member"}`}
          </span>
        </span>
        <span className="flex shrink-0 gap-1.5">
          <button
            type="button"
            className={BTN_DENY}
            disabled={busy}
            onClick={() => onDeny?.(invite.inviteId, name)}
          >
            {copy.deny}
          </button>
          <button
            type="button"
            className={BTN_APPROVE}
            disabled={busy}
            onClick={() => onApprove?.(invite.inviteId, name)}
          >
            {copy.approve}
          </button>
        </span>
      </div>
    </li>
  );
}
