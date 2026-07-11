import Button from "@/components/ui/button/Button";
import {
  GROUP_ROLE_OPTIONS,
  type MemberItem,
} from "@/features/admin/types/groupManagement.types";

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
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Role</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr
              key={member.membership.id}
              className="border-b border-gray-100 dark:border-gray-800/80"
            >
              <td className="px-3 py-2">
                {member.user?.email ?? member.membership.userId}
              </td>
              <td className="px-3 py-2">
                <select
                  value={member.membership.role}
                  onChange={(event) => {
                    void onRoleChange(member.membership.id, event.target.value);
                  }}
                  className="rounded-lg border border-gray-200 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-950"
                >
                  {GROUP_ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
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
