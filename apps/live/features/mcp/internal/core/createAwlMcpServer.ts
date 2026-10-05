import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import {
  AWL_CHECK_CONTEXT_TOOL,
  createCheckContextRunner,
} from "@agent-witch/live-token-saver";

import type { McpServerDefinition } from "../../public-api/types";
import {
  AWL_MCP_PROTOCOL_VERSION,
  AWL_MCP_SERVER_INFO,
} from "./awlMcpServer.constant";

export interface CreateAwlMcpServerInput {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly isDeclined?: (cwd: string) => boolean;
}

/** AWL local MCP server: tool list composed from feature-owned handlers. */
export const createAwlMcpServer = (
  input: CreateAwlMcpServerInput,
): McpServerDefinition => ({
  serverInfo: AWL_MCP_SERVER_INFO,
  protocolVersion: AWL_MCP_PROTOCOL_VERSION,
  tools: [
    {
      definition: AWL_CHECK_CONTEXT_TOOL,
      call: createCheckContextRunner({
        layout: input.layout,
        isDeclined: input.isDeclined,
      }),
    },
  ],
});
