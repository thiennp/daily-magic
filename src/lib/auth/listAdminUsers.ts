import loadAdminUsersLastActivity from "@/lib/auth/loadAdminUsersLastActivity";
import resolveAdminUserKind from "@/lib/auth/resolveAdminUserKind";
import type AdminUserRecord from "@/lib/auth/types/AdminUserRecord.type";
import { listUsersWithPlan } from "@/lib/auth/userRepository";

/** Enriched admin users list: kind + lastActivityAt + plan (never copies createdAt). */
const listAdminUsers = async (): Promise<readonly AdminUserRecord[]> => {
  const users = await listUsersWithPlan();
  const activityByUserId = await loadAdminUsersLastActivity();

  return users.map((user) => ({
    ...user,
    kind: resolveAdminUserKind(user.email),
    lastActivityAt: activityByUserId.get(user.id) ?? null,
  }));
};

export default listAdminUsers;
