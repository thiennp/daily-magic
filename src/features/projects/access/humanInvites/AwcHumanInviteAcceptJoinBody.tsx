"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import AwcHumanInviteAcceptShell from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptShell";
import AwcHumanInviteAcceptSignedInForm from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptSignedInForm";
import {
  HUMAN_INVITE_UI_COPY,
  withMaskedEmail,
  withProjectName,
} from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanInviteAcceptJoinBodyProps = {
  readonly viewState: "signed_out" | "signed_in";
  readonly projectName: string;
  readonly inviterDisplayName: string;
  readonly role: HumanInviteRole;
  readonly expiresInLabel: string;
  readonly signedInEmail: string | null;
  readonly busy: boolean;
  readonly nickname: string;
  readonly nicknameError: string | null;
  readonly onNicknameChange?: (value: string) => void;
  readonly onAccept?: () => void;
  readonly onSignUp?: () => void;
  readonly onLogIn?: () => void;
  readonly requireEmailMatch: boolean;
  readonly invitedEmailMasked: string;
};

/** Signed-out / signed-in join UI for a usable human invite. */
export default function AwcHumanInviteAcceptJoinBody({
  viewState,
  projectName,
  inviterDisplayName,
  role,
  expiresInLabel,
  signedInEmail,
  busy,
  nickname,
  nicknameError,
  onNicknameChange,
  onAccept,
  onSignUp,
  onLogIn,
  requireEmailMatch,
  invitedEmailMasked,
}: AwcHumanInviteAcceptJoinBodyProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const roleLabel = role === "member" ? copy.roleMember : copy.roleViewer;
  const roleOneLiner =
    role === "member" ? copy.roleMemberOneLiner : copy.roleViewerOneLiner;

  return (
    <AwcHumanInviteAcceptShell projectName={projectName}>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
        {copy.acceptEyebrow}
      </p>
      <h1 className="mt-1 text-xl font-semibold">
        {withProjectName(copy.acceptJoinTitle, projectName)}
      </h1>
      <p className="mt-2 text-sm text-gray-700 dark:text-white/80">
        {inviterDisplayName} invited you as a {roleLabel}.
      </p>
      <p className="mt-1 text-xs text-gray-500">{roleOneLiner}</p>
      <p className="mt-2 text-xs text-gray-500">
        Invited by {inviterDisplayName} · {expiresInLabel}
      </p>

      {requireEmailMatch ? (
        <p className="mt-3 rounded-lg border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
          {withMaskedEmail(copy.emailLockSignedOutHint, invitedEmailMasked)}
        </p>
      ) : null}

      {viewState === "signed_out" ? (
        <>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {copy.acceptSignedOutHint}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className={AWC_PROJECT_ACCESS_CTA.primary}
              onClick={onSignUp}
            >
              {copy.signUp}
            </button>
            <button
              type="button"
              className={AWC_PROJECT_ACCESS_CTA.secondary}
              onClick={onLogIn}
            >
              {copy.logIn}
            </button>
          </div>
        </>
      ) : (
        <AwcHumanInviteAcceptSignedInForm
          inviterDisplayName={inviterDisplayName}
          roleLabel={roleLabel}
          signedInEmail={signedInEmail}
          busy={busy}
          nickname={nickname}
          nicknameError={nicknameError}
          onNicknameChange={onNicknameChange}
          onAccept={onAccept}
        />
      )}
    </AwcHumanInviteAcceptShell>
  );
}
