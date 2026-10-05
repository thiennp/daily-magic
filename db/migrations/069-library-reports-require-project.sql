-- Library + Reports into projects (AW Product / AW Lead locked rules).
-- Every published_capabilities row and every agent_runs row must have a project_id.
-- Orphan rule:
--   1) owner's oldest project by created_at ASC, id ASC
--   2) if that project has any other active member (human, bot or computer,
--      status=active, user_id <> owner_user_id), OR the owner has no project:
--      (068-project-membership-computer: a computer seat carries its device
--      owner's user_id, so the owner's own computer does not make a project
--      shared; a teammate's computer does.)
--        prefer the owner's solo "Default" project (DEFAULT_USER_PROJECT_NAME;
--        isDefaultUserProject / resolveDefaultUserProject / ensureDefaultUserProject);
--        create one Default (device_id NULL) if missing;
--        only if every Default for the owner is shared, create one "Personal"
--        (Default can receive invites, so it is not always owner-only).
-- Never DELETE rows. Idempotent: only fills NULL project_id; Default/Personal
-- inserts are guarded by NOT EXISTS.
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
-- Later (ops, after verification returns 0 rows): ALTER TABLE ... VALIDATE
-- CONSTRAINT for *_project_id_required and *_project_id_fkey.
-- Rollback: DROP CONSTRAINT *_project_id_required on both tables; restore
-- agent_runs FK ON DELETE SET NULL if needed. Do not delete Default/Personal projects or null out assigned ids.

-- 1) Library: add nullable project_id (filled below, then required via CHECK).
ALTER TABLE published_capabilities
  ADD COLUMN IF NOT EXISTS project_id TEXT;

-- 2) At most one cloud Default / Personal without a Mac binding per owner.
-- Deploy-safe: prod can already hold duplicates (user_projects.device_id is
-- ON DELETE SET NULL, so removing a Mac turns its "Default"/"Personal" into a
-- second NULL-device row; the 031 index treats NULLs as distinct). A plain
-- CREATE UNIQUE INDEX would abort the whole migration on those rows, so only
-- create each guard index when no duplicate exists. Personal is scoped to
-- device_id IS NULL like Default (one Personal per Mac is legitimate).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM user_projects
    WHERE lower(name) = 'default' AND device_id IS NULL
    GROUP BY owner_user_id
    HAVING COUNT(*) > 1
  ) THEN
    CREATE UNIQUE INDEX IF NOT EXISTS user_projects_owner_default_null_device_idx
      ON user_projects (owner_user_id)
      WHERE lower(name) = 'default' AND device_id IS NULL;
  ELSE
    RAISE NOTICE '069: duplicate NULL-device Default projects; skipping user_projects_owner_default_null_device_idx';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM user_projects
    WHERE lower(name) = 'personal' AND device_id IS NULL
    GROUP BY owner_user_id
    HAVING COUNT(*) > 1
  ) THEN
    CREATE UNIQUE INDEX IF NOT EXISTS user_projects_owner_personal_idx
      ON user_projects (owner_user_id)
      WHERE lower(name) = 'personal' AND device_id IS NULL;
  ELSE
    RAISE NOTICE '069: duplicate NULL-device Personal projects; skipping user_projects_owner_personal_idx';
  END IF;
END
$$;

