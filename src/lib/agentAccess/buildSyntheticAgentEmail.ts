import { randomUUID } from "node:crypto";

import { AGENT_ACCESS_EMAIL_DOMAIN } from "@/lib/agentAccess/agentAccess.constant";

export const buildSyntheticAgentEmail = (): string =>
  `agt-${randomUUID()}@${AGENT_ACCESS_EMAIL_DOMAIN}`;
