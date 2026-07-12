import http from "node:http";

import {
  buildAgentWitchWakeHealthResponse,
  buildAgentWitchWakeIdentityResponse,
  wakeAgentWitchLaunchAgents,
} from "./agentWitchWakeHandlers";
import { resolveAgentWitchWakePort } from "./agentWitchWakeConstants";

const WAKE_SERVER_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json; charset=utf-8",
} as const;

const sendJson = (
  response: http.ServerResponse,
  statusCode: number,
  payload: unknown,
): void => {
  response.writeHead(statusCode, WAKE_SERVER_CORS_HEADERS);
  response.end(JSON.stringify(payload));
};

const handleWakeRequest = async (
  request: http.IncomingMessage,
  response: http.ServerResponse,
): Promise<void> => {
  if (request.method === "OPTIONS") {
    response.writeHead(204, WAKE_SERVER_CORS_HEADERS);
    response.end();
    return;
  }

  const pathname = request.url?.split("?")[0] ?? "/";

  if (request.method === "GET" && pathname === "/health") {
    sendJson(response, 200, buildAgentWitchWakeHealthResponse());
    return;
  }

  if (request.method === "GET" && pathname === "/identity") {
    sendJson(response, 200, buildAgentWitchWakeIdentityResponse());
    return;
  }

  if (request.method === "POST" && pathname === "/wake") {
    const wakeResult = await wakeAgentWitchLaunchAgents();
    sendJson(response, wakeResult.ok ? 200 : 503, wakeResult);
    return;
  }

  sendJson(response, 404, { ok: false, errorMessage: "Not found." });
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
