import GroupMembersTableRow from "@/features/admin/components/GroupMembersTableRow";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import type { MemberItem } from "@/features/admin/types/groupManagement.types";

interface GroupMembersTableProps {
  readonly members: readonly MemberItem[];
  readonly actorUserId: string | null;
  readonly actorIsAdmin: boolean;
  readonly onRoleChange: (membershipId: string, role: string) => void;
  readonly onRemoveMember: (membershipId: string) => void;
}

export default function GroupMembersTable({
  members,
  actorUserId,
  actorIsAdmin,
  onRoleChange,
  onRemoveMember,
}: GroupMembersTableProps) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-awc-border">
            <th className="px-3 py-2">{C.colPerson}</th>
            <th className="px-3 py-2">{C.colRole}</th>
            <th className="px-3 py-2">{C.colLastActive}</th>
            <th className="px-3 py-2">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <GroupMembersTableRow
              key={member.membership.id}
              member={member}
              isSelf={member.membership.userId === actorUserId}
              actorIsAdmin={actorIsAdmin}
              onRoleChange={onRoleChange}
              onRemoveMember={onRemoveMember}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
