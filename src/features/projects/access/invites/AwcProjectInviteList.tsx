"use client";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import {
  resolveInviteListStatus,
  type InviteListStatus,
} from "@/features/projects/access/invites/inviteListStatus";
import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";

const statusLabel = (
  status: InviteListStatus,
  copy: typeof AWC_PROJECT_ACCESS_COPY,
): string | null => {
  if (status === "used_up") return copy.invitesStatusUsedUp;
  if (status === "expired") return copy.invitesStatusExpired;
  if (status === "revoked") return copy.invitesStatusRevoked;
  return null;
};

interface AwcProjectInviteListProps {
  readonly heading: string;
  readonly invites: readonly AwcProjectAccessInvite[];
  readonly emptyLabel: string;
  readonly nowMs: number;
  readonly onRevoke: (inviteId: string) => void;
}

export default function AwcProjectInviteList({
  heading,
  invites,
  emptyLabel,
  nowMs,
  onRevoke,
}: AwcProjectInviteListProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {heading}
      </h4>
      {invites.length === 0 ? (
        <p className="mt-1 text-sm text-gray-500">{emptyLabel}</p>
      ) : (
        <ul className="mt-1 space-y-2">
          {invites.map((invite) => {
            const status = resolveInviteListStatus(invite, nowMs);
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
          })}
        </ul>
      )}
    </div>
  );
}
