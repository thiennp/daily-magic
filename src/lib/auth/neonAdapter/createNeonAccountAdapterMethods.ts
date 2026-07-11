import type { Adapter } from "next-auth/adapters";

import { getSql } from "@/lib/db";

export function createNeonAccountAdapterMethods(): Pick<
  Adapter,
  "linkAccount" | "unlinkAccount"
> {
  return {
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
  };
}
