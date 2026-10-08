import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectConnectionsSchema } from "@/lib/projects/connections/ensureProjectConnectionsSchema";
import { decryptProjectConnectionToken } from "@/lib/projects/connections/decryptProjectConnectionToken";
import { bestEffortRevoke } from "@/lib/projects/connections/bestEffortRevokeProjectConnection";
import { resolveProjectConnectionsAuthSecret } from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import type { ProjectConnectionProvider } from "@/lib/projects/connections/projectConnection.types";
import { teardownLinearTaskSync } from "@/lib/projects/taskSync/teardownLinearTaskSync";

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
  // Needs the still-valid Linear token, so it runs before the revoke below.
  if (input.provider === "linear") {
    await teardownLinearTaskSync(input.projectId);
  }
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
