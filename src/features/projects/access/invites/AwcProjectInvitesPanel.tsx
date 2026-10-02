"use client";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";

interface AwcProjectInvitesPanelProps {
  readonly invites: readonly AwcProjectAccessInvite[];
  readonly createdInviteUrl: string | null;
  readonly onCreate: () => void;
  readonly onRevoke: (inviteId: string) => void;
  readonly onClearCreatedUrl: () => void;
}

export default function AwcProjectInvitesPanel({
  invites,
  createdInviteUrl,
  onCreate,
  onRevoke,
  onClearCreatedUrl,
}: AwcProjectInvitesPanelProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
        {copy.invitesHeading}
      </h3>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {copy.invitesIntro}
      </p>
      {createdInviteUrl ? (
        <div className="mt-2 rounded-md border border-amber-300/80 bg-amber-50/80 p-2 text-xs dark:border-amber-700/60 dark:bg-amber-950/30">
          <p className="font-medium text-amber-900 dark:text-amber-200">
            {copy.invitesCreatedOnce}
          </p>
          <code className="mt-1 block break-all text-amber-950 dark:text-amber-100">
            {createdInviteUrl}
          </code>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="rounded-md bg-brand-600 px-2 py-1 text-xs text-white"
              onClick={() => {
                void navigator.clipboard.writeText(createdInviteUrl);
              }}
            >
              {copy.invitesCopyUrl}
            </button>
            <button
              type="button"
              className="rounded-md border px-2 py-1 text-xs"
              onClick={onClearCreatedUrl}
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : null}
      <div className="mt-2">
        <button
          type="button"
          className="rounded-md bg-brand-600 px-2 py-1 text-xs text-white"
          onClick={onCreate}
        >
          {copy.invitesCreate}
        </button>
      </div>
      {invites.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">{copy.invitesEmpty}</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {invites.map((invite) => (
            <li
              key={invite.inviteId}
              className="flex flex-wrap items-center justify-between gap-2 text-sm"
            >
              <span className="text-gray-700 dark:text-white/80">
                {invite.inviteId.slice(0, 8)}… · uses {invite.usesRemaining}/
                {invite.maxUses}
                {invite.teamLabel ? ` · ${invite.teamLabel}` : ""}
                {invite.revokedAt ? " · revoked" : ""}
                {" · exp "}
                {new Date(invite.expiresAt).toLocaleDateString()}
              </span>
              {!invite.revokedAt && invite.usesRemaining > 0 ? (
                <button
                  type="button"
                  className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-700"
                  onClick={() => onRevoke(invite.inviteId)}
                >
                  {copy.invitesRevoke}
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
