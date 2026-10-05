import {
  PROJECT_COMPUTER_HISTORY_TRANSITIONS,
  type ProjectComputerHistoryEvent,
  type ProjectComputerHistoryState,
} from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";

export type ProjectComputerHistoryTransitionResult =
  | { readonly ok: true; readonly state: ProjectComputerHistoryState }
  | {
      readonly ok: false;
      readonly from: ProjectComputerHistoryState;
      readonly event: ProjectComputerHistoryEvent;
    };

/** Look up one transition. Illegal transitions are rejected, never guessed. */
export const nextProjectComputerHistoryState = (
  from: ProjectComputerHistoryState,
  event: ProjectComputerHistoryEvent,
): ProjectComputerHistoryTransitionResult => {
  const state = PROJECT_COMPUTER_HISTORY_TRANSITIONS[from][event];
  return state === undefined ? { ok: false, from, event } : { ok: true, state };
};
