"use client";

import { useState } from "react";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AWC_PROJECT_INVITE_PLATFORM_COPY } from "@/features/projects/access/invites/awcProjectInvitePlatformCopy.constant";
import { buildProjectInviteAgentPrompt } from "@/features/projects/access/invites/buildProjectInviteAgentPrompt";
import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";

interface AwcProjectInviteCreatedBannerProps {
  readonly createdInviteUrl: string;
  readonly createdInviteToken: string | null;
  readonly projectId: string;
  readonly projectName: string | null;
  /** Which Copy prompt to build (step 7 differs). */
  readonly platform?: ProjectInvitePlatform;
  readonly onClearCreatedUrl: () => void;
}

export default function AwcProjectInviteCreatedBanner({
  createdInviteUrl,
  createdInviteToken,
  projectId,
  projectName,
  platform = "grok",
  onClearCreatedUrl,
}: AwcProjectInviteCreatedBannerProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="mt-2 rounded-md border border-amber-300/80 bg-amber-50/80 p-2 text-xs dark:border-amber-700/60 dark:bg-amber-950/30">
      <p className="font-medium text-amber-900 dark:text-amber-200">
        {copy.invitesCreatedOnce}
      </p>
      <p
        className="mt-1 text-amber-900 dark:text-amber-200"
        data-invite-platform={platform}
      >
        {AWC_PROJECT_INVITE_PLATFORM_COPY[platform].createdFor}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          onClick={() => {
            const prompt = buildProjectInviteAgentPrompt({
              inviteUrl: createdInviteUrl,
              token: createdInviteToken,
              projectId,
              projectName,
              platform,
            });
            void navigator.clipboard.writeText(prompt).then(() => {
              showToast(copy.invitesPromptCopied);
            });
          }}
        >
          {copy.invitesCopyPrompt}
        </button>
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          onClick={onClearCreatedUrl}
        >
          Dismiss
        </button>
      </div>
      {toast ? (
        <p className="mt-2 text-[11px] font-medium text-amber-900 dark:text-amber-100">
          {toast}
        </p>
      ) : null}
    </div>
  );
}
