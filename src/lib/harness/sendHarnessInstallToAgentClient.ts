import buildHarnessCreateSetPrompt from "@/lib/agentWitch/harness/buildHarnessCreateSetPrompt";
import buildHarnessWriteItemsPrompt from "@/lib/agentWitch/harness/buildHarnessWriteItemsPrompt";
import type HarnessItemWriteSpec from "@/lib/agentWitch/harness/types/HarnessItemWriteSpec.type";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

interface HarnessInstallSetInput {
  readonly name: string;
  readonly slug: string;
  readonly items: readonly HarnessItemWriteSpec[];
}

export const buildHarnessInstallDispatchMessages = (
  harness: HarnessInstallSetInput,
): readonly AgentWitchMessage[] => {
  const createSpec = {
    mode: "create-set" as const,
    name: harness.name,
    slug: harness.slug,
  };

  const messages: AgentWitchMessage[] = [
    {
      type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
      payload: {
        writerAgent: "claude-cli",
        spec: createSpec,
        instruction: buildHarnessCreateSetPrompt(createSpec),
      },
    },
  ];

  if (harness.items.length > 0) {
    messages.push({
      type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
      payload: {
        writerAgent: "claude-cli",
        spec: {
          mode: "write-items",
          items: harness.items,
        },
        instruction: buildHarnessWriteItemsPrompt(harness.items),
      },
    });
  }

  return messages;
};

export const sendHarnessInstallToAgentClient = (
  agentClient: AgentWitchHubClient,
  harness: HarnessInstallSetInput,
): void => {
  buildHarnessInstallDispatchMessages(harness).forEach((message) => {
    agentClient.send(message);
  });
};

export const sendHarnessWriteItemsToAgentClient = (
  agentClient: AgentWitchHubClient,
  items: readonly HarnessItemWriteSpec[],
): void => {
  if (items.length === 0) {
    return;
  }

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
    payload: {
      writerAgent: "claude-cli",
      spec: {
        mode: "write-items",
        items,
      },
      instruction: buildHarnessWriteItemsPrompt(items),
    },
  });
};
