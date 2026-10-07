/** Origin-specific values baked into /install/agent-witch-repair.sh. */
export interface AgentWitchRepairScriptInput {
  /** App origin, e.g. https://www.agentwitch.com (also where the update installer is fetched). */
  readonly origin: string;
  /** Install folder under HOME (`.agent-witch` prod, `.local-agent-witch` localhost). */
  readonly installDirName: string;
  /** LaunchAgent label prefix (`com.agent-witch` prod). */
  readonly launchAgentPrefix: string;
  /**
   * Legacy fixed AWL port (pre-H6). DF-031: the repair probes the discovered
   * per-account port first (profiles/<email>/local-app-port.json, then the
   * local-port-range.json range) and this port last.
   */
  readonly legacyHealthPort: number;
}
