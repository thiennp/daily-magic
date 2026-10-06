/** Origin-specific values baked into /install/agent-witch-repair.sh. */
export interface AgentWitchRepairScriptInput {
  /** App origin, e.g. https://www.agentwitch.com (also where the update installer is fetched). */
  readonly origin: string;
  /** Install folder under HOME (`.agent-witch` prod, `.local-agent-witch` localhost). */
  readonly installDirName: string;
  /** LaunchAgent label prefix (`com.agent-witch` prod). */
  readonly launchAgentPrefix: string;
  /** AWL local app port; the repair verifies `GET /health` there. */
  readonly healthPort: number;
}
