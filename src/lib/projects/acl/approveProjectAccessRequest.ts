import { randomUUID } from "node:crypto";

import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { validateProjectDisplayName } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import { mintProjectApiKey } from "@/lib/projects/acl/projectApiKeys/mintProjectApiKey";
import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type ApproveProjectAccessResult =
  | {
      readonly ok: true;
      readonly request: ProjectAccessRequestRecord;
      readonly membership: ProjectMembershipRecord;
      /** Plaintext project key minted for agent members — never store client-side by owner. */
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
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }

  await ensureProjectAclSchema();
  const sql = getSql();

  const pendingRows = asRowArray(
    await sql`
      SELECT *
      FROM project_access_requests
      WHERE id = ${input.requestId}
        AND project_id = ${input.projectId}
        AND status = 'pending'
        AND expires_at > NOW()
      LIMIT 1
    `,
  );
  if (pendingRows.length === 0) {
    return { ok: false, code: "not_pending" };
  }
  const pending = mapProjectAccessRequestRow(pendingRows[0]);
  const requesterIsAgent = await isAgentUserId(pending.requesterUserId);

  let displayName: string | null = null;
  if (requesterIsAgent) {
    const validated = validateProjectDisplayName(input.projectDisplayName);
    if (!validated.ok) {
      if (validated.code === "reserved") {
        return { ok: false, code: "display_name_reserved" };
      }
      if (validated.code === "missing") {
        return { ok: false, code: "display_name_required" };
      }
      return { ok: false, code: "display_name_invalid" };
    }
    displayName = validated.name;
  } else if (
    typeof input.projectDisplayName === "string" &&
    input.projectDisplayName.trim().length > 0
  ) {
    const validated = validateProjectDisplayName(input.projectDisplayName);
    if (!validated.ok) {
      return {
        ok: false,
        code:
          validated.code === "reserved"
            ? "display_name_reserved"
            : "display_name_invalid",
      };
    }
    displayName = validated.name;
  }

  const membershipId = randomUUID();
  const scopes =
    Array.isArray(input.scopes) && input.scopes.length > 0
      ? [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES.filter((s) =>
          (input.scopes as readonly string[]).includes(s),
        )]
      : pending.requestedScopes.length > 0
        ? [...pending.requestedScopes]
        : [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES];
  const effectiveScopes =
    scopes.length > 0 ? scopes : [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES];
  const teamLabel =
    input.teamLabel ??
    (pendingRows[0].team_label ? String(pendingRows[0].team_label) : null);

  let combinedRows: Record<string, unknown>[] = [];
  try {
    combinedRows = asRowArray(
      await sql`
        WITH approved_request AS (
          UPDATE project_access_requests
          SET status = 'approved',
              decided_by_user_id = ${input.ownerUserId},
              decided_at = NOW()
          WHERE id = ${input.requestId}
            AND project_id = ${input.projectId}
            AND status = 'pending'
            AND expires_at > NOW()
          RETURNING *
        ),
        new_member AS (
          INSERT INTO project_memberships (
            id, project_id, user_id, role, status, team_label, scopes,
            project_display_name
          )
          SELECT
            ${membershipId},
            ${input.projectId},
            approved_request.requester_user_id,
            'member',
            'active',
            ${teamLabel},
            ${effectiveScopes},
            ${displayName}
          FROM approved_request
          RETURNING *
        )
        SELECT
          to_jsonb(approved_request) AS request_row,
          to_jsonb(new_member) AS member_row
        FROM approved_request
        INNER JOIN new_member ON true
      `,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (
      message.includes("project_memberships_display_name_active_idx") ||
      message.includes("unique") ||
      message.includes("duplicate")
    ) {
      return { ok: false, code: "display_name_taken" };
    }
    throw error;
  }

  if (combinedRows.length === 0) {
    return { ok: false, code: "not_pending" };
  }

  const requestPayload = combinedRows[0].request_row;
  const memberPayload = combinedRows[0].member_row;
  if (
    requestPayload === null ||
    typeof requestPayload !== "object" ||
    memberPayload === null ||
    typeof memberPayload !== "object"
  ) {
    return { ok: false, code: "not_pending" };
  }

  const request = mapProjectAccessRequestRow(
    requestPayload as Record<string, unknown>,
  );
  const membership = mapProjectMembershipRow(
    memberPayload as Record<string, unknown>,
  );
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: "approve",
    targetUserId: request.requesterUserId,
    detail: {
      requestId: request.id,
      membershipId: membership.id,
      projectDisplayName: displayName,
    },
  });
  if (displayName !== null) {
    await writeProjectAccessAudit({
      projectId: input.projectId,
      actorUserId: input.ownerUserId,
      action: "membership.set_display_name",
      targetUserId: request.requesterUserId,
      detail: {
        membershipId: membership.id,
        projectDisplayName: displayName,
      },
    });
  }

  let projectApiKey: string | null = null;
  if (requesterIsAgent) {
    const minted = await mintProjectApiKey({
      projectId: input.projectId,
      membershipId: membership.id,
      userId: membership.userId,
      scopes: membership.scopes,
      actorUserId: input.ownerUserId,
      auditAction: "key.mint",
    });
    projectApiKey = minted.plaintext;
  }

  return { ok: true, request, membership, projectApiKey };
};
