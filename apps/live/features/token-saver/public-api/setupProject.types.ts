/** Explicit setup_project states (Arch r2 SHIP / awl-setup-project-cli-write). */
export type SetupProjectState =
  | "Unconnected"
  | "SigningIn"
  | "Connected"
  | "GlobalTriggersWritten"
  | "Declined"
  | "ProjectResolved"
  | "DefaultsApplied"
  | "ProjectFragmentsWritten"
  | "Verified";

export type SetupProjectAction =
  | "connect"
  | "signInComplete"
  | "writeGlobalTriggers"
  | "decline"
  | "accept"
  | "applyDefaults"
  | "writeProjectFragments"
  | "verify"
  | "clearDecline"
  | "remove";

export type ProjectResolveKind = "created" | "attached";

export interface DeclinedProjectEntry {
  readonly declinedAt: string;
  readonly cwd: string;
}

export interface DeclinedProjectsStore {
  readonly byRealpath: Readonly<Record<string, DeclinedProjectEntry>>;
}

export type CliWriterKind = "cursor" | "codex" | "claude";

export interface CliWriteResult {
  readonly ok: true;
  readonly path: string;
  readonly wrote: boolean;
  readonly backupPath?: string;
}
