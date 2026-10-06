"use client";

import { useState } from "react";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AWC_PROJECT_INVITE_SHORT_PROMPT_COPY } from "@/features/projects/access/invites/awcProjectInviteShortPromptCopy.constant";
import { buildProjectInviteAgentPrompt } from "@/features/projects/access/invites/buildProjectInviteAgentPrompt";
import { buildProjectInviteShortPrompt } from "@/features/projects/access/invites/buildProjectInviteShortPrompt";
import { resolveProjectInviteCreatedForLine } from "@/features/projects/access/invites/resolveProjectInviteCreatedForLine";
import { resolveProjectInviteJoinToken } from "@/features/projects/access/invites/resolveProjectInviteJoinToken";
import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";

interface AwcProjectInviteCreatedBannerProps {
  readonly createdInviteUrl: string;
  readonly createdInviteToken: string | null;
  readonly projectId: string;
  readonly projectName: string | null;
  /** Which Copy prompt to build (step 7 differs); null = no type picked. */
  readonly platform?: ProjectInvitePlatform | null;
  /** Picked types[] id; null = any assistant; undefined = platform line. */
  readonly joinTypeId?: string | null;
  readonly onClearCreatedUrl: () => void;
}

export default function AwcProjectInviteCreatedBanner({
  createdInviteUrl,
  createdInviteToken,
  projectId,
  projectName,
  platform = null,
  joinTypeId,
  onClearCreatedUrl,
}: AwcProjectInviteCreatedBannerProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const shortCopy = AWC_PROJECT_INVITE_SHORT_PROMPT_COPY;
  /** Today's full prompt, unchanged — the fallback for assistants that can't open links. */
  const buildFullPrompt = () =>
    buildProjectInviteAgentPrompt({
      inviteUrl: createdInviteUrl,
      token: createdInviteToken,
      projectId,
      projectName,
      platform: platform ?? undefined,
    });
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
        data-invite-platform={platform ?? "any"}
      >
        {resolveProjectInviteCreatedForLine({ platform, joinTypeId })}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          onClick={() => {
            const joinToken = resolveProjectInviteJoinToken({
              inviteUrl: createdInviteUrl,
              token: createdInviteToken,
            });
            const prompt = joinToken
              ? buildProjectInviteShortPrompt({ token: joinToken, projectName })
              : buildFullPrompt();
            void navigator.clipboard.writeText(prompt).then(() => {
              showToast(shortCopy.copiedToast);
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
      <button
        type="button"
        className="mt-2 text-[11px] font-medium text-amber-900 underline underline-offset-2 hover:no-underline dark:text-amber-200"
        onClick={() => {
          void navigator.clipboard.writeText(buildFullPrompt()).then(() => {
            showToast(shortCopy.fullCopiedToast);
          });
        }}
      >
        {shortCopy.fallbackLink}
      </button>
      {toast ? (
        <p className="mt-2 text-[11px] font-medium text-amber-900 dark:text-amber-100">
          {toast}
        </p>
      ) : null}
    </div>
  );
}
