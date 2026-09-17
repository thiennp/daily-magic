import type http from "node:http";

import { buildWakeServerCorsHeaders } from "../features/cors-origin/public-api/infrastructure";
import {
  parsePathname,
  readJsonBody,
  rejectOrigin,
  sendJson,
} from "../features/http-server/public-api/infrastructure";
import type { BridgeRequestContext } from "./bridgeRequestContext.type";
import { dispatchBridgeRoute } from "./dispatchBridgeRoute";

const buildContext = (
  request: http.IncomingMessage,
  response: http.ServerResponse,
  wakePort: number,
  cors: BridgeRequestContext["cors"],
): BridgeRequestContext => ({
  request,
  response,
  wakePort,
  cors,
  pathname: parsePathname(request),
  readJsonBody: () => readJsonBody(request),
});

export const handleBridgeRequest = async (
  request: http.IncomingMessage,
  response: http.ServerResponse,
  wakePort: number,
): Promise<void> => {
  const requestOrigin = request.headers.origin;
  const cors = buildWakeServerCorsHeaders(requestOrigin);

  try {
    if (
      requestOrigin !== undefined &&
      requestOrigin.length > 0 &&
      !cors.allowed
    ) {
      rejectOrigin(response);
      return;
    }

    if (request.method === "OPTIONS") {
      response.writeHead(204, cors.headers);
      response.end();
      return;
    }

    const ctx = buildContext(request, response, wakePort, cors);

    if (await dispatchBridgeRoute(ctx)) {
      return;
    }

    sendJson(
      response,
      404,
      { ok: false, errorMessage: "Not found." },
      cors.headers,
    );
  } catch {
    sendJson(
      response,
      500,
      { ok: false, errorMessage: "Wake server error." },
      cors.headers,
    );
  }
};
