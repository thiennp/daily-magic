/**
 * HTTP 409 body when the server refuses Connect because AWL is too old:
 * `{ error: "agent_witch_local_too_old", installBundleVersion, minBundleVersion, downloadUrl: "/download" }`.
 */
export interface AgentWitchLocalTooOldRefusal {
  readonly error: "agent_witch_local_too_old";
  readonly installBundleVersion: string | null;
  readonly minBundleVersion: string;
  readonly downloadUrl: string;
}
