"use client";

import type { FormEvent } from "react";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AcceptAvatar } from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptParts";
import AwcHumanInviteNicknameField from "@/features/projects/access/humanInvites/AwcHumanInviteNicknameField";
import { HUMAN_INVITE_EMAIL_APPROVAL_HINT } from "@/features/projects/access/humanInvites/humanInviteEmailCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import { InviteCheckIcon } from "@/features/projects/access/humanInvites/inviteInlineIcons";

export type AwcHumanInviteAcceptSignedInFormProps = {
  readonly signedInEmail: string | null;
  readonly busy: boolean;
  readonly joinError: boolean;
  readonly nickname: string;
  readonly nicknameError: string | null;
  readonly onNicknameChange?: (value: string) => void;
  readonly onAccept?: () => void;
  readonly onSwitchAccount?: () => void;
  readonly requiresApproval?: boolean;
};

/** Signed-in "Joining as" + nickname + Join form for human invite accept. */
export default function AwcHumanInviteAcceptSignedInForm({
  signedInEmail,
  busy,
  joinError,
  nickname,
  nicknameError,
  onNicknameChange,
  onAccept,
  onSwitchAccount,
  requiresApproval = false,
}: AwcHumanInviteAcceptSignedInFormProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const email = signedInEmail ?? "you";

  return (
    <>
      <div className="flex min-w-0 items-center gap-2.5 rounded-[14px] border border-awc-border-strong bg-awc-surface px-3 py-2.5">
        <AcceptAvatar name={email} />
        <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">
          <span className="text-awc-fg-muted">{copy.joiningAs}</span>{" "}
          <b className="font-semibold">{email}</b>
        </span>
      </div>
      {joinError ? (
        <div
          role="alert"
          className="rounded-lg bg-awc-bad-soft px-4 py-3 text-sm text-awc-bad"
        >
          <b className="font-semibold">{copy.joinFailedTitle}</b>{" "}
          {copy.joinFailedBody}
        </div>
      ) : null}
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (!busy) onAccept?.();
        }}
      >
        <AwcHumanInviteNicknameField
          value={nickname}
          error={nicknameError}
          disabled={busy}
          onChange={onNicknameChange}
        />
        <button
          type="submit"
          id="join-btn"
          className={`${AWC_PROJECT_ACCESS_CTA.primary} mt-4 w-full gap-2`}
          disabled={busy}
        >
          {busy ? null : <InviteCheckIcon className="h-4 w-4" />}
          {busy ? copy.joining : copy.joinProject}
        </button>
      </form>
      {requiresApproval ? (
        <p className="text-sm text-awc-fg-muted">
          {HUMAN_INVITE_EMAIL_APPROVAL_HINT}
        </p>
      ) : null}
      <p className="text-sm text-awc-fg-muted">
        {copy.notYou}{" "}
        <button
          type="button"
          className="font-medium text-awc-blue-700 underline"
          onClick={onSwitchAccount}
        >
          {copy.signOutCta}
        </button>
      </p>
    </>
  );
}
