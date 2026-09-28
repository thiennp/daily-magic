import { AGENT_ACCESS_EMAIL_DOMAIN } from "@/lib/agentAccess/agentAccess.constant";

export const isAgentAccessSyntheticEmail = (email: string): boolean =>
  email.endsWith(`@${AGENT_ACCESS_EMAIL_DOMAIN}`);
