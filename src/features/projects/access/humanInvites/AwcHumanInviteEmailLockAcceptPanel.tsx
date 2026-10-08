"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import AwcHumanInviteAcceptShell from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptShell";
import {
  HUMAN_INVITE_UI_COPY,
  withMaskedEmail,
} from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export type AwcHumanInviteEmailLockAcceptPanelProps = {
  readonly kind: "email_mismatch" | "email_unverified";
  readonly projectName: string;
  readonly invitedEmailMasked: string;
  readonly signedInEmail?: string | null;
  readonly onSwitchAccount?: () => void;
};

/** Email-lock accept errors — Wrong account banner + Switch account (invite stays usable). */
export default function AwcHumanInviteEmailLockAcceptPanel({
  kind,
  projectName,
  invitedEmailMasked,
  signedInEmail = null,
  onSwitchAccount,
}: AwcHumanInviteEmailLockAcceptPanelProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const mismatch = kind === "email_mismatch";

  return (
    <AwcHumanInviteAcceptShell projectName={projectName}>
      <h1 id="h1" tabIndex={-1} className="text-xl font-bold tracking-tight">
        {mismatch ? copy.emailMismatchTitle : copy.emailUnverifiedTitle}
      </h1>
      <div
        role="status"
        className="rounded-lg bg-awc-warn-soft px-4 py-3 text-sm text-awc-fg"
      >
        {mismatch ? (
          <>
            <b className="font-semibold">
              {withMaskedEmail(copy.emailMismatchBody, invitedEmailMasked)}
            </b>
            {signedInEmail
              ? ` ${copy.emailMismatchSignedIn.replace("{email}", signedInEmail)}`
              : ""}
          </>
        ) : (
          withMaskedEmail(copy.emailUnverifiedBody, invitedEmailMasked)
        )}
      </div>
      <button
        type="button"
        className={`${AWC_PROJECT_ACCESS_CTA.primary} w-full`}
        onClick={onSwitchAccount}
      >
        {copy.switchAccount}
      </button>
    </AwcHumanInviteAcceptShell>
  );
}
