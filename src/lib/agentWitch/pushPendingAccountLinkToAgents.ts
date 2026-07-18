import { peekPendingAccountLinkByEmail } from "@/lib/agentWitch/pendingAccountLinkRegistry";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const pushPendingAccountLinkToAgents = (
  runtime: AgentWitchHubRuntime,
  email: string,
): void => {
  const pending = peekPendingAccountLinkByEmail(email);
  if (pending === null) {
    return;
  }

  const normalizedEmail = pending.email;

  for (const client of runtime.listAgentClients()) {
    if (client.role !== "agent" || client.userId !== undefined) {
      continue;
    }

    const clientEmail = client.email?.trim().toLowerCase();
    // Prefer email match; also reach freshly installed Macs that have no profile email yet.
    if (
      clientEmail !== undefined &&
      clientEmail.length > 0 &&
      clientEmail !== normalizedEmail
    ) {
      continue;
    }

    client.send({
      type: AGENT_WITCH_MESSAGE_TYPES.ACCOUNT_LINK,
      payload: {
        linkToken: pending.linkToken,
        email: pending.email,
        appOrigin: pending.appOrigin,
      },
    });
  }
};
