import {
  ADMIN_USER_KIND_FILTER_OPTIONS,
  adminUserKindFilterLabel,
  type AdminUserKindFilter,
} from "@/features/admin/utils/adminUserKindLabels.constant";

interface UsersKindFilterProps {
  readonly value: AdminUserKindFilter;
  readonly onChange: (value: AdminUserKindFilter) => void;
}

export default function UsersKindFilter({
  value,
  onChange,
}: UsersKindFilterProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-awc-fg-muted">
      <span>Kind</span>
      <select
        className="rounded-lg border border-awc-border bg-awc-surface px-2 py-1 text-sm"
        value={value}
        onChange={(event) => {
          onChange(event.target.value as AdminUserKindFilter);
        }}
      >
        {ADMIN_USER_KIND_FILTER_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {adminUserKindFilterLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
}
