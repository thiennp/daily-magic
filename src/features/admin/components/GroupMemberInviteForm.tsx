import Button from "@/components/ui/button/Button";
import { GROUP_ROLE_OPTIONS } from "@/features/admin/types/groupManagement.types";

interface GroupMemberInviteFormProps {
  readonly memberEmail: string;
  readonly memberRole: string;
  readonly onMemberEmailChange: (value: string) => void;
  readonly onMemberRoleChange: (value: string) => void;
  readonly onAddMember: () => void;
}

export default function GroupMemberInviteForm({
  memberEmail,
  memberRole,
  onMemberEmailChange,
  onMemberRoleChange,
  onAddMember,
}: GroupMemberInviteFormProps) {
  return (
    <div className="mt-4 flex flex-col gap-3 lg:flex-row">
      <input
        value={memberEmail}
        onChange={(event) => {
          onMemberEmailChange(event.target.value);
        }}
        placeholder="user@example.com"
        aria-label="Member email"
        className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
      />
      <select
        value={memberRole}
        onChange={(event) => {
          onMemberRoleChange(event.target.value);
        }}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
      >
        {GROUP_ROLE_OPTIONS.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <Button onClick={() => void onAddMember()}>Add member</Button>
    </div>
  );
}
