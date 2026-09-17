import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { BRIDGE_ROUTE_CATALOG } from "./bridgeRouteCatalog.constant";

const APP_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../../..",
);

describe("BRIDGE_ROUTE_CATALOG", () => {
  it("has unique method + pathname pairs", () => {
    const keys = BRIDGE_ROUTE_CATALOG.map(
      (row) => `${row.method} ${row.pathname}`,
    );
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("matches apps/bridge/features.registry.json leaf slugs", () => {
    const registry = JSON.parse(
      readFileSync(
        path.join(APP_ROOT, "apps/bridge/features.registry.json"),
        "utf8",
      ),
    ) as {
      features: { slug: string; parentSlug?: string }[];
    };

    const registrySlugs = new Set(registry.features.map((row) => row.slug));
    const leafSlugs = new Set(
      registry.features
        .filter((row) => row.parentSlug !== undefined)
        .map((row) => row.slug),
    );

    BRIDGE_ROUTE_CATALOG.forEach((row) => {
      expect(leafSlugs.has(row.featureSlug), row.featureSlug).toBe(true);
      expect(registrySlugs.has(row.parentSlug), row.parentSlug).toBe(true);
    });
  });
});
