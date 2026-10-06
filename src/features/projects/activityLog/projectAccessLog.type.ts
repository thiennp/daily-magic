/**
 * Access log client types (Human UI consumes; Invite owns the API).
 * Re-exported from the server DTO so client and route can never drift.
 */
export type {
  ProjectActivityDeliveryTrigger,
  ProjectActivityEventDetail,
  ProjectActivityLogActor,
  ProjectActivityLogErrorCode,
  ProjectActivityLogErrorResponse,
  ProjectActivityLogEvent,
  ProjectActivityLogResponse,
  ProjectActivityLogRetention,
  ProjectActivityLogTarget,
  ProjectActivityMemberKind,
} from "@/lib/projects/acl/activity/types/ProjectActivityLog.type";
export type {
  ProjectActivityActorKind,
  ProjectActivityCategory,
  ProjectActivityEventType,
} from "@/lib/projects/acl/activity/projectActivityEvent.constant";

export type FetchProjectAccessLogParams = {
  readonly projectId: string;
  readonly cursor?: string | null;
  readonly limit?: number;
  readonly category?: "access" | "wake" | null;
  readonly since?: string | null;
};
