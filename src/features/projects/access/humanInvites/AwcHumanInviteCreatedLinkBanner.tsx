"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { HUMAN_INVITE_PERSON_FLOW_COPY } from "@/features/projects/access/humanInvites/humanInvitePersonFlowCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import { INV_INPUT_CLASS } from "@/features/projects/access/humanInvites/invitePersonChromeClasses.constant";
import type { CreateHumanInviteResponse } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanInviteCreatedLinkBannerProps = {
  readonly createdInvite: CreateHumanInviteResponse;
  readonly onCopyLink?: (url: string) => void;
};

/** One-time create success banner: readonly link + Copy link (token shown once). */
export default function AwcHumanInviteCreatedLinkBanner({
  createdInvite,
  onCopyLink,
}: AwcHumanInviteCreatedLinkBannerProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  return (
    <div
      role="status"
      className="space-y-2 rounded-lg border border-awc-line bg-awc-surface-2 p-3 text-xs"
    >
      <p className="font-medium text-awc-fg">{copy.createdBannerTitle}</p>
      <p className="text-awc-fg-muted">
        Role · {createdInvite.role} · exp{" "}
        {new Date(createdInvite.expiresAt).toLocaleDateString()}
        {createdInvite.requireEmailMatch ? ` · ${copy.pendingEmailLocked}` : ""}
      </p>
      <div className="flex items-center gap-2">
        <label htmlFor="inv-link" className="sr-only">
          {HUMAN_INVITE_PERSON_FLOW_COPY.linkLabel}
        </label>
        <input
          id="inv-link"
          readOnly
          value={createdInvite.url}
          className={`${INV_INPUT_CLASS} font-mono`}
        />
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.primary}
          onClick={() => onCopyLink?.(createdInvite.url)}
        >
          {copy.copyLink}
        </button>
      </div>
    </div>
  );
}
