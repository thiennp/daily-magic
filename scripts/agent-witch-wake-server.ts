import http from "node:http";

import {
  buildAgentWitchWakeHealthResponse,
  buildAgentWitchWakeIdentityResponse,
  linkAgentWitchAccountFromWakeServer,
  readAgentWitchWatchdogLogEntries,
  reviveAgentWitchWebSocketFromWakeServer,
  buildAgentWitchWatchdogStatus,
  wakeAgentWitchLaunchAgents,
} from "./agentWitchWakeHandlers";
import { buildWakeServerCorsHeaders } from "./agentWitchWakeAllowedOrigins";
import { resolveAgentWitchWakePort } from "./agentWitchWakeConstants";

const sendJson = (
  response: http.ServerResponse,
  statusCode: number,
  payload: unknown,
  corsHeaders: Record<string, string>,
): void => {
  response.writeHead(statusCode, corsHeaders);
  response.end(JSON.stringify(payload));
};

const rejectOrigin = (response: http.ServerResponse): void => {
  response.writeHead(403);
  response.end();
};

const handleWakeRequest = async (
  request: http.IncomingMessage,
  response: http.ServerResponse,
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

    const pathname = request.url?.split("?")[0] ?? "/";

    if (request.method === "GET" && pathname === "/health") {
      sendJson(
        response,
        200,
        buildAgentWitchWakeHealthResponse(),
        cors.headers,
      );
      return;
    }

    if (request.method === "GET" && pathname === "/identity") {
      sendJson(
        response,
        200,
        buildAgentWitchWakeIdentityResponse(),
        cors.headers,
      );
      return;
    }

    if (request.method === "GET" && pathname === "/watchdog/status") {
      const status = await buildAgentWitchWatchdogStatus();
      sendJson(response, 200, status, cors.headers);
      return;
    }

    if (request.method === "GET" && pathname === "/watchdog/logs") {
      const requestUrl = new URL(
        request.url ?? "/watchdog/logs",
        "http://127.0.0.1",
      );
      const limit = Number.parseInt(
        requestUrl.searchParams.get("limit") ?? "20",
        10,
      );
      const safeLimit =
        Number.isFinite(limit) && limit > 0 ? Math.min(limit, 200) : 20;

      sendJson(
        response,
        200,
        {
          ok: true,
          logs: readAgentWitchWatchdogLogEntries(safeLimit),
        },
        cors.headers,
      );
      return;
    }

    if (request.method === "POST" && pathname === "/watchdog/revive") {
      const reviveResult = await reviveAgentWitchWebSocketFromWakeServer();
      sendJson(
        response,
        reviveResult.ok ? 200 : 503,
        reviveResult,
        cors.headers,
      );
      return;
    }

    if (request.method === "POST" && pathname === "/wake") {
      const wakeResult = await wakeAgentWitchLaunchAgents();
      sendJson(response, wakeResult.ok ? 200 : 503, wakeResult, cors.headers);
      return;
    }

    if (request.method === "POST" && pathname === "/link-account") {
      const chunks: Buffer[] = [];
      for await (const chunk of request) {
        chunks.push(Buffer.from(chunk));
      }

      let body: unknown = {};
      try {
        body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      } catch {
        sendJson(
          response,
          400,
          {
            ok: false,
            errorMessage: "Invalid JSON body.",
          },
          cors.headers,
        );
        return;
      }

      const linkResult = await linkAgentWitchAccountFromWakeServer(body);
      sendJson(response, linkResult.ok ? 200 : 400, linkResult, cors.headers);
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

export const startAgentWitchWakeServer = (): http.Server => {
  const port = resolveAgentWitchWakePort();
  const server = http.createServer((request, response) => {
    void handleWakeRequest(request, response);
  });

  server.listen(port, "127.0.0.1", () => {
    process.stdout.write(
      `Agent Witch wake server listening on http://127.0.0.1:${port}\n`,
    );
  });

  return server;
};

startAgentWitchWakeServer();
