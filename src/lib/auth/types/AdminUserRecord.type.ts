import type AdminUserKind from "@/lib/auth/types/AdminUserKind.type";
import type UserRecord from "@/lib/auth/types/UserRecord.type";
import type { BillingPlan } from "@/lib/billing/types/BillingPlan.type";

/** GET /api/admin/users item: UserRecord + kind + lastActivityAt + plan. */
export default interface AdminUserRecord extends UserRecord {
  readonly kind: AdminUserKind;
  readonly lastActivityAt: string | null;
  readonly plan: BillingPlan;
  readonly adminFree: boolean;
}
