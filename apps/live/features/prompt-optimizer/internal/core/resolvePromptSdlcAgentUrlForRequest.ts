import type http from "node:http";

import { PROMPT_SDLC_AGENT_PATH } from "../../../../adapters/promptSdlcAwcCore";

/**
 * DF-033: the agent URL AWL is actually serving on (H6 per-account port), from
 * the socket that took this request. Undefined when the port is unknown, so
 * callers fall back to the `<localAppPort>` template.
 */
export const resolvePromptSdlcAgentUrlForRequest = (
  request: Pick<http.IncomingMessage, "socket"> | undefined,
): string | undefined => {
  const port = request?.socket?.localPort;
  return typeof port === "number" && Number.isInteger(port) && port > 0
    ? `http://127.0.0.1:${port}${PROMPT_SDLC_AGENT_PATH}`
    : undefined;
};
