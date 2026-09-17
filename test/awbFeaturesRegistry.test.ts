import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { BRIDGE_ROUTE_CATALOG } from "../apps/bridge/features/server/public-api/types";

const APP_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

interface AwbFeatureRow {
  readonly slug: string;
  readonly title: string;
  readonly fsaStatus: "legacy" | "in-progress" | "fsa";
  readonly featurePath?: string;
  readonly parentSlug?: string;
}

describe("apps/bridge/features.registry.json", () => {
  const registryPath = path.join(
    APP_ROOT,
    "apps/bridge/features.registry.json",
  );
  const registry = JSON.parse(readFileSync(registryPath, "utf8")) as {
    deployableId: string;
    features: AwbFeatureRow[];
  };

  it("is scoped to AWB", () => {
    expect(registry.deployableId).toBe("AWB");
    expect(registry.features.length).toBeGreaterThanOrEqual(10);
  });

  it("each slug has a feature folder with internal/ or public-api/", () => {
    registry.features.forEach((row) => {
      const featureRoot = path.join(
        APP_ROOT,
        row.featurePath ?? `apps/bridge/features/${row.slug}`,
      );
      expect(existsSync(featureRoot), row.slug).toBe(true);
      const hasInternal = existsSync(path.join(featureRoot, "internal"));
      const hasPublicApi = existsSync(path.join(featureRoot, "public-api"));
      expect(hasInternal || hasPublicApi, row.slug).toBe(true);
    });
  });

  it("route catalog row count matches registry HTTP routes", () => {
    expect(BRIDGE_ROUTE_CATALOG.length).toBe(19);
  });
});
