import type { Adapter } from "next-auth/adapters";

import { mapAdapterUserRow } from "@/lib/auth/neonAdapter/mapAdapterUserRow";
import { asRowArray, getSql } from "@/lib/db";

export function createNeonSessionAdapterMethods(): Pick<
  Adapter,
  "createSession" | "getSessionAndUser" | "updateSession" | "deleteSession"
> {
  return {
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
        user: mapAdapterUserRow(row),
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
  };
}
