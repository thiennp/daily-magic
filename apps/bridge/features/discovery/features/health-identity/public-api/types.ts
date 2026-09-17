export interface AgentWitchWakeHealthResponse {
  readonly ok: true;
  readonly port: number;
  readonly hostname: string;
  readonly profileCount: number;
}

export interface AgentWitchWakeIdentityResponse {
  readonly hostname: string;
  readonly port: number;
  /** sha256 of the active profile pairing token; never the raw token. */
  readonly tokenHash: string | null;
  /** sha256 hashes for every local profile + legacy config on this Mac. */
  readonly tokenHashes: readonly string[];
  readonly profiles: readonly {
    readonly email: string | null;
    readonly launchAgentLabel: string;
  }[];
}
