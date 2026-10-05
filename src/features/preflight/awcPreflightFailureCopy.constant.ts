import { PREFLIGHT_FAILURE_COPY } from "@agent-witch/shared/preflight";

/** AWC chrome reuses the shared note-02 copy strings. */
export const AWC_PREFLIGHT_FAILURE_COPY = {
  ...PREFLIGHT_FAILURE_COPY,
} as const;
