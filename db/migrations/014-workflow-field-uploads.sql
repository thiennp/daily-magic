CREATE TABLE IF NOT EXISTS workflow_field_uploads (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sha256 TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  byte_size INTEGER NOT NULL CHECK (byte_size >= 0),
  extracted_text TEXT NOT NULL DEFAULT '',
  storage_path TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS workflow_field_uploads_owner_idx
  ON workflow_field_uploads (owner_user_id, created_at DESC);

CREATE UNIQUE INDEX IF NOT EXISTS workflow_field_uploads_owner_sha256_idx
  ON workflow_field_uploads (owner_user_id, sha256);

ALTER TABLE published_capabilities
  ADD COLUMN IF NOT EXISTS workflow_output_fields JSONB NOT NULL DEFAULT '[]'::jsonb;
