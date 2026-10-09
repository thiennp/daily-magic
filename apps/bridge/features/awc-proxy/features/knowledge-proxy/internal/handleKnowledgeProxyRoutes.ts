import { sendJson } from "../../../../server/features/http-server/public-api/infrastructure";
import type { BridgeRequestContext } from "../../../../server/internal/bridgeRequestContext.type";
import { updateProjectKnowledgeFromWakeServer } from "./updateProjectKnowledgeFromWakeServer";

export const tryHandleKnowledgeProxyRoutes = async (
  ctx: BridgeRequestContext,
): Promise<boolean> => {
  if (ctx.request.method !== "POST" || ctx.pathname !== "/knowledge/update") {
    return false;
  }

  const body = await ctx.readJsonBody();
  const result = await updateProjectKnowledgeFromWakeServer(body);
  const status = result.ok
    ? 200
    : result.httpStatus !== undefined
      ? result.httpStatus
      : 400;
  sendJson(ctx.response, status, result, ctx.cors.headers);
  return true;
};
