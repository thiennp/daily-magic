import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import {
  AWL_CHECK_CONTEXT_TOOL,
  createCheckContextRunner,
} from "@agent-witch/live-token-saver";
import {
  AGENT_WITCH_MCP_SERVER_INFO,
  toMcpTextResult,
} from "@agent-witch/shared/mcp";

import type { McpServerDefinition } from "../../public-api/types";
import { AWL_MCP_INSTRUCTIONS } from "./awlMcpInstructions.constant";

export interface CreateAwlMcpServerInput {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly isDeclined?: (cwd: string) => boolean;
  /** Tool failures (stderr by default); the JSON-RPC reply stays generic. */
  readonly logToolError?: (toolName: string, error: unknown) => void;
}

const logToolErrorToStderr = (toolName: string, error: unknown): void => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`[agent-witch] mcp tool ${toolName} failed: ${message}\n`);
};

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
    instructions: AWL_MCP_INSTRUCTIONS,
    tools: [
      {
        definition: AWL_CHECK_CONTEXT_TOOL,
        call: (args) => toMcpTextResult(JSON.stringify(runCheckContext(args))),
      },
    ],
    onToolError: input.logToolError ?? logToolErrorToStderr,
  };
};
