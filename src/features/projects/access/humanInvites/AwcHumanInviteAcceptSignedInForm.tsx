"use client";

import type { FormEvent } from "react";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import AwcHumanInviteNicknameField from "@/features/projects/access/humanInvites/AwcHumanInviteNicknameField";
import { HUMAN_INVITE_EMAIL_APPROVAL_HINT } from "@/features/projects/access/humanInvites/humanInviteEmailCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export type AwcHumanInviteAcceptSignedInFormProps = {
  readonly inviterDisplayName: string;
  readonly roleLabel: string;
  readonly signedInEmail: string | null;
  readonly busy: boolean;
  readonly nickname: string;
  readonly nicknameError: string | null;
  readonly onNicknameChange?: (value: string) => void;
  readonly onAccept?: () => void;
  readonly requiresApproval?: boolean;
};

/** Signed-in nickname + Join form for human invite accept. */
export default function AwcHumanInviteAcceptSignedInForm({
  inviterDisplayName,
  roleLabel,
  signedInEmail,
  busy,
  nickname,
  nicknameError,
  onNicknameChange,
  onAccept,
  requiresApproval = false,
}: AwcHumanInviteAcceptSignedInFormProps) {
  const copy = HUMAN_INVITE_UI_COPY;

  return (
    <>
      <p className="mt-4 text-sm text-awc-fg dark:text-white/80">
        You&apos;re signed in as {signedInEmail ?? "you"}. {inviterDisplayName}{" "}
        invited you as a {roleLabel}.
      </p>
      <p className="mt-1 text-xs text-awc-fg-muted">
        {requiresApproval
          ? HUMAN_INVITE_EMAIL_APPROVAL_HINT
          : copy.acceptSignedInHint}
      </p>
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
          className={`${AWC_PROJECT_ACCESS_CTA.primary} mt-4`}
          disabled={busy}
        >
          {busy ? copy.joining : copy.joinProject}
        </button>
      </form>
    </>
  );
}
