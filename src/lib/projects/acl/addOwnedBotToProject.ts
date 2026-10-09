import { getSql } from "@/lib/db";
import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import { insertOpenPendingAccessRequest } from "@/lib/projects/acl/insertOpenPendingAccessRequest";
import { resolveRedeemSuggestedDisplayName } from "@/lib/projects/acl/invites/resolveRedeemSuggestedDisplayName";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import { isBotOwnedBy } from "@/lib/projects/acl/isBotOwnedBy";
import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";
import { resolveFolderRefActor } from "@/lib/projects/acl/resolveFolderRefActor";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type AddOwnedBotResult =
  | { readonly ok: true; readonly membershipId: string }
  | {
      readonly ok: false;
      readonly code:
        | "not_found"
        | "forbidden"
        | "not_your_bot"
        | "already_in_project"
        | "display_name_required"
        | "display_name_invalid"
        | "display_name_reserved"
        | "display_name_taken"
        | "add_failed";
    };

/**
 * Put an assistant you already own into this project without a new invite.
 * You are both its owner and its inviter, so it joins active right away.
 */
export const addOwnedBotToProject = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly botUserId: string;
  readonly projectDisplayName: string | null;
  readonly isolateBots?: boolean;
}): Promise<AddOwnedBotResult> => {
  const actor = await resolveFolderRefActor({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
  });
  if (!actor.ok) return actor;
  const project = await getUserProjectById(input.projectId);
  if (project === null) return { ok: false, code: "not_found" };
  const owned =
    (await isAgentUserId(input.botUserId)) &&
    (await isBotOwnedBy(input.botUserId, input.actorUserId));
  if (!owned) return { ok: false, code: "not_your_bot" };
  const status = await checkProjectMembershipStatus(
    input.projectId,
    input.botUserId,
  );
  if (status === "active" || status === "pending" || status === "owner") {
    return { ok: false, code: "already_in_project" };
  }
  // A seat that was revoked (maybe by the owner) is not re-seated by a member.
  if (status === "revoked" && !actor.isOwner) {
    return { ok: false, code: "forbidden" };
  }
  const name = await resolveRedeemSuggestedDisplayName({
    projectId: input.projectId,
    suggestedProjectDisplayName: input.projectDisplayName,
  });
  if (!name.ok) return name;
  const pending = await insertOpenPendingAccessRequest({
    projectId: input.projectId,
    requesterUserId: input.botUserId,
    reason: "owned_bot_add",
    teamLabel: null,
    suggestedName: name.name,
    scopes: [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES],
  });
  if (!pending.ok) return { ok: false, code: "already_in_project" };
  const approved = await approveProjectAccessRequest({
    projectId: input.projectId,
    requestId: pending.request.id,
    ownerUserId: project.ownerUserId,
    projectDisplayName: name.name,
    approvalSource: "owner",
  });
  if (!approved.ok) {
    return approved.code === "forbidden" ||
      approved.code === "not_found" ||
      approved.code === "not_pending"
      ? { ok: false, code: "add_failed" }
      : { ok: false, code: approved.code };
  }
  await getSql()`
    UPDATE project_memberships
    SET invited_by_user_id = ${input.actorUserId},
        isolated_from_other_bots = ${input.isolateBots === true}
    WHERE id = ${approved.membership.id}
  `;
  return { ok: true, membershipId: approved.membership.id };
};
