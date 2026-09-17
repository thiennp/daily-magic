import { runAgentWitchUninstallLocalFromWakeServer } from "../public-api/infrastructure";
import { sendJson } from "../../../../server/features/http-server/public-api/infrastructure";
import type { BridgeRequestContext } from "../../../../server/internal/bridgeRequestContext.type";

export const tryHandleInstallDeleteApiRoute = async (
  ctx: BridgeRequestContext,
): Promise<boolean> => {
  if (ctx.request.method !== "POST" || ctx.pathname !== "/install/delete") {
    return false;
  }

  const uninstallResult = await runAgentWitchUninstallLocalFromWakeServer();
  sendJson(
    ctx.response,
    uninstallResult.ok ? 200 : 503,
    uninstallResult,
    ctx.cors.headers,
  );
  return true;
};
