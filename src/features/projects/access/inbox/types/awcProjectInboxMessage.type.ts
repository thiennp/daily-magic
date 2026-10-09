export type AwcProjectInboxRefs = Readonly<
  Partial<
    Record<
      | "prUrl"
      | "commitSha"
      | "localPath"
      | "allowClaimId"
      | "branch"
      | "worktree",
      string
    >
  >
>;

export default interface AwcProjectInboxMessage {
  readonly messageId: string;
  readonly kind: string;
  readonly summary: string;
  readonly refs: AwcProjectInboxRefs;
  readonly fromProjectDisplayName: string | null;
  readonly fromMembershipId: string | null;
  readonly toProjectDisplayName: string | null;
  readonly toMembershipId: string | null;
  readonly toUserId: string | null;
  readonly toTeamLabel: string | null;
  readonly createdAt: string;
  readonly ackedAt: string | null;
}

export type FetchProjectInboxResult =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly scope: "project";
      readonly messages: readonly AwcProjectInboxMessage[];
      readonly nextCursor: string | null;
      /** Archived ({n}) — project-wide. */
      readonly archivedCount: number;
      /** Owner only; non-owners see Restore disabled with the reason. */
      readonly canRestore: boolean;
    }
  | {
      readonly ok: false;
      readonly unavailable: boolean;
      readonly forbidden: boolean;
      readonly errorMessage: string;
    };

export type AckProjectInboxResult =
  | { readonly ok: true; readonly messageId: string }
  | { readonly ok: false; readonly errorMessage: string };

export type DispatchProjectInboxResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly recipientCount: number;
    }
  | {
      readonly ok: false;
      readonly code: string | null;
      readonly errorMessage: string;
      readonly cause?: "offline" | "too_old" | "writer_not_ready";
      readonly reason?: "hourly" | "unread_cap";
      readonly detail?: "rate_limited_hourly" | "unread_cap";
      readonly retryAfterSeconds?: number | null;
      readonly retryAfterAt?: string | null;
    };

export type ClearProjectInboxResult =
  | {
      readonly ok: true;
      readonly archivedMessages: number;
      /** Token for the toast Undo (restores this Clear all only). */
      readonly archiveBatch: string | null;
    }
  | {
      readonly ok: false;
      readonly unavailable: boolean;
      readonly errorMessage: string;
    };

/** One message, one Clear-all batch (Undo), or all archived. */
export type AwcProjectInboxRestoreTarget =
  | { readonly messageId: string }
  | { readonly archiveBatch: string }
  | { readonly all: true };

export type RestoreProjectInboxResult =
  | { readonly ok: true; readonly restoredMessages: number }
  | { readonly ok: false; readonly errorMessage: string };
