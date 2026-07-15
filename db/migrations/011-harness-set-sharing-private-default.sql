-- Per-set sharing only: drop inherit and default existing rows to private.

UPDATE harness_set_sharing
SET visibility = 'private'
WHERE visibility = 'inherit';

ALTER TABLE harness_set_sharing
  DROP CONSTRAINT IF EXISTS harness_set_sharing_visibility_check;

ALTER TABLE harness_set_sharing
  ADD CONSTRAINT harness_set_sharing_visibility_check
  CHECK (visibility IN ('private', 'group', 'public'));
