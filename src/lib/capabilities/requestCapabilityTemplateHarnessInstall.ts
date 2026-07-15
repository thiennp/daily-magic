import buildHarnessCreateSetPrompt from "@/lib/agentWitch/harness/buildHarnessCreateSetPrompt";
import buildHarnessWriteItemsPrompt from "@/lib/agentWitch/harness/buildHarnessWriteItemsPrompt";
import type HarnessItemWriteSpec from "@/lib/agentWitch/harness/types/HarnessItemWriteSpec.type";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { CapabilityTemplateHarness } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export interface TemplateHarnessInstallResult {
  readonly installed: boolean;
  readonly errorMessage: string | null;
}

const requestCapabilityTemplateHarnessInstall = (
  userId: string,
  harness: CapabilityTemplateHarness,
): TemplateHarnessInstallResult => {
  const hub = getAgentWitchHub();
  const agentClient = hub.findAgentClientForUser(userId);

  if (agentClient === undefined) {
    return {
      installed: false,
      errorMessage:
        "Mac offline. Open Agent with Agent Witch running to install the rules bundle.",
    };
  }

  const createSpec = {
    mode: "create-set" as const,
    name: harness.name,
    slug: harness.slug,
  };

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
    payload: {
      writerAgent: "claude-cli",
      spec: createSpec,
      instruction: buildHarnessCreateSetPrompt(createSpec),
    },
  });

  const items: readonly HarnessItemWriteSpec[] = harness.items.map((item) => ({
    id: item.id,
    kind: item.kind,
    title: item.title,
    content: item.content,
    setSlugs: [harness.slug],
  }));

  if (items.length > 0) {
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
  }

  return {
    installed: true,
    errorMessage: null,
  };
};

export default requestCapabilityTemplateHarnessInstall;
