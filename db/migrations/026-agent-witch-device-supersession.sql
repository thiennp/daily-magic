ALTER TABLE agent_witch_devices
  ADD COLUMN IF NOT EXISTS superseded_by_device_id TEXT;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'agent_witch_devices_superseded_by_device_id_fkey'
  ) THEN
    ALTER TABLE agent_witch_devices
      ADD CONSTRAINT agent_witch_devices_superseded_by_device_id_fkey
      FOREIGN KEY (superseded_by_device_id)
      REFERENCES agent_witch_devices(id) ON DELETE SET NULL;
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS agent_witch_devices_superseded_by_idx
  ON agent_witch_devices (superseded_by_device_id)
  WHERE superseded_by_device_id IS NOT NULL;

-- Best-effort backfill: rows revoked before this migration carry no successor pointer, so
-- point each at the one active row that shares its bare hostname, skipping ambiguous cases.
WITH labelled AS (
  SELECT
    id,
    user_id,
    revoked_at,
    claimed_at,
    superseded_by_device_id,
    CASE
      WHEN btrim(device_label) ~ '^.+#[^#]+$'
        THEN regexp_replace(btrim(device_label), '#[^#]+$', '')
      ELSE btrim(device_label)
    END AS hostname
  FROM agent_witch_devices
  WHERE device_label IS NOT NULL
    AND btrim(device_label) <> ''
),
successors AS (
  SELECT
    user_id,
    hostname,
    count(*) AS candidate_count,
    (array_agg(id ORDER BY claimed_at DESC, id DESC))[1] AS successor_id
  FROM labelled
  WHERE revoked_at IS NULL
  GROUP BY user_id, hostname
)
UPDATE agent_witch_devices AS target
SET superseded_by_device_id = successors.successor_id
FROM labelled
JOIN successors
  ON successors.user_id = labelled.user_id
  AND successors.hostname = labelled.hostname
WHERE target.id = labelled.id
  AND target.superseded_by_device_id IS NULL
  AND labelled.revoked_at IS NOT NULL
  AND successors.candidate_count = 1
  AND successors.successor_id <> target.id;
