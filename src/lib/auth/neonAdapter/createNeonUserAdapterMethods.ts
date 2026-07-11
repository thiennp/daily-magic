import type { Adapter } from "next-auth/adapters";

import { SUPER_ADMIN_EMAIL } from "@/lib/auth/constants";
import { GlobalRole } from "@/lib/auth/roles";
import {
  mapAdapterUserRow,
  resolveGlobalRole,
} from "@/lib/auth/neonAdapter/mapAdapterUserRow";
import { asRowArray, getSql } from "@/lib/db";

export function createNeonUserAdapterMethods(): Pick<
  Adapter,
  | "createUser"
  | "getUser"
  | "getUserByEmail"
  | "getUserByAccount"
  | "updateUser"
  | "deleteUser"
> {
  return {
    async createUser(user) {
      const sql = getSql();
      const globalRole = user.email
        ? resolveGlobalRole(user.email)
        : GlobalRole.USER;
      const result = asRowArray(
        await sql`
        INSERT INTO users (name, email, email_verified, image, global_role)
        VALUES (
          ${user.name ?? null},
          ${user.email},
          ${user.emailVerified ?? null},
          ${user.image ?? null},
          ${globalRole}
        )
        RETURNING id, name, email, email_verified, image
      `,
      );

      return mapAdapterUserRow(result[0]);
    },

    async getUser(id) {
      const sql = getSql();
      const result = asRowArray(
        await sql`
        SELECT id, name, email, email_verified, image
        FROM users
        WHERE id = ${id}
      `,
      );

      if (!result[0]) {
        return null;
      }

      return mapAdapterUserRow(result[0]);
    },

    async getUserByEmail(email) {
      const sql = getSql();
      const result = asRowArray(
        await sql`
        SELECT id, name, email, email_verified, image
        FROM users
        WHERE email = ${email}
      `,
      );

      if (!result[0]) {
        return null;
      }

      return mapAdapterUserRow(result[0]);
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const sql = getSql();
      const result = asRowArray(
        await sql`
        SELECT u.id, u.name, u.email, u.email_verified, u.image
        FROM users u
        INNER JOIN accounts a ON a.user_id = u.id
        WHERE a.provider = ${provider}
          AND a.provider_account_id = ${providerAccountId}
      `,
      );

      if (!result[0]) {
        return null;
      }

      return mapAdapterUserRow(result[0]);
    },

    async updateUser(user) {
      const sql = getSql();
      const result = asRowArray(
        await sql`
        UPDATE users
        SET
          name = COALESCE(${user.name ?? null}, name),
          email = COALESCE(${user.email ?? null}, email),
          email_verified = COALESCE(${user.emailVerified ?? null}, email_verified),
          image = COALESCE(${user.image ?? null}, image),
          global_role = CASE
            WHEN COALESCE(${user.email ?? null}, email) = ${SUPER_ADMIN_EMAIL} THEN ${GlobalRole.SUPER_ADMIN}
            ELSE global_role
          END
        WHERE id = ${user.id}
        RETURNING id, name, email, email_verified, image
      `,
      );

      return mapAdapterUserRow(result[0]);
    },

    async deleteUser(userId) {
      const sql = getSql();
      await sql`DELETE FROM users WHERE id = ${userId}`;
    },
  };
}
