export type ProjectMessageLogEntry = {
  readonly messageId: string;
  readonly kind: string;
  readonly summary: string;
  readonly refs: Readonly<Record<string, unknown>>;
  readonly fromProjectDisplayName: string | null;
  readonly fromMembershipId: string | null;
  readonly toProjectDisplayName: string | null;
  readonly toMembershipId: string | null;
  readonly toUserId: string | null;
  readonly toTeamLabel: string | null;
  readonly createdAt: string;
  readonly ackedAt: string | null;
};

export type ListProjectMessageLogResult =
  | {
      readonly ok: true;
      readonly messages: readonly ProjectMessageLogEntry[];
      readonly nextCursor: string | null;
      readonly scope: "project";
      /** True when this page is the Archived filter. */
      readonly archived: boolean;
      /** Archived ({n}) — project-wide count. */
      readonly archivedCount: number;
      /** Owner only; others see Restore disabled with the reason. */
      readonly canRestore: boolean;
    }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };
