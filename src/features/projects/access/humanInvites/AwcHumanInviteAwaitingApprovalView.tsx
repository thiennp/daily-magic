"use client";

import AwcHumanInviteAcceptShell from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptShell";
import AwcHumanInviteStateCard from "@/features/projects/access/humanInvites/AwcHumanInviteStateCard";
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
      <div data-human-invite-awaiting-approval>
        <AwcHumanInviteStateCard
          icon="check"
          tone="ok"
          title={copy.awaitingTitle}
        >
          {fillHumanInviteEmailCopy(copy.awaitingBody, {
            inviter: inviterDisplayName,
            projectName,
          })}
        </AwcHumanInviteStateCard>
      </div>
    </AwcHumanInviteAcceptShell>
  );
}
