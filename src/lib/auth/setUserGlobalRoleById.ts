import {
  GlobalRole,
  type GlobalRoleValue,
  isGlobalRole,
} from "@/lib/auth/roles";
import { getSql } from "@/lib/db";

const setUserGlobalRoleById = async (
  userId: string,
  globalRole: GlobalRoleValue,
): Promise<void> => {
  if (!isGlobalRole(globalRole)) {
    return;
  }

  const sql = getSql();
  await sql`
    UPDATE users
    SET global_role = ${globalRole}
    WHERE id = ${userId}
  `;
};

export default setUserGlobalRoleById;

export const promoteUserToSuperAdminById = async (
  userId: string,
): Promise<void> => {
  await setUserGlobalRoleById(userId, GlobalRole.SUPER_ADMIN);
};
