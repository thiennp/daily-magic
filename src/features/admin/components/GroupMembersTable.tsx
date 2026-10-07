import Button from "@/components/ui/button/Button";
import TargetPresenceBadges from "@/features/dispatch/TargetPresenceBadges";
import {
  GROUP_ROLE_OPTIONS,
  type MemberItem,
} from "@/features/admin/types/groupManagement.types";
import { formatCompanyMemberRoleLabel } from "@/features/admin/utils/formatCompanyMemberRoleLabel";

interface GroupMembersTableProps {
  readonly members: readonly MemberItem[];
  readonly onRoleChange: (membershipId: string, role: string) => void;
  readonly onRemoveMember: (membershipId: string) => void;
}

export default function GroupMembersTable({
  members,
  onRoleChange,
  onRemoveMember,
}: GroupMembersTableProps) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-awc-border">
            <th className="px-3 py-2">Person</th>
            <th className="px-3 py-2">Role</th>
            <th className="px-3 py-2">Last active</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr
              key={member.membership.id}
              className="border-b border-awc-border"
            >
              <td className="px-3 py-2">
                <div className="flex flex-col gap-1">
                  <span>
                    {member.user?.email ?? member.membership.userId}
                  </span>
                  <TargetPresenceBadges
                    isOnline={member.presence?.isOnline ?? false}
                    isPaired={member.presence?.isPaired ?? false}
                  />
                </div>
              </td>
              <td className="px-3 py-2">
                <select
                  value={member.membership.role}
                  onChange={(event) => {
                    void onRoleChange(member.membership.id, event.target.value);
                  }}
                  aria-label="Role"
                  className="rounded-lg border border-awc-border px-2 py-1 text-sm"
                >
                  {GROUP_ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role}>
                      {formatCompanyMemberRoleLabel(role)}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-3 py-2 text-awc-fg-muted">
                {member.presence?.isOnline ? "Online now" : "—"}
              </td>
              <td className="px-3 py-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    void onRemoveMember(member.membership.id);
                  }}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
