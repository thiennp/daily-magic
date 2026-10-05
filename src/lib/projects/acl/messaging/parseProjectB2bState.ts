import {
  PROJECT_B2B_STATES,
  type ProjectB2bState,
} from "@/lib/projects/acl/messaging/projectB2bStateMachine";

/** DB value → state, or null when the delivery is not watched or unknown. */
export const parseProjectB2bState = (value: unknown): ProjectB2bState | null =>
  PROJECT_B2B_STATES.find((state) => state === value) ?? null;
