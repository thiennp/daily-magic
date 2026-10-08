export interface AgentWitchHostLocalAppAccountDiscoveryRow {
  readonly email: string;
  readonly port: number;
  readonly pid: number;
  readonly startedAt: string;
}

export interface AgentWitchHostLocalAppAccountsDiscoveryFile {
  readonly accounts: readonly AgentWitchHostLocalAppAccountDiscoveryRow[];
}
