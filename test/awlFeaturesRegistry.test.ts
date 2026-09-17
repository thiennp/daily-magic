import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_LIVE_APP_PORT,
  AWL_HTTP_BIND_HOST,
} from "../apps/live/features/local-server/public-api/types";

const APP_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const PUBLIC_API_FILES = ["types.ts", "presentation.ts", "infrastructure.ts"];

interface AwlFeatureRow {
  readonly slug: string;
  readonly title: string;
  readonly fsaStatus: "legacy" | "in-progress" | "fsa";
  readonly featurePath?: string;
}

describe("apps/live/features.registry.json", () => {
  const registryPath = path.join(APP_ROOT, "apps/live/features.registry.json");
  const registry = JSON.parse(readFileSync(registryPath, "utf8")) as {
    deployableId: string;
    features: AwlFeatureRow[];
  };

  it("is scoped to AWL", () => {
    expect(registry.deployableId).toBe("AWL");
    expect(registry.features.length).toBeGreaterThanOrEqual(10);
  });

  it("each slug has FSA public-api placeholders and internal/", () => {
    registry.features.forEach((row) => {
      const featureRoot = path.join(
        APP_ROOT,
        row.featurePath ?? `apps/live/features/${row.slug}`,
      );
      expect(existsSync(featureRoot), row.slug).toBe(true);

      PUBLIC_API_FILES.forEach((fileName) => {
        expect(
          existsSync(path.join(featureRoot, "public-api", fileName)),
          `${row.slug}/public-api/${fileName}`,
        ).toBe(true);
      });
      expect(existsSync(path.join(featureRoot, "internal"))).toBe(true);
    });
  });

  it("local-server types align with deployables.registry.json AWL port", () => {
    const deployables = JSON.parse(
      readFileSync(
        path.join(APP_ROOT, "apps/deployables.registry.json"),
        "utf8",
      ),
    ) as {
      deployables: { id: string; defaultPort?: number }[];
    };
    const awl = deployables.deployables.find((row) => row.id === "AWL");
    expect(awl?.defaultPort).toBe(AGENT_WITCH_LIVE_APP_PORT);
    expect(AWL_HTTP_BIND_HOST).toBe("127.0.0.1");
  });
});
