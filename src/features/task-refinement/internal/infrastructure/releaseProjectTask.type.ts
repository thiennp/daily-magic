import type { ProjectTaskWriterDenyCode } from "@/lib/projects/tasks/authorizeProjectTaskWriter";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

export type ReleaseProjectTaskResult =
  | {
      readonly ok: true;
      readonly task: ProjectTaskRecord;
      readonly nextEffortTier: string;
      readonly unverified: boolean;
      readonly handedToUser: boolean;
    }
  | {
      readonly ok: false;
      readonly code:
        | ProjectTaskWriterDenyCode
        | "invalid_arguments"
        | "task_not_found"
        | "stale_claim"
        | "result_summary_required"
        | "blocked_reason_required"
        | "release_failed";
    };
