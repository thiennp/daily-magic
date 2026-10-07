import Button from "@/components/ui/button/Button";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import { GROUP_ROLE_OPTIONS } from "@/features/admin/types/groupManagement.types";
import { formatCompanyMemberRoleLabel } from "@/features/admin/utils/formatCompanyMemberRoleLabel";

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
        placeholder={C.inviteEmailPlaceholder}
        aria-label={C.inviteEmailAria}
        className="flex-1 rounded-lg border border-awc-border px-3 py-2 text-sm"
      />
      <select
        value={memberRole}
        onChange={(event) => {
          onMemberRoleChange(event.target.value);
        }}
        aria-label={C.inviteRoleAria}
        className="rounded-lg border border-awc-border px-3 py-2 text-sm"
      >
        {GROUP_ROLE_OPTIONS.map((role) => (
          <option key={role} value={role}>
            {formatCompanyMemberRoleLabel(role)}
          </option>
        ))}
      </select>
      <Button onClick={() => void onAddMember()}>{C.inviteCta}</Button>
    </div>
  );
}
