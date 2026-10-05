-- Library + Reports into projects (AW Product / AW Lead locked rules).
-- Every published_capabilities row and every agent_runs row must have a project_id.
-- Orphan rule:
--   1) owner's oldest project by created_at ASC, id ASC
--   2) if that project has any other active member (human or bot, status=active,
--      user_id <> owner_user_id), OR the owner has no project, use/create one
--      "Personal" project (owner-only; device_id NULL; one per owner)
-- Never DELETE rows. Idempotent: safe to re-run (only fills NULL project_id;
-- Personal insert is guarded by partial unique index + NOT EXISTS).
--
-- Dry-run counts (ops; do not run from agents against prod):
--   SELECT 'capabilities_null' AS k, COUNT(*) FROM published_capabilities WHERE project_id IS NULL
--   UNION ALL
--   SELECT 'agent_runs_null', COUNT(*) FROM agent_runs WHERE project_id IS NULL;
--
-- Verification after backfill (must return 0 rows):
--   SELECT id, 'capability' AS kind FROM published_capabilities WHERE project_id IS NULL
--   UNION ALL
--   SELECT id, 'agent_run' FROM agent_runs WHERE project_id IS NULL;
--
-- Rollback: DROP NOT NULL on both columns; restore agent_runs FK ON DELETE SET NULL
-- if needed. Do not delete Personal projects or null out assigned ids.

-- 1) Library: add nullable project_id (filled below, then NOT NULL).
ALTER TABLE published_capabilities
  ADD COLUMN IF NOT EXISTS project_id TEXT;

-- 2) One Personal project per owner (name match, case-insensitive).
CREATE UNIQUE INDEX IF NOT EXISTS user_projects_owner_personal_idx
  ON user_projects (owner_user_id)
  WHERE lower(name) = 'personal';

-- 3) Owners who still have orphans and need a Personal project.
--    Need Personal when: no projects at all, OR oldest project is shared.
WITH orphan_owners AS (
  SELECT owner_user_id AS owner_user_id
  FROM published_capabilities
  WHERE project_id IS NULL
  UNION
  SELECT requester_user_id AS owner_user_id
  FROM agent_runs
  WHERE project_id IS NULL
),
oldest AS (
  SELECT DISTINCT ON (p.owner_user_id)
    p.owner_user_id,
    p.id AS project_id
  FROM user_projects p
  INNER JOIN orphan_owners o ON o.owner_user_id = p.owner_user_id
  ORDER BY p.owner_user_id, p.created_at ASC, p.id ASC
),
oldest_shared AS (
  SELECT o.owner_user_id
  FROM oldest o
  WHERE EXISTS (
    SELECT 1
    FROM project_memberships m
    WHERE m.project_id = o.project_id
      AND m.status = 'active'
      AND m.user_id <> o.owner_user_id
  )
),
needs_personal AS (
  SELECT o.owner_user_id
  FROM orphan_owners o
  WHERE NOT EXISTS (
    SELECT 1 FROM user_projects p WHERE p.owner_user_id = o.owner_user_id
  )
  UNION
  SELECT owner_user_id FROM oldest_shared
)
INSERT INTO user_projects (id, owner_user_id, device_id, name, folder_path)
SELECT
  gen_random_uuid()::text,
  n.owner_user_id,
  NULL,
  'Personal',
  NULL
FROM needs_personal n
WHERE NOT EXISTS (
  SELECT 1
  FROM user_projects p
  WHERE p.owner_user_id = n.owner_user_id
    AND lower(p.name) = 'personal'
);

-- 4) Resolve target project per owner (solo oldest, else Personal).
--    Materialized as a temp view via CTE reused in both UPDATEs.

