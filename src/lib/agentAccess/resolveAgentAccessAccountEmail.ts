import { randomBytes } from "node:crypto";

import { buildSyntheticAgentEmail } from "@/lib/agentAccess/buildSyntheticAgentEmail";
import {
  AgentMailUnavailableError,
  createAgentMailInboxWithFetch,
  type AgentMailInboxClient,
} from "@/lib/agentAccess/createAgentMailInbox";
import type { AgentAccessRegisterBody } from "@/lib/agentAccess/parseAgentAccessRegisterBody";

export const buildDefaultAgentMailClient = (): AgentMailInboxClient => ({
  createInbox: async (input) => {
    const apiKey = process.env.AGENTMAIL_API_KEY?.trim() ?? "";

    if (apiKey.length === 0) {
      throw new AgentMailUnavailableError(
        "Agent Mail is not configured on this server. Register with method none.",
      );
    }

    return createAgentMailInboxWithFetch({
      ...input,
      apiKey,
    });
  },
});

export const resolveAgentAccessAccountEmail = async (
  body: AgentAccessRegisterBody,
  client: AgentMailInboxClient,
): Promise<string | AgentMailUnavailableError> => {
  if (body.method === "none") {
    return buildSyntheticAgentEmail();
  }

  const username = `aw${randomBytes(6).toString("hex")}`;

  return client
    .createInbox({
      username,
      displayName: body.displayName ?? "Agent Witch",
    })
    .then((inbox) => inbox.email)
    .catch((error: unknown) =>
      error instanceof AgentMailUnavailableError
        ? error
        : new AgentMailUnavailableError(
            "Agent Mail could not create an inbox. Register with method none.",
          ),
    );
};
