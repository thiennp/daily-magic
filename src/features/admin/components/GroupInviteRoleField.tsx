import InfoTip from "@/components/ui/infoTip/InfoTip";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import { formatCompanyMemberRoleLabel } from "@/features/admin/utils/formatCompanyMemberRoleLabel";
import { GroupRole } from "@/lib/auth/roles";

const INVITE_ROLES = [GroupRole.USER, GroupRole.GROUP_ADMIN] as const;

interface GroupInviteRoleFieldProps {
  readonly id: string;
  readonly value: string;
  readonly disabled: boolean;
  readonly onChange: (value: string) => void;
}

export default function GroupInviteRoleField({
  id,
  value,
  disabled,
  onChange,
}: GroupInviteRoleFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="flex items-center gap-1 text-sm font-medium text-awc-fg"
      >
        {C.inviteRoleLabel}
        <InfoTip text={C.roleTip} label="About roles" />
      </label>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        className="rounded-lg border border-awc-border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:bg-awc-fill"
      >
        {INVITE_ROLES.map((role) => (
          <option key={role} value={role}>
            {formatCompanyMemberRoleLabel(role)}
          </option>
        ))}
      </select>
    </div>
  );
}
