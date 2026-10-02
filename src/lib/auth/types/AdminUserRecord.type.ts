import type AdminUserKind from "@/lib/auth/types/AdminUserKind.type";
import type UserRecord from "@/lib/auth/types/UserRecord.type";

/** GET /api/admin/users item: UserRecord + kind + lastActivityAt (ISO or null). */
export default interface AdminUserRecord extends UserRecord {
  readonly kind: AdminUserKind;
  readonly lastActivityAt: string | null;
}
