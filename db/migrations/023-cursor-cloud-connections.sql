CREATE TABLE IF NOT EXISTS cursor_cloud_connections (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  api_key_ciphertext TEXT NOT NULL,
  api_key_iv TEXT NOT NULL,
  api_key_name TEXT,
  cursor_user_email TEXT,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
