import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { insertOpenPendingAccessRequest } from "@/lib/projects/acl/insertOpenPendingAccessRequest";
import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";
import { resolveRedeemSuggestedDisplayName } from "@/lib/projects/acl/invites/resolveRedeemSuggestedDisplayName";
import type CreateProjectAccessRequestResult from "@/lib/projects/acl/types/CreateProjectAccessRequestResult.type";
import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import { tryAutoApproveCreatedAccessRequest } from "@/lib/projects/acl/tryAutoApproveCreatedAccessRequest";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type { default as CreateProjectAccessRequestResult } from "@/lib/projects/acl/types/CreateProjectAccessRequestResult.type";

/**
 * Open request without invite. Always stays pending for owner Approve
 * (silent same-owner / member-owner auto-approve removed). Test-only
 * AWC_TEST_AUTO_APPROVE_JOINS may finalize outside production.
 */
export const createProjectAccessRequest = async (input: {
  readonly projectId: string;
  readonly requesterUserId: string;
  readonly reason?: string | null;
  readonly teamLabel?: string | null;
  readonly suggestedProjectDisplayName?: string | null;
}): Promise<CreateProjectAccessRequestResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }

  const status = await checkProjectMembershipStatus(
    input.projectId,
    input.requesterUserId,
  );
  if (status === "owner") {
    return { ok: false, code: "owner" };
  }
  if (status === "active") {
    return { ok: false, code: "already_member" };
  }
  if (status === "pending") {
    return { ok: false, code: "already_pending" };
  }

  const nameResult = await resolveRedeemSuggestedDisplayName({
    projectId: input.projectId,
    suggestedProjectDisplayName: input.suggestedProjectDisplayName,
  });
  if (!nameResult.ok) {
    return { ok: false, code: nameResult.code };
  }

  await ensureProjectAclSchema();
  const scopes = [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES];
  const reason =
    input.reason && input.reason.trim().length > 0
      ? input.reason.trim().slice(0, 200)
      : null;
  const inserted = await insertOpenPendingAccessRequest({
    projectId: input.projectId,
    requesterUserId: input.requesterUserId,
    reason,
    teamLabel: input.teamLabel ?? null,
    suggestedName: nameResult.name,
    scopes,
  });
  if (!inserted.ok) {
    return { ok: false, code: "already_pending" };
  }

  return tryAutoApproveCreatedAccessRequest({
    project,
    request: inserted.request,
    requesterUserId: input.requesterUserId,
    teamLabel: input.teamLabel ?? null,
    suggestedName: nameResult.name,
    scopes,
  });
};
