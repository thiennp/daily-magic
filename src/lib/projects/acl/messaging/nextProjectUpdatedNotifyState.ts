import {
  PROJECT_UPDATED_NOTIFY_TRANSITIONS,
  type ProjectUpdatedNotifyEvent,
  type ProjectUpdatedNotifyState,
} from "@/lib/projects/acl/messaging/projectUpdatedNotifyStateMachine";

export type ProjectUpdatedNotifyTransitionResult =
  | { readonly ok: true; readonly state: ProjectUpdatedNotifyState }
  | {
      readonly ok: false;
      readonly from: ProjectUpdatedNotifyState;
      readonly event: ProjectUpdatedNotifyEvent;
    };

/** Look up one transition. Illegal transitions are rejected, never guessed. */
export const nextProjectUpdatedNotifyState = (
  from: ProjectUpdatedNotifyState,
  event: ProjectUpdatedNotifyEvent,
): ProjectUpdatedNotifyTransitionResult => {
  const state = PROJECT_UPDATED_NOTIFY_TRANSITIONS[from][event];
  return state === undefined
    ? { ok: false, from, event }
    : { ok: true, state };
};
