export interface AgentWitchHostServiceAccount {
  readonly email: string;
  readonly launchAgentLabel: string;
  readonly systemdUnitName: string;
  readonly wakePort: number;
}

export interface AgentWitchHostServicesFile {
  readonly version: 1;
  readonly mode: "per-account";
  readonly accounts: readonly AgentWitchHostServiceAccount[];
  readonly updatedAt: string;
}

export type AgentWitchHostProcessScope =
  | { readonly kind: "account"; readonly email: string }
  | { readonly kind: "launcher"; readonly services: AgentWitchHostServicesFile }
  | { readonly kind: "monolith" };

export type AgentWitchHostEnv = Readonly<Record<string, string | undefined>>;