-- 4a) Backfill published_capabilities
WITH orphan_owners AS (
  SELECT DISTINCT owner_user_id
  FROM published_capabilities
  WHERE project_id IS NULL
),
oldest AS (
  SELECT DISTINCT ON (p.owner_user_id)
    p.owner_user_id,
    p.id AS project_id
  FROM user_projects p
  INNER JOIN orphan_owners o ON o.owner_user_id = p.owner_user_id
  ORDER BY p.owner_user_id, p.created_at ASC, p.id ASC
),
oldest_is_solo AS (
  SELECT o.owner_user_id, o.project_id
  FROM oldest o
  WHERE NOT EXISTS (
    SELECT 1
    FROM project_memberships m
    WHERE m.project_id = o.project_id
      AND m.status = 'active'
      AND m.user_id <> o.owner_user_id
  )
),
personal AS (
  SELECT DISTINCT ON (p.owner_user_id)
    p.owner_user_id,
    p.id AS project_id
  FROM user_projects p
  INNER JOIN orphan_owners o ON o.owner_user_id = p.owner_user_id
  WHERE lower(p.name) = 'personal'
  ORDER BY p.owner_user_id, p.created_at ASC, p.id ASC
),
target AS (
  SELECT owner_user_id, project_id FROM oldest_is_solo
  UNION ALL
  SELECT p.owner_user_id, p.project_id
  FROM personal p
  WHERE NOT EXISTS (
    SELECT 1 FROM oldest_is_solo s WHERE s.owner_user_id = p.owner_user_id
  )
)
UPDATE published_capabilities c
SET project_id = t.project_id,
    updated_at = NOW()
FROM target t
WHERE c.owner_user_id = t.owner_user_id
  AND c.project_id IS NULL;

-- 4b) Backfill agent_runs (Reports)
WITH orphan_owners AS (
  SELECT DISTINCT requester_user_id AS owner_user_id
  FROM agent_runs
  WHERE project_id IS NULL
),
oldest AS (
  SELECT DISTINCT ON (p.owner_user_id)
    p.owner_user_id,
    p.id AS project_id
  FROM user_projects p
  INNER JOIN orphan_owners o ON o.owner_user_id = p.owner_user_id
  ORDER BY p.owner_user_id, p.created_at ASC, p.id ASC
),
oldest_is_solo AS (
  SELECT o.owner_user_id, o.project_id
  FROM oldest o
  WHERE NOT EXISTS (
    SELECT 1
    FROM project_memberships m
    WHERE m.project_id = o.project_id
      AND m.status = 'active'
      AND m.user_id <> o.owner_user_id
  )
),
personal AS (
  SELECT DISTINCT ON (p.owner_user_id)
    p.owner_user_id,
    p.id AS project_id
  FROM user_projects p
  INNER JOIN orphan_owners o ON o.owner_user_id = p.owner_user_id
  WHERE lower(p.name) = 'personal'
  ORDER BY p.owner_user_id, p.created_at ASC, p.id ASC
),
target AS (
  SELECT owner_user_id, project_id FROM oldest_is_solo
  UNION ALL
  SELECT p.owner_user_id, p.project_id
  FROM personal p
  WHERE NOT EXISTS (
    SELECT 1 FROM oldest_is_solo s WHERE s.owner_user_id = p.owner_user_id
  )
)
UPDATE agent_runs r
SET project_id = t.project_id,
    updated_at = NOW()
FROM target t
WHERE r.requester_user_id = t.owner_user_id
  AND r.project_id IS NULL;

-- 5) FK + NOT NULL (fails the whole transaction if any orphan remains).
ALTER TABLE published_capabilities
  DROP CONSTRAINT IF EXISTS published_capabilities_project_id_fkey;

ALTER TABLE published_capabilities
  ADD CONSTRAINT published_capabilities_project_id_fkey
  FOREIGN KEY (project_id) REFERENCES user_projects(id) ON DELETE CASCADE;

ALTER TABLE published_capabilities
  ALTER COLUMN project_id SET NOT NULL;

CREATE INDEX IF NOT EXISTS published_capabilities_project_idx
  ON published_capabilities (project_id, status);

ALTER TABLE agent_runs
  DROP CONSTRAINT IF EXISTS agent_runs_project_id_fkey;

ALTER TABLE agent_runs
  ADD CONSTRAINT agent_runs_project_id_fkey
  FOREIGN KEY (project_id) REFERENCES user_projects(id) ON DELETE CASCADE;

ALTER TABLE agent_runs
  ALTER COLUMN project_id SET NOT NULL;

DROP INDEX IF EXISTS agent_runs_project_idx;

CREATE INDEX IF NOT EXISTS agent_runs_project_idx
  ON agent_runs (project_id, created_at DESC);
