"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import AwcHumanInviteAcceptShell from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptShell";
import {
  HUMAN_INVITE_UI_COPY,
  withProjectName,
} from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export type HumanInviteAcceptTerminalState =
  | "expired"
  | "used"
  | "revoked"
  | "already_member"
  | "invalid";

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

  if (viewState === "invalid") {
    return (
      <AwcHumanInviteAcceptShell projectName={projectName}>
        <h1 className="text-xl font-semibold">{copy.invalidInviteTitle}</h1>
        <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
          {copy.invalidInviteBody}
        </p>
      </AwcHumanInviteAcceptShell>
    );
  }

  if (viewState === "expired") {
    return (
      <AwcHumanInviteAcceptShell badge={copy.badgeExpired} projectName={projectName}>
        <h1 className="text-xl font-semibold">{copy.expiredTitle}</h1>
        <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
          Ask {inviterDisplayName} for a new invite to {projectName}. Expired
          links cannot be reused.
        </p>
      </AwcHumanInviteAcceptShell>
    );
  }

  if (viewState === "used") {
    return (
      <AwcHumanInviteAcceptShell badge={copy.badgeUsed} projectName={projectName}>
        <h1 className="text-xl font-semibold">{copy.usedTitle}</h1>
        <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
          Someone already joined with this link. Ask {inviterDisplayName} to
          send a fresh invite if you still need access.
        </p>
      </AwcHumanInviteAcceptShell>
    );
  }

  if (viewState === "revoked") {
    return (
      <AwcHumanInviteAcceptShell badge={copy.badgeRevoked} projectName={projectName}>
        <h1 className="text-xl font-semibold">{copy.revokedTitle}</h1>
        <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
          {inviterDisplayName} revoked this invite. It no longer works. Ask for
          a new one if you still need to join.
        </p>
      </AwcHumanInviteAcceptShell>
    );
  }

  return (
    <AwcHumanInviteAcceptShell projectName={projectName}>
      <h1 className="text-xl font-semibold">
        {withProjectName(copy.alreadyMemberTitle, projectName)}
      </h1>
      <button
        type="button"
        className={`${AWC_PROJECT_ACCESS_CTA.primary} mt-4`}
        onClick={onOpenProject}
      >
        {copy.openProject}
      </button>
    </AwcHumanInviteAcceptShell>
  );
}
