import type { ProjectActivityAction } from "@/lib/projects/acl/projectActivityAllowlist.constant";
import type { ProjectActivitySafeDetail } from "@/lib/projects/acl/sanitizeProjectActivityDetail";

/** Agent/UI DTO for G1 list_project_activity — allowlisted events only. */
export default interface ProjectActivityEvent {
  readonly id: string;
  readonly projectId: string;
  readonly action: ProjectActivityAction;
  readonly actorUserId: string;
  readonly targetUserId: string | null;
  readonly at: string;
  readonly detail: ProjectActivitySafeDetail;
}
