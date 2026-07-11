import type { Adapter } from "next-auth/adapters";

import { asRowArray, getSql } from "@/lib/db";

export function createNeonVerificationTokenAdapterMethods(): Pick<
  Adapter,
  "createVerificationToken" | "useVerificationToken"
> {
  return {
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
