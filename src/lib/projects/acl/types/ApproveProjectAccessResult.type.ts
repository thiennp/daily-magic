import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

type ApproveProjectAccessResult =
  | {
      readonly ok: true;
      readonly request: ProjectAccessRequestRecord;
      readonly membership: ProjectMembershipRecord;
      readonly projectApiKey: string | null;
    }
  | {
      readonly ok: false;
      readonly code:
        | "not_found"
        | "forbidden"
        | "not_pending"
        | "display_name_required"
        | "display_name_invalid"
        | "display_name_reserved"
        | "display_name_taken";
    };

export type { ApproveProjectAccessResult };
export default ApproveProjectAccessResult;
