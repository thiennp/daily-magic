import { ensureAgentWitchProjectFolderFromWakeServer } from "../public-api/infrastructure";
import { sendJson } from "../../../../server/features/http-server/internal/bridgeHttp.util";
import type { BridgeRequestContext } from "../../../../server/internal/bridgeRequestContext.type";

export const tryHandleProjectsProxyRoute = async (
  ctx: BridgeRequestContext,
): Promise<boolean> => {
  if (ctx.request.method !== "POST" || ctx.pathname !== "/projects/ensure") {
    return false;
  }

  const body = await ctx.readJsonBody();
  const ensureResult = ensureAgentWitchProjectFolderFromWakeServer(body);
  sendJson(
    ctx.response,
    ensureResult.ok ? 200 : 400,
    ensureResult,
    ctx.cors.headers,
  );
  return true;
};
