import {
  qText,
  store,
} from "@/lib/agentAccess/deviceCode/deviceCodeSqlMock.store";
import type { TokenRow } from "@/lib/agentAccess/deviceCode/deviceCodeSqlMock.types";

/** Handle INSERT queries for the in-memory device-code SQL mock. */
export const handleDeviceCodeSqlInsert = (
  strings: TemplateStringsArray,
  values: readonly unknown[],
): unknown[] | null => {
  const q = qText(strings);

  if (q.includes("INSERT INTO agent_access_device_requests")) {
    store.requests.push({
      id: String(values[0]),
      device_code_hash: String(values[1]),
      user_code_hash: String(values[2]),
      client_name: (values[3] as string | null) ?? null,
      display_name: (values[4] as string | null) ?? null,
      terms_version: String(values[5]),
      status: "pending",
      interval_seconds: Number(values[6]),
      expires_at: String(values[7]),
      created_at: String(values[8]),
      last_poll_at: null,
      slow_down_until: null,
      owner_user_id: null,
      token_id: null,
      decided_at: null,
      consumed_at: null,
    });
    return [];
  }

  if (q.includes("INSERT INTO agent_access_tokens")) {
    // userId, tokenHash, prefix, ownerUserId, accessExp, refreshHash,
    // refreshExp, termsVersion, termsAcceptedAt
    const row: TokenRow = {
      id: `tok-${store.tokens.length + 1}`,
      user_id: String(values[0]),
      token_hash: String(values[1]),
      token_prefix: String(values[2]),
      owner_user_id: (values[3] as string | null) ?? null,
      expires_at: (values[4] as string | null) ?? null,
      refresh_token_hash: (values[5] as string | null) ?? null,
      refresh_expires_at: (values[6] as string | null) ?? null,
      terms_version: (values[7] as string | null) ?? null,
      terms_accepted_at: (values[8] as string | null) ?? null,
      revoked_at: null,
    };
    store.tokens.push(row);
    return [{ id: row.id }];
  }

  if (q.includes("INSERT INTO agent_access_device_token_delivery")) {
    store.delivery.push({
      device_request_id: String(values[0]),
      access_token: String(values[1]),
      refresh_token: String(values[2]),
    });
    return [];
  }

  return null;
};
