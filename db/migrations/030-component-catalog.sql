-- P3: unified component catalog (harness, agent, workflow) alongside legacy published_capabilities.

CREATE TABLE IF NOT EXISTS content_blobs (
  sha256 TEXT PRIMARY KEY,
  byte_size INTEGER NOT NULL CHECK (byte_size >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS components (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK (kind IN ('harness', 'agent', 'workflow')),
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  visibility TEXT NOT NULL DEFAULT 'private'
    CHECK (visibility IN ('private', 'group', 'public')),
  published_capability_id TEXT UNIQUE
    REFERENCES published_capabilities(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (owner_user_id, kind, slug)
);

CREATE INDEX IF NOT EXISTS components_owner_kind_idx
  ON components (owner_user_id, kind, updated_at DESC);

CREATE TABLE IF NOT EXISTS component_versions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  component_id TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  version_label TEXT NOT NULL DEFAULT '',
  changelog TEXT NOT NULL DEFAULT '',
  harness_set_slug TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (component_id, version_number)
);

CREATE INDEX IF NOT EXISTS component_versions_component_idx
  ON component_versions (component_id, version_number DESC);

CREATE TABLE IF NOT EXISTS component_version_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  component_version_id TEXT NOT NULL
    REFERENCES component_versions(id) ON DELETE CASCADE,
  item_key TEXT NOT NULL,
  item_kind TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  relative_path TEXT NOT NULL DEFAULT '',
  content_sha256 TEXT REFERENCES content_blobs(sha256) ON DELETE SET NULL,
  UNIQUE (component_version_id, item_key)
);

CREATE TABLE IF NOT EXISTS device_component_installs (
  device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
  component_id TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
  component_version_id TEXT NOT NULL
    REFERENCES component_versions(id) ON DELETE CASCADE,
  installed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (device_id, component_id)
);

CREATE INDEX IF NOT EXISTS device_component_installs_device_idx
  ON device_component_installs (device_id, installed_at DESC);
