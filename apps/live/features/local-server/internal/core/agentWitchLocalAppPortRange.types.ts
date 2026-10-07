export interface AgentWitchLocalAppPortRange {
  readonly start: number;
  readonly end: number;
}

export interface AgentWitchLocalAppPortFile {
  readonly localAppPort?: number;
  /** Set when the account range has no free bind port (Mac sets portsInUse). */
  readonly portsExhausted?: boolean;
}
