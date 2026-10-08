"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { HUMAN_INVITE_PERSON_FLOW_COPY } from "@/features/projects/access/humanInvites/humanInvitePersonFlowCopy.constant";
import { InviteCheckIcon } from "@/features/projects/access/humanInvites/inviteInlineIcons";

export type AwcHumanInviteSentViewProps = {
  readonly emails: readonly string[];
  readonly roleLabel: string;
  readonly onCopyLink: () => void;
  readonly onAnother: () => void;
  readonly onDone?: () => void;
};

/** Invite sent state — Claude Invite-person done card. */
export default function AwcHumanInviteSentView({
  emails,
  roleLabel,
  onCopyLink,
  onAnother,
  onDone,
}: AwcHumanInviteSentViewProps) {
  const copy = HUMAN_INVITE_PERSON_FLOW_COPY;
  return (
    <>
      <div role="status" className="flex items-start gap-3">
        <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-awc-ok-soft text-awc-ok">
          <InviteCheckIcon className="h-6 w-6" />
        </span>
        <div>
          <h2 className="text-lg font-semibold" id="inv-done-h" tabIndex={-1}>
            {emails.length === 1
              ? copy.inviteSent
              : `${emails.length} ${copy.invitesSent}`}
          </h2>
          <p className="text-sm text-awc-fg-muted">
            {emails.join(", ")} · {roleLabel}. {copy.sentBody}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          className={`${AWC_PROJECT_ACCESS_CTA.secondary} mr-auto`}
          onClick={onCopyLink}
        >
          {copy.copyLink}
        </button>
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          onClick={onAnother}
        >
          {copy.inviteAnother}
        </button>
        <button
          type="button"
          id="inv-done"
          className={AWC_PROJECT_ACCESS_CTA.primary}
          onClick={onDone}
        >
          {copy.done}
        </button>
      </div>
    </>
  );
}
