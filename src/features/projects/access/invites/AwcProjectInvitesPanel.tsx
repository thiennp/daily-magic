"use client";

import { useMemo, useState } from "react";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { buildProjectInviteAgentPrompt } from "@/features/projects/access/invites/buildProjectInviteAgentPrompt";
import {
  isInviteStillUsable,
  resolveInviteListStatus,
  type InviteListStatus,
} from "@/features/projects/access/invites/inviteListStatus";
import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";

interface AwcProjectInvitesPanelProps {
  readonly invites: readonly AwcProjectAccessInvite[];
  readonly createdInviteUrl: string | null;
  readonly createdInviteToken?: string | null;
  readonly projectId: string;
  readonly projectName?: string | null;
  readonly onCreate: () => void;
  readonly onRevoke: (inviteId: string) => void;
  readonly onClearCreatedUrl: () => void;
}

const statusLabel = (
  status: InviteListStatus,
  copy: typeof AWC_PROJECT_ACCESS_COPY,
): string | null => {
  if (status === "used_up") return copy.invitesStatusUsedUp;
  if (status === "expired") return copy.invitesStatusExpired;
  if (status === "revoked") return copy.invitesStatusRevoked;
  return null;
};

export default function AwcProjectInvitesPanel({
  invites,
  createdInviteUrl,
  createdInviteToken = null,
  projectId,
  projectName = null,
  onCreate,
  onRevoke,
  onClearCreatedUrl,
}: AwcProjectInvitesPanelProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  };

  const { active, inactive } = useMemo(() => {
    const now = Date.now();
    const activeInvites: AwcProjectAccessInvite[] = [];
    const inactiveInvites: AwcProjectAccessInvite[] = [];
    for (const invite of invites) {
      if (isInviteStillUsable(invite, now)) {
        activeInvites.push(invite);
      } else {
        inactiveInvites.push(invite);
      }
    }
    return { active: activeInvites, inactive: inactiveInvites };
  }, [invites]);

  const renderInviteRow = (invite: AwcProjectAccessInvite) => {
    const status = resolveInviteListStatus(invite);
    const badge = statusLabel(status, copy);
    const usable = status === "active";
    return (
      <li
        key={invite.inviteId}
        className={`flex flex-wrap items-center justify-between gap-2 text-sm ${
          usable ? "" : "opacity-70"
        }`}
      >
        <span className="text-gray-700 dark:text-white/80">
          {invite.inviteId.slice(0, 8)}… · uses {invite.usesRemaining}/
          {invite.maxUses}
          {invite.teamLabel ? ` · ${invite.teamLabel}` : ""}
          {" · exp "}
          {new Date(invite.expiresAt).toLocaleDateString()}
          {badge ? (
            <span className="ml-2 rounded bg-gray-200 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {badge}
            </span>
          ) : null}
        </span>
        {usable ? (
          <button
            type="button"
            className={AWC_PROJECT_ACCESS_CTA.danger}
            onClick={() => onRevoke(invite.inviteId)}
          >
            {copy.invitesRevoke}
          </button>
        ) : null}
      </li>
    );
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
        {copy.invitesHeading}
      </h3>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {copy.invitesIntro}
      </p>
      <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
        {copy.invitesTokenOnceNote}
      </p>
      {createdInviteUrl ? (
        <div className="mt-2 rounded-md border border-amber-300/80 bg-amber-50/80 p-2 text-xs dark:border-amber-700/60 dark:bg-amber-950/30">
          <p className="font-medium text-amber-900 dark:text-amber-200">
            {copy.invitesCreatedOnce}
          </p>
          <code className="mt-1 block break-all text-amber-950 dark:text-amber-100">
            {createdInviteUrl}
          </code>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              className={AWC_PROJECT_ACCESS_CTA.primary}
              onClick={() => {
                void navigator.clipboard.writeText(createdInviteUrl).then(() => {
                  showToast(copy.invitesUrlCopied);
                });
              }}
            >
              {copy.invitesCopyUrl}
            </button>
            <button
              type="button"
              className={AWC_PROJECT_ACCESS_CTA.secondary}
              onClick={() => {
                const prompt = buildProjectInviteAgentPrompt({
                  inviteUrl: createdInviteUrl,
                  token: createdInviteToken,
                  projectId,
                  projectName,
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
      ) : null}
      <div className="mt-2">
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.primary}
          onClick={onCreate}
        >
          {copy.invitesCreate}
        </button>
      </div>
      {invites.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">{copy.invitesEmpty}</p>
      ) : (
        <div className="mt-3 space-y-3">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {copy.invitesActiveHeading}
            </h4>
            {active.length === 0 ? (
              <p className="mt-1 text-sm text-gray-500">No active invites.</p>
            ) : (
              <ul className="mt-1 space-y-2">{active.map(renderInviteRow)}</ul>
            )}
          </div>
          {inactive.length > 0 ? (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {copy.invitesInactiveHeading}
              </h4>
              <ul className="mt-1 space-y-2">{inactive.map(renderInviteRow)}</ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
