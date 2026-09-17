import { describe, expect, it } from "vitest";

import { BRIDGE_ROUTE_CATALOG } from "./bridgeRouteCatalog.constant";
import { BRIDGE_ROUTE_HANDLERS } from "./bridgeRouteHandlers.constant";

describe("BRIDGE_ROUTE_HANDLERS", () => {
  it("has one handler group per catalog feature slug (unique slugs in catalog)", () => {
    const catalogFeatureSlugs = [
      ...new Set(BRIDGE_ROUTE_CATALOG.map((row) => row.featureSlug)),
    ];
    expect(BRIDGE_ROUTE_HANDLERS.length).toBeGreaterThanOrEqual(
      catalogFeatureSlugs.length,
    );
  });
});
