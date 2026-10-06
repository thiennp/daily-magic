-- Thien LOCK: every run belongs to a project. Automations dispatch runs, so an
-- automation with project_id NULL (pre-022 rows, or project deleted under
-- 022's ON DELETE SET NULL) is an orphan. Re-home it; never DELETE.
-- 069 already re-homed published_capabilities and agent_runs; this covers
-- agent_automations, which 069 did not touch.
--
-- Target, first match wins (owner = agent_automations.owner_user_id):
--   1) the automation's capability project (when the owner can see it as
--      owner of that project)
--   2) owner's Default on the automation's computer (device_id match)
--   3) owner's oldest Default (any computer)
--   4) owner's oldest project (safety net, same as 069 step 4c)
-- Owners with no project at all are left NULL (no Default can be created
-- here without a computer + profile folder); the dispatcher resolves the
-- owner's Default via ensureDefaultUserProject at run time, and otherwise
-- answers project_required with a hint.
-- Idempotent: only fills NULL project_id.
--
-- Dry-run count (ops):
--   SELECT COUNT(*) FROM agent_automations WHERE project_id IS NULL;
-- Rollback: none needed (only fills NULLs; prior values were NULL).

WITH orphan AS (
  SELECT a.id, a.owner_user_id, a.device_id, a.capability_id
  FROM agent_automations a
  WHERE a.project_id IS NULL
),
via_capability AS (
  SELECT o.id AS automation_id, c.project_id
  FROM orphan o
  INNER JOIN published_capabilities c ON c.id = o.capability_id
  INNER JOIN user_projects p ON p.id = c.project_id
  WHERE c.project_id IS NOT NULL
    AND p.owner_user_id = o.owner_user_id
),
via_device_default AS (
  SELECT DISTINCT ON (o.id) o.id AS automation_id, p.id AS project_id
  FROM orphan o
  INNER JOIN user_projects p
    ON p.owner_user_id = o.owner_user_id
   AND p.device_id = o.device_id
   AND lower(p.name) = 'default'
  ORDER BY o.id, p.created_at ASC, p.id ASC
),
via_any_default AS (
  SELECT DISTINCT ON (o.id) o.id AS automation_id, p.id AS project_id
  FROM orphan o
  INNER JOIN user_projects p
    ON p.owner_user_id = o.owner_user_id
   AND lower(p.name) = 'default'
  ORDER BY o.id, p.created_at ASC, p.id ASC
),
via_oldest AS (
  SELECT DISTINCT ON (o.id) o.id AS automation_id, p.id AS project_id
  FROM orphan o
  INNER JOIN user_projects p ON p.owner_user_id = o.owner_user_id
  ORDER BY o.id, p.created_at ASC, p.id ASC
),
target AS (
  SELECT
    o.id AS automation_id,
    COALESCE(
      vc.project_id,
      vd.project_id,
      va.project_id,
      vo.project_id
    ) AS project_id
  FROM orphan o
  LEFT JOIN via_capability vc ON vc.automation_id = o.id
  LEFT JOIN via_device_default vd ON vd.automation_id = o.id
  LEFT JOIN via_any_default va ON va.automation_id = o.id
  LEFT JOIN via_oldest vo ON vo.automation_id = o.id
)
UPDATE agent_automations a
SET project_id = t.project_id,
    updated_at = NOW()
FROM target t
WHERE a.id = t.automation_id
  AND a.project_id IS NULL
  AND t.project_id IS NOT NULL;

DO $$
DECLARE
  automations_left BIGINT;
BEGIN
  SELECT COUNT(*) INTO automations_left
  FROM agent_automations
  WHERE project_id IS NULL;
  IF automations_left > 0 THEN
    RAISE NOTICE '097: % agent_automations still NULL project_id (owner has no project yet); resolved to Default at dispatch, left as-is',
      automations_left;
  END IF;
END
$$;
