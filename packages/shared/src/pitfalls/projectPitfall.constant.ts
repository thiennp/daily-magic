export const PROJECT_PITFALL_SEVERITIES = ["block", "warn", "info"] as const;

export const PROJECT_PITFALL_SOURCES = ["seed", "project", "retired"] as const;

export const PROJECT_PITFALL_CHECK_KINDS = ["command", "id"] as const;

/** Active (non-retired) pitfalls per project, seeds and project rows merged. */
export const PROJECT_PITFALL_MAX_ACTIVE = 64;

export const PROJECT_PITFALL_DEFAULT_SEVERITY = "warn";

/**
 * The AgentWitch (daily-magic) project. Former daily-magic-only platform seeds
 * live here as project rows (same ids) since cloud migration 099; local
 * registries re-key their stale seed rows onto it the same way.
 */
export const PROJECT_PITFALL_AGENTWITCH_PROJECT_ID =
  "29b404a2-d2be-45bf-8f88-143b675a94f2";

export const PROJECT_PITFALL_LIMITS = {
  symptom: 120,
  cause: 200,
  avoidance: 280,
  checkValue: 280,
  keyword: 40,
  keywords: 24,
  tag: 32,
  tags: 12,
  id: 64,
} as const;

/** Lowercase slug, e.g. arch-max-lines. */
export const PROJECT_PITFALL_ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;

/** Upper bound for one batched record_hit call (local-first sync). */
export const PROJECT_PITFALL_MAX_HIT_BATCH = 1000;
