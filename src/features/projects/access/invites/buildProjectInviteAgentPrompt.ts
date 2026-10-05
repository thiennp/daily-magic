import { buildProjectInviteJoinPrompt } from "@/features/projects/access/invites/buildProjectInviteJoinPrompt";
import { extractProjectInviteTokenFromUrl } from "@/lib/projects/acl/invites/extractProjectInviteTokenFromUrl";

export { extractProjectInviteTokenFromUrl };

/**
 * Agent clipboard prompt — install/connect if needed, redeem, check access
 * (skip Approve wait when already active), then pull ACL/peers and summarize.
 * Delegates to the join orchestrator; one file per join step.
 */
export const buildProjectInviteAgentPrompt = buildProjectInviteJoinPrompt;
