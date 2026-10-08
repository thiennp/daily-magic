import { formatInviteExpiry } from "@/features/projects/members/utils/formatInviteExpiry";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

const TAG =
  "inline-flex items-center rounded-md border border-awc-line bg-awc-tile px-1.5 text-[11.5px] leading-relaxed tabular-nums text-awc-fg-muted";
const TAG_ON = `${TAG} border-awc-accent-soft-2 bg-awc-accent-soft font-semibold text-awc-primary`;

/** Unused-invite tags: Not used yet · 1 assistant · expires Oct 14 (+ Auto-approve on). */
export default function AwcProjectMembersInviteMeta({
  uses,
  expiresAt,
  autoApprove,
}: {
  readonly uses: number;
  readonly expiresAt: string;
  readonly autoApprove: boolean;
}) {
  return (
    <span className="mt-1 flex flex-wrap gap-1" data-invite-meta>
      <span className={TAG}>{C.invitePendingNotUsed}</span>
      <span className={TAG}>{C.invitePendingFor(uses)}</span>
      <span className={TAG}>
        {C.invitePendingExpires(formatInviteExpiry(expiresAt))}
      </span>
      {autoApprove ? (
        <span className={TAG_ON}>{C.invitePendingSubOn}</span>
      ) : null}
    </span>
  );
}
