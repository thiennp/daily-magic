import type AdminUserKind from "@/lib/auth/types/AdminUserKind.type";
import { ADMIN_USER_KIND_LABELS } from "@/features/admin/utils/adminUserKindLabels.constant";

/** Display label for admin user kind (real / bot / test). */
const formatAdminUserKindLabel = (kind: AdminUserKind): string =>
  ADMIN_USER_KIND_LABELS[kind];

export default formatAdminUserKindLabel;
