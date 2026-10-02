import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

type LeaveProjectMembershipResult =
  | {
      readonly ok: true;
      readonly status: "revoked";
      readonly membership: ProjectMembershipRecord;
      readonly alreadyLeft?: true;
    }
  | {
      readonly ok: false;
      readonly code: "not_found" | "owner" | "not_active" | "forbidden";
    };

export default LeaveProjectMembershipResult;
