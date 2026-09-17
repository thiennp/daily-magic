export interface AgentWitchWakeKickResult {
  readonly launchAgentLabel: string;
  readonly profileEmail: string | null;
  readonly ok: boolean;
  readonly errorMessage?: string;
}

export interface AgentWitchWakeResponse {
  readonly ok: boolean;
  readonly kicked: readonly AgentWitchWakeKickResult[];
}
