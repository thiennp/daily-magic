import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { globSync } from "tinyglobby";

import { describe, expect, it } from "vitest";

import {
  getAppRoot,
  loadRefactoringSafetyManifest,
} from "../.agents/scripts/lib/loadRefactoringSafetyManifest";

const resolveIncludePatterns = (configFileName: string): string[] => {
  const configPath = path.join(getAppRoot(), configFileName);
  const source = readFileSync(configPath, "utf8");
  const match = source.match(/include:\s*\[([\s\S]*?)\]/);
  if (!match) {
    return [];
  }
  return [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
};

const assertPatternsResolve = (patterns: readonly string[]): void => {
  patterns.forEach((pattern) => {
    const matches = globSync(pattern, {
      cwd: getAppRoot(),
      absolute: true,
      onlyFiles: true,
    });
    expect(matches.length, `No test files for ${pattern}`).toBeGreaterThan(0);
  });
};

describe("refactoring-safety.manifest.json", () => {
  const manifest = loadRefactoringSafetyManifest();

  it("tier vitest config files exist", () => {
    const fast = manifest.tiers.fast.vitestConfig;
    const standard = manifest.tiers.standard.vitestConfig;
    expect(fast).toBe("vitest.refactoring-safety.fast.config.ts");
    expect(standard).toBe("vitest.refactoring-safety.standard.config.ts");
    expect(existsSync(path.join(getAppRoot(), fast!))).toBe(true);
    expect(existsSync(path.join(getAppRoot(), standard!))).toBe(true);
  });

  it("fast and standard vitest includes resolve to files", () => {
    assertPatternsResolve(
      resolveIncludePatterns(manifest.tiers.fast.vitestConfig!),
    );
    assertPatternsResolve(
      resolveIncludePatterns(manifest.tiers.standard.vitestConfig!),
    );
  });

  it("deployable keys match AWC–AWI registry", () => {
    expect(Object.keys(manifest.deployables).sort()).toEqual([
      "AWB",
      "AWC",
      "AWI",
      "AWL",
    ]);
  });

  it("deployable vitest patterns in manifest resolve to files", () => {
    Object.entries(manifest.deployables).forEach(([id, block]) => {
      block.vitest.forEach((pattern) => {
        const matches = globSync(pattern, {
          cwd: getAppRoot(),
          absolute: true,
          onlyFiles: true,
        });
        expect(matches.length, `${id}: ${pattern}`).toBeGreaterThan(0);
      });
    });
  });
});
