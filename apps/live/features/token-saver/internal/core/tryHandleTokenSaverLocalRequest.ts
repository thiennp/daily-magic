import type http from "node:http";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { createCheckContextRunner } from "./createCheckContextRunner";
import { handleAwlMcpRequest } from "./handleAwlMcpRequest";
import { parseCheckContextArgs } from "./parseCheckContextArgs";

export interface TokenSaverLocalRouteInput {
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
}

const CHECK_CONTEXT_PATH = "/api/local/check-context";
const MCP_PATH = "/mcp";

/** HTTP surface for check_context + local MCP JSON-RPC. */
export const tryHandleTokenSaverLocalRequest = async (
  input: TokenSaverLocalRouteInput,
): Promise<boolean> => {
  if (input.pathname !== CHECK_CONTEXT_PATH && input.pathname !== MCP_PATH) {
    return false;
  }
  if (input.method !== "POST") {
    input.response.writeHead(405);
    input.response.end();
    return true;
  }

  const runCheckContext = createCheckContextRunner({
    layout: input.layout,
    isDeclined: input.isDeclined,
  });

  let body: unknown = {};
  try {
    const raw = await input.readBody(input.request);
    body = raw.length > 0 ? JSON.parse(raw) : {};
  } catch {
    input.sendJson(input.response, 400, { status: "none" });
    return true;
  }

  if (input.pathname === CHECK_CONTEXT_PATH) {
    input.sendJson(
      input.response,
      200,
      runCheckContext(parseCheckContextArgs(body)),
    );
    return true;
  }

  input.sendJson(input.response, 200, handleAwlMcpRequest(body, { runCheckContext }));
  return true;
};
