"use client";

import AwcHumanInviteAcceptShell from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptShell";
import {
  HUMAN_INVITE_EMAIL_COPY,
  fillHumanInviteEmailCopy,
} from "@/features/projects/access/humanInvites/humanInviteEmailCopy.constant";

export type AwcHumanInviteAwaitingApprovalViewProps = {
  readonly projectName: string;
  readonly inviterDisplayName: string;
};

/** Invitee accepted; the owner still has to Approve (108). */
export default function AwcHumanInviteAwaitingApprovalView({
  projectName,
  inviterDisplayName,
}: AwcHumanInviteAwaitingApprovalViewProps) {
  const copy = HUMAN_INVITE_EMAIL_COPY;
  return (
    <AwcHumanInviteAcceptShell projectName={projectName}>
      <h1 className="text-xl font-semibold" data-human-invite-awaiting-approval>
        {copy.awaitingTitle}
      </h1>
      <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
        {fillHumanInviteEmailCopy(copy.awaitingBody, {
          inviter: inviterDisplayName,
          projectName,
        })}
      </p>
    </AwcHumanInviteAcceptShell>
  );
}
