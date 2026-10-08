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
  const [copied, setCopied] = useState<"short" | "full" | null>(null);
  const joinToken = resolveProjectInviteJoinToken({
    inviteUrl: createdInviteUrl,
    token: createdInviteToken,
  });
  const shortPrompt = joinToken
    ? buildProjectInviteShortPrompt({ token: joinToken, projectName })
    : buildFullPrompt();
  const copy_ = (kind: "short" | "full", text: string) => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2500);
    });
  };

  return (
    <div
      className="grid gap-2.5 rounded-xl border border-awc-accent-soft-2 bg-awc-accent-soft p-3"
      role="status"
      data-invite-created=""
      data-invite-platform={platform ?? "any"}
    >
      <p className="m-0 flex flex-wrap items-center gap-2 text-[13px] text-awc-fg">
        <b className="font-semibold">{copy.invitesCreatedOnce}</b>
        <span className="rounded-full border border-awc-accent-soft-2 bg-awc-surface px-2 py-px text-[11.5px] font-semibold text-awc-fg-muted">
          {resolveProjectInviteCreatedForLine({ platform, joinTypeId })}
        </span>
      </p>
      <pre
        className="m-0 max-h-24 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-awc-accent-soft-2 bg-awc-surface px-2.5 py-2 font-mono text-[12px] leading-relaxed text-awc-fg-muted"
        tabIndex={0}
        aria-label={shortCopy.promptPreviewLabel}
      >
        {shortPrompt}
      </pre>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.primary}
          onClick={() => copy_("short", shortPrompt)}
        >
          {copied === "short" ? shortCopy.copiedToast : copy.invitesCopyPrompt}
        </button>
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          onClick={onClearCreatedUrl}
        >
          {shortCopy.done}
        </button>
        <button
          type="button"
          className="ml-auto text-[12px] font-medium text-awc-primary underline underline-offset-2 hover:no-underline"
          onClick={() => copy_("full", buildFullPrompt())}
        >
          {copied === "full"
            ? shortCopy.fullCopiedToast
            : shortCopy.fallbackLink}
        </button>
      </div>
    </div>
  );
}
