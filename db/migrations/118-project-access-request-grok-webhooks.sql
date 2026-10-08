-- Wake link registered BEFORE approval: stored against the pending join request,
-- carried over to project_membership_grok_routine_webhooks on Approve (idempotent;
-- mirrored by ensureProjectInviteHooksSchema.ts). Never read by wake dispatch.
-- Bearer is stored, never returned by any read.

CREATE TABLE IF NOT EXISTS project_access_request_grok_webhooks (
  request_id TEXT PRIMARY KEY REFERENCES project_access_requests(id) ON DELETE CASCADE,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  webhook_url TEXT NOT NULL,
  bearer_retained TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
