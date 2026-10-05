import {
  PROJECT_HISTORY_SKILLGEN_TRANSITIONS,
  type ProjectHistorySkillgenEvent,
  type ProjectHistorySkillgenState,
} from "./projectHistorySkillgenStateMachine";

export type ProjectHistorySkillgenTransitionResult =
  | { readonly ok: true; readonly state: ProjectHistorySkillgenState }
  | {
      readonly ok: false;
      readonly from: ProjectHistorySkillgenState;
      readonly event: ProjectHistorySkillgenEvent;
    };

/** Look up one transition. Illegal events are rejected, never guessed. */
export const nextProjectHistorySkillgenState = (
  from: ProjectHistorySkillgenState,
  event: ProjectHistorySkillgenEvent,
): ProjectHistorySkillgenTransitionResult => {
  const state = PROJECT_HISTORY_SKILLGEN_TRANSITIONS[from][event];
  return state === undefined ? { ok: false, from, event } : { ok: true, state };
};
