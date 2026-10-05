"use client";

import AwcHumanInvitePersonPanel from "@/features/projects/access/humanInvites/AwcHumanInvitePersonPanel";
import AwcHumanInviteUndoToast from "@/features/projects/access/humanInvites/AwcHumanInviteUndoToast";
import AwcHumanPeopleMembersList from "@/features/projects/access/humanInvites/AwcHumanPeopleMembersList";
import { useHumanPeopleInvites } from "@/features/projects/access/humanInvites/hooks/useHumanPeopleInvites";
import type { AccessMemberForHumanFilter } from "@/features/projects/access/humanInvites/utils/filterJoinedHumanMembers";
import AwcProjectAccessSection from "@/features/projects/access/AwcProjectAccessSection";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export type AwcHumanPeopleSectionProps = {
  readonly projectId: string;
  readonly projectName: string | null;
  readonly ownerEmail?: string | null;
  readonly ownerDisplayName?: string | null;
  readonly accessMembers: readonly AccessMemberForHumanFilter[];
  /** Owner Access loaded — enable human invite APIs. */
  readonly enabled: boolean;
};

/** People + Invite person inside Bots & people (Lead GO — not a separate tab). */
export default function AwcHumanPeopleSection({
  projectId,
  projectName,
  ownerEmail = null,
  ownerDisplayName = null,
  accessMembers,
  enabled,
}: AwcHumanPeopleSectionProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const people = useHumanPeopleInvites({
    projectId,
    enabled,
    accessMembers,
  });

  if (!enabled) {
    return null;
  }

  const pendingCount = people.invites.filter(
    (invite) => !people.hiddenPending.has(invite.inviteId),
  ).length;
  const joinedCount = people.joinedHumans.filter(
    (member) => !people.hiddenRemoved.has(member.membershipId),
  ).length;

  return (
    <AwcProjectAccessSection
      id="project-access-human-people"
      title={copy.peopleHeading}
      hint={copy.peopleHint}
      count={pendingCount + joinedCount + 1}
      alertCount={pendingCount > 0}
    >
      {people.undoToast ? (
        <AwcHumanInviteUndoToast
          message={people.undoToast.message}
          onUndo={people.undoToast.onUndo}
        />
      ) : null}

      {people.message ? (
        <p className="text-xs text-gray-600 dark:text-gray-300">{people.message}</p>
      ) : null}

      {people.loadError ? (
        <p className="rounded-md border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
          {people.loadError}
        </p>
      ) : null}

      {people.panelOpen ? (
        <AwcHumanInvitePersonPanel
          projectName={projectName ?? "this project"}
          createdInvite={people.createdInvite}
          busy={people.createBusy}
          errorMessage={people.createError}
          onCreate={(body) => void people.createInvite(body)}
          onCopyLink={people.copyCreatedLink}
          onCancel={() => {
            people.setPanelOpen(false);
            people.clearCreatedInvite();
          }}
          onDismissCreated={people.clearCreatedInvite}
        />
      ) : (
        <AwcHumanPeopleMembersList
          pendingInvites={people.invites}
          joinedHumans={people.joinedHumans}
          ownerEmail={ownerEmail}
          ownerDisplayName={ownerDisplayName}
          pendingIdsHidden={people.hiddenPending}
          removedIdsHidden={people.hiddenRemoved}
          onInvitePerson={() => people.setPanelOpen(true)}
          onRevokeInvite={people.scheduleRevoke}
          onRemoveMember={people.scheduleRemove}
        />
      )}

      {people.isLoading && people.invites.length === 0 ? (
        <p className="text-xs text-gray-500">Loading people…</p>
      ) : null}
    </AwcProjectAccessSection>
  );
}
