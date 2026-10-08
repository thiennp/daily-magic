import { getSql } from "@/lib/db";

/** Mirrors db/migrations/118: wake link pre-registered on a pending join request. */
export const ensureProjectAccessRequestGrokWebhookSchema =
  async (): Promise<void> => {
    const sql = getSql();
    await sql`CREATE TABLE IF NOT EXISTS project_access_request_grok_webhooks (
    request_id TEXT PRIMARY KEY REFERENCES project_access_requests(id) ON DELETE CASCADE,
    project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
    webhook_url TEXT NOT NULL,
    bearer_retained TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  };
