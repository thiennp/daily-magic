export type AwcProjectInboxRefs = Readonly<
  Partial<Record<"prUrl" | "commitSha" | "localPath" | "allowClaimId", string>>
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
      readonly reason?: "hourly" | "unread_cap";
      readonly detail?: "rate_limited_hourly" | "unread_cap";
      readonly retryAfterSeconds?: number | null;
      readonly retryAfterAt?: string | null;
    };

export type ClearProjectInboxResult =
  | {
      readonly ok: true;
      readonly deletedMessages: number;
      readonly deletedDeliveries: number;
    }
  | {
      readonly ok: false;
      readonly unavailable: boolean;
      readonly errorMessage: string;
    };
