import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

/** Idempotent CREATE matching db/migrations/136-project-bot-knowledge-events.sql. */
export const ensureProjectBotKnowledgeSchema = async (): Promise<void> => {
  if (state.ensured) return;
  if (state.promise !== null) return state.promise;
  state.promise = (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS project_bot_knowledge_events (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
        task_id TEXT NOT NULL,
        membership_id TEXT NOT NULL,
        claimed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        had_lookup BOOLEAN NOT NULL DEFAULT FALSE,
        skill_id TEXT,
        effort_tier TEXT,
        outcome TEXT CHECK (outcome IS NULL OR outcome IN ('done', 'failed', 'blocked', 'released')),
        verify_signal TEXT,
        fingerprint TEXT,
        repeated_mistake BOOLEAN NOT NULL DEFAULT FALSE,
        released_at TIMESTAMPTZ
      )`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_bot_knowledge_events_project_idx
        ON project_bot_knowledge_events (project_id, claimed_at DESC)`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_bot_knowledge_events_fingerprint_idx
        ON project_bot_knowledge_events (project_id, fingerprint) WHERE fingerprint IS NOT NULL`;
    state.ensured = true;
  })();
  try {
    await state.promise;
  } catch (error) {
    state.promise = null;
    throw error;
  }
};
