import type {
  ProjectInviteJoinConnectPath,
  ProjectInviteJoinDeliveryMode,
} from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

/** One bot type as served on /join (JSON `types[]`). `matchHints` is an alias of `match`. */
export type ProjectInviteJoinPageType = {
  readonly id: string;
  readonly label: string;
  readonly match: readonly string[];
  readonly matchHints: readonly string[];
  readonly deliveryMode: ProjectInviteJoinDeliveryMode;
  readonly connectPath: ProjectInviteJoinConnectPath;
  readonly steps: readonly string[];
  readonly note?: string;
};

/** JSON body of GET /join/<inviteToken>; the markdown renders the same object. */
export type ProjectInviteJoinPage = {
  readonly project: string | null;
  readonly terms: {
    readonly url: string;
    readonly privacyUrl: string;
    readonly rule: string;
  };
  readonly types: readonly ProjectInviteJoinPageType[];
  readonly approval: {
    readonly rule: string;
    readonly autoApproveActiveMeans: string;
    /** Present only when this invite's auto-approve state is known. */
    readonly autoApprove?: boolean;
    readonly autoApproveLine?: string;
    /** Shared join steps 2 (redeem) and 3 (access check). */
    readonly steps: readonly string[];
  };
  /** Product intro line, then shared join steps 4–9 (step 7 for wake and for Checks on demand). */
  readonly nextSteps: readonly string[];
  readonly pollLimitPerMinute: number;
};
