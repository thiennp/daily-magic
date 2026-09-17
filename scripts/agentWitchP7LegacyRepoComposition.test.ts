import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const readRepoFile = (relativePath: string): string =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");

describe("P7 legacy repo composition guard", () => {
  it("does not write harnessSetSlugs into project.json", () => {
    const applySource = readRepoFile(
      "apps/live/features/harness/internal/core/applyInstalledHarnessSetsToProjectCursor.ts",
    );
    expect(applySource).not.toContain("harnessSetSlugs");
    expect(applySource).not.toContain("writeProjectHarnessLinkMeta");
  });

  it("does not export readAgentWitchProjectHarnessSetSlugs from AWL harness API", () => {
    const harnessApi = readRepoFile(
      "apps/live/features/harness/public-api/infrastructure.ts",
    );
    expect(harnessApi).not.toContain("readAgentWitchProjectHarnessSetSlugs");
  });
});
