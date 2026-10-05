"use client";

import type { FormEvent, ReactNode } from "react";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import AwcHumanInviteNicknameField from "@/features/projects/access/humanInvites/AwcHumanInviteNicknameField";
import {
  HUMAN_INVITE_UI_COPY,
  withProjectName,
} from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type HumanInviteAcceptViewState =
  | "signed_out"
  | "signed_in"
  | "expired"
  | "used"
  | "revoked"
  | "already_member"
  | "invalid";

export type AwcHumanInviteAcceptViewProps = {
  readonly viewState: HumanInviteAcceptViewState;
  readonly projectName: string;
  readonly inviterDisplayName: string;
  readonly role: HumanInviteRole;
  readonly expiresInLabel?: string;
  readonly signedInEmail?: string | null;
  readonly busy?: boolean;
  /** Project nickname (required for humans; prefilled from account name). */
  readonly nickname?: string;
  readonly nicknameError?: string | null;
  readonly onNicknameChange?: (value: string) => void;
  readonly onAccept?: () => void;
  readonly onSignUp?: () => void;
  readonly onLogIn?: () => void;
  readonly onOpenProject?: () => void;
};

/** Presentational accept states — Product copy; wired by AwcHumanInviteAcceptPage. */
export default function AwcHumanInviteAcceptView({
  viewState,
  projectName,
  inviterDisplayName,
  role,
  expiresInLabel = "expires soon",
  signedInEmail = null,
  busy = false,
  nickname = "",
  nicknameError = null,
  onNicknameChange,
  onAccept,
  onSignUp,
  onLogIn,
  onOpenProject,
}: AwcHumanInviteAcceptViewProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const roleLabel = role === "member" ? copy.roleMember : copy.roleViewer;
  const roleOneLiner =
    role === "member" ? copy.roleMemberOneLiner : copy.roleViewerOneLiner;

  if (viewState === "invalid") {
    return (
      <AcceptShell projectName={projectName}>
        <h1 className="text-xl font-semibold">{copy.invalidInviteTitle}</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {copy.invalidInviteBody}
        </p>
      </AcceptShell>
    );
  }

  if (viewState === "expired") {
    return (
      <AcceptShell badge={copy.badgeExpired} projectName={projectName}>
        <h1 className="text-xl font-semibold">{copy.expiredTitle}</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Ask {inviterDisplayName} for a new invite to {projectName}. Expired
          links cannot be reused.
        </p>
      </AcceptShell>
    );
  }

  if (viewState === "used") {
    return (
      <AcceptShell badge={copy.badgeUsed} projectName={projectName}>
        <h1 className="text-xl font-semibold">{copy.usedTitle}</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Someone already joined with this link. Ask {inviterDisplayName} to
          send a fresh invite if you still need access.
        </p>
      </AcceptShell>
    );
  }

  if (viewState === "revoked") {
    return (
      <AcceptShell badge={copy.badgeRevoked} projectName={projectName}>
        <h1 className="text-xl font-semibold">{copy.revokedTitle}</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {inviterDisplayName} revoked this invite. It no longer works. Ask for
          a new one if you still need to join.
        </p>
      </AcceptShell>
    );
  }

  if (viewState === "already_member") {
    return (
      <AcceptShell projectName={projectName}>
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
      </AcceptShell>
    );
  }

  return (
    <AcceptShell projectName={projectName}>
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
        <>
          <p className="mt-4 text-sm text-gray-700 dark:text-white/80">
            You&apos;re signed in as {signedInEmail ?? "you"}.{" "}
            {inviterDisplayName} invited you as a {roleLabel}.
          </p>
          <p className="mt-1 text-xs text-gray-500">{copy.acceptSignedInHint}</p>
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
      )}
    </AcceptShell>
  );
}

const AcceptShell = ({
  children,
  badge,
  projectName,
}: {
  readonly children: ReactNode;
  readonly badge?: string;
  readonly projectName: string;
}) => (
  <main className="mx-auto max-w-xl px-4 py-12 text-gray-900 dark:text-white">
    {badge ? (
      <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
        {badge} · {projectName}
      </p>
    ) : null}
    {children}
  </main>
);
