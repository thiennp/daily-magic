import { randomUUID } from "node:crypto";

import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { isAgentSameProjectOwner } from "@/lib/agentAccess/resolveAgentLinkedOwnerUserId";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";
import { resolveRedeemSuggestedDisplayName } from "@/lib/projects/acl/invites/resolveRedeemSuggestedDisplayName";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type CreateProjectAccessRequestResult =
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

/**
 * Open request without invite: auto-finalize only when agent is linked
 * same-owner (owner_user_id === project.owner_user_id) and a display name
 * is available for agents. Strangers stay pending.
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
  const sql = getSql();
  const scopes = [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES];
  const reason =
    input.reason && input.reason.trim().length > 0
      ? input.reason.trim().slice(0, 200)
      : null;
  const rows = asRowArray(
    await sql`
      INSERT INTO project_access_requests (
        id, project_id, requester_user_id, reason, requested_scopes, status,
        team_label, suggested_project_display_name
      )
      VALUES (
        ${randomUUID()},
        ${input.projectId},
        ${input.requesterUserId},
        ${reason},
        ${scopes},
        'pending',
        ${input.teamLabel ?? null},
        ${nameResult.name}
      )
      RETURNING *
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "already_pending" };
  }
  const request = mapProjectAccessRequestRow(rows[0]);
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.requesterUserId,
    action: "request",
    targetUserId: input.requesterUserId,
    detail: { requestId: request.id, teamLabel: input.teamLabel ?? null },
  });

  const sameOwner = await isAgentSameProjectOwner({
    agentUserId: input.requesterUserId,
    projectOwnerUserId: project.ownerUserId,
  });
  if (!sameOwner) {
    return { ok: true, status: "pending", request };
  }

  const requesterIsAgent = await isAgentUserId(input.requesterUserId);
  if (requesterIsAgent && nameResult.name === null) {
    return { ok: true, status: "pending", request };
  }

  const approved = await approveProjectAccessRequest({
    projectId: input.projectId,
    requestId: request.id,
    ownerUserId: project.ownerUserId,
    teamLabel: input.teamLabel ?? null,
    projectDisplayName: nameResult.name,
    scopes,
  });
  if (!approved.ok) {
    return { ok: true, status: "pending", request };
  }
  return {
    ok: true,
    status: "active",
    request: approved.request,
    membership: approved.membership,
    projectApiKey: approved.projectApiKey,
  };
};
