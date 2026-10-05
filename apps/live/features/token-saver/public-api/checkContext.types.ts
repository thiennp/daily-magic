/** Arch-locked check_context vocab (not PreflightResultStatus). */
export type CheckContextStatus = "hit" | "miss" | "none";

export interface CheckContextInput {
  readonly cwd?: string;
  readonly message?: string;
  readonly sessionId?: string;
  readonly projectId?: string;
}

export interface CheckContextResult {
  readonly status: CheckContextStatus;
  readonly pitfalls?: readonly {
    readonly id: string;
    readonly avoidance: string;
  }[];
  readonly promptCreate?: boolean;
  readonly projectId?: string;
}
