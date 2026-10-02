"use client";

import { useMemo } from "react";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import AwcProjectInviteCreatedBanner from "@/features/projects/access/invites/AwcProjectInviteCreatedBanner";
import AwcProjectInviteList from "@/features/projects/access/invites/AwcProjectInviteList";
import { isInviteStillUsable } from "@/features/projects/access/invites/inviteListStatus";
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
        <AwcProjectInviteCreatedBanner
          createdInviteUrl={createdInviteUrl}
          createdInviteToken={createdInviteToken}
          projectId={projectId}
          projectName={projectName}
          onClearCreatedUrl={onClearCreatedUrl}
        />
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
          <AwcProjectInviteList
            heading={copy.invitesActiveHeading}
            invites={active}
            emptyLabel="No active invites."
            onRevoke={onRevoke}
          />
          {inactive.length > 0 ? (
            <AwcProjectInviteList
              heading={copy.invitesInactiveHeading}
              invites={inactive}
              emptyLabel=""
              onRevoke={onRevoke}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
