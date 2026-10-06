import type {
  ProjectActivityActorKind,
  ProjectActivityCategory,
  ProjectActivityEventType,
  ProjectApprovalSource,
} from "@/lib/projects/acl/activity/projectActivityEvent.constant";

export type ProjectActivityMemberKind = "bot" | "human" | "computer";

export type ProjectActivityDeliveryTrigger =
  | "owner_switch"
  | "member_switch"
  | "wake_link_saved";

/** Structured detail only. Every key is optional; render a detail only when present. */
export type ProjectActivityEventDetail = {
  readonly inviteId?: string;
  readonly label?: string;
  readonly autoApprove?: boolean;
  readonly maxUses?: number;
  readonly expiresAt?: string;
  readonly teamLabel?: string;
  readonly requestId?: string;
  readonly membershipId?: string;
  readonly memberKind?: ProjectActivityMemberKind;
  readonly role?: string;
  readonly deliveryMode?: "webhook" | "poll";
  readonly previousDeliveryMode?: "webhook" | "poll";
  readonly trigger?: ProjectActivityDeliveryTrigger;
  readonly approvalSource?: ProjectApprovalSource;
  /** rule.dropped / rule.restored: the Safety rule (pitfall) id. */
  readonly ruleId?: string;
};

export type ProjectActivityLogActor = {
  readonly kind: ProjectActivityActorKind;
  readonly userId: string | null;
  /** Snapshot taken at write time, else the live project display name. Null for the owner. */
  readonly displayName: string | null;
};

export type ProjectActivityLogTarget = {
  readonly membershipId: string | null;
  readonly userId: string | null;
  /** Snapshot taken at write time, else the live project display name. */
  readonly displayName: string | null;
};

export type ProjectActivityLogEvent = {
  readonly id: string;
  readonly type: ProjectActivityEventType;
  readonly category: ProjectActivityCategory;
  /** ISO 8601 UTC. */
  readonly at: string;
  readonly actor: ProjectActivityLogActor;
  readonly target: ProjectActivityLogTarget | null;
  readonly detail: ProjectActivityEventDetail;
};

export type ProjectActivityLogRetention = {
  readonly maxEvents: number;
  readonly maxAgeDays: number;
};

/** 200 body of GET /api/projects/[projectId]/activity (owner only). */
export type ProjectActivityLogResponse = {
  readonly ok: true;
  readonly projectId: string;
  readonly events: readonly ProjectActivityLogEvent[];
  readonly nextCursor: string | null;
  readonly retention: ProjectActivityLogRetention;
};

export type ProjectActivityLogErrorCode =
  | "owner_only"
  | "not_found"
  | "invalid_cursor"
  | "invalid_query"
  | "unauthorized";

/** 4xx body. 403 owner_only for any signed-in non-owner. */
export type ProjectActivityLogErrorResponse = {
  readonly ok: false;
  readonly error: ProjectActivityLogErrorCode;
};
