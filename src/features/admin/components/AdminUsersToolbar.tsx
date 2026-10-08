import UsersKindFilter from "@/features/admin/components/UsersKindFilter";
import { ADMIN_COPY } from "@/features/admin/adminCopy.constant";
import type { AdminUserKindFilter } from "@/features/admin/utils/adminUserKindLabels.constant";

interface AdminUsersToolbarProps {
  readonly query: string;
  readonly kindFilter: AdminUserKindFilter;
  readonly count: number;
  readonly onQueryChange: (value: string) => void;
  readonly onKindChange: (value: AdminUserKindFilter) => void;
}

export default function AdminUsersToolbar({
  query,
  kindFilter,
  count,
  onQueryChange,
  onKindChange,
}: AdminUsersToolbarProps) {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex flex-wrap items-end gap-3">
        <label className="min-w-[min(300px,100%)] flex-1 text-sm font-medium text-awc-fg">
          <span className="sr-only">{ADMIN_COPY.searchPlaceholder}</span>
          <input
            type="search"
            value={query}
            autoComplete="off"
            spellCheck={false}
            placeholder={ADMIN_COPY.searchPlaceholder}
            onChange={(event) => {
              onQueryChange(event.target.value);
            }}
            className="w-full rounded-lg border border-awc-border px-3 py-2 text-sm font-normal"
          />
        </label>
        <UsersKindFilter value={kindFilter} onChange={onKindChange} />
      </div>
      <p role="status" className="text-sm text-awc-fg-muted">
        {count} {count === 1 ? "user" : "users"}
      </p>
    </div>
  );
}
