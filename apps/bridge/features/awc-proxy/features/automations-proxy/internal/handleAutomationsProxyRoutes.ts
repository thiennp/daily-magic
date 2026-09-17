import {
  buildAgentWitchAutomationStatusFromWakeServer,
  runAutomationFromWakeServer,
  syncAutomationsFromWakeServer,
} from "../../../../../adapters/legacyScripts";
import { sendJson } from "../../../../server/features/http-server/internal/bridgeHttp.util";
import type { BridgeRequestContext } from "../../../../server/internal/bridgeRequestContext.type";

const readAutomationBody = async (
  ctx: BridgeRequestContext,
): Promise<unknown | null> => {
  const chunks: Buffer[] = [];
  for await (const chunk of ctx.request) {
    chunks.push(Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return {};
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } catch {
    sendJson(
      ctx.response,
      400,
      {
        ok: false,
        errorMessage: "Invalid JSON body.",
      },
      ctx.cors.headers,
    );
    return null;
  }
};

export const tryHandleAutomationsProxyRoutes = async (
  ctx: BridgeRequestContext,
): Promise<boolean> => {
  if (ctx.request.method === "GET" && ctx.pathname === "/automations/status") {
    sendJson(
      ctx.response,
      200,
      buildAgentWitchAutomationStatusFromWakeServer(),
      ctx.cors.headers,
    );
    return true;
  }

  if (
    ctx.request.method === "POST" &&
    (ctx.pathname === "/automations/sync" ||
      ctx.pathname === "/automations/run")
  ) {
    const body = await readAutomationBody(ctx);
    if (body === null) {
      return true;
    }

    if (ctx.pathname === "/automations/sync") {
      const syncResult = syncAutomationsFromWakeServer(body);
      sendJson(
        ctx.response,
        syncResult.ok ? 200 : 400,
        syncResult,
        ctx.cors.headers,
      );
      return true;
    }

    const runResult = await runAutomationFromWakeServer(body);
    sendJson(
      ctx.response,
      runResult.ok ? 200 : 503,
      runResult,
      ctx.cors.headers,
    );
    return true;
  }

  return false;
};
