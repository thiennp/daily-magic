import {
  buildAgentWitchWakeHealthResponse,
  buildAgentWitchWakeIdentityResponse,
} from "../public-api/infrastructure";
import { sendJson } from "../../../../server/features/http-server/public-api/infrastructure";
import type { BridgeRequestContext } from "../../../../server/internal/bridgeRequestContext.type";

export const tryHandleHealthIdentityRoutes = (
  ctx: BridgeRequestContext,
): boolean => {
  if (ctx.request.method === "GET" && ctx.pathname === "/health") {
    sendJson(
      ctx.response,
      200,
      buildAgentWitchWakeHealthResponse(),
      ctx.cors.headers,
    );
    return true;
  }

  if (ctx.request.method === "GET" && ctx.pathname === "/identity") {
    sendJson(
      ctx.response,
      200,
      buildAgentWitchWakeIdentityResponse(),
      ctx.cors.headers,
    );
    return true;
  }

  return false;
};
