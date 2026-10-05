import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

type CreateProjectAccessRequestResult =
  | {
      readonly ok: true;
      readonly status: "pending";
      readonly request: ProjectAccessRequestRecord;
      readonly membership?: undefined;
      readonly projectApiKey?: undefined;
    }
  | {
      readonly ok: true;
      readonly status: "active";
      readonly request: ProjectAccessRequestRecord;
      readonly membership: ProjectMembershipRecord;
      readonly projectApiKey: string | null;
    }
  | {
      readonly ok: false;
      readonly code:
        | "not_found"
        | "already_member"
        | "already_pending"
        | "owner"
        | "display_name_invalid"
        | "display_name_reserved"
        | "display_name_required"
        | "display_name_taken";
    };

export default CreateProjectAccessRequestResult;
