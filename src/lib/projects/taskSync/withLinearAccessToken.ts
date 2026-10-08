import { asRowArray, getSql } from "@/lib/db";
import { decryptProjectConnectionToken } from "@/lib/projects/connections/decryptProjectConnectionToken";
import { ensureProjectConnectionsSchema } from "@/lib/projects/connections/ensureProjectConnectionsSchema";
import { resolveProjectConnectionsAuthSecret } from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import { refreshProjectConnectionAccessToken } from "@/lib/projects/connections/refreshProjectConnectionAccessToken";
import { LinearApiError } from "@/lib/projects/taskSync/linearGraphql";

/** Decrypted Linear access token of a `connected` project connection, else null. */
export const loadLinearAccessToken = async (
  projectId: string,
): Promise<string | null> => {
  const secret = resolveProjectConnectionsAuthSecret();
  if (secret === null) return null;
  await ensureProjectConnectionsSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT access_token_ciphertext, access_token_iv
      FROM project_connections
      WHERE project_id = ${projectId} AND provider = 'linear'
        AND status = 'connected'
      LIMIT 1
    `,
  );
  const cipher = rows[0]?.access_token_ciphertext;
  const iv = rows[0]?.access_token_iv;
  if (typeof cipher !== "string" || typeof iv !== "string") return null;
  try {
    return decryptProjectConnectionToken(cipher, iv, secret);
  } catch {
    return null;
  }
};

/**
 * Runs `fn` with the project's Linear token; on a 401 refreshes the token once
 * and retries. Null = no usable connection.
 */
export const withLinearAccessToken = async <T>(
  projectId: string,
  fn: (token: string) => Promise<T>,
): Promise<T | null> => {
  const token = await loadLinearAccessToken(projectId);
  if (token === null) return null;
  try {
    return await fn(token);
  } catch (error: unknown) {
    if (!(error instanceof LinearApiError) || error.status !== 401) throw error;
    const refreshed = await refreshProjectConnectionAccessToken({
      projectId,
      provider: "linear",
    });
    return refreshed.ok ? fn(refreshed.accessToken) : null;
  }
};
