export type AgentWitchMaterializationLedgerEntry = {
  readonly componentId: string;
  readonly versionId: string;
  readonly sha256: string;
  readonly mode: "managed";
  readonly writtenAt: string;
  readonly backupPath?: string;
};

export type AgentWitchMaterializationLedger = {
  readonly version: 1;
  readonly entries: Record<string, AgentWitchMaterializationLedgerEntry>;
};
