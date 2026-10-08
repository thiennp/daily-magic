"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { CreateHumanInviteResponse } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanInviteCreatedLinkBannerProps = {
  readonly createdInvite: CreateHumanInviteResponse;
  readonly onCopyLink?: (url: string) => void;
  readonly onDismissCreated?: () => void;
};

/** One-time create success banner — Copy link (token shown once). */
export default function AwcHumanInviteCreatedLinkBanner({
  createdInvite,
  onCopyLink,
  onDismissCreated,
}: AwcHumanInviteCreatedLinkBannerProps) {
  const copy = HUMAN_INVITE_UI_COPY;

  return (
    <div className="rounded-lg border border-awc-line bg-awc-surface-2 p-3 text-xs">
      <p className="font-medium text-awc-fg">{copy.createdBannerTitle}</p>
      <p className="mt-1 text-awc-fg-muted">
        Role · {createdInvite.role} · exp{" "}
        {new Date(createdInvite.expiresAt).toLocaleDateString()}
        {createdInvite.requireEmailMatch ? ` · ${copy.pendingEmailLocked}` : ""}
      </p>
      <p className="mt-1 break-all text-awc-fg-muted">{createdInvite.url}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.primary}
          onClick={() => onCopyLink?.(createdInvite.url)}
        >
          {copy.copyLink}
        </button>
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          onClick={onDismissCreated}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
