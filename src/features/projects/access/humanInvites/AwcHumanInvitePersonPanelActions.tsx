"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { HUMAN_INVITE_EMAIL_COPY } from "@/features/projects/access/humanInvites/humanInviteEmailCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export type AwcHumanInvitePersonPanelActionsProps = {
  readonly busy: boolean;
  readonly onSubmitCreate: () => void;
  readonly onCancel?: () => void;
  /** DF-025: Email tab shows a live Send invite (primary); Copy link goes secondary. */
  readonly tab?: "email" | "link";
  readonly sendBusy?: boolean;
  readonly onSubmitSend?: () => void;
};

/** Cancel + Copy link + Send invite (live on the Email tab when wired) — Claude Invite-person actions. */
export default function AwcHumanInvitePersonPanelActions({
  busy,
  onSubmitCreate,
  onCancel,
  tab = "email",
  sendBusy = false,
  onSubmitSend,
}: AwcHumanInvitePersonPanelActionsProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const emailCopy = HUMAN_INVITE_EMAIL_COPY;
  const wired = onSubmitSend !== undefined;
  const canSend = wired && tab === "email";
  const anyBusy = busy || sendBusy;
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.secondary}
        disabled={anyBusy}
        onClick={onCancel}
      >
        {copy.cancel}
      </button>
      {wired ? null : (
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          disabled
          title="Email send — Later"
        >
          {copy.sendEmail}
          <span className="ml-1 rounded bg-awc-tile-2 px-1 text-[10px] font-semibold text-awc-fg-muted">
            {copy.sendEmailLaterBadge}
          </span>
        </button>
      )}
      <button
        type="button"
        className={
          canSend
            ? AWC_PROJECT_ACCESS_CTA.secondary
            : AWC_PROJECT_ACCESS_CTA.primary
        }
        disabled={anyBusy}
        onClick={onSubmitCreate}
      >
        {copy.copyLink}
      </button>
      {canSend ? (
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.primary}
          disabled={anyBusy}
          onClick={onSubmitSend}
          data-human-invite-send
        >
          {sendBusy ? emailCopy.sending : emailCopy.sendInvite}
        </button>
      ) : null}
    </div>
  );
}
