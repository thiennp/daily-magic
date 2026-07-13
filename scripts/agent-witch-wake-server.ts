import http from "node:http";

import {
  buildAgentWitchWakeHealthResponse,
  buildAgentWitchWakeIdentityResponse,
  linkAgentWitchAccountFromWakeServer,
  wakeAgentWitchLaunchAgents,
} from "./agentWitchWakeHandlers";
import { resolveAgentWitchWakePort } from "./agentWitchWakeConstants";

const WAKE_SERVER_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Private-Network": "true",
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

  if (request.method === "POST" && pathname === "/link-account") {
    const chunks: Buffer[] = [];
    for await (const chunk of request) {
      chunks.push(Buffer.from(chunk));
    }

    let body: unknown = {};
    try {
      body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      sendJson(response, 400, {
        ok: false,
        errorMessage: "Invalid JSON body.",
      });
      return;
    }

    const linkResult = await linkAgentWitchAccountFromWakeServer(body);
    sendJson(response, linkResult.ok ? 200 : 400, linkResult);
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
