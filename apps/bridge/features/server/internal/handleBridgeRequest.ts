import type http from "node:http";

import { tryHandleAutomationsProxyRoutes } from "../../awc-proxy/features/automations-proxy/internal/handleAutomationsProxyRoutes";
import { tryHandleHarnessProxyRoutes } from "../../awc-proxy/features/harness-proxy/internal/handleHarnessProxyRoutes";
import { tryHandleProjectsProxyRoute } from "../../awc-proxy/features/projects-proxy/internal/handleProjectsProxyRoute";
import { tryHandleLocalDebugPageRoute } from "../../diagnostics/features/local-debug-page/internal/handleLocalDebugPageRoute";
import { tryHandleHealthIdentityRoutes } from "../../discovery/features/health-identity/internal/handleHealthIdentityRoutes";
import { tryHandleInstallDeleteApiRoute } from "../../operations/features/install-delete-api/internal/handleInstallDeleteApiRoute";
import { tryHandleProcessControlRoutes } from "../../operations/features/process-control/internal/handleProcessControlRoutes";
import { tryHandleSelfUpdateApiRoutes } from "../../operations/features/self-update-api/internal/handleSelfUpdateApiRoutes";
import { tryHandleWatchdogApiRoutes } from "../../operations/features/watchdog-api/internal/handleWatchdogApiRoutes";
import { buildWakeServerCorsHeaders } from "../features/cors-origin/public-api/infrastructure";
import {
  parsePathname,
  readJsonBody,
  rejectOrigin,
  sendJson,
} from "../features/http-server/internal/bridgeHttp.util";
import type { BridgeRequestContext } from "./bridgeRequestContext.type";

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

    if (tryHandleHealthIdentityRoutes(ctx)) {
      return;
    }
    if (tryHandleLocalDebugPageRoute(ctx)) {
      return;
    }
    if (await tryHandleWatchdogApiRoutes(ctx)) {
      return;
    }
    if (await tryHandleProcessControlRoutes(ctx)) {
      return;
    }
    if (await tryHandleSelfUpdateApiRoutes(ctx)) {
      return;
    }
    if (await tryHandleInstallDeleteApiRoute(ctx)) {
      return;
    }
    if (await tryHandleHarnessProxyRoutes(ctx)) {
      return;
    }
    if (await tryHandleProjectsProxyRoute(ctx)) {
      return;
    }
    if (await tryHandleAutomationsProxyRoutes(ctx)) {
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
