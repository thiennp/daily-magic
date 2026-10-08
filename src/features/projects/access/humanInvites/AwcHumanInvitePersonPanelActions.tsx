"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { HUMAN_INVITE_EMAIL_COPY } from "@/features/projects/access/humanInvites/humanInviteEmailCopy.constant";
import { HUMAN_INVITE_PERSON_FLOW_COPY } from "@/features/projects/access/humanInvites/humanInvitePersonFlowCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export type AwcHumanInvitePersonPanelActionsProps = {
  readonly busy: boolean;
  readonly onSubmitCreate: () => void;
  readonly onCancel?: () => void;
  /** DF-025: Email tab shows a live Send invite (primary) when wired. */
  readonly tab?: "email" | "link";
  readonly sendBusy?: boolean;
  readonly onSubmitSend?: () => void;
  /** The one-time link is showing; its banner carries Copy link. */
  readonly linkReady?: boolean;
};

/** Copy link + Send invite (Later when not wired) + muted Cancel / Close. */
export default function AwcHumanInvitePersonPanelActions({
  busy,
  onSubmitCreate,
  onCancel,
  tab = "email",
  sendBusy = false,
  onSubmitSend,
  linkReady = false,
}: AwcHumanInvitePersonPanelActionsProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const wired = onSubmitSend !== undefined;
  const canSend = wired && tab === "email";
  const anyBusy = busy || sendBusy;
  const cta = AWC_PROJECT_ACCESS_CTA;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {linkReady ? null : (
        <button
          type="button"
          className={canSend ? cta.secondary : cta.primary}
          disabled={anyBusy}
          onClick={onSubmitCreate}
        >
          {busy ? "Making link…" : copy.copyLink}
        </button>
      )}
      {canSend ? (
        <button
          type="button"
          className={cta.primary}
          disabled={anyBusy}
          onClick={onSubmitSend}
          data-human-invite-send
        >
          {sendBusy
            ? HUMAN_INVITE_EMAIL_COPY.sending
            : HUMAN_INVITE_EMAIL_COPY.sendInvite}
        </button>
      ) : null}
      {wired ? null : (
        <button
          type="button"
          className={cta.secondary}
          disabled
          title="Email sending comes later"
        >
          {copy.sendEmail}
          <span className="ml-1 rounded bg-awc-tile-2 px-1 text-[10px] font-semibold text-awc-fg-muted">
            {copy.sendEmailLaterBadge}
          </span>
        </button>
      )}
      <button
        type="button"
        className="ml-auto text-xs font-medium text-awc-fg-muted underline-offset-2 hover:text-awc-fg hover:underline disabled:opacity-50"
        disabled={anyBusy}
        onClick={onCancel}
      >
        {linkReady ? HUMAN_INVITE_PERSON_FLOW_COPY.close : copy.cancel}
      </button>
    </div>
  );
}
