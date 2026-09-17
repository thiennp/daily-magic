import {
  restartAgentWitchFromWakeServer,
  reviveAgentWitchWebSocketFromWakeServer,
  wakeAgentWitchLaunchAgents,
} from "../public-api/infrastructure";
import { sendJson } from "../../../../server/features/http-server/public-api/infrastructure";
import type { BridgeRequestContext } from "../../../../server/internal/bridgeRequestContext.type";

export const tryHandleProcessControlRoutes = async (
  ctx: BridgeRequestContext,
): Promise<boolean> => {
  if (ctx.request.method === "POST" && ctx.pathname === "/watchdog/revive") {
    const reviveResult = await reviveAgentWitchWebSocketFromWakeServer();
    sendJson(
      ctx.response,
      reviveResult.ok ? 200 : 503,
      reviveResult,
      ctx.cors.headers,
    );
    return true;
  }

  if (ctx.request.method === "POST" && ctx.pathname === "/restart") {
    const restartResult = await restartAgentWitchFromWakeServer();
    sendJson(
      ctx.response,
      restartResult.ok ? 200 : 503,
      restartResult,
      ctx.cors.headers,
    );
    return true;
  }

  if (ctx.request.method === "POST" && ctx.pathname === "/wake") {
    const wakeResult = await wakeAgentWitchLaunchAgents();
    sendJson(
      ctx.response,
      wakeResult.ok ? 200 : 503,
      wakeResult,
      ctx.cors.headers,
    );
    return true;
  }

  return false;
};
