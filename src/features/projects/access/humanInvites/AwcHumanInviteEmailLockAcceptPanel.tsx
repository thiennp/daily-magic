"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import {
  HUMAN_INVITE_UI_COPY,
  withMaskedEmail,
} from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export type AwcHumanInviteEmailLockAcceptPanelProps = {
  readonly kind: "email_mismatch" | "email_unverified";
  readonly projectName: string;
  readonly invitedEmailMasked: string;
  readonly onSwitchAccount?: () => void;
};

/** Email-lock accept errors — invite stays usable; offer switch account. */
export default function AwcHumanInviteEmailLockAcceptPanel({
  kind,
  projectName,
  invitedEmailMasked,
  onSwitchAccount,
}: AwcHumanInviteEmailLockAcceptPanelProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const title =
    kind === "email_mismatch"
      ? copy.emailMismatchTitle
      : copy.emailUnverifiedTitle;
  const body = withMaskedEmail(
    kind === "email_mismatch"
      ? copy.emailMismatchBody
      : copy.emailUnverifiedBody,
    invitedEmailMasked,
  );

  return (
    <main className="mx-auto max-w-xl px-4 py-12 text-awc-fg dark:text-white">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-awc-tile-2 px-3 py-1 text-xs font-semibold text-awc-fg-muted">
        {copy.pendingEmailLocked} · {projectName}
      </p>
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">{body}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.primary}
          onClick={onSwitchAccount}
        >
          {copy.switchAccount}
        </button>
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          onClick={onSwitchAccount}
        >
          {copy.signOutCta}
        </button>
      </div>
    </main>
  );
}
