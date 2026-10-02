import { randomUUID } from "node:crypto";

import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { finalizeApprovedMembership } from "@/lib/projects/acl/finalizeApprovedMembership";
import { insertApprovedMembership } from "@/lib/projects/acl/insertApprovedMembership";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import { resolveApproveMembershipScopes } from "@/lib/projects/acl/resolveApproveMembershipScopes";
import { resolveApproveDisplayName } from "@/lib/projects/acl/resolveApproveDisplayName";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type ApproveProjectAccessResult =
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

export const approveProjectAccessRequest = async (input: {
  readonly projectId: string;
  readonly requestId: string;
  readonly ownerUserId: string;
  readonly teamLabel?: string | null;
  readonly projectDisplayName?: string | null;
  readonly scopes?: readonly string[] | null;
}): Promise<ApproveProjectAccessResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) return { ok: false, code: "not_found" };
  if (project.ownerUserId !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }

  await ensureProjectAclSchema();
  const sql = getSql();
  const pendingRows = asRowArray(
    await sql`
      SELECT * FROM project_access_requests
      WHERE id = ${input.requestId} AND project_id = ${input.projectId}
        AND status = 'pending' AND expires_at > NOW()
      LIMIT 1
    `,
  );
  if (pendingRows.length === 0) return { ok: false, code: "not_pending" };
  const pending = mapProjectAccessRequestRow(pendingRows[0]);
  const requesterIsAgent = await isAgentUserId(pending.requesterUserId);
  const nameResult = resolveApproveDisplayName({
    requesterIsAgent,
    projectDisplayName: input.projectDisplayName,
  });
  if (!nameResult.ok) return { ok: false, code: nameResult.code };

  const effectiveScopes = resolveApproveMembershipScopes({
    ownerScopes: input.scopes,
    requestedScopes: pending.requestedScopes,
    requesterIsAgent,
  });
  const teamLabel =
    input.teamLabel ??
    (pendingRows[0].team_label ? String(pendingRows[0].team_label) : null);

  const inserted = await insertApprovedMembership({
    projectId: input.projectId,
    requestId: input.requestId,
    ownerUserId: input.ownerUserId,
    membershipId: randomUUID(),
    teamLabel,
    displayName: nameResult.displayName,
    scopes: effectiveScopes,
  });
  if (!inserted.ok) return { ok: false, code: inserted.code };

  const projectApiKey = await finalizeApprovedMembership({
    projectId: input.projectId,
    ownerUserId: input.ownerUserId,
    request: inserted.request,
    membership: inserted.membership,
    displayName: nameResult.displayName,
    mintKey: requesterIsAgent,
  });

  return {
    ok: true,
    request: inserted.request,
    membership: inserted.membership,
    projectApiKey,
  };
};
