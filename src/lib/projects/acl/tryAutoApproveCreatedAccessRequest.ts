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

/**
 * After a pending request_project_access insert: always stays pending.
 * Test auto-connect (AWC_TEST_AUTO_APPROVE_JOINS) is invite-redeem only —
 * see isAwcTestAutoConnectEnabled / tryAutoApproveInviteRedeem.
 */
export const tryAutoApproveCreatedAccessRequest = async (input: {
  readonly project: UserProjectRecord;
  readonly request: ProjectAccessRequestRecord;
  readonly requesterUserId: string;
  readonly teamLabel: string | null;
  readonly suggestedName: string | null;
  readonly scopes: readonly string[];
}): Promise<TryAutoApproveCreatedAccessRequestResult> => {
  await shouldAutoApproveAgentAccessRequest({
    projectId: input.project.id,
    agentUserId: input.requesterUserId,
    projectOwnerUserId: input.project.ownerUserId,
    suggestedDisplayName: input.suggestedName,
  });
  return { ok: true, status: "pending", request: input.request };
};
