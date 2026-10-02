import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { PROJECT_INVITE_URL_PATH_PREFIX } from "@/lib/projects/acl/invites/projectInvite.constants";

export const buildProjectInviteUrl = (token: string): string =>
  `${buildAgentAccessUrls().origin}${PROJECT_INVITE_URL_PATH_PREFIX}${token}`;
