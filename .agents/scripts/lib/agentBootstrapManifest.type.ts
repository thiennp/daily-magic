export interface AgentBootstrapRoutingRow {
  readonly priority: number;
  readonly signals: readonly string[];
  readonly command: string | null;
  readonly workflow: string | null;
}

export interface AgentBootstrapWorkflow {
  readonly description: string;
  readonly scripts: readonly string[];
  readonly command: string | null;
  readonly includesGitHooks?: boolean;
}

export interface AgentBootstrapGitHookStep {
  readonly step: string;
  readonly when: string;
  readonly run: string;
}

export interface AgentBootstrapManifest {
  readonly version: number;
  readonly skip: {
    readonly description: string;
    readonly signals: readonly string[];
  };
  readonly routing: readonly AgentBootstrapRoutingRow[];
  readonly workflows: Record<string, AgentBootstrapWorkflow>;
  readonly gitHooks: {
    readonly sources: readonly string[];
    readonly preCommit: readonly AgentBootstrapGitHookStep[];
    readonly commitMsg: {
      readonly conventional: readonly string[];
      readonly ticketPrefix: readonly string[];
    };
    readonly policies: readonly string[];
  };
}
