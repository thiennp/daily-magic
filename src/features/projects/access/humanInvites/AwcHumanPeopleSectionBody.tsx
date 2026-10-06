"use client";

import AwcHumanInvitePersonPanel from "@/features/projects/access/humanInvites/AwcHumanInvitePersonPanel";
import AwcHumanInviteUndoToast from "@/features/projects/access/humanInvites/AwcHumanInviteUndoToast";
import AwcHumanPeopleMembersList from "@/features/projects/access/humanInvites/AwcHumanPeopleMembersList";
import type { useHumanPeopleInvites } from "@/features/projects/access/humanInvites/hooks/useHumanPeopleInvites";

type PeopleModel = ReturnType<typeof useHumanPeopleInvites>;

export type AwcHumanPeopleSectionBodyProps = {
  readonly projectName: string;
  readonly ownerEmail?: string | null;
  readonly ownerDisplayName?: string | null;
  readonly people: PeopleModel;
};

/** People list or Invite person panel + undo toast. */
export default function AwcHumanPeopleSectionBody({
  projectName,
  ownerEmail = null,
  ownerDisplayName = null,
  people,
}: AwcHumanPeopleSectionBodyProps) {
  return (
    <>
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
          projectName={projectName}
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
    </>
  );
}
