-- Prompt SDLC cycles: a prompt, automatic judge replies, and improver revisions.

CREATE TABLE IF NOT EXISTS prompt_sdlc_cycles (
  id TEXT PRIMARY KEY,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT REFERENCES agent_witch_devices(id) ON DELETE SET NULL,
  goal TEXT NOT NULL,
  source_prompt TEXT NOT NULL,
  judge_kind TEXT NOT NULL CHECK (judge_kind IN ('writer', 'ollama')),
  judge_model TEXT NOT NULL,
  improver_kind TEXT NOT NULL CHECK (improver_kind IN ('writer', 'ollama')),
  improver_model TEXT NOT NULL,
  pass_score INTEGER NOT NULL,
  max_rounds INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN (
      'judging',
      'improving',
      'awaiting_local',
      'passed',
      'stopped',
      'failed'
    )
  ),
  active_run_id TEXT REFERENCES agent_runs(id) ON DELETE SET NULL,
  pending_local_prompt TEXT,
  pending_local_role TEXT CHECK (
    pending_local_role IS NULL OR pending_local_role IN ('judge', 'improve')
  ),
  current_round INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS prompt_sdlc_cycles_owner_idx
  ON prompt_sdlc_cycles (owner_user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS prompt_sdlc_revisions (
  id TEXT PRIMARY KEY,
  cycle_id TEXT NOT NULL REFERENCES prompt_sdlc_cycles(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL,
  prompt_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (cycle_id, round_number)
);

CREATE TABLE IF NOT EXISTS prompt_sdlc_judgements (
  id TEXT PRIMARY KEY,
  cycle_id TEXT NOT NULL REFERENCES prompt_sdlc_cycles(id) ON DELETE CASCADE,
  revision_id TEXT NOT NULL REFERENCES prompt_sdlc_revisions(id) ON DELETE CASCADE,
  judge_kind TEXT NOT NULL CHECK (judge_kind IN ('writer', 'ollama')),
  judge_model TEXT NOT NULL,
  score INTEGER,
  passed BOOLEAN,
  reasons TEXT,
  raw_reply TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS prompt_sdlc_judgements_cycle_idx
  ON prompt_sdlc_judgements (cycle_id, created_at ASC);
