import {
  qText,
  store,
} from "@/lib/agentAccess/oauth/oauthSqlMock.store";

export const handleOauthSqlSelect = (
  strings: TemplateStringsArray,
  values: readonly unknown[],
): unknown[] | null => {
  const q = qText(strings);

  if (
    q.includes("FROM agent_access_oauth_clients") &&
    q.includes("client_id")
  ) {
    const found = store.clients.find((c) => c.client_id === values[0]);
    return found ? [{ ...found }] : [];
  }

  if (q.includes("FROM agent_access_oauth_pending")) {
    const found = store.pending.find((p) => p.id === values[0]);
    return found ? [{ ...found }] : [];
  }

  if (
    q.includes("FROM agent_access_oauth_auth_codes") &&
    q.includes("code_hash")
  ) {
    const found = store.codes.find((c) => c.code_hash === values[0]);
    return found ? [{ ...found }] : [];
  }

  if (
    q.includes("FROM agent_access_tokens") &&
    q.includes("refresh_token_hash")
  ) {
    const found = store.tokens.find((t) => t.refresh_token_hash === values[0]);
    return found ? [{ ...found }] : [];
  }

  return null;
};
