import type AdminUserKind from "@/lib/auth/types/AdminUserKind.type";
import {
  ADMIN_USER_KIND_FILTER_ALL,
  type AdminUserKindFilter,
} from "@/features/admin/utils/adminUserKindLabels.constant";

interface HasAdminUserKind {
  readonly kind: AdminUserKind;
}

/** Filter admin users by kind; `all` returns the full list. */
const filterAdminUsersByKind = <T extends HasAdminUserKind>(
  users: readonly T[],
  filter: AdminUserKindFilter,
): readonly T[] => {
  if (filter === ADMIN_USER_KIND_FILTER_ALL) {
    return users;
  }
  return users.filter((user) => user.kind === filter);
};

export default filterAdminUsersByKind;
