import { describe, expect, it } from "vitest";

import { planHarnessInstallBundle } from "./planHarnessInstallBundle";
import type HarnessManifest from "./types/HarnessManifest.type";

describe("planHarnessInstallBundle", () => {
  it("creates a manifest, set entry, and shared item files for a new install", () => {
    const plan = planHarnessInstallBundle({
      hostname: "test-mac",
      existingManifest: null,
      bundle: {
        name: "Assistant bundle",
        slug: "assistant",
        items: [
          {
            id: "rule-1",
            kind: "rule",
            title: "Prefer Const",
            content: "Prefer const.",
            setSlugs: ["assistant"],
          },
        ],
      },
    });

    expect(plan.manifest.activeSetSlugs).toEqual(["assistant"]);
    expect(plan.manifest.sets.assistant?.name).toBe("Assistant bundle");
    expect(plan.manifest.sets.assistant?.items).toEqual([
      {
        id: "rule-1",
        kind: "rule",
        title: "Prefer Const",
        path: "shared/items/rule-1/rules/prefer-const.mdc",
      },
    ]);
    expect(plan.files).toEqual([
      {
        relativePath: "shared/items/rule-1/rules/prefer-const.mdc",
        content: "Prefer const.",
      },
    ]);
    expect(plan.directories).toContain("sets/assistant/rules");
  });

  it("merges into an existing manifest without dropping other sets", () => {
    const existingManifest: HarnessManifest = {
      version: 1,
      hostname: "test-mac",
      updatedAt: "2026-07-01T00:00:00.000Z",
      activeSetSlugs: ["existing"],
      sets: {
        existing: {
          slug: "existing",
          name: "Existing set",
          version: 1,
          updatedAt: "2026-07-01T00:00:00.000Z",
          items: [],
        },
      },
    };

    const plan = planHarnessInstallBundle({
      hostname: "test-mac",
      existingManifest,
      bundle: {
        name: "Assistant bundle",
        slug: "assistant",
        items: [],
      },
    });

    expect(plan.manifest.sets.existing?.name).toBe("Existing set");
    expect(plan.manifest.activeSetSlugs).toEqual(["existing", "assistant"]);
    expect(plan.manifest.sets.assistant?.version).toBe(1);
  });
});
