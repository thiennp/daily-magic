import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { AWI_INSTALL_ROOT_DIR_NAMES } from "../apps/install/features/install-layout/public-api/types";
import {
  AGENT_WITCH_INSTALL_BUNDLE_VERSION,
  AWI_INSTALL_VERSION_FILENAME,
} from "../apps/install/features/bundle/public-api/types";
import { AGENT_WITCH_INSTALL_BUNDLE_VERSION as AGENT_WITCH_INSTALL_BUNDLE_VERSION_FROM_INFRA } from "@agent-witch/install-bundle";

const APP_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const PUBLIC_API_FILES = ["types.ts", "presentation.ts", "infrastructure.ts"];

interface AwiFeatureRow {
  readonly slug: string;
  readonly title: string;
  readonly fsaStatus: "legacy" | "in-progress" | "fsa";
  readonly featurePath?: string;
}

describe("apps/install/features.registry.json", () => {
  const registryPath = path.join(
    APP_ROOT,
    "apps/install/features.registry.json",
  );
  const registry = JSON.parse(readFileSync(registryPath, "utf8")) as {
    deployableId: string;
    features: AwiFeatureRow[];
  };

  it("is scoped to AWI", () => {
    expect(registry.deployableId).toBe("AWI");
    expect(registry.features.length).toBeGreaterThanOrEqual(8);
  });

  it("each slug has FSA public-api placeholders or fsaStatus fsa", () => {
    registry.features.forEach((row) => {
      const featureRoot = path.join(
        APP_ROOT,
        row.featurePath ?? `apps/install/features/${row.slug}`,
      );
      expect(existsSync(featureRoot), row.slug).toBe(true);

      if (row.fsaStatus === "fsa") {
        PUBLIC_API_FILES.forEach((fileName) => {
          expect(
            existsSync(path.join(featureRoot, "public-api", fileName)),
            `${row.slug}/public-api/${fileName}`,
          ).toBe(true);
        });
        return;
      }

      PUBLIC_API_FILES.forEach((fileName) => {
        expect(
          existsSync(path.join(featureRoot, "public-api", fileName)),
          `${row.slug}/public-api/${fileName}`,
        ).toBe(true);
      });
      expect(existsSync(path.join(featureRoot, "internal"))).toBe(true);
    });
  });

  it("install-layout types align with deployables.registry.json installDirs", () => {
    const deployables = JSON.parse(
      readFileSync(
        path.join(APP_ROOT, "apps/deployables.registry.json"),
        "utf8",
      ),
    ) as {
      deployables: { id: string; installDirs?: string[] }[];
    };
    const awi = deployables.deployables.find((row) => row.id === "AWI");
    expect(awi?.installDirs).toEqual([
      "~/.agent-witch",
      "~/.local-agent-witch",
    ]);
    expect(AWI_INSTALL_ROOT_DIR_NAMES.production).toBe(".agent-witch");
    expect(AWI_INSTALL_ROOT_DIR_NAMES.localhost).toBe(".local-agent-witch");
  });

  it("bundle contract exposes install-version filename", () => {
    expect(AWI_INSTALL_VERSION_FILENAME).toBe("install-version.json");
  });

  it("bundle version is single-sourced across public-api layers", () => {
    expect(AGENT_WITCH_INSTALL_BUNDLE_VERSION_FROM_INFRA).toBe(
      AGENT_WITCH_INSTALL_BUNDLE_VERSION,
    );
    expect(AGENT_WITCH_INSTALL_BUNDLE_VERSION.length).toBeGreaterThan(0);
  });
});
