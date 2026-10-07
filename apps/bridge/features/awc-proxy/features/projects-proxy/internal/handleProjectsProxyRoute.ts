import { ensureAgentWitchProjectFolderFromWakeServer } from "../public-api/infrastructure";
import {
  describeAgentWitchProjectFoldersFromWakeServer,
  linkAgentWitchProjectFolderFromWakeServer,
} from "./linkAgentWitchProjectFolderFromWakeServer";
import { selectAgentWitchProjectFolderFromWakeServer } from "./selectAgentWitchProjectFolderFromWakeServer";
import { sendJson } from "../../../../server/features/http-server/public-api/infrastructure";
import type { BridgeRequestContext } from "../../../../server/internal/bridgeRequestContext.type";

export const tryHandleProjectsProxyRoute = async (
  ctx: BridgeRequestContext,
): Promise<boolean> => {
  if (ctx.request.method === "GET" && ctx.pathname === "/projects/folders") {
    sendJson(
      ctx.response,
      200,
      { ok: true, ...describeAgentWitchProjectFoldersFromWakeServer() },
      ctx.cors.headers,
    );
    return true;
  }

  if (ctx.request.method !== "POST") {
    return false;
  }

  if (ctx.pathname === "/projects/ensure") {
    const body = await ctx.readJsonBody();
    const ensureResult = ensureAgentWitchProjectFolderFromWakeServer(body);
    sendJson(
      ctx.response,
      ensureResult.ok ? 200 : 400,
      ensureResult,
      ctx.cors.headers,
    );
    return true;
  }

  if (ctx.pathname === "/projects/link-folder") {
    const body = await ctx.readJsonBody();
    const linkResult = await linkAgentWitchProjectFolderFromWakeServer(body);
    sendJson(
      ctx.response,
      linkResult.ok ? 200 : linkResult.httpStatus,
      linkResult.ok
        ? linkResult
        : {
            ok: false,
            error: linkResult.code,
            errorMessage: linkResult.message,
          },
      ctx.cors.headers,
    );
    return true;
  }

  if (ctx.pathname === "/projects/select-folder") {
    const body = await ctx.readJsonBody();
    const selectResult =
      await selectAgentWitchProjectFolderFromWakeServer(body);
    const status =
      selectResult.ok || ("cancelled" in selectResult && selectResult.cancelled)
        ? 200
        : 400;
    sendJson(ctx.response, status, selectResult, ctx.cors.headers);
    return true;
  }

  return false;
};
