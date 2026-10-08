-- Linear task sync follow-ups (idempotent; mirrored by ensureTaskSyncSchema.ts):
-- links.clipped_description_hash: set when Linear's description is longer than
--   the 200-char AW cap; value = hash of the AW description at the last sync.
--   Push omits the description while the AW text still matches it.
-- settings.last_pulled_at: watermark of the "Sync now" pull (not bumped by
--   pushes or webhooks, unlike last_synced_at).

ALTER TABLE project_task_external_links
  ADD COLUMN IF NOT EXISTS clipped_description_hash TEXT;

ALTER TABLE project_task_sync_settings
  ADD COLUMN IF NOT EXISTS last_pulled_at TIMESTAMPTZ;
