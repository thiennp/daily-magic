import {
  buildAgentWitchWatchdogStatus,
  readAgentWitchWatchdogLogEntries,
} from "../../../../../adapters/legacyScripts";
import {
  parseQueryLimit,
  sendJson,
} from "../../../../server/features/http-server/internal/bridgeHttp.util";
import type { BridgeRequestContext } from "../../../../server/internal/bridgeRequestContext.type";

export const tryHandleWatchdogApiRoutes = async (
  ctx: BridgeRequestContext,
): Promise<boolean> => {
  if (ctx.request.method === "GET" && ctx.pathname === "/watchdog/status") {
    const status = await buildAgentWitchWatchdogStatus();
    sendJson(ctx.response, 200, status, ctx.cors.headers);
    return true;
  }

  if (ctx.request.method === "GET" && ctx.pathname === "/watchdog/logs") {
    const safeLimit = parseQueryLimit(ctx.request, "/watchdog/logs", 20, 200);
    sendJson(
      ctx.response,
      200,
      {
        ok: true,
        logs: readAgentWitchWatchdogLogEntries(safeLimit),
      },
      ctx.cors.headers,
    );
    return true;
  }

  return false;
};
