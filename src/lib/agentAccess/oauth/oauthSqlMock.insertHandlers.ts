import {
  qText,
  store,
} from "@/lib/agentAccess/oauth/oauthSqlMock.store";

export const handleOauthSqlInsert = (
  strings: TemplateStringsArray,
  values: readonly unknown[],
): unknown[] | null => {
  const q = qText(strings);

  if (q.includes("INSERT INTO agent_access_oauth_clients")) {
    store.clients.push({
      client_id: values[0],
      client_secret_hash: values[1],
      client_name: values[2],
      redirect_uris: values[3],
      token_endpoint_auth_method: values[4],
    });
    return [];
  }

  if (q.includes("INSERT INTO agent_access_oauth_pending")) {
    store.pending.push({
      id: values[0],
      client_id: values[1],
      redirect_uri: values[2],
      code_challenge: values[3],
      code_challenge_method: values[4],
      state: values[5],
      client_display_name: values[6],
      expires_at: values[7],
      created_at: values[8],
    });
    return [];
  }

  if (q.includes("INSERT INTO agent_access_tokens")) {
    const row = {
      id: `tok-oauth-${store.tokens.length + 1}`,
      user_id: values[0],
      token_hash: values[1],
      token_prefix: values[2],
      owner_user_id: values[3],
      expires_at: values[4],
      refresh_token_hash: values[5],
      refresh_expires_at: values[6],
      terms_version: values[7],
      terms_accepted_at: values[8],
      revoked_at: null as string | null,
    };
    store.tokens.push(row);
    return [{ id: row.id }];
  }

  if (q.includes("INSERT INTO agent_access_oauth_auth_codes")) {
    store.codes.push({
      id: values[0],
      code_hash: values[1],
      client_id: values[2],
      redirect_uri: values[3],
      code_challenge: values[4],
      code_challenge_method: values[5],
      owner_user_id: values[6],
      token_id: values[7],
      terms_version: values[8],
      client_display_name: values[9],
      expires_at: values[10],
      created_at: values[11],
      used_at: null,
    });
    return [];
  }

  if (q.includes("INSERT INTO agent_access_oauth_token_delivery")) {
    store.delivery.push({
      auth_code_id: values[0],
      access_token: values[1],
      refresh_token: values[2],
    });
    return [];
  }

  return null;
};
