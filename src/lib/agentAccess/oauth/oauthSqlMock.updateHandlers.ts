import {
  qText,
  store,
} from "@/lib/agentAccess/oauth/oauthSqlMock.store";

export const handleOauthSqlUpdate = (
  strings: TemplateStringsArray,
  values: readonly unknown[],
): unknown[] | null => {
  const q = qText(strings);

  if (q.includes("DELETE FROM agent_access_oauth_pending")) {
    store.pending = store.pending.filter((p) => p.id !== values[0]);
    return [];
  }

  if (
    q.includes("UPDATE agent_access_oauth_auth_codes") &&
    q.includes("used_at")
  ) {
    const code = store.codes.find(
      (c) => c.id === values[1] && c.used_at === null,
    );
    if (!code) return [];
    code.used_at = values[0];
    return [{ id: code.id }];
  }

  if (q.includes("DELETE FROM agent_access_oauth_token_delivery")) {
    const idx = store.delivery.findIndex((d) => d.auth_code_id === values[0]);
    if (idx < 0) return [];
    const [row] = store.delivery.splice(idx, 1);
    return [row];
  }

  if (q.includes("UPDATE users SET name")) return [];

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
    tok.token_hash = values[0];
    tok.token_prefix = values[1];
    tok.expires_at = values[2];
    tok.refresh_token_hash = values[3];
    tok.refresh_expires_at = values[4];
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
    tok.revoked_at = values[0];
    tok.refresh_token_hash = null;
    return [{ id: tok.id }];
  }

  return null;
};
