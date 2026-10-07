import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectConnectionsSchema } from "@/lib/projects/connections/ensureProjectConnectionsSchema";
import { decryptProjectConnectionToken } from "@/lib/projects/connections/decryptProjectConnectionToken";
import { getProviderOAuthConfig } from "@/lib/projects/connections/getProviderOAuthConfig";
import { resolveProjectConnectionsAuthSecret } from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import type { ProjectConnectionProvider } from "@/lib/projects/connections/projectConnection.types";

const bestEffortRevoke = async (input: {
  readonly provider: ProjectConnectionProvider;
  readonly accessToken: string;
}): Promise<void> => {
  try {
    if (input.provider === "github") {
      const config = getProviderOAuthConfig("github");
      if (config === null) return;
      await fetch(
        `https://api.github.com/applications/${encodeURIComponent(config.clientId)}/token`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64")}`,
            "User-Agent": "AgentWitch-ProjectConnections",
          },
          body: JSON.stringify({ access_token: input.accessToken }),
        },
      );
      return;
    }
    if (input.provider === "slack") {
      const body = new URLSearchParams({ token: input.accessToken });
      await fetch("https://slack.com/api/auth.revoke", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
    }
  } catch {
    // Best-effort only — local row delete still proceeds.
  }
};

export type DisconnectProjectConnectionResult =
  | { readonly ok: true; readonly removed: boolean }
  | { readonly ok: false; readonly code: "unavailable" };

export const disconnectProjectConnection = async (input: {
  readonly projectId: string;
  readonly provider: ProjectConnectionProvider;
}): Promise<DisconnectProjectConnectionResult> => {
  const authSecret = resolveProjectConnectionsAuthSecret();
  if (authSecret === null) {
    return { ok: false, code: "unavailable" };
  }
  await ensureProjectConnectionsSchema();
  const sql = getSql();
  const existing = asRowArray(
    await sql`
      SELECT access_token_ciphertext, access_token_iv
      FROM project_connections
      WHERE project_id = ${input.projectId}
        AND provider = ${input.provider}
      LIMIT 1
    `,
  );
  if (existing.length > 0) {
    const row = existing[0];
    const cipher =
      typeof row.access_token_ciphertext === "string"
        ? row.access_token_ciphertext
        : null;
    const iv =
      typeof row.access_token_iv === "string" ? row.access_token_iv : null;
    if (cipher !== null && iv !== null) {
      try {
        const accessToken = decryptProjectConnectionToken(
          cipher,
          iv,
          authSecret,
        );
        await bestEffortRevoke({
          provider: input.provider,
          accessToken,
        });
      } catch {
        // Ignore decrypt/revoke failures; still delete the row.
      }
    }
  }
  const deleted = asRowArray(
    await sql`
      DELETE FROM project_connections
      WHERE project_id = ${input.projectId}
        AND provider = ${input.provider}
      RETURNING id
    `,
  );
  return { ok: true, removed: deleted.length > 0 };
};
