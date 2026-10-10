import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import type { InviteRowCopyState } from "@/features/projects/members/hooks/useInviteRowCopy";
import AwcProjectMembersInviteMeta from "@/features/projects/members/AwcProjectMembersInviteMeta";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/public-api/types";

export interface AwcProjectMembersInvitePendingRowProps {
  readonly invite: AwcProjectAccessInvite;
  /** Setup-steps type this tab remembers for the invite; null = unknown. */
  readonly typeLabel: string | null;
  /** Copy again is possible (session prompt or server copy, 107). */
  readonly canCopy: boolean;
  readonly rowState: InviteRowCopyState | null;
  readonly onCopy: () => void;
  readonly onRevoke: () => void;
  readonly onTurnOffAutoApprove?: () => void;
}

const ROW = "flex items-start gap-2.5 py-2.5 text-sm";
const AV =
  "grid size-8 shrink-0 place-items-center rounded-full border-[1.5px] border-dashed border-awc-border-strong bg-transparent text-[13px] font-semibold text-awc-fg-muted";
const GHOST =
  "awc-focus-ring shrink-0 rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-[13px] font-semibold text-awc-fg-muted transition hover:bg-awc-fill";

/**
 * DF-036 D4 unused invite row: what it is, one use, expiry; Copy again ·
 * Cancel invite. Pure (no hooks) so the list can call it as a function and
 * tests can walk the returned tree.
 */
export default function AwcProjectMembersInvitePendingRow(
  p: AwcProjectMembersInvitePendingRowProps,
) {
  const { invite, rowState } = p;
  const copyLabel =
    rowState?.kind === "copied"
      ? C.invitePendingCopied
      : rowState?.kind === "busy"
        ? C.invitePendingCopying
        : C.invitePendingCopy;
  const uses = Math.max(1, invite.usesRemaining);
  return (
    <li key={invite.inviteId} className={ROW} data-invite-row={invite.inviteId}>
      <span className={AV} aria-hidden>
        +
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold text-awc-fg">
          {p.typeLabel
            ? C.invitePendingTitleFor(p.typeLabel)
            : C.invitePendingTitle}
          <span className="ml-1.5 font-mono text-[12px] font-normal text-awc-fg-muted">
            {C.invitePendingRef(invite.inviteId)}
          </span>
        </span>
        <AwcProjectMembersInviteMeta
          uses={uses}
          expiresAt={invite.expiresAt}
          autoApprove={invite.autoApprove === true}
        />
        {!p.canCopy ? (
          <span
            className="mt-0.5 block text-[12px] text-awc-fg-muted"
            data-invite-copy-unavailable={invite.inviteId}
          >
            {C.invitePendingCopyUnavailable}
          </span>
        ) : null}
        {rowState?.kind === "error" ? (
          <span
            role="status"
            className="mt-0.5 block text-[12px] text-awc-fg-muted"
          >
            {rowState.message}
          </span>
        ) : null}
      </span>
      <span className="flex shrink-0 flex-col items-end gap-0.5">
        {p.canCopy ? (
          <button
            type="button"
            className={GHOST}
            data-invite-copy={invite.inviteId}
            disabled={rowState?.kind === "busy"}
            onClick={p.onCopy}
          >
            {copyLabel}
          </button>
        ) : null}
        {invite.autoApprove && p.onTurnOffAutoApprove ? (
          <button
            type="button"
            className={GHOST}
            aria-label="Turn off auto-approve"
            onClick={p.onTurnOffAutoApprove}
          >
            {C.invitePendingTurnOff}
          </button>
        ) : null}
        <button type="button" className={GHOST} onClick={p.onRevoke}>
          {C.invitePendingCancel}
        </button>
      </span>
    </li>
  );
}
