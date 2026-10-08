"use client";

import AwcHumanInviteAcceptJoinBody from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptJoinBody";
import { isHumanInviteAcceptTerminalState } from "@/features/projects/access/humanInvites/utils/isHumanInviteAcceptTerminalState";
import AwcHumanInviteAcceptTerminalView from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptTerminalView";
import AwcHumanInviteEmailLockAcceptPanel from "@/features/projects/access/humanInvites/AwcHumanInviteEmailLockAcceptPanel";
import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type HumanInviteAcceptViewState =
  | "signed_out"
  | "signed_in"
  | "expired"
  | "used"
  | "revoked"
  | "already_member"
  | "invalid"
  | "email_mismatch"
  | "email_unverified"
  /** 108 — rendered by AwcHumanInviteAcceptPage (Request sent). */
  | "awaiting_approval";

export type AwcHumanInviteAcceptViewProps = {
  readonly viewState: HumanInviteAcceptViewState;
  readonly projectName: string;
  readonly inviterDisplayName: string;
  readonly role: HumanInviteRole;
  readonly signedInEmail?: string | null;
  readonly busy?: boolean;
  readonly joinError?: boolean;
  readonly nickname?: string;
  readonly nicknameError?: string | null;
  readonly onNicknameChange?: (value: string) => void;
  readonly onAccept?: () => void;
  readonly onSignUp?: () => void;
  readonly onLogIn?: () => void;
  readonly onOpenProject?: () => void;
  /** Peek/preview: locked invite warning before sign-in. */
  readonly requireEmailMatch?: boolean;
  readonly invitedEmailMasked?: string | null;
  readonly onSwitchAccount?: () => void;
  readonly requiresApproval?: boolean;
};

/** Presentational accept states — Product copy; wired by AwcHumanInviteAcceptPage. */
export default function AwcHumanInviteAcceptView({
  viewState,
  projectName,
  inviterDisplayName,
  role,
  signedInEmail = null,
  busy = false,
  nickname = "",
  nicknameError = null,
  onNicknameChange,
  onAccept,
  onSignUp,
  onLogIn,
  onOpenProject,
  requireEmailMatch = false,
  invitedEmailMasked = null,
  onSwitchAccount,
  joinError,
  requiresApproval,
}: AwcHumanInviteAcceptViewProps) {
  const masked = invitedEmailMasked?.trim() || "the invited email";

  if (viewState === "email_mismatch" || viewState === "email_unverified") {
    return (
      <AwcHumanInviteEmailLockAcceptPanel
        kind={viewState}
        projectName={projectName}
        invitedEmailMasked={masked}
        signedInEmail={signedInEmail}
        onSwitchAccount={onSwitchAccount}
      />
    );
  }

  if (viewState === "awaiting_approval") return null; // page renders it

  if (isHumanInviteAcceptTerminalState(viewState)) {
    return (
      <AwcHumanInviteAcceptTerminalView
        viewState={viewState}
        projectName={projectName}
        inviterDisplayName={inviterDisplayName}
        onOpenProject={onOpenProject}
      />
    );
  }

  return (
    <AwcHumanInviteAcceptJoinBody
      viewState={viewState}
      projectName={projectName}
      inviterDisplayName={inviterDisplayName}
      role={role}
      signedInEmail={signedInEmail}
      busy={busy}
      joinError={joinError}
      onSwitchAccount={onSwitchAccount}
      nickname={nickname}
      nicknameError={nicknameError}
      onNicknameChange={onNicknameChange}
      onAccept={onAccept}
      onSignUp={onSignUp}
      onLogIn={onLogIn}
      requireEmailMatch={requireEmailMatch}
      invitedEmailMasked={masked}
      requiresApproval={requiresApproval}
    />
  );
}
