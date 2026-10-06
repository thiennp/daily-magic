import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";

type CreateProjectInviteResult =
  | {
      readonly ok: true;
      readonly invite: ProjectInviteRecord;
      readonly url: string;
      readonly token: string;
    }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" | "invalid" };

export type { CreateProjectInviteResult };
export default CreateProjectInviteResult;
