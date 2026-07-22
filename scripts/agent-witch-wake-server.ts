import http from "node:http";

import {
  buildAgentWitchWakeHealthResponse,
  buildAgentWitchWakeIdentityResponse,
  buildAgentWitchAutomationStatusFromWakeServer,
  buildAgentWitchSelfUpdateStatusFromWakeServer,
  installHarnessFromWakeServer,
  readAgentWitchSelfUpdateLogEntries,
  readAgentWitchWatchdogLogEntries,
  reviveAgentWitchWebSocketFromWakeServer,
  restartAgentWitchFromWakeServer,
  buildAgentWitchWatchdogStatus,
  runAgentWitchSelfUpdateFromWakeServer,
  runAgentWitchUninstallLocalFromWakeServer,
  runAutomationFromWakeServer,
  syncAutomationsFromWakeServer,
  wakeAgentWitchLaunchAgents,
} from "./agentWitchWakeHandlers";
import { buildWakeServerCorsHeaders } from "./agentWitchWakeAllowedOrigins";
import {
  buildAgentWitchWakeLocalLogHtml,
  buildAgentWitchWakeLocalPageHeaders,
} from "./buildAgentWitchWakeLocalLogHtml";
import { resolveAgentWitchWakeListenPort } from "./resolveAgentWitchWakeListenPort";
import { parseAgentWitchSelfUpdateRunBody } from "./parseAgentWitchSelfUpdateRunBody";
import {
  exitUnlessActiveMacOsConsoleUser,
  startActiveMacOsConsoleUserGuard,
} from "./guardMacOsConsoleUser";
import { ensureAgentWitchProjectFolderFromWakeServer } from "./ensureAgentWitchProjectFolderFromWakeServer";
import { isAgentWitchScriptEntryPoint } from "./isAgentWitchScriptEntryPoint";

const readJsonBody = async (
  request: http.IncomingMessage,
): Promise<unknown> => {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return {};
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } catch {
    return {};
  }
};

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

    if (request.method === "GET" && pathname === "/local") {
      const watchdogLogs = readAgentWitchWatchdogLogEntries(50);
      const updateLogs = readAgentWitchSelfUpdateLogEntries(50);

      response.writeHead(200, buildAgentWitchWakeLocalPageHeaders());
      response.end(
        buildAgentWitchWakeLocalLogHtml({
          port: wakePort,
          watchdogLogs,
          updateLogs,
        }),
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

    if (request.method === "POST" && pathname === "/restart") {
      const restartResult = await restartAgentWitchFromWakeServer();
      sendJson(
        response,
        restartResult.ok ? 200 : 503,
        restartResult,
        cors.headers,
      );
      return;
    }

    if (request.method === "GET" && pathname === "/update/status") {
      const status = buildAgentWitchSelfUpdateStatusFromWakeServer();
      sendJson(
        response,
        200,
        {
          ok: true,
          ...status,
        },
        cors.headers,
      );
      return;
    }

    if (request.method === "GET" && pathname === "/update/logs") {
      const requestUrl = new URL(
        request.url ?? "/update/logs",
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
          logs: readAgentWitchSelfUpdateLogEntries(safeLimit),
        },
        cors.headers,
      );
      return;
    }

    if (request.method === "POST" && pathname === "/update/run") {
      const body = await readJsonBody(request);
      const { force } = parseAgentWitchSelfUpdateRunBody(body);
      const updateResult = await runAgentWitchSelfUpdateFromWakeServer({
        force,
      });
      sendJson(
        response,
        updateResult.ok ? 200 : 503,
        updateResult,
        cors.headers,
      );
      return;
    }

    if (request.method === "POST" && pathname === "/install/delete") {
      const uninstallResult = await runAgentWitchUninstallLocalFromWakeServer();
      sendJson(
        response,
        uninstallResult.ok ? 200 : 503,
        uninstallResult,
        cors.headers,
      );
      return;
    }

    if (request.method === "POST" && pathname === "/wake") {
      const wakeResult = await wakeAgentWitchLaunchAgents();
      sendJson(response, wakeResult.ok ? 200 : 503, wakeResult, cors.headers);
      return;
    }

    if (request.method === "POST" && pathname === "/harness/install") {
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

      const installResult = installHarnessFromWakeServer(body);
      sendJson(
        response,
        installResult.ok ? 200 : 400,
        installResult,
        cors.headers,
      );
      return;
    }

    if (request.method === "POST" && pathname === "/projects/ensure") {
      const body = await readJsonBody(request);
      const ensureResult = ensureAgentWitchProjectFolderFromWakeServer(body);
      sendJson(
        response,
        ensureResult.ok ? 200 : 400,
        ensureResult,
        cors.headers,
      );
      return;
    }

    if (request.method === "POST" && pathname === "/harness/borrow") {
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

      const installResult = installHarnessFromWakeServer(body);
      sendJson(
        response,
        installResult.ok ? 200 : 400,
        installResult,
        cors.headers,
      );
      return;
    }

    if (request.method === "GET" && pathname === "/automations/status") {
      sendJson(
        response,
        200,
        buildAgentWitchAutomationStatusFromWakeServer(),
        cors.headers,
      );
      return;
    }

    if (request.method === "POST" && pathname === "/automations/sync") {
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

      const syncResult = syncAutomationsFromWakeServer(body);
      sendJson(response, syncResult.ok ? 200 : 400, syncResult, cors.headers);
      return;
    }

    if (request.method === "POST" && pathname === "/automations/run") {
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

      const runResult = await runAutomationFromWakeServer(body);
      sendJson(response, runResult.ok ? 200 : 503, runResult, cors.headers);
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

export const startAgentWitchWakeServer = async (): Promise<http.Server> => {
  const port = await resolveAgentWitchWakeListenPort();
  const server = http.createServer((request, response) => {
    void handleWakeRequest(request, response, port);
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => {
      resolve();
    });
  });

  process.stdout.write(
    `Agent Witch wake server listening on http://127.0.0.1:${port}\n`,
  );

  return server;
};

if (isAgentWitchScriptEntryPoint(import.meta.url)) {
  void (async () => {
    exitUnlessActiveMacOsConsoleUser("agent-witch-wake-server");

    const server = await startAgentWitchWakeServer();

    const stopConsoleUserGuard = startActiveMacOsConsoleUserGuard(() => {
      process.stdout.write(
        "[agent-witch-wake-server] Active macOS console user changed — shutting down.\n",
      );
      server.close(() => {
        process.exit(0);
      });
    });

    const shutdown = (): void => {
      stopConsoleUserGuard();
      server.close(() => {
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  })();
}
