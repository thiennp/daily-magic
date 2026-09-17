import { BRIDGE_ROUTE_HANDLERS } from "./bridgeRouteHandlers.constant";
import type { BridgeRequestContext } from "./bridgeRequestContext.type";

export const dispatchBridgeRoute = async (
  ctx: BridgeRequestContext,
): Promise<boolean> => {
  for (const handler of BRIDGE_ROUTE_HANDLERS) {
    const handled = await handler(ctx);
    if (handled) {
      return true;
    }
  }
  return false;
};
