import {
  qText,
  store,
} from "@/lib/agentAccess/deviceCode/deviceCodeSqlMock.store";

/** Handle SELECT / refresh-rotate / revoke for the in-memory SQL mock. */
export const handleDeviceCodeSqlSelect = (
  strings: TemplateStringsArray,
  values: readonly unknown[],
): unknown[] | null => {
  const q = qText(strings);

  if (
    q.includes("FROM agent_access_device_requests") &&
    q.includes("user_code_hash")
  ) {
    const found = store.requests.find((r) => r.user_code_hash === values[0]);
    return found ? [{ ...found }] : [];
  }

  if (
    q.includes("FROM agent_access_device_requests") &&
    q.includes("device_code_hash")
  ) {
    const found = store.requests.find((r) => r.device_code_hash === values[0]);
    return found ? [{ ...found }] : [];
  }

  if (
    q.includes("FROM agent_access_tokens") &&
    q.includes("refresh_token_hash")
  ) {
    const found = store.tokens.find((t) => t.refresh_token_hash === values[0]);
    return found ? [{ ...found }] : [];
  }

  if (
    q.includes("UPDATE agent_access_tokens") &&
    q.includes("token_prefix") &&
    q.includes("refresh_expires_at")
  ) {
    const tok = store.tokens.find(
      (t) =>
        t.id === values[6] &&
        t.refresh_token_hash === values[7] &&
        t.revoked_at === null,
    );
    if (!tok) return [];
    tok.token_hash = String(values[0]);
    tok.token_prefix = String(values[1]);
    tok.expires_at = String(values[2]);
    tok.refresh_token_hash = String(values[3]);
    tok.refresh_expires_at = String(values[4]);
    tok.last_used_at = String(values[5]);
    return [{ id: tok.id }];
  }

  if (
    q.includes("UPDATE agent_access_tokens") &&
    q.includes("revoked_at") &&
    !q.includes("token_prefix")
  ) {
    const hash = values[1];
    const tok = store.tokens.find(
      (t) =>
        (t.token_hash === hash || t.refresh_token_hash === hash) &&
        t.revoked_at === null,
    );
    if (!tok) return [];
    tok.revoked_at = String(values[0]);
    tok.refresh_token_hash = null;
    return [{ id: tok.id }];
  }

  return null;
};
