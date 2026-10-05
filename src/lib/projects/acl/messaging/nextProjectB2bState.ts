import {
  PROJECT_B2B_TRANSITIONS,
  type ProjectB2bEvent,
  type ProjectB2bState,
} from "@/lib/projects/acl/messaging/projectB2bStateMachine";

export type ProjectB2bTransitionResult =
  | { readonly ok: true; readonly state: ProjectB2bState }
  | {
      readonly ok: false;
      readonly from: ProjectB2bState;
      readonly event: ProjectB2bEvent;
    };

/** Look up one transition. Illegal transitions are rejected, never guessed. */
export const nextProjectB2bState = (
  from: ProjectB2bState,
  event: ProjectB2bEvent,
): ProjectB2bTransitionResult => {
  const state = PROJECT_B2B_TRANSITIONS[from][event];
  return state === undefined ? { ok: false, from, event } : { ok: true, state };
};
