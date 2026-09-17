/**
 * AWI process hosting — how AWL and AWB are co-located with the runtime client.
 *
 * Phase 1 (today): one OS process may still host hub client + AWB wake HTTP + AWL UI;
 * env flags declare **external** deployable tracks without starting in-process copies.
 *
 * Phase 2: install script + LaunchAgents start external AWB/AWL when installer env sets the flags above.
 */

/** Env: `AGENT_WITCH_EXTERNAL_BRIDGE=1` skips in-process AWB (wake server). */
export const AGENT_WITCH_EXTERNAL_BRIDGE_ENV = "AGENT_WITCH_EXTERNAL_BRIDGE";

/** Env: `AGENT_WITCH_EXTERNAL_LIVE=1` skips in-process AWL (`:43347` local app). */
export const AGENT_WITCH_EXTERNAL_LIVE_ENV = "AGENT_WITCH_EXTERNAL_LIVE";

/**
 * Primary hosting track label (env-driven). When both externals are set, mode is
 * `bridge-external` and both skip flags are true — hub client only in-process.
 */
export type AgentWitchHostMode =
  "monolith" | "bridge-external" | "live-external";

export interface AgentWitchProcessHostResolution {
  readonly mode: AgentWitchHostMode;
  readonly skipInProcessBridge: boolean;
  readonly skipInProcessLive: boolean;
}

export interface ResolveAgentWitchProcessHostInput {
  readonly env?: Readonly<Record<string, string | undefined>>;
}
