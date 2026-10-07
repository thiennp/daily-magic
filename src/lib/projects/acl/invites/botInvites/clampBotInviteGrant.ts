import { BOT_PROJECT_INVITE_ROLE } from "@/lib/projects/acl/invites/botInvites/botProjectInvite.constants";
import {
  PROJECT_ACL_DEFAULT_MEMBER_SCOPES,
  type ProjectAclScope,
} from "@/lib/projects/acl/projectAclScopes.constant";
import type { ProjectMembershipRole } from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

/** Approve always adds msg:dispatch for bots, so the inviter must hold it. */
const MSG_DISPATCH: ProjectAclScope = "msg:dispatch";

export type BotInviteGrant =
  | { readonly ok: true; readonly scopes: readonly ProjectAclScope[] }
  | {
      readonly ok: false;
      readonly code: "role_not_allowed" | "scope_exceeds_inviter";
    };

const isMemberRoleRequest = (role: unknown): boolean =>
  role === undefined || role === null || role === BOT_PROJECT_INVITE_ROLE;

/**
 * Pure: role is member only (never owner/admin/viewer→member escalation) and
 * scopes are a subset of (default member scopes ∩ inviter's scopes). Any
 * request outside that is rejected, never silently widened.
 */
export const clampBotInviteGrant = (input: {
  readonly requestedRole?: unknown;
  readonly requestedScopes?: unknown;
  readonly inviterRole: ProjectMembershipRole;
  readonly inviterScopes: readonly ProjectAclScope[];
}): BotInviteGrant => {
  if (
    !isMemberRoleRequest(input.requestedRole) ||
    input.inviterRole !== BOT_PROJECT_INVITE_ROLE
  ) {
    return { ok: false, code: "role_not_allowed" };
  }
  const grantable = PROJECT_ACL_DEFAULT_MEMBER_SCOPES.filter((scope) =>
    input.inviterScopes.includes(scope),
  );
  const requested = input.requestedScopes;
  const absent =
    requested === undefined ||
    requested === null ||
    (Array.isArray(requested) && requested.length === 0);
  if (!absent && !Array.isArray(requested)) {
    return { ok: false, code: "scope_exceeds_inviter" };
  }
  const wanted: readonly unknown[] = absent ? grantable : requested;
  const allGrantable = wanted.every(
    (scope) =>
      typeof scope === "string" &&
      (grantable as readonly string[]).includes(scope),
  );
  const scopes = grantable.filter((scope) => wanted.includes(scope));
  if (!allGrantable || !scopes.includes(MSG_DISPATCH)) {
    return { ok: false, code: "scope_exceeds_inviter" };
  }
  return { ok: true, scopes };
};
