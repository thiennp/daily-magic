import { SUPER_ADMIN_EMAIL } from "@/lib/auth/constants";
import { GlobalRole } from "@/lib/auth/roles";
import { getSql } from "@/lib/db";

export async function ensureSuperAdminGlobalRole(email: string): Promise<void> {
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
