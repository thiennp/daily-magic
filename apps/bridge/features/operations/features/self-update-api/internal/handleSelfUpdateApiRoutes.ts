import { parseAgentWitchSelfUpdateRunBody } from "../../../../../adapters/legacyScripts";
import {
  buildAgentWitchSelfUpdateStatusFromWakeServer,
  readAgentWitchSelfUpdateLogEntries,
  runAgentWitchSelfUpdateFromWakeServer,
} from "../public-api/infrastructure";
import {
  parseQueryLimit,
  sendJson,
} from "../../../../server/features/http-server/public-api/infrastructure";
import type { BridgeRequestContext } from "../../../../server/internal/bridgeRequestContext.type";

export const tryHandleSelfUpdateApiRoutes = async (
  ctx: BridgeRequestContext,
): Promise<boolean> => {
  if (ctx.request.method === "GET" && ctx.pathname === "/update/status") {
    const status = buildAgentWitchSelfUpdateStatusFromWakeServer();
    sendJson(
      ctx.response,
      200,
      {
        ok: true,
        ...status,
      },
      ctx.cors.headers,
    );
    return true;
  }

  if (ctx.request.method === "GET" && ctx.pathname === "/update/logs") {
    const safeLimit = parseQueryLimit(ctx.request, "/update/logs", 20, 200);
    sendJson(
      ctx.response,
      200,
      {
        ok: true,
        logs: readAgentWitchSelfUpdateLogEntries(safeLimit),
      },
      ctx.cors.headers,
    );
    return true;
  }

  if (ctx.request.method === "POST" && ctx.pathname === "/update/run") {
    const body = await ctx.readJsonBody();
    const { force } = parseAgentWitchSelfUpdateRunBody(body);
    const updateResult = await runAgentWitchSelfUpdateFromWakeServer({
      force,
    });
    sendJson(
      ctx.response,
      updateResult.ok ? 200 : 503,
      updateResult,
      ctx.cors.headers,
    );
    return true;
  }

  return false;
};
