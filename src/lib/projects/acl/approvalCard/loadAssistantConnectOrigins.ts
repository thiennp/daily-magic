import { asRowArray, getSql } from "@/lib/db";
import type { AssistantConnectVia } from "@/lib/projects/acl/approvalCard/PendingApprovalCardMeta.type";

export type AssistantConnectOrigin = {
  readonly ownerUserId: string | null;
  readonly assistantKind: string | null;
  readonly connectVia: AssistantConnectVia | null;
};

const text = (value: unknown): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : null;

const readVia = (row: Record<string, unknown>): AssistantConnectVia | null =>
  row.device_request_id !== null && row.device_request_id !== undefined
    ? "device_code"
    : row.oauth_code_id !== null && row.oauth_code_id !== undefined
      ? "sign_in"
      : null;

/**
 * Newest live credential per assistant: claimed owner + the client it used
 * (device-code client_name, or the sign-in client's registered name).
 * Fails soft (empty map) so the Access snapshot never breaks on this.
 */
export const loadAssistantConnectOrigins = async (
  assistantUserIds: readonly string[],
): Promise<ReadonlyMap<string, AssistantConnectOrigin>> => {
  const map = new Map<string, AssistantConnectOrigin>();
  if (assistantUserIds.length === 0) return map;
  try {
    const rows = asRowArray(
      await getSql()`
        SELECT DISTINCT ON (t.user_id)
          t.user_id, t.owner_user_id,
          d.id AS device_request_id, d.client_name AS device_client_name,
          a.id AS oauth_code_id,
          COALESCE(c.client_name, a.client_display_name) AS oauth_client_name
        FROM agent_access_tokens t
        LEFT JOIN agent_access_device_requests d ON d.token_id = t.id
        LEFT JOIN agent_access_oauth_auth_codes a ON a.token_id = t.id
        LEFT JOIN agent_access_oauth_clients c ON c.client_id = a.client_id
        WHERE t.user_id = ANY(${[...assistantUserIds]})
          AND t.revoked_at IS NULL
        ORDER BY t.user_id, (t.owner_user_id IS NULL), t.created_at DESC
      `,
    );
    for (const row of rows) {
      map.set(String(row.user_id), {
        ownerUserId: text(row.owner_user_id),
        assistantKind:
          text(row.device_client_name) ?? text(row.oauth_client_name),
        connectVia: readVia(row),
      });
    }
  } catch (error: unknown) {
    console.error("approval card connect origins failed", {
      error: error instanceof Error ? error.message : "load_failed",
    });
  }
  return map;
};
