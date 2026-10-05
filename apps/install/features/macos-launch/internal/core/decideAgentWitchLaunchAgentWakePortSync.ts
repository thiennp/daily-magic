import { isValidAgentWitchWakePort } from "@agent-witch/install-layout";

/** What to do with one LaunchAgent plist's `AGENT_WITCH_WAKE_PORT` versus `wake-port.json`. */
export type AgentWitchLaunchAgentWakePortSyncDecision =
  | { readonly kind: "sync"; readonly wakePort: number }
  | { readonly kind: "noop" }
  /** `wake-port.json` is missing or invalid: never guess, leave the plist alone. */
  | { readonly kind: "skip-invalid" }
  /** The plist has no `AGENT_WITCH_WAKE_PORT` entry: do not add keys on a live plist. */
  | { readonly kind: "skip-no-entry" };

/** Pure: `wake-port.json` is the source of truth; the plist only mirrors it (AGENT-067). */
export const decideAgentWitchLaunchAgentWakePortSync = (input: {
  readonly filePort: number | null;
  readonly plistValue: string | null;
}): AgentWitchLaunchAgentWakePortSyncDecision => {
  if (!isValidAgentWitchWakePort(input.filePort)) {
    return { kind: "skip-invalid" };
  }
  if (input.plistValue === null) {
    return { kind: "skip-no-entry" };
  }
  if (input.plistValue.trim() === String(input.filePort)) {
    return { kind: "noop" };
  }
  return { kind: "sync", wakePort: input.filePort };
};
