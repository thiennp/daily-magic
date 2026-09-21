CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  email_verified TIMESTAMPTZ,
  image TEXT,
  global_role TEXT NOT NULL DEFAULT 'user' CHECK (global_role IN ('super_admin', 'admin', 'user')),
  agent_dispatch_policy TEXT CHECK (agent_dispatch_policy IN ('open', 'approval')),
  harness_sharing_visibility TEXT CHECK (
    harness_sharing_visibility IN ('private', 'group', 'public')
  ),
  onboarding_first_task_sent BOOLEAN NOT NULL DEFAULT FALSE,
  onboarding_automation_created BOOLEAN NOT NULL DEFAULT FALSE,
  onboarding_setup_acknowledged BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS accounts (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  PRIMARY KEY (provider, provider_account_id)
);

CREATE TABLE IF NOT EXISTS sessions (
  session_token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);

CREATE TABLE IF NOT EXISTS groups (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  dispatch_policy TEXT NOT NULL DEFAULT 'approval'
    CHECK (dispatch_policy IN ('open', 'approval')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS group_memberships (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  group_id TEXT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('group_super_admin', 'group_admin', 'user')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (group_id, user_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS users_one_super_admin
  ON users (global_role)
  WHERE global_role = 'super_admin';

CREATE UNIQUE INDEX IF NOT EXISTS group_memberships_one_super_admin
  ON group_memberships (group_id)
  WHERE role = 'group_super_admin';

CREATE TABLE IF NOT EXISTS agent_witch_devices (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  device_label TEXT,
  display_name TEXT,
  dispatch_policy TEXT CHECK (dispatch_policy IN ('open', 'approval')),
  claimed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ,
  restart_requested_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  public_key TEXT,
  last_handshake_at TIMESTAMPTZ,
  preferred_writer TEXT,
  last_wake_error TEXT,
  last_wake_error_at TIMESTAMPTZ,
  link_code TEXT,
  install_bundle_version TEXT,
  wake_port INTEGER,
  superseded_by_device_id TEXT
    REFERENCES agent_witch_devices(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS agent_witch_connections (
  client_id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  instance_id TEXT NOT NULL,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_ack_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS agent_witch_connections_user_idx
  ON agent_witch_connections (user_id);

CREATE INDEX IF NOT EXISTS agent_witch_connections_instance_idx
  ON agent_witch_connections (instance_id);

CREATE INDEX IF NOT EXISTS agent_witch_connections_device_idx
  ON agent_witch_connections (device_id);

CREATE TABLE IF NOT EXISTS agent_witch_dispatch_outbox (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
  idempotency_key TEXT NOT NULL UNIQUE,
  message_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('queued', 'delivered', 'expired', 'cancelled')),
  attempts INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  delivered_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS agent_witch_dispatch_outbox_device_status_idx
  ON agent_witch_dispatch_outbox (device_id, status);

CREATE TABLE IF NOT EXISTS harness_catalog_snapshots (
  owner_user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  visibility TEXT NOT NULL DEFAULT 'group'
    CHECK (visibility IN ('private', 'group', 'public')),
  hostname TEXT NOT NULL DEFAULT '',
  manifest_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  reported_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS harness_catalog_snapshots_visibility_idx
  ON harness_catalog_snapshots (visibility, reported_at DESC);

CREATE TABLE IF NOT EXISTS harness_borrows (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  borrower_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  borrowed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS harness_borrows_borrower_idx
  ON harness_borrows (borrower_user_id, borrowed_at DESC);

CREATE TABLE IF NOT EXISTS capability_forks (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  borrower_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_capability_id TEXT NOT NULL REFERENCES published_capabilities(id) ON DELETE CASCADE,
  forked_capability_id TEXT NOT NULL REFERENCES published_capabilities(id) ON DELETE CASCADE,
  forked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS capability_forks_borrower_idx
  ON capability_forks (borrower_user_id, forked_at DESC);

CREATE TABLE IF NOT EXISTS harness_set_sharing (
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  set_slug TEXT NOT NULL,
  visibility TEXT NOT NULL CHECK (
    visibility IN ('private', 'group', 'public')
  ),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (owner_user_id, set_slug)
);

CREATE INDEX IF NOT EXISTS agent_witch_devices_user_id_idx
  ON agent_witch_devices (user_id);

CREATE INDEX IF NOT EXISTS agent_witch_devices_active_user_idx
  ON agent_witch_devices (user_id)
  WHERE revoked_at IS NULL;

CREATE INDEX IF NOT EXISTS agent_witch_devices_superseded_by_idx
  ON agent_witch_devices (superseded_by_device_id)
  WHERE superseded_by_device_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS published_capabilities (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_id TEXT REFERENCES groups(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('agent', 'workflow')),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  example_request TEXT NOT NULL DEFAULT '',
  visibility TEXT NOT NULL DEFAULT 'group'
    CHECK (visibility IN ('private', 'group', 'public')),
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'archived')),
  dispatch_policy_override TEXT CHECK (
    dispatch_policy_override IN ('open', 'approval')
  ),
  current_version_id TEXT,
  workflow_fields JSONB NOT NULL DEFAULT '[]'::jsonb,
  workflow_output_fields JSONB NOT NULL DEFAULT '[]'::jsonb,
  operator_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  forked_from_capability_id TEXT
    REFERENCES published_capabilities(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS published_capabilities_forked_from_idx
  ON published_capabilities (forked_from_capability_id)
  WHERE forked_from_capability_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS published_capabilities_owner_idx
  ON published_capabilities (owner_user_id, status);

CREATE INDEX IF NOT EXISTS published_capabilities_group_idx
  ON published_capabilities (group_id, status, visibility);

CREATE TABLE IF NOT EXISTS agent_automations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  capability_id TEXT NOT NULL REFERENCES published_capabilities(id) ON DELETE CASCADE,
  device_id TEXT REFERENCES agent_witch_devices(id) ON DELETE SET NULL,
  executor_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('schedule', 'webhook')),
  schedule_preset TEXT CHECK (schedule_preset IN ('hourly', 'daily', 'weekdays')),
  schedule_hour INTEGER CHECK (schedule_hour >= 0 AND schedule_hour <= 23),
  schedule_timezone TEXT NOT NULL DEFAULT 'UTC',
  webhook_secret_hash TEXT,
  webhook_secret_prefix TEXT,
  field_values JSONB NOT NULL DEFAULT '{}'::jsonb,
  project_id TEXT REFERENCES user_projects(id) ON DELETE SET NULL,
  local_prompt TEXT,
  enabled BOOLEAN NOT NULL DEFAULT true,
  last_run_at TIMESTAMPTZ,
  next_run_at TIMESTAMPTZ,
  last_run_status TEXT CHECK (last_run_status IN ('ok', 'skipped', 'failed')),
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT agent_automations_schedule_fields_chk CHECK (
    (
      trigger_type = 'schedule'
      AND schedule_preset IS NOT NULL
      AND (
        schedule_preset = 'hourly'
        OR schedule_hour IS NOT NULL
      )
    )
    OR (
      trigger_type = 'webhook'
      AND schedule_preset IS NULL
      AND schedule_hour IS NULL
      AND webhook_secret_hash IS NOT NULL
    )
  )
);

CREATE INDEX IF NOT EXISTS agent_automations_owner_idx
  ON agent_automations (owner_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS agent_automations_due_schedule_idx
  ON agent_automations (next_run_at ASC)
  WHERE enabled = true AND trigger_type = 'schedule';

CREATE TABLE IF NOT EXISTS capability_versions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  capability_id TEXT NOT NULL REFERENCES published_capabilities(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  changelog TEXT NOT NULL DEFAULT '',
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (capability_id, version_number)
);

ALTER TABLE published_capabilities
  ADD CONSTRAINT published_capabilities_current_version_fkey
  FOREIGN KEY (current_version_id) REFERENCES capability_versions(id)
  ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS agent_runs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  group_id TEXT REFERENCES groups(id) ON DELETE SET NULL,
  requester_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  executor_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT REFERENCES agent_witch_devices(id) ON DELETE SET NULL,
  prompt TEXT NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN (
      'pending_approval',
      'running',
      'completed',
      'failed',
      'denied',
      'expired'
    )
  ),
  dispatch_policy TEXT NOT NULL CHECK (dispatch_policy IN ('open', 'approval')),
  writer_agent TEXT NOT NULL DEFAULT 'claude-cli',
  result_output TEXT,
  result_exit_code INTEGER,
  denial_reason TEXT,
  capability_id TEXT REFERENCES published_capabilities(id) ON DELETE SET NULL,
  capability_version_id TEXT REFERENCES capability_versions(id) ON DELETE SET NULL,
  automation_id TEXT REFERENCES agent_automations(id) ON DELETE SET NULL,
  project_id TEXT REFERENCES user_projects(id) ON DELETE SET NULL,
  approval_expires_at TIMESTAMPTZ,
  lease_expires_at TIMESTAMPTZ,
  claimed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_run_heartbeat_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS agent_runs_requester_idx
  ON agent_runs (requester_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS agent_runs_executor_idx
  ON agent_runs (executor_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS agent_runs_capability_idx
  ON agent_runs (capability_id, created_at DESC);

CREATE INDEX IF NOT EXISTS agent_runs_project_idx
  ON agent_runs (project_id, created_at DESC)
  WHERE project_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS agent_runs_automation_idx
  ON agent_runs (automation_id, created_at DESC)
  WHERE automation_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS agent_runs_device_claim_idx
  ON agent_runs (device_id, status, created_at ASC)
  WHERE status = 'running';

CREATE INDEX IF NOT EXISTS agent_runs_stale_running_idx
  ON agent_runs (status, last_run_heartbeat_at)
  WHERE status = 'running' AND last_run_heartbeat_at IS NOT NULL;

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS workflow_run_id TEXT;

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS workflow_step_run_id TEXT;

CREATE TABLE IF NOT EXISTS workflow_runs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  requester_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  executor_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT REFERENCES agent_witch_devices(id) ON DELETE SET NULL,
  capability_id TEXT REFERENCES published_capabilities(id) ON DELETE SET NULL,
  template_id TEXT NOT NULL,
  orchestration_version INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL CHECK (
    status IN (
      'running',
      'waiting_human',
      'completed',
      'failed',
      'cancelled'
    )
  ),
  current_step_index INTEGER NOT NULL DEFAULT 0,
  field_values JSONB NOT NULL DEFAULT '{}'::jsonb,
  step_outputs JSONB NOT NULL DEFAULT '{}'::jsonb,
  definition_snapshot JSONB NOT NULL,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS workflow_runs_requester_idx
  ON workflow_runs (requester_user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS workflow_step_runs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  workflow_run_id TEXT NOT NULL REFERENCES workflow_runs(id) ON DELETE CASCADE,
  step_index INTEGER NOT NULL,
  node_id TEXT NOT NULL,
  node_kind TEXT NOT NULL CHECK (node_kind IN ('human', 'agent')),
  status TEXT NOT NULL CHECK (
    status IN (
      'pending',
      'running',
      'waiting_human',
      'completed',
      'failed',
      'skipped'
    )
  ),
  title TEXT NOT NULL,
  agent_run_id TEXT REFERENCES agent_runs(id) ON DELETE SET NULL,
  output JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE (workflow_run_id, step_index)
);

CREATE INDEX IF NOT EXISTS workflow_step_runs_workflow_idx
  ON workflow_step_runs (workflow_run_id, step_index ASC);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'agent_runs_workflow_run_id_fkey'
  ) THEN
    ALTER TABLE agent_runs
      ADD CONSTRAINT agent_runs_workflow_run_id_fkey
      FOREIGN KEY (workflow_run_id) REFERENCES workflow_runs(id) ON DELETE SET NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'agent_runs_workflow_step_run_id_fkey'
  ) THEN
    ALTER TABLE agent_runs
      ADD CONSTRAINT agent_runs_workflow_step_run_id_fkey
      FOREIGN KEY (workflow_step_run_id) REFERENCES workflow_step_runs(id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS agent_run_events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  agent_run_id TEXT NOT NULL REFERENCES agent_runs(id) ON DELETE CASCADE,
  seq INTEGER NOT NULL,
  kind TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (agent_run_id, seq)
);

CREATE INDEX IF NOT EXISTS agent_run_events_run_idx
  ON agent_run_events (agent_run_id, seq ASC);

CREATE TABLE IF NOT EXISTS capability_feedback (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  agent_run_id TEXT NOT NULL REFERENCES agent_runs(id) ON DELETE CASCADE,
  capability_id TEXT REFERENCES published_capabilities(id) ON DELETE SET NULL,
  reviewer_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'submitted'
    CHECK (status IN ('submitted', 'acknowledged', 'dismissed')),
  run_prompt TEXT,
  run_status TEXT,
  run_executor_user_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (agent_run_id, reviewer_user_id)
);

CREATE INDEX IF NOT EXISTS capability_feedback_owner_lookup_idx
  ON capability_feedback (capability_id, status, created_at DESC);

CREATE INDEX IF NOT EXISTS capability_feedback_reviewer_idx
  ON capability_feedback (reviewer_user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS capability_improvements (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  feedback_id TEXT REFERENCES capability_feedback(id) ON DELETE SET NULL,
  capability_id TEXT NOT NULL REFERENCES published_capabilities(id) ON DELETE CASCADE,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  suggestion TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'proposed'
    CHECK (status IN ('proposed', 'accepted', 'rejected')),
  resulting_version_id TEXT REFERENCES capability_versions(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS capability_improvements_owner_idx
  ON capability_improvements (owner_user_id, status, created_at DESC);

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

CREATE TABLE IF NOT EXISTS user_projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT REFERENCES agent_witch_devices(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  folder_path TEXT,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS user_projects_owner_idx
  ON user_projects (owner_user_id, last_used_at DESC NULLS LAST, created_at DESC);

CREATE UNIQUE INDEX IF NOT EXISTS user_projects_owner_device_name_idx
  ON user_projects (owner_user_id, device_id, lower(name));

CREATE TABLE IF NOT EXISTS project_device_bindings (
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
  folder_path TEXT,
  folder_verified_at TIMESTAMPTZ,
  is_primary BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (project_id, device_id)
);

CREATE INDEX IF NOT EXISTS project_device_bindings_device_idx
  ON project_device_bindings (device_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS project_components (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  component_id TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK (kind IN ('harness', 'workflow', 'agent')),
  channel TEXT NOT NULL DEFAULT 'pinned'
    CHECK (channel IN ('pinned', 'latest')),
  pinned_version_id TEXT REFERENCES component_versions(id) ON DELETE SET NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  materialize_target TEXT NOT NULL DEFAULT 'repo'
    CHECK (materialize_target IN ('repo', 'run_only')),
  removed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS project_components_active_project_component_idx
  ON project_components (project_id, component_id)
  WHERE removed_at IS NULL;

CREATE INDEX IF NOT EXISTS project_components_project_kind_idx
  ON project_components (project_id, kind)
  WHERE removed_at IS NULL AND enabled = true;

CREATE TABLE IF NOT EXISTS project_composition_snapshots (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  resolved JSONB NOT NULL,
  digest TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_composition_snapshots_project_idx
  ON project_composition_snapshots (project_id, created_at DESC);

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS composition_snapshot_id TEXT
    REFERENCES project_composition_snapshots(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS agent_runs_composition_snapshot_idx
  ON agent_runs (composition_snapshot_id)
  WHERE composition_snapshot_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS project_knowledge_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  source_run_id TEXT REFERENCES agent_runs(id) ON DELETE SET NULL,
  kind TEXT NOT NULL CHECK (kind IN ('lesson', 'fact', 'decision')),
  body TEXT,
  sync_state TEXT NOT NULL DEFAULT 'local'
    CHECK (sync_state IN ('local', 'shared')),
  status TEXT NOT NULL DEFAULT 'candidate'
    CHECK (status IN ('candidate', 'accepted', 'rejected', 'promoted')),
  promoted_component_version_id TEXT
    REFERENCES component_versions(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_knowledge_items_project_status_idx
  ON project_knowledge_items (project_id, status, created_at DESC);

CREATE TABLE IF NOT EXISTS cursor_cloud_connections (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  api_key_ciphertext TEXT NOT NULL,
  api_key_iv TEXT NOT NULL,
  api_key_name TEXT,
  cursor_user_email TEXT,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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

CREATE TABLE IF NOT EXISTS schema_migrations (
  filename TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
