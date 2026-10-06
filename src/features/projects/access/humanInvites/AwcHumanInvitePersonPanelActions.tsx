"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export type AwcHumanInvitePersonPanelActionsProps = {
  readonly busy: boolean;
  readonly onSubmitCreate: () => void;
  readonly onCancel?: () => void;
};

/** Cancel + Copy link + Send invite (Later) — Claude Invite-person actions. */
export default function AwcHumanInvitePersonPanelActions({
  busy,
  onSubmitCreate,
  onCancel,
}: AwcHumanInvitePersonPanelActionsProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.secondary}
        disabled={busy}
        onClick={onCancel}
      >
        {copy.cancel}
      </button>
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.secondary}
        disabled
        title="Email send — Later"
      >
        {copy.sendEmail}
        <span className="ml-1 rounded bg-amber-100 px-1 text-[10px] font-semibold text-amber-800">
          {copy.sendEmailLaterBadge}
        </span>
      </button>
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.primary}
        disabled={busy}
        onClick={onSubmitCreate}
      >
        {copy.copyLink}
      </button>
    </div>
  );
}
