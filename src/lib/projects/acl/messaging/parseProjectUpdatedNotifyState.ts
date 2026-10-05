import {
  PROJECT_UPDATED_NOTIFY_STATES,
  type ProjectUpdatedNotifyState,
} from "@/lib/projects/acl/messaging/projectUpdatedNotifyStateMachine";

const ALLOWED: ReadonlySet<string> = new Set(PROJECT_UPDATED_NOTIFY_STATES);

/** Parse a DB/text state token; unknown values are rejected. */
export const parseProjectUpdatedNotifyState = (
  value: unknown,
): ProjectUpdatedNotifyState | null => {
  if (typeof value !== "string" || !ALLOWED.has(value)) {
    return null;
  }
  return value as ProjectUpdatedNotifyState;
};
