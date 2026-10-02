-- Lead-approved Option A: purge project Activity history from Neon / cloud Postgres.
-- Irreversible. Writers are no-op in the same release; ensureProjectAclSchema no longer recreates this table.
DROP TABLE IF EXISTS project_access_audit;
