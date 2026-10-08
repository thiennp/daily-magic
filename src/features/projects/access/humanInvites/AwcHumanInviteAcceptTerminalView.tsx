"use client";

import Link from "next/link";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import AwcHumanInviteAcceptShell from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptShell";
import AwcHumanInviteStateCard from "@/features/projects/access/humanInvites/AwcHumanInviteStateCard";
import {
  HUMAN_INVITE_UI_COPY,
  withProjectName,
} from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export type HumanInviteAcceptTerminalState =
  "expired" | "used" | "revoked" | "already_member" | "invalid";

export type AwcHumanInviteAcceptTerminalViewProps = {
  readonly viewState: HumanInviteAcceptTerminalState;
  readonly projectName: string;
  readonly inviterDisplayName: string;
  readonly onOpenProject?: () => void;
};

/** Terminal accept states — invite not joinable from this link. */
export default function AwcHumanInviteAcceptTerminalView({
  viewState,
  projectName,
  inviterDisplayName,
  onOpenProject,
}: AwcHumanInviteAcceptTerminalViewProps) {
  const copy = HUMAN_INVITE_UI_COPY;

  return (
    <AwcHumanInviteAcceptShell projectName={projectName}>
      {viewState === "invalid" ? (
        <AwcHumanInviteStateCard
          icon="alert"
          tone="bad"
          title={copy.invalidInviteTitle}
        >
          {copy.invalidInviteBody}
        </AwcHumanInviteStateCard>
      ) : null}
      {viewState === "expired" ? (
        <AwcHumanInviteStateCard
          icon="clock"
          tone="warn"
          title={copy.expiredTitle}
        >
          Invites work for 7 days. Ask {inviterDisplayName} for a new one.
        </AwcHumanInviteStateCard>
      ) : null}
      {viewState === "used" ? (
        <AwcHumanInviteStateCard
          icon="users"
          tone="warn"
          title={copy.usedTitle}
        >
          Someone already joined with this link. Ask {inviterDisplayName} to
          send a fresh invite if you still need access.
        </AwcHumanInviteStateCard>
      ) : null}
      {viewState === "revoked" ? (
        <AwcHumanInviteStateCard
          icon="x"
          tone="bad"
          title={copy.revokedTitle}
          actions={
            <Link href="/" className={AWC_PROJECT_ACCESS_CTA.secondary}>
              {copy.goHome}
            </Link>
          }
        >
          The owner took it back. Ask {inviterDisplayName} if you think this is
          a mistake.
        </AwcHumanInviteStateCard>
      ) : null}
      {viewState === "already_member" ? (
        <AwcHumanInviteStateCard
          icon="users"
          tone="ok"
          title={copy.alreadyMemberTitle}
          actions={
            <button
              type="button"
              className={AWC_PROJECT_ACCESS_CTA.primary}
              onClick={onOpenProject}
            >
              {copy.openProject}
            </button>
          }
        >
          {withProjectName(copy.alreadyMemberBody, projectName)}
        </AwcHumanInviteStateCard>
      ) : null}
    </AwcHumanInviteAcceptShell>
  );
}
