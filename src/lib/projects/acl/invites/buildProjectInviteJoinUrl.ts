import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { PROJECT_INVITE_JOIN_PATH_PREFIX } from "@/lib/projects/acl/invites/projectInviteJoinPath.constant";

/** Public per-invite instructions URL. Carries only the invite code — never a bearer or project key. */
export const buildProjectInviteJoinUrl = (token: string): string =>
  `${buildAgentAccessUrls().origin}${PROJECT_INVITE_JOIN_PATH_PREFIX}${encodeURIComponent(token.trim())}`;
