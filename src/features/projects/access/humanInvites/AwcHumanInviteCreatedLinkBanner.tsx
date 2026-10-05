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
    <div className="rounded-lg border border-amber-300/80 bg-amber-50/80 p-3 text-xs dark:border-amber-700/60 dark:bg-amber-950/30">
      <p className="font-medium text-amber-900 dark:text-amber-200">
        {copy.createdBannerTitle}
      </p>
      <p className="mt-1 text-amber-900 dark:text-amber-200">
        Role · {createdInvite.role} · exp{" "}
        {new Date(createdInvite.expiresAt).toLocaleDateString()}
        {createdInvite.requireEmailMatch ? ` · ${copy.pendingEmailLocked}` : ""}
      </p>
      <p className="mt-1 break-all text-amber-900/90 dark:text-amber-100/90">
        {createdInvite.url}
      </p>
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
