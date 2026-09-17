-- P7: harness identity lives on component_versions; drop legacy capability columns.

ALTER TABLE published_capabilities
  DROP COLUMN IF EXISTS harness_set_slug;

ALTER TABLE capability_versions
  DROP COLUMN IF EXISTS harness_set_slug;
