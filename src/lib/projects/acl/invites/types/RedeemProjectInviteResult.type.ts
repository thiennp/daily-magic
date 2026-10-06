import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

type RedeemProjectInviteResult =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly request: ProjectAccessRequestRecord;
      readonly status: "pending";
      readonly namingRequired: true;
      readonly suggestedProjectDisplayName: string | null;
      readonly membership?: undefined;
      readonly projectApiKey?: undefined;
    }
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly request: ProjectAccessRequestRecord;
      readonly status: "active";
      readonly namingRequired: false;
      readonly suggestedProjectDisplayName: string | null;
      readonly membership: ProjectMembershipRecord;
      readonly projectApiKey: string | null;
    }
  | {
      readonly ok: false;
      readonly code:
        | "invalid_token"
        | "already_member"
        | "already_pending"
        | "owner"
        | "exhausted"
        | "display_name_invalid"
        | "display_name_reserved"
        | "display_name_required"
        | "display_name_taken";
    };

export type { RedeemProjectInviteResult };
export default RedeemProjectInviteResult;
