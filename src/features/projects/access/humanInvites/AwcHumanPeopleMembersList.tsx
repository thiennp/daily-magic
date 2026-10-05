"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type {
  HumanInviteListItem,
  HumanJoinedMemberRow,
} from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanPeopleMembersListProps = {
  readonly pendingInvites: readonly HumanInviteListItem[];
  readonly joinedHumans: readonly HumanJoinedMemberRow[];
  /** Owner row shown first (M2). */
  readonly ownerEmail?: string | null;
  readonly ownerDisplayName?: string | null;
  readonly pendingIdsHidden?: ReadonlySet<string>;
  readonly removedIdsHidden?: ReadonlySet<string>;
  readonly onInvitePerson?: () => void;
  /** One-click Revoke → 10s Undo (schedules DELETE). */
  readonly onRevokeInvite?: (inviteId: string) => void;
  /** One-click Remove → 10s Undo (schedules POST remove). */
  readonly onRemoveMember?: (membershipId: string) => void;
};

/**
 * Owner People list in Bots & people: pending (GET human-invites) + joined humans.
 * Copy link is NOT on pending rows (token only on create success).
 */
export default function AwcHumanPeopleMembersList({
  pendingInvites,
  joinedHumans,
  ownerEmail = null,
  ownerDisplayName = null,
  pendingIdsHidden,
  removedIdsHidden,
  onInvitePerson,
  onRevokeInvite,
  onRemoveMember,
}: AwcHumanPeopleMembersListProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const visiblePending = pendingInvites.filter(
    (invite) => !pendingIdsHidden?.has(invite.inviteId),
  );
  const visibleJoined = joinedHumans.filter(
    (member) => !removedIdsHidden?.has(member.membershipId),
  );
  const ownerLabel =
    ownerDisplayName?.trim() ||
    ownerEmail?.trim() ||
    "you";

  return (
    <section className="space-y-4">
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
            {copy.peopleHeading}
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {copy.peopleHint}
          </p>
        </div>
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.primary}
          onClick={onInvitePerson}
        >
          {copy.invitePersonTitle}
        </button>
      </header>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
          {copy.pendingSubhead}
        </h4>
        {visiblePending.length === 0 ? (
          <p className="mt-1 text-sm text-gray-500">{copy.pendingEmpty}</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {visiblePending.map((invite) => (
              <li
                key={invite.inviteId}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-200/80 bg-amber-50/60 px-3 py-2 text-sm dark:border-amber-900/50 dark:bg-amber-950/30"
              >
                <div>
                  <div className="font-medium text-gray-900 dark:text-white/90">
                    {invite.email ?? "Invite link · no email"}
                  </div>
                  <div className="text-xs text-gray-500">
                    Role · {invite.role}
                    {" · exp "}
                    {new Date(invite.expiresAt).toLocaleDateString()}
                  </div>
                </div>
                <button
                  type="button"
                  className={AWC_PROJECT_ACCESS_CTA.danger}
                  onClick={() => onRevokeInvite?.(invite.inviteId)}
                >
                  {copy.revoke}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
          {copy.joinedSubhead}
        </h4>
        <ul className="mt-2 space-y-2">
          <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-gray-200/70 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-transparent">
            <div>
              <div className="font-medium text-gray-900 dark:text-white/90">
                {copy.youOwner}
              </div>
              <div className="text-xs text-gray-500">
                Owner · {ownerLabel}
              </div>
            </div>
          </li>
          {visibleJoined.length === 0 ? (
            <li className="text-sm text-gray-500">{copy.joinedOwnerOnly}</li>
          ) : (
            visibleJoined.map((member) => (
              <li
                key={member.membershipId}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-gray-200/70 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-transparent"
              >
                <div>
                  <div className="font-medium text-gray-900 dark:text-white/90">
                    {member.displayName ?? member.email ?? member.userId}
                  </div>
                  <div className="text-xs text-gray-500">
                    {member.role}
                    {member.email ? ` · ${member.email}` : ""}
                    {member.joinedAt
                      ? ` · joined ${new Date(member.joinedAt).toLocaleDateString()}`
                      : ""}
                  </div>
                </div>
                <button
                  type="button"
                  className={AWC_PROJECT_ACCESS_CTA.danger}
                  onClick={() => onRemoveMember?.(member.membershipId)}
                >
                  {copy.remove}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
