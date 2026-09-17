import { tryHandleAutomationsProxyRoutes } from "../../awc-proxy/features/automations-proxy/internal/handleAutomationsProxyRoutes";
import { tryHandleHarnessProxyRoutes } from "../../awc-proxy/features/harness-proxy/internal/handleHarnessProxyRoutes";
import { tryHandleProjectsProxyRoute } from "../../awc-proxy/features/projects-proxy/internal/handleProjectsProxyRoute";
import { tryHandleLocalDebugPageRoute } from "../../diagnostics/features/local-debug-page/internal/handleLocalDebugPageRoute";
import { tryHandleHealthIdentityRoutes } from "../../discovery/features/health-identity/internal/handleHealthIdentityRoutes";
import { tryHandleInstallDeleteApiRoute } from "../../operations/features/install-delete-api/internal/handleInstallDeleteApiRoute";
import { tryHandleProcessControlRoutes } from "../../operations/features/process-control/internal/handleProcessControlRoutes";
import { tryHandleSelfUpdateApiRoutes } from "../../operations/features/self-update-api/internal/handleSelfUpdateApiRoutes";
import { tryHandleWatchdogApiRoutes } from "../../operations/features/watchdog-api/internal/handleWatchdogApiRoutes";
import type { BridgeRequestContext } from "./bridgeRequestContext.type";

export type BridgeRouteHandler = (
  ctx: BridgeRequestContext,
) => boolean | Promise<boolean>;

/** Order matches `BRIDGE_ROUTE_CATALOG` grouping (discovery → diagnostics → ops → proxy). */
export const BRIDGE_ROUTE_HANDLERS: readonly BridgeRouteHandler[] = [
  tryHandleHealthIdentityRoutes,
  tryHandleLocalDebugPageRoute,
  tryHandleWatchdogApiRoutes,
  tryHandleProcessControlRoutes,
  tryHandleSelfUpdateApiRoutes,
  tryHandleInstallDeleteApiRoute,
  tryHandleHarnessProxyRoutes,
  tryHandleProjectsProxyRoute,
  tryHandleAutomationsProxyRoutes,
];
