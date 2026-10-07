import { asRowArray, getSql } from "@/lib/db";
import { decryptProjectConnectionToken } from "@/lib/projects/connections/decryptProjectConnectionToken";
import { encryptProjectConnectionToken } from "@/lib/projects/connections/encryptProjectConnectionToken";
import { ensureProjectConnectionsSchema } from "@/lib/projects/connections/ensureProjectConnectionsSchema";
import {
  getProviderOAuthConfig,
  type ProviderOAuthConfig,
} from "@/lib/projects/connections/getProviderOAuthConfig";
import { resolveProjectConnectionsAuthSecret } from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import type { ProjectConnectionProvider } from "@/lib/projects/connections/projectConnection.types";

const asRecord = (value: unknown): Record<string, unknown> | null =>
  value !== null && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;

const expiresAtFromExpiresIn = (expiresIn: unknown): Date | null =>
  typeof expiresIn === "number" && Number.isFinite(expiresIn) && expiresIn > 0
    ? new Date(Date.now() + expiresIn * 1000)
    : null;

export type RefreshedProjectConnectionTokens = {
  readonly accessToken: string;
  readonly refreshToken: string | null;
  readonly expiresAt: Date | null;
};

/**
 * Provider refresh for Gmail (Google) and Linear.
 * GitHub/Slack typically have no short-lived access token refresh in P1.
 */
export const refreshProviderAccessToken = async (input: {
  readonly config: ProviderOAuthConfig;
  readonly refreshToken: string;
}): Promise<RefreshedProjectConnectionTokens | null> => {
  if (input.config.provider !== "gmail" && input.config.provider !== "linear") {
    return null;
  }
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: input.refreshToken,
    client_id: input.config.clientId,
    client_secret: input.config.clientSecret,
  });
  const tokenRes = await fetch(input.config.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!tokenRes.ok) return null;
  const tokenJson = asRecord(await tokenRes.json().catch(() => null));
  if (tokenJson === null) return null;
  const accessToken =
    typeof tokenJson.access_token === "string" ? tokenJson.access_token : null;
  if (accessToken === null || accessToken.length === 0) return null;
  // Google may omit refresh_token on refresh; Linear rotates it — keep prior if absent.
  const nextRefresh =
    typeof tokenJson.refresh_token === "string"
      ? tokenJson.refresh_token
      : input.refreshToken;
  return {
    accessToken,
    refreshToken: nextRefresh,
    expiresAt: expiresAtFromExpiresIn(tokenJson.expires_in),
  };
};

const markExpired = async (
  projectId: string,
  provider: ProjectConnectionProvider,
): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE project_connections
    SET status = 'expired', updated_at = NOW()
    WHERE project_id = ${projectId}
      AND provider = ${provider}
      AND status = 'connected'
  `;
};

export type RefreshProjectConnectionAccessTokenResult =
  | {
      readonly ok: true;
      readonly accessToken: string;
      readonly expiresAt: Date | null;
    }
  | {
      readonly ok: false;
      readonly code: "unavailable" | "expired" | "not_found" | "unsupported";
    };

/**
 * Decrypt refresh token, call provider, persist rotated tokens.
 * On failure for Gmail/Linear → status expired (list surfaces honestly).
 */
export const refreshProjectConnectionAccessToken = async (input: {
  readonly projectId: string;
  readonly provider: ProjectConnectionProvider;
}): Promise<RefreshProjectConnectionAccessTokenResult> => {
  const authSecret = resolveProjectConnectionsAuthSecret();
  if (authSecret === null) {
    return { ok: false, code: "unavailable" };
  }
  if (input.provider !== "gmail" && input.provider !== "linear") {
    return { ok: false, code: "unsupported" };
  }
  const config = getProviderOAuthConfig(input.provider);
  if (config === null) {
    return { ok: false, code: "unavailable" };
  }

  await ensureProjectConnectionsSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT
        refresh_token_ciphertext,
        refresh_token_iv,
        token_expires_at,
        status
      FROM project_connections
      WHERE project_id = ${input.projectId}
        AND provider = ${input.provider}
      LIMIT 1
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "not_found" };
  }
  const row = rows[0];
  const cipher =
    typeof row.refresh_token_ciphertext === "string"
      ? row.refresh_token_ciphertext
      : null;
  const iv =
    typeof row.refresh_token_iv === "string" ? row.refresh_token_iv : null;
  if (cipher === null || iv === null) {
    await markExpired(input.projectId, input.provider);
    return { ok: false, code: "expired" };
  }

  let refreshToken: string;
  try {
    refreshToken = decryptProjectConnectionToken(cipher, iv, authSecret);
  } catch {
    await markExpired(input.projectId, input.provider);
    return { ok: false, code: "expired" };
  }

  const refreshed = await refreshProviderAccessToken({
    config,
    refreshToken,
  });
  if (refreshed === null) {
    await markExpired(input.projectId, input.provider);
    return { ok: false, code: "expired" };
  }

  const access = encryptProjectConnectionToken(
    refreshed.accessToken,
    authSecret,
  );
  const nextRefreshToken = refreshed.refreshToken ?? refreshToken;
  const nextRefresh = encryptProjectConnectionToken(
    nextRefreshToken,
    authSecret,
  );

  await sql`
    UPDATE project_connections
    SET
      status = 'connected',
      access_token_ciphertext = ${access.ciphertext},
      access_token_iv = ${access.iv},
      refresh_token_ciphertext = ${nextRefresh.ciphertext},
      refresh_token_iv = ${nextRefresh.iv},
      token_expires_at = ${refreshed.expiresAt},
      updated_at = NOW()
    WHERE project_id = ${input.projectId}
      AND provider = ${input.provider}
  `;

  return {
    ok: true,
    accessToken: refreshed.accessToken,
    expiresAt: refreshed.expiresAt,
  };
};
