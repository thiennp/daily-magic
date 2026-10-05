import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import {
  AWL_CHECK_CONTEXT_TOOL,
  createCheckContextRunner,
} from "@agent-witch/live-token-saver";
import { AGENT_WITCH_MCP_SERVER_INFO } from "@agent-witch/shared/mcp";

import type { McpServerDefinition } from "../../public-api/types";

export interface CreateAwlMcpServerInput {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly isDeclined?: (cwd: string) => boolean;
}

/** AWL local MCP server: tool list composed from feature-owned handlers. */
export const createAwlMcpServer = (
  input: CreateAwlMcpServerInput,
): McpServerDefinition => {
  const runCheckContext = createCheckContextRunner({
    layout: input.layout,
    isDeclined: input.isDeclined,
  });
  return {
    serverInfo: AGENT_WITCH_MCP_SERVER_INFO,
    tools: [
      {
        definition: AWL_CHECK_CONTEXT_TOOL,
        call: (args) => ({
          content: [
            { type: "text", text: JSON.stringify(runCheckContext(args)) },
          ],
          isError: false,
        }),
      },
    ],
  };
};
