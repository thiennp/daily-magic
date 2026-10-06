"use client";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AWC_PROJECT_INVITE_AUTO_APPROVE_COPY } from "@/features/projects/access/invites/awcProjectInviteAutoApproveCopy.constant";
import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";

interface AwcProjectInviteListSectionsProps {
  readonly invites: readonly AwcProjectAccessInvite[];
  readonly onRevoke: (inviteId: string) => void;
  readonly onTurnOffAutoApprove?: (inviteId: string) => void;
}

/** Renders the usable invite list from the server-filtered API. */
export default function AwcProjectInviteListSections({
  invites,
  onRevoke,
  onTurnOffAutoApprove,
}: AwcProjectInviteListSectionsProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const autoCopy = AWC_PROJECT_INVITE_AUTO_APPROVE_COPY;

  return (
    <div className="mt-3 space-y-3">
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {copy.invitesActiveHeading}
        </h4>
        <ul className="mt-1 space-y-2">
          {invites.map((invite) => (
            <li
              key={invite.inviteId}
              className="flex flex-wrap items-center justify-between gap-2 text-sm"
            >
              <span className="text-gray-700 dark:text-white/80">
                {invite.inviteId.slice(0, 8)}… · uses {invite.usesRemaining}/
                {invite.maxUses}
                {invite.teamLabel ? ` · ${invite.teamLabel}` : ""}
                {" · exp "}
                {new Date(invite.expiresAt).toLocaleDateString()}
                {invite.autoApprove ? " · auto-approve on" : ""}
              </span>
              <span className="flex flex-wrap gap-2">
                {invite.autoApprove && onTurnOffAutoApprove ? (
                  <button
                    type="button"
                    className={AWC_PROJECT_ACCESS_CTA.secondary}
                    onClick={() => onTurnOffAutoApprove(invite.inviteId)}
                  >
                    {autoCopy.turnOffAction}
                  </button>
                ) : null}
                <button
                  type="button"
                  className={AWC_PROJECT_ACCESS_CTA.danger}
                  onClick={() => onRevoke(invite.inviteId)}
                >
                  {copy.invitesRevoke}
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
