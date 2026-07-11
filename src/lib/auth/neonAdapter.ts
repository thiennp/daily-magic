import type { Adapter, AdapterAccount, AdapterUser } from "next-auth/adapters";

import { SUPER_ADMIN_EMAIL } from "@/lib/auth/constants";
import { GlobalRole } from "@/lib/auth/roles";
import { getSql, asRowArray } from "@/lib/db";

function mapUserRow(row: Record<string, unknown>): AdapterUser {
  return {
    id: String(row.id),
    email: String(row.email),
    emailVerified: row.email_verified
      ? new Date(String(row.email_verified))
      : null,
    name: row.name ? String(row.name) : null,
    image: row.image ? String(row.image) : null,
  };
}

function resolveGlobalRole(email: string): string {
  if (email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) {
    return GlobalRole.SUPER_ADMIN;
  }

  return GlobalRole.USER;
}

export function createNeonAuthAdapter(): Adapter {
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

      return mapUserRow(result[0]);
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

      return mapUserRow(result[0]);
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

      return mapUserRow(result[0]);
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

      return mapUserRow(result[0]);
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

      return mapUserRow(result[0]);
    },

    async deleteUser(userId) {
      const sql = getSql();
      await sql`DELETE FROM users WHERE id = ${userId}`;
    },

    async linkAccount(account) {
      const sql = getSql();
      await sql`
        INSERT INTO accounts (
          user_id,
          type,
          provider,
          provider_account_id,
          refresh_token,
          access_token,
          expires_at,
          token_type,
          scope,
          id_token,
          session_state
        )
        VALUES (
          ${account.userId},
          ${account.type},
          ${account.provider},
          ${account.providerAccountId},
          ${account.refresh_token ?? null},
          ${account.access_token ?? null},
          ${account.expires_at ?? null},
          ${account.token_type ?? null},
          ${account.scope ?? null},
          ${account.id_token ?? null},
          ${account.session_state ?? null}
        )
      `;
    },

    async unlinkAccount({ provider, providerAccountId }) {
      const sql = getSql();
      await sql`
        DELETE FROM accounts
        WHERE provider = ${provider}
          AND provider_account_id = ${providerAccountId}
      `;
    },

    async createSession(session) {
      const sql = getSql();
      await sql`
        INSERT INTO sessions (session_token, user_id, expires)
        VALUES (${session.sessionToken}, ${session.userId}, ${session.expires})
      `;

      return session;
    },

    async getSessionAndUser(sessionToken) {
      const sql = getSql();
      const result = asRowArray(
        await sql`
        SELECT
          s.session_token,
          s.user_id,
          s.expires,
          u.id,
          u.name,
          u.email,
          u.email_verified,
          u.image
        FROM sessions s
        INNER JOIN users u ON u.id = s.user_id
        WHERE s.session_token = ${sessionToken}
      `,
      );

      if (!result[0]) {
        return null;
      }

      const row = result[0];

      return {
        session: {
          sessionToken: String(row.session_token),
          userId: String(row.user_id),
          expires: new Date(String(row.expires)),
        },
        user: mapUserRow(row),
      };
    },

    async updateSession(session) {
      const sql = getSql();
      const result = asRowArray(
        await sql`
        UPDATE sessions
        SET expires = ${session.expires}
        WHERE session_token = ${session.sessionToken}
        RETURNING session_token, user_id, expires
      `,
      );

      if (!result[0]) {
        return null;
      }

      const row = result[0];

      return {
        sessionToken: String(row.session_token),
        userId: String(row.user_id),
        expires: new Date(String(row.expires)),
      };
    },

    async deleteSession(sessionToken) {
      const sql = getSql();
      await sql`DELETE FROM sessions WHERE session_token = ${sessionToken}`;
    },

    async createVerificationToken(verificationToken) {
      const sql = getSql();
      const result = asRowArray(
        await sql`
        INSERT INTO verification_tokens (identifier, token, expires)
        VALUES (
          ${verificationToken.identifier},
          ${verificationToken.token},
          ${verificationToken.expires}
        )
        RETURNING identifier, token, expires
      `,
      );

      const row = result[0];

      return {
        identifier: String(row.identifier),
        token: String(row.token),
        expires: new Date(String(row.expires)),
      };
    },

    async useVerificationToken({ identifier, token }) {
      const sql = getSql();
      const result = asRowArray(
        await sql`
        DELETE FROM verification_tokens
        WHERE identifier = ${identifier}
          AND token = ${token}
        RETURNING identifier, token, expires
      `,
      );

      if (!result[0]) {
        return null;
      }

      const row = result[0];

      return {
        identifier: String(row.identifier),
        token: String(row.token),
        expires: new Date(String(row.expires)),
      };
    },
  };
}

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

export type { AdapterAccount };
