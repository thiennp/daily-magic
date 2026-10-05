import type { HumanInviteRole } from "@/lib/projects/acl/humanInvites/humanInvite.constants";
import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";

/**
 * Default scopes for human seats at accept time.
 *
 * Lockstep with Dispatch `decideProjectMessagePostAccess` (feat/awc-human-member-messaging-roles):
 * human seats are gated by role + memberKind, not scopes — "human seats carry no scopes".
 * Bots still need msg:dispatch; this helper must not widen bot approve defaults.
 *
 * Capability map (no new scope names):
 * - post messages (member): role === "member" && memberKind === "human" (Dispatch)
 * - read-only messages (viewer): role === "viewer" → viewer_read_only (Dispatch)
 * - read skills: active membership / owner (no skill ACL scope)
 * - connect own bots: claim-bot / later auto-approve (no ACL scope)
 */
export const defaultHumanMembershipScopes = (
  _role: HumanInviteRole,
): readonly ProjectAclScope[] => [];
