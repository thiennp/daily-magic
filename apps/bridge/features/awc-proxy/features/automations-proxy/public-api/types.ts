export interface AgentWitchAutomationSyncWakeResponse {
  readonly ok: boolean;
  readonly writtenCount?: number;
  readonly errorMessage?: string;
}

export interface AgentWitchAutomationRunWakeResponse {
  readonly ok: boolean;
  readonly errorMessage?: string;
}

export interface AgentWitchAutomationStatusWakeResponse {
  readonly ok: true;
  readonly hostname: string;
  readonly automationCount: number;
  readonly enabledCount: number;
}
