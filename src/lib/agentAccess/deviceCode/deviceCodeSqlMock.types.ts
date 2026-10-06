export type RequestRow = {
  id: string;
  device_code_hash: string;
  user_code_hash: string;
  client_name: string | null;
  display_name: string | null;
  terms_version: string;
  status: string;
  interval_seconds: number;
  expires_at: string;
  created_at: string;
  last_poll_at: string | null;
  slow_down_until: string | null;
  owner_user_id: string | null;
  token_id: string | null;
  decided_at: string | null;
  consumed_at: string | null;
};

export type TokenRow = {
  id: string;
  user_id?: string;
  token_hash: string;
  token_prefix?: string;
  owner_user_id: string | null;
  expires_at: string | null;
  refresh_token_hash: string | null;
  refresh_expires_at: string | null;
  revoked_at: string | null;
  last_used_at?: string | null;
  terms_version?: string | null;
  terms_accepted_at?: string | null;
};

export type DeliveryRow = {
  device_request_id: string;
  access_token: string;
  refresh_token: string;
};

export type DeviceCodeStore = {
  requests: RequestRow[];
  tokens: TokenRow[];
  delivery: DeliveryRow[];
};
