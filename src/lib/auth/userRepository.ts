import { SUPER_ADMIN_EMAIL } from "@/lib/auth/constants";
import { GlobalRole, isGlobalRole } from "@/lib/auth/roles";
import type UserRecord from "@/lib/auth/types/UserRecord.type";
import { isBillingPlan } from "@/lib/billing/isBillingPlan";
import type { BillingPlan } from "@/lib/billing/types/BillingPlan.type";
import { getSql, asRowArray } from "@/lib/db";

function mapUserRow(row: Record<string, unknown>): UserRecord {
  const globalRole = String(row.global_role);

  return {
    id: String(row.id),
    email: String(row.email),
    name: row.name ? String(row.name) : null,
    image: row.image ? String(row.image) : null,
    globalRole: isGlobalRole(globalRole) ? globalRole : GlobalRole.USER,
    createdAt: String(row.created_at),
  };
}

export type UserRecordWithPlan = UserRecord & {
  readonly plan: BillingPlan;
  readonly adminFree: boolean;
  readonly costControlExcluded: boolean;
};

function mapUserRowWithPlan(row: Record<string, unknown>): UserRecordWithPlan {
  const planRaw = String(row.plan ?? "trial");
  return {
    ...mapUserRow(row),
    plan: isBillingPlan(planRaw) ? planRaw : "trial",
    adminFree: Boolean(row.admin_free),
    costControlExcluded: Boolean(row.cost_control_excluded),
  };
}

export async function getUserById(userId: string): Promise<UserRecord | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
    SELECT id, email, name, image, global_role, created_at
    FROM users
    WHERE id = ${userId}
  `,
  );

  if (!result[0]) {
    return null;
  }

  return mapUserRow(result[0]);
}

export async function getUserByEmail(
  email: string,
): Promise<UserRecord | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
    SELECT id, email, name, image, global_role, created_at
    FROM users
    WHERE email = ${email}
  `,
  );

  if (!result[0]) {
    return null;
  }

  return mapUserRow(result[0]);
}

export async function listUsers(): Promise<readonly UserRecord[]> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
    SELECT id, email, name, image, global_role, created_at
    FROM users
    ORDER BY created_at DESC
  `,
  );

  return result.map((row) => mapUserRow(row));
}

/** Admin users list: includes plan + admin_free for plan override UI. */
export async function listUsersWithPlan(): Promise<
  readonly UserRecordWithPlan[]
> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
    SELECT id, email, name, image, global_role, created_at, plan, admin_free,
      cost_control_excluded
    FROM users
    ORDER BY created_at DESC
  `,
  );

  return result.map((row) => mapUserRowWithPlan(row));
}

export async function deleteUserById(userId: string): Promise<void> {
  const sql = getSql();
  await sql`DELETE FROM users WHERE id = ${userId}`;
}

export async function syncSuperAdminRoleForEmail(email: string): Promise<void> {
  if (email.toLowerCase() !== SUPER_ADMIN_EMAIL.toLowerCase()) {
    return;
  }

  const sql = getSql();
  await sql`
    UPDATE users
    SET global_role = ${GlobalRole.SUPER_ADMIN}
    WHERE email = ${email}
  `;
}
