import { randomUUID } from "node:crypto";

import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectConnectionsSchema } from "@/lib/projects/connections/ensureProjectConnectionsSchema";
import { encryptProjectConnectionToken } from "@/lib/projects/connections/encryptProjectConnectionToken";
import type { ExchangedProjectConnectionTokens } from "@/lib/projects/connections/exchangeProjectConnectionOAuthCode";
import type { ProjectConnectionProvider } from "@/lib/projects/connections/projectConnection.types";

export const upsertProjectConnection = async (input: {
  readonly projectId: string;
  readonly provider: ProjectConnectionProvider;
  readonly actorUserId: string;
  readonly authSecret: string;
  readonly tokens: ExchangedProjectConnectionTokens;
}): Promise<{ readonly id: string }> => {
  await ensureProjectConnectionsSchema();
  const access = encryptProjectConnectionToken(
    input.tokens.accessToken,
    input.authSecret,
  );
  const refresh =
    input.tokens.refreshToken !== null
      ? encryptProjectConnectionToken(
          input.tokens.refreshToken,
          input.authSecret,
        )
      : null;
  const id = randomUUID();
  const scopes = [...input.tokens.scopes];
  const expiresAt = input.tokens.expiresAt;
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO project_connections (
        id, project_id, provider, status,
        external_account_id, account_label, scopes,
        access_token_ciphertext, access_token_iv,
        refresh_token_ciphertext, refresh_token_iv,
        token_expires_at, created_by_user_id, connected_at,
        created_at, updated_at
      ) VALUES (
        ${id},
        ${input.projectId},
        ${input.provider},
        'connected',
        ${input.tokens.externalAccountId},
        ${input.tokens.accountLabel},
        ${scopes},
        ${access.ciphertext},
        ${access.iv},
        ${refresh?.ciphertext ?? null},
        ${refresh?.iv ?? null},
        ${expiresAt},
        ${input.actorUserId},
        NOW(),
        NOW(),
        NOW()
      )
      ON CONFLICT (project_id, provider) DO UPDATE SET
        status = 'connected',
        external_account_id = EXCLUDED.external_account_id,
        account_label = EXCLUDED.account_label,
        scopes = EXCLUDED.scopes,
        access_token_ciphertext = EXCLUDED.access_token_ciphertext,
        access_token_iv = EXCLUDED.access_token_iv,
        refresh_token_ciphertext = EXCLUDED.refresh_token_ciphertext,
        refresh_token_iv = EXCLUDED.refresh_token_iv,
        token_expires_at = EXCLUDED.token_expires_at,
        created_by_user_id = EXCLUDED.created_by_user_id,
        connected_at = NOW(),
        updated_at = NOW()
      RETURNING id
    `,
  );
  const returnedId =
    rows.length > 0 && typeof rows[0].id === "string" ? rows[0].id : id;
  return { id: returnedId };
};
