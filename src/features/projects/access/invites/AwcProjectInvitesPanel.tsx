"use client";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import AwcProjectInviteCreateControls from "@/features/projects/access/invites/AwcProjectInviteCreateControls";
import AwcProjectInviteCreatedBanner from "@/features/projects/access/invites/AwcProjectInviteCreatedBanner";
import AwcProjectInviteListSections from "@/features/projects/access/invites/AwcProjectInviteListSections";
import type { AwcProjectInviteAddSelection } from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";
import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";
import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";

interface AwcProjectInvitesPanelProps {
  readonly invites: readonly AwcProjectAccessInvite[];
  readonly createdInviteUrl: string | null;
  readonly createdInviteToken?: string | null;
  /** Set with createdInviteId on create success; labels the banner Copy prompt. */
  readonly createdInvitePlatform?: ProjectInvitePlatform;
  /** Picked types[] id for the banner line; null = any assistant. */
  readonly createdInviteJoinTypeId?: string | null;
  readonly projectId: string;
  readonly projectName?: string | null;
  readonly onCreate: (
    selection: AwcProjectInviteAddSelection,
    autoApprove: boolean,
  ) => void;
  readonly onRevoke: (inviteId: string) => void;
  readonly onTurnOffAutoApprove?: (inviteId: string) => void;
  readonly onClearCreatedUrl: () => void;
  /** When nested under AccessSection, skip local heading/intro. */
  readonly hideChrome?: boolean;
}

/** Owner Bot invites panel. List is server-filtered to usable invites only. */
export default function AwcProjectInvitesPanel({
  invites,
  createdInviteUrl,
  createdInviteToken = null,
  createdInvitePlatform = "grok",
  createdInviteJoinTypeId,
  projectId,
  projectName = null,
  onCreate,
  onRevoke,
  onTurnOffAutoApprove,
  onClearCreatedUrl,
  hideChrome = false,
}: AwcProjectInvitesPanelProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;

  return (
    <div>
      {hideChrome ? null : (
        <>
          <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
            {copy.invitesHeading}
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {copy.invitesIntro}
          </p>
        </>
      )}
      <p className="text-[11px] text-gray-500 dark:text-gray-400">
        {copy.invitesTokenOnceNote}
      </p>
      {createdInviteUrl ? (
        <AwcProjectInviteCreatedBanner
          createdInviteUrl={createdInviteUrl}
          createdInviteToken={createdInviteToken}
          projectId={projectId}
          projectName={projectName}
          platform={createdInvitePlatform}
          joinTypeId={createdInviteJoinTypeId}
          onClearCreatedUrl={onClearCreatedUrl}
        />
      ) : null}
      <AwcProjectInviteCreateControls onCreate={onCreate} />
      {invites.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">{copy.invitesEmpty}</p>
      ) : (
        <AwcProjectInviteListSections
          invites={invites}
          onRevoke={onRevoke}
          onTurnOffAutoApprove={onTurnOffAutoApprove}
        />
      )}
    </div>
  );
}
