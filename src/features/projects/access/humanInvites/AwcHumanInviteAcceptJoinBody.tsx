"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import {
  AcceptFromRow,
  AcceptRoleBox,
} from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptParts";
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
  readonly signedInEmail: string | null;
  readonly busy: boolean;
  readonly joinError?: boolean;
  readonly nickname: string;
  readonly nicknameError: string | null;
  readonly onNicknameChange?: (value: string) => void;
  readonly onAccept?: () => void;
  readonly onSignUp?: () => void;
  readonly onLogIn?: () => void;
  readonly onSwitchAccount?: () => void;
  readonly requireEmailMatch: boolean;
  readonly invitedEmailMasked: string;
  readonly requiresApproval?: boolean;
};

/** Signed-out / signed-in join UI — Claude Join-project HTML. */
export default function AwcHumanInviteAcceptJoinBody(
  props: AwcHumanInviteAcceptJoinBodyProps,
) {
  const copy = HUMAN_INVITE_UI_COPY;
  const cta = `${AWC_PROJECT_ACCESS_CTA.primary} w-full`;

  return (
    <AwcHumanInviteAcceptShell projectName={props.projectName}>
      <AcceptFromRow inviter={props.inviterDisplayName} />
      <h1 id="h1" tabIndex={-1} className="text-xl font-bold tracking-tight">
        {withProjectName(copy.acceptJoinTitle, props.projectName)}
      </h1>
      <AcceptRoleBox role={props.role} />
      {props.requireEmailMatch ? (
        <p className="rounded-lg bg-awc-warn-soft px-3 py-2 text-xs text-awc-fg">
          {withMaskedEmail(
            copy.emailLockSignedOutHint,
            props.invitedEmailMasked,
          )}
        </p>
      ) : null}
      {props.viewState === "signed_out" ? (
        <>
          <h2 className="text-sm font-bold">{copy.signInToJoin}</h2>
          <p className="text-sm text-awc-fg-muted">
            {copy.acceptSignedOutHint}
          </p>
          <div className="flex flex-col gap-2">
            <button type="button" className={cta} onClick={props.onSignUp}>
              {copy.signUp}
            </button>
            <button
              type="button"
              className={`${AWC_PROJECT_ACCESS_CTA.secondary} w-full`}
              onClick={props.onLogIn}
            >
              {copy.logIn}
            </button>
          </div>
        </>
      ) : (
        <AwcHumanInviteAcceptSignedInForm
          signedInEmail={props.signedInEmail}
          busy={props.busy}
          joinError={props.joinError === true}
          nickname={props.nickname}
          nicknameError={props.nicknameError}
          onNicknameChange={props.onNicknameChange}
          onAccept={props.onAccept}
          onSwitchAccount={props.onSwitchAccount}
          requiresApproval={props.requiresApproval === true}
        />
      )}
    </AwcHumanInviteAcceptShell>
  );
}
