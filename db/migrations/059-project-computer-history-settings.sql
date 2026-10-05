-- Opt-in project computer history, one row per project. No row = off.
-- States and transitions live in
-- src/lib/projects/acl/messaging/projectComputerHistoryStateMachine.ts.
-- Holds only the state (+ last overdue wake stamp). Never an API key, CLI
-- secret, or summarizer credential.

CREATE TABLE IF NOT EXISTS project_computer_history_settings (
  project_id TEXT PRIMARY KEY REFERENCES user_projects(id) ON DELETE CASCADE,
  state TEXT NOT NULL DEFAULT 'off'
    CHECK (state IN ('off', 'on_configuring', 'on_ready', 'degraded')),
  state_changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_unsaved_wake_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_computer_history_settings_state_idx
  ON project_computer_history_settings (state)
  WHERE state <> 'off';
