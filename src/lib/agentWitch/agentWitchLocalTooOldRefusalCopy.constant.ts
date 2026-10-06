/**
 * Server-side Product EN for the AWL hard "too old" gate (web notices live in
 * src/features/home/agentWitchLocalTooOldCopy.constant.ts, owned by Human UI).
 * `connectRefusedMessage` rides on the HTTP 409 `agent_witch_local_too_old` body.
 * `hardGate` is for the Mac / tray app dialog; do not reuse the soft
 * "Update available" title for the hard gate.
 */
export const AGENT_WITCH_LOCAL_TOO_OLD_REFUSAL_COPY = {
  connectRefusedMessage:
    "AgentWitch Local is too old to connect. Update it, then try again.",
  hardGate: {
    title: "Update AgentWitch Local",
    body: "This version is too old to connect to AgentWitch. Update it to keep working.",
    button: "Update",
  },
} as const;