-- 3) Owners who still have orphans and need a private fallback project.
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
needs_private AS (
  SELECT o.owner_user_id
  FROM orphan_owners o
  WHERE NOT EXISTS (
    SELECT 1 FROM user_projects p WHERE p.owner_user_id = o.owner_user_id
  )
  UNION
  SELECT owner_user_id FROM oldest_shared
),
-- Solo Default already present for this owner?
has_solo_default AS (
  SELECT DISTINCT p.owner_user_id
  FROM user_projects p
  INNER JOIN needs_private n ON n.owner_user_id = p.owner_user_id
  WHERE lower(p.name) = 'default'
    AND NOT EXISTS (
      SELECT 1
      FROM project_memberships m
      WHERE m.project_id = p.id
        AND m.status = 'active'
        AND m.user_id <> p.owner_user_id
    )
),
needs_default_create AS (
  SELECT n.owner_user_id
  FROM needs_private n
  WHERE NOT EXISTS (
    SELECT 1 FROM has_solo_default d WHERE d.owner_user_id = n.owner_user_id
  )
  AND NOT EXISTS (
    SELECT 1
    FROM user_projects p
    WHERE p.owner_user_id = n.owner_user_id
      AND lower(p.name) = 'default'
  )
),
needs_personal_create AS (
  -- Default exists but every Default is shared → Personal escape hatch.
  SELECT n.owner_user_id
  FROM needs_private n
  WHERE NOT EXISTS (
    SELECT 1 FROM has_solo_default d WHERE d.owner_user_id = n.owner_user_id
  )
  AND EXISTS (
    SELECT 1
    FROM user_projects p
    WHERE p.owner_user_id = n.owner_user_id
      AND lower(p.name) = 'default'
  )
  AND NOT EXISTS (
    SELECT 1
    FROM user_projects p
    WHERE p.owner_user_id = n.owner_user_id
      AND lower(p.name) = 'personal'
  )
)
INSERT INTO user_projects (id, owner_user_id, device_id, name, folder_path)
SELECT gen_random_uuid()::text, owner_user_id, NULL, 'Default', NULL
FROM needs_default_create
UNION ALL
SELECT gen_random_uuid()::text, owner_user_id, NULL, 'Personal', NULL
FROM needs_personal_create;

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
solo_default AS (
  SELECT DISTINCT ON (p.owner_user_id)
    p.owner_user_id,
    p.id AS project_id
  FROM user_projects p
  INNER JOIN orphan_owners o ON o.owner_user_id = p.owner_user_id
  WHERE lower(p.name) = 'default'
    AND NOT EXISTS (
      SELECT 1
      FROM project_memberships m
      WHERE m.project_id = p.id
        AND m.status = 'active'
        AND m.user_id <> p.owner_user_id
    )
  ORDER BY p.owner_user_id, p.created_at ASC, p.id ASC
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
  SELECT d.owner_user_id, d.project_id
  FROM solo_default d
  WHERE NOT EXISTS (
    SELECT 1 FROM oldest_is_solo s WHERE s.owner_user_id = d.owner_user_id
  )
  UNION ALL
  SELECT p.owner_user_id, p.project_id
  FROM personal p
  WHERE NOT EXISTS (
    SELECT 1 FROM oldest_is_solo s WHERE s.owner_user_id = p.owner_user_id
  )
  AND NOT EXISTS (
    SELECT 1 FROM solo_default d WHERE d.owner_user_id = p.owner_user_id
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
solo_default AS (
  SELECT DISTINCT ON (p.owner_user_id)
    p.owner_user_id,
    p.id AS project_id
  FROM user_projects p
  INNER JOIN orphan_owners o ON o.owner_user_id = p.owner_user_id
  WHERE lower(p.name) = 'default'
    AND NOT EXISTS (
      SELECT 1
      FROM project_memberships m
      WHERE m.project_id = p.id
        AND m.status = 'active'
        AND m.user_id <> p.owner_user_id
    )
  ORDER BY p.owner_user_id, p.created_at ASC, p.id ASC
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
  SELECT d.owner_user_id, d.project_id
  FROM solo_default d
  WHERE NOT EXISTS (
    SELECT 1 FROM oldest_is_solo s WHERE s.owner_user_id = d.owner_user_id
  )
  UNION ALL
  SELECT p.owner_user_id, p.project_id
  FROM personal p
  WHERE NOT EXISTS (
    SELECT 1 FROM oldest_is_solo s WHERE s.owner_user_id = p.owner_user_id
  )
  AND NOT EXISTS (
    SELECT 1 FROM solo_default d WHERE d.owner_user_id = p.owner_user_id
  )
)
UPDATE agent_runs r
SET project_id = t.project_id,
    updated_at = NOW()
FROM target t
WHERE r.requester_user_id = t.owner_user_id
  AND r.project_id IS NULL;

-- 4c) Safety net: any row still NULL (owner's projects missed every rule
-- above) goes to that owner's oldest project. Never DELETE.
UPDATE published_capabilities c
SET project_id = p.project_id,
    updated_at = NOW()
FROM (
  SELECT DISTINCT ON (owner_user_id) owner_user_id, id AS project_id
  FROM user_projects
  ORDER BY owner_user_id, created_at ASC, id ASC
) p
WHERE c.owner_user_id = p.owner_user_id
  AND c.project_id IS NULL;

UPDATE agent_runs r
SET project_id = p.project_id,
    updated_at = NOW()
FROM (
  SELECT DISTINCT ON (owner_user_id) owner_user_id, id AS project_id
  FROM user_projects
  ORDER BY owner_user_id, created_at ASC, id ASC
) p
WHERE r.requester_user_id = p.owner_user_id
  AND r.project_id IS NULL;

-- 5) FK + required project_id, deploy-safe.
-- FKs are added NOT VALID (no full-table validation scan / long lock, and an
-- existing dangling id cannot abort the deploy). project_id is required via
-- CHECK ... NOT VALID instead of SET NOT NULL: new and updated rows must carry
-- a project; any legacy NULL left over cannot fail this migration. Ops can
-- VALIDATE CONSTRAINT later once the verification query returns 0 rows.
ALTER TABLE published_capabilities
  DROP CONSTRAINT IF EXISTS published_capabilities_project_id_fkey;

ALTER TABLE published_capabilities
  ADD CONSTRAINT published_capabilities_project_id_fkey
  FOREIGN KEY (project_id) REFERENCES user_projects(id) ON DELETE CASCADE
  NOT VALID;

ALTER TABLE published_capabilities
  DROP CONSTRAINT IF EXISTS published_capabilities_project_id_required;

ALTER TABLE published_capabilities
  ADD CONSTRAINT published_capabilities_project_id_required
  CHECK (project_id IS NOT NULL) NOT VALID;

CREATE INDEX IF NOT EXISTS published_capabilities_project_idx
  ON published_capabilities (project_id, status);

ALTER TABLE agent_runs
  DROP CONSTRAINT IF EXISTS agent_runs_project_id_fkey;

ALTER TABLE agent_runs
  ADD CONSTRAINT agent_runs_project_id_fkey
  FOREIGN KEY (project_id) REFERENCES user_projects(id) ON DELETE CASCADE
  NOT VALID;

ALTER TABLE agent_runs
  DROP CONSTRAINT IF EXISTS agent_runs_project_id_required;

ALTER TABLE agent_runs
  ADD CONSTRAINT agent_runs_project_id_required
  CHECK (project_id IS NOT NULL) NOT VALID;

DROP INDEX IF EXISTS agent_runs_project_idx;

CREATE INDEX IF NOT EXISTS agent_runs_project_idx
  ON agent_runs (project_id, created_at DESC);
