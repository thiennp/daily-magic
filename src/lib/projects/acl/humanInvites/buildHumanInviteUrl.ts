import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { HUMAN_INVITE_URL_PATH_PREFIX } from "@/lib/projects/acl/humanInvites/humanInvite.constants";

export const buildHumanInviteUrl = (token: string): string =>
  `${buildAgentAccessUrls().origin}${HUMAN_INVITE_URL_PATH_PREFIX}${token}`;
