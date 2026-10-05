import type http from "node:http";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import { handleMcpJsonRpcRequest } from "@agent-witch/shared/mcp";

import type { McpServerDefinition } from "../../public-api/types";
import { createAwlMcpServer } from "./createAwlMcpServer";

export interface AwlMcpHttpRouteInput {
  readonly method: string;
  readonly pathname: string;
  readonly request: http.IncomingMessage;
  readonly response: http.ServerResponse;
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly readBody: (request: http.IncomingMessage) => Promise<string>;
  readonly sendJson: (
    response: http.ServerResponse,
    statusCode: number,
    payload: unknown,
  ) => void;
  readonly isDeclined?: (cwd: string) => boolean;
  /**
   * Prebuilt server (built once at app start). When omitted, one is built
   * per request from `layout` + `isDeclined`.
   */
  readonly server?: McpServerDefinition;
}

const MCP_PATH = "/mcp";

/** HTTP transport (`POST /mcp`) over the shared JSON-RPC core. */
export const tryHandleAwlMcpHttpRequest = async (
  input: AwlMcpHttpRouteInput,
): Promise<boolean> => {
  if (input.pathname !== MCP_PATH) {
    return false;
  }
  if (input.method !== "POST") {
    input.response.writeHead(405);
    input.response.end();
    return true;
  }

  let body: unknown = null;
  try {
    const raw = await input.readBody(input.request);
    body = raw.length > 0 ? JSON.parse(raw) : {};
  } catch {
    body = null;
  }

  const server =
    input.server ??
    createAwlMcpServer({ layout: input.layout, isDeclined: input.isDeclined });
  input.sendJson(
    input.response,
    200,
    await handleMcpJsonRpcRequest(body, server, undefined),
  );
  return true;
};
