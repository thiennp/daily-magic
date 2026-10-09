import { asRowArray, getSql } from "@/lib/db";
import { decideProjectConnectionTokenAction } from "@/lib/projects/connections/decideProjectConnectionTokenAction";
import { decryptProjectConnectionToken } from "@/lib/projects/connections/decryptProjectConnectionToken";
import { ensureProjectConnectionsSchema } from "@/lib/projects/connections/ensureProjectConnectionsSchema";
import { resolveProjectConnectionsAuthSecret } from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import type { ProjectConnectionProvider } from "@/lib/projects/connections/projectConnection.types";
import { refreshProjectConnectionAccessToken } from "@/lib/projects/connections/refreshProjectConnectionAccessToken";

export type ResolveProjectConnectionTokenResult =
  | { readonly ok: true; readonly accessToken: string }
  | {
      readonly ok: false;
      readonly code: "unavailable" | "not_connected" | "expired";
    };

/**
 * Bearer for a project's connected provider, for the server-side tool runtime
 * (assistants call tools; they never see the token). Refreshes an expiring token
 * first. SERVER ONLY: never return this value to a browser or put it in a message.
 */
export const resolveProjectConnectionToken = async (input: {
  readonly projectId: string;
  readonly provider: ProjectConnectionProvider;
  readonly nowMs?: number;
}): Promise<ResolveProjectConnectionTokenResult> => {
  const authSecret = resolveProjectConnectionsAuthSecret();
  if (authSecret === null) {
    return { ok: false, code: "unavailable" };
  }
  await ensureProjectConnectionsSchema();
  const row = asRowArray(
    await getSql()`
      SELECT status, token_expires_at, access_token_ciphertext, access_token_iv
      FROM project_connections
      WHERE project_id = ${input.projectId} AND provider = ${input.provider}
    `,
  )[0];
  if (row === undefined) {
    return { ok: false, code: "not_connected" };
  }
  const action = decideProjectConnectionTokenAction({
    status: String(row.status),
    tokenExpiresAt:
      row.token_expires_at === null || row.token_expires_at === undefined
        ? null
        : new Date(String(row.token_expires_at)),
    nowMs: input.nowMs ?? Date.now(),
  });
  if (action === "unusable") {
    return {
      ok: false,
      code: String(row.status) === "expired" ? "expired" : "not_connected",
    };
  }
  if (action === "refresh") {
    const refreshed = await refreshProjectConnectionAccessToken(input);
    return refreshed.ok
      ? { ok: true, accessToken: refreshed.accessToken }
      : {
          ok: false,
          code: refreshed.code === "unavailable" ? "unavailable" : "expired",
        };
  }
  return {
    ok: true,
    accessToken: decryptProjectConnectionToken(
      String(row.access_token_ciphertext),
      String(row.access_token_iv),
      authSecret,
    ),
  };
};
