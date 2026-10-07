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
  /** DF-036: assistants + pending requests + invites (not "Just you"). */
  readonly othersCount?: number;
};

/** People list or Invite person panel + undo toast. */
export default function AwcHumanPeopleSectionBody({
  projectName,
  ownerEmail = null,
  ownerDisplayName = null,
  people,
  othersCount = 0,
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
        <p className="text-xs text-awc-fg-muted dark:text-gray-300">
          {people.message}
        </p>
      ) : null}
      {people.loadError ? (
        <p className="rounded-md border border-awc-line bg-awc-surface-2 px-3 py-2 text-xs text-awc-bad">
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
            people.clearSendError();
          }}
          onDismissCreated={people.clearCreatedInvite}
          onSendEmails={people.sendEmails}
          sendBusy={people.sendBusy}
          sendErrorMessage={people.sendError}
        />
      ) : (
        <AwcHumanPeopleMembersList
          pendingInvites={people.invites}
          joinedHumans={people.joinedHumans}
          othersCount={othersCount}
          ownerEmail={ownerEmail}
          ownerDisplayName={ownerDisplayName}
          pendingIdsHidden={people.hiddenPending}
          removedIdsHidden={people.hiddenRemoved}
          onInvitePerson={() => people.setPanelOpen(true)}
          onRevokeInvite={people.scheduleRevoke}
          onRemoveMember={people.scheduleRemove}
          decidingId={people.decidingId}
          onApproveRequest={people.approveRequest}
          onDenyRequest={people.denyRequest}
        />
      )}
      {people.isLoading && people.invites.length === 0 ? (
        <p className="text-xs text-awc-fg-muted">Loading people…</p>
      ) : null}
    </>
  );
}
