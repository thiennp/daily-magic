export type AwcProjectInboxRefs = Readonly<
  Partial<Record<"prUrl" | "commitSha" | "localPath" | "allowClaimId", string>>
>;

export default interface AwcProjectInboxMessage {
  readonly messageId: string;
  readonly kind: string;
  readonly summary: string;
  readonly refs: AwcProjectInboxRefs;
  readonly fromProjectDisplayName: string | null;
  readonly createdAt: string;
  readonly ackedAt: string | null;
}

export type FetchProjectInboxResult =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly messages: readonly AwcProjectInboxMessage[];
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
    };
