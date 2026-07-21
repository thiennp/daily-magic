import { asRowArray, getSql } from "@/lib/db";
import { decryptCursorCloudApiKey } from "@/lib/cursorCloud/decryptCursorCloudApiKey";
import { encryptCursorCloudApiKey } from "@/lib/cursorCloud/encryptCursorCloudApiKey";
import type { CursorCloudConnectionSummary } from "@/lib/cursorCloud/types/CursorCloudConnection.type";

export const getCursorCloudConnectionSummary = async (
  userId: string,
): Promise<CursorCloudConnectionSummary> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT api_key_name, cursor_user_email, connected_at
      FROM cursor_cloud_connections
      WHERE user_id = ${userId}
    `,
  );

  if (rows.length === 0) {
    return {
      connected: false,
      apiKeyName: null,
      cursorUserEmail: null,
      connectedAt: null,
    };
  }

  const row = rows[0];
  return {
    connected: true,
    apiKeyName:
      row.api_key_name === null || row.api_key_name === undefined
        ? null
        : String(row.api_key_name),
    cursorUserEmail:
      row.cursor_user_email === null || row.cursor_user_email === undefined
        ? null
        : String(row.cursor_user_email),
    connectedAt:
      row.connected_at === null || row.connected_at === undefined
        ? null
        : String(row.connected_at),
  };
};

export const upsertCursorCloudConnection = async (input: {
  readonly userId: string;
  readonly apiKey: string;
  readonly authSecret: string;
  readonly apiKeyName: string | null;
  readonly cursorUserEmail: string | null;
}): Promise<void> => {
  const { ciphertext, iv } = encryptCursorCloudApiKey(
    input.apiKey,
    input.authSecret,
  );
  const sql = getSql();
  await sql`
    INSERT INTO cursor_cloud_connections (
      user_id,
      api_key_ciphertext,
      api_key_iv,
      api_key_name,
      cursor_user_email
    )
    VALUES (
      ${input.userId},
      ${ciphertext},
      ${iv},
      ${input.apiKeyName},
      ${input.cursorUserEmail}
    )
    ON CONFLICT (user_id) DO UPDATE SET
      api_key_ciphertext = EXCLUDED.api_key_ciphertext,
      api_key_iv = EXCLUDED.api_key_iv,
      api_key_name = EXCLUDED.api_key_name,
      cursor_user_email = EXCLUDED.cursor_user_email,
      updated_at = NOW()
  `;
};

export const deleteCursorCloudConnection = async (
  userId: string,
): Promise<void> => {
  const sql = getSql();
  await sql`
    DELETE FROM cursor_cloud_connections
    WHERE user_id = ${userId}
  `;
};

export const getCursorCloudApiKeyForUser = async (
  userId: string,
  authSecret: string,
): Promise<string | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT api_key_ciphertext, api_key_iv
      FROM cursor_cloud_connections
      WHERE user_id = ${userId}
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  const row = rows[0];
  const ciphertext = String(row.api_key_ciphertext);
  const iv = String(row.api_key_iv);
  return decryptCursorCloudApiKey(ciphertext, iv, authSecret);
};
