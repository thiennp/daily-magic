/**
 * Skill-from-history episode FSM (design rev 2).
 * Only listed transitions are legal; the orchestrator never invents edges.
 */
export const PROJECT_HISTORY_SKILLGEN_STATES = [
  "CAPTURING",
  "EPISODE_READY",
  "SCRUBBING",
  "TRIAGE",
  "DEDUP",
  "EXTRACT",
  "VALIDATE",
  "AWAITING_REVIEW",
  "PUBLISHED",
  "SKIPPED_COST",
  "SKIPPED_FILTER",
  "SKIPPED_DEDUP",
  "QUARANTINED",
  "FAILED_EXTRACT",
  "FAILED_VALIDATE",
  "REJECTED",
] as const;

export type ProjectHistorySkillgenState =
  (typeof PROJECT_HISTORY_SKILLGEN_STATES)[number];

export type ProjectHistorySkillgenEvent =
  | "episode_closed"
  | "budget_ok"
  | "budget_exceeded"
  | "draft_cap_reached"
  | "scrub_ok"
  | "scrub_quarantine"
  | "qualify_ok"
  | "qualify_reject"
  | "dedup_novel"
  | "dedup_merge"
  | "dedup_skip"
  | "extract_ok"
  | "extract_fail"
  | "validate_ok"
  | "validate_retry"
  | "validate_fail"
  | "owner_publish"
  | "owner_discard"
  | "history_off";

type TransitionRow = Readonly<
  Partial<Record<ProjectHistorySkillgenEvent, ProjectHistorySkillgenState>>
>;

/**
 * Legal edges only. Terminal SKIPPED_*, FAILED_*, QUARANTINED, REJECTED have no
 * automatic exits (manual requeue is phase 2+). History OFF is accepted from
 * any non-terminal via history_off handled by the runner (purge), not here.
 */
export const PROJECT_HISTORY_SKILLGEN_TRANSITIONS: Readonly<
  Record<ProjectHistorySkillgenState, TransitionRow>
> = {
  CAPTURING: {
    episode_closed: "EPISODE_READY",
  },
  EPISODE_READY: {
    budget_ok: "SCRUBBING",
    budget_exceeded: "SKIPPED_COST",
    /** Cap reached: stay ready; mining pauses until drafts drop below max. */
    draft_cap_reached: "EPISODE_READY",
  },
  SCRUBBING: {
    scrub_ok: "TRIAGE",
    scrub_quarantine: "QUARANTINED",
  },
  TRIAGE: {
    qualify_ok: "DEDUP",
    qualify_reject: "SKIPPED_FILTER",
  },
  DEDUP: {
    dedup_novel: "EXTRACT",
    dedup_merge: "EXTRACT",
    dedup_skip: "SKIPPED_DEDUP",
  },
  EXTRACT: {
    extract_ok: "VALIDATE",
    extract_fail: "FAILED_EXTRACT",
  },
  VALIDATE: {
    validate_ok: "AWAITING_REVIEW",
    validate_retry: "EXTRACT",
    validate_fail: "FAILED_VALIDATE",
  },
  AWAITING_REVIEW: {
    owner_publish: "PUBLISHED",
    owner_discard: "REJECTED",
  },
  PUBLISHED: {},
  SKIPPED_COST: {},
  SKIPPED_FILTER: {},
  SKIPPED_DEDUP: {},
  QUARANTINED: {},
  FAILED_EXTRACT: {},
  FAILED_VALIDATE: {},
  REJECTED: {},
};

/** States that still need automatic processing on the next tick. */
export const PROJECT_HISTORY_SKILLGEN_ACTIVE_STATES: readonly ProjectHistorySkillgenState[] =
  [
    "CAPTURING",
    "EPISODE_READY",
    "SCRUBBING",
    "TRIAGE",
    "DEDUP",
    "EXTRACT",
    "VALIDATE",
  ];
