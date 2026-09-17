import {
  buildAgentWitchWakeLocalLogHtml,
  buildAgentWitchWakeLocalPageHeaders,
  readAgentWitchSelfUpdateLogEntries,
  readAgentWitchWatchdogLogEntries,
} from "../../../../../adapters/legacyScripts";
import type { BridgeRequestContext } from "../../../../server/internal/bridgeRequestContext.type";

export const tryHandleLocalDebugPageRoute = (
  ctx: BridgeRequestContext,
): boolean => {
  if (ctx.request.method !== "GET" || ctx.pathname !== "/local") {
    return false;
  }

  const watchdogLogs = readAgentWitchWatchdogLogEntries(50);
  const updateLogs = readAgentWitchSelfUpdateLogEntries(50);

  ctx.response.writeHead(200, buildAgentWitchWakeLocalPageHeaders());
  ctx.response.end(
    buildAgentWitchWakeLocalLogHtml({
      port: ctx.wakePort,
      watchdogLogs,
      updateLogs,
    }),
  );
  return true;
};
