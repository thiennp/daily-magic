import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { shouldAutoApproveAgentAccessRequest } from "@/lib/projects/acl/shouldAutoApproveAgentAccessRequest";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export type TryAutoApproveCreatedAccessRequestResult =
  | {
      readonly ok: true;
      readonly status: "pending";
      readonly request: ProjectAccessRequestRecord;
    }
  | {
      readonly ok: true;
      readonly status: "active";
      readonly request: ProjectAccessRequestRecord;
      readonly membership: ProjectMembershipRecord;
      readonly projectApiKey: string | null;
    };

/** After a pending request insert: same-owner or member-owner bot auto-approve. */
export const tryAutoApproveCreatedAccessRequest = async (input: {
  readonly project: UserProjectRecord;
  readonly request: ProjectAccessRequestRecord;
  readonly requesterUserId: string;
  readonly teamLabel: string | null;
  readonly suggestedName: string | null;
  readonly scopes: readonly string[];
}): Promise<TryAutoApproveCreatedAccessRequestResult> => {
  const decision = await shouldAutoApproveAgentAccessRequest({
    projectId: input.project.id,
    agentUserId: input.requesterUserId,
    projectOwnerUserId: input.project.ownerUserId,
    suggestedDisplayName: input.suggestedName,
  });
  if (!decision.autoApprove) {
    return { ok: true, status: "pending", request: input.request };
  }

  const approved = await approveProjectAccessRequest({
    projectId: input.project.id,
    requestId: input.request.id,
    ownerUserId: input.project.ownerUserId,
    teamLabel: input.teamLabel,
    projectDisplayName: input.suggestedName,
    scopes: input.scopes,
  });
  if (!approved.ok) {
    return { ok: true, status: "pending", request: input.request };
  }
  return {
    ok: true,
    status: "active",
    request: approved.request,
    membership: approved.membership,
    projectApiKey: approved.projectApiKey,
  };
};
