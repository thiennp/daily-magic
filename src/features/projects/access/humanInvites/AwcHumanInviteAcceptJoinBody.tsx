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
  readonly requiresApproval?: boolean;
};

/** Signed-out / signed-in join UI — Claude Join-project HTML. */
export default function AwcHumanInviteAcceptJoinBody(
  props: AwcHumanInviteAcceptJoinBodyProps,
) {
  const copy = HUMAN_INVITE_UI_COPY;
  const roleLabel = props.role === "member" ? copy.roleMember : copy.roleViewer;
  const roleOneLiner =
    props.role === "member" ? copy.roleMemberOneLiner : copy.roleViewerOneLiner;

  return (
    <AwcHumanInviteAcceptShell projectName={props.projectName}>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
        {copy.acceptEyebrow}
      </p>
      <h1 className="mt-1 text-xl font-semibold">
        {withProjectName(copy.acceptJoinTitle, props.projectName)}
      </h1>
      <p className="mt-2 text-sm text-awc-fg dark:text-white/80">
        {props.inviterDisplayName} invited you as a {roleLabel}.
      </p>
      <p className="mt-1 text-xs text-awc-fg-muted">{roleOneLiner}</p>
      <p className="mt-2 text-xs text-awc-fg-muted">
        Invited by {props.inviterDisplayName} · {props.expiresInLabel}
      </p>
      {props.requireEmailMatch ? (
        <p className="mt-3 rounded-lg border border-awc-line bg-awc-surface-2 px-3 py-2 text-xs text-awc-fg">
          {withMaskedEmail(
            copy.emailLockSignedOutHint,
            props.invitedEmailMasked,
          )}
        </p>
      ) : null}
      {props.viewState === "signed_out" ? (
        <>
          <p className="mt-4 text-sm text-awc-fg-muted dark:text-gray-400">
            {copy.acceptSignedOutHint}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className={AWC_PROJECT_ACCESS_CTA.primary}
              onClick={props.onSignUp}
            >
              {copy.signUp}
            </button>
            <button
              type="button"
              className={AWC_PROJECT_ACCESS_CTA.secondary}
              onClick={props.onLogIn}
            >
              {copy.logIn}
            </button>
          </div>
        </>
      ) : (
        <AwcHumanInviteAcceptSignedInForm
          inviterDisplayName={props.inviterDisplayName}
          roleLabel={roleLabel}
          signedInEmail={props.signedInEmail}
          busy={props.busy}
          nickname={props.nickname}
          nicknameError={props.nicknameError}
          onNicknameChange={props.onNicknameChange}
          onAccept={props.onAccept}
          requiresApproval={props.requiresApproval === true}
        />
      )}
    </AwcHumanInviteAcceptShell>
  );
}
