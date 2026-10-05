import type { ProjectHistorySkillgenState } from "./projectHistorySkillgenStateMachine";

/** Skillgen terminal failure states mined for Pitfalls v1 (locked). */
export const PROJECT_HISTORY_PITFALL_FAILURE_STATES = [
  "FAILED_EXTRACT",
  "FAILED_VALIDATE",
  "QUARANTINED",
  "SKIPPED_FILTER",
] as const satisfies readonly ProjectHistorySkillgenState[];

export type ProjectHistoryPitfallFailureState =
  (typeof PROJECT_HISTORY_PITFALL_FAILURE_STATES)[number];

export const isProjectHistoryPitfallFailureState = (
  state: ProjectHistorySkillgenState,
): state is ProjectHistoryPitfallFailureState =>
  (PROJECT_HISTORY_PITFALL_FAILURE_STATES as readonly string[]).includes(state);
