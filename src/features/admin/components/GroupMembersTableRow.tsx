import AppIcon from "@/components/ui/icon/AppIcon";
import TargetPresenceBadges from "@/features/dispatch/TargetPresenceBadges";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import type { MemberItem } from "@/features/admin/types/public-api/types";
import { formatCompanyMemberRoleLabel } from "@/features/admin/utils/public-api/presentation";
import { TrashBinIcon } from "@/icons";
import { GroupRole } from "@/lib/auth/roles";

const EDITABLE_ROLES = [GroupRole.USER, GroupRole.GROUP_ADMIN] as const;

interface GroupMembersTableRowProps {
  readonly member: MemberItem;
  readonly isSelf: boolean;
  readonly actorIsAdmin: boolean;
  readonly actorCanManageAdmins: boolean;
  readonly onRoleChange: (membershipId: string, role: string) => void;
  readonly onRemoveMember: (membershipId: string) => void;
}

export const memberLabel = (member: MemberItem): string =>
  member.user?.name?.trim() || member.user?.email || member.membership.userId;

export default function GroupMembersTableRow({
  member,
  isSelf,
  actorIsAdmin,
  actorCanManageAdmins,
  onRoleChange,
  onRemoveMember,
}: GroupMembersTableRowProps) {
  const isOwner = member.membership.role === GroupRole.GROUP_SUPER_ADMIN;
  // The server lets only the company owner or a platform admin touch another admin.
  const isAdminSeat = member.membership.role === GroupRole.GROUP_ADMIN;
  const canEdit =
    actorIsAdmin &&
    !isOwner &&
    !isSelf &&
    (!isAdminSeat || actorCanManageAdmins);
  const label = memberLabel(member);

  return (
    <tr className="border-b border-awc-border">
      <td className="px-3 py-2">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-awc-fg">
            {label}
            {isSelf ? (
              <span className="ml-2 rounded-full bg-awc-fill px-2 py-0.5 text-xs font-medium text-awc-fg-muted">
                {C.youChip}
              </span>
            ) : null}
          </span>
          {member.user?.email && member.user.email !== label ? (
            <span className="text-xs text-awc-fg-muted">
              {member.user.email}
            </span>
          ) : null}
          <TargetPresenceBadges
            isOnline={member.presence?.isOnline ?? false}
            isPaired={member.presence?.isPaired ?? false}
          />
        </div>
      </td>
      <td className="px-3 py-2">
        {canEdit ? (
          <select
            value={member.membership.role}
            onChange={(event) => {
              onRoleChange(member.membership.id, event.target.value);
            }}
            aria-label={`${C.colRole} for ${label}`}
            className="rounded-lg border border-awc-border px-2 py-1 text-sm"
          >
            {EDITABLE_ROLES.map((role) => (
              <option key={role} value={role}>
                {formatCompanyMemberRoleLabel(role)}
              </option>
            ))}
          </select>
        ) : (
          formatCompanyMemberRoleLabel(member.membership.role)
        )}
      </td>
      <td className="px-3 py-2 text-awc-fg-muted">
        {member.presence?.isOnline ? C.onlineNow : "—"}
      </td>
      <td className="px-3 py-2">
        {canEdit ? (
          <button
            type="button"
            aria-label={`Remove ${label}`}
            title="Remove"
            className="inline-flex size-9 items-center justify-center rounded-lg text-awc-fg-muted transition hover:bg-awc-tile hover:text-awc-bad"
            onClick={() => {
              onRemoveMember(member.membership.id);
            }}
          >
            <AppIcon icon={TrashBinIcon} size="sm" />
          </button>
        ) : null}
      </td>
    </tr>
  );
}
