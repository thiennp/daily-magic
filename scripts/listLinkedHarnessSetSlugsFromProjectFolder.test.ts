import { describe, expect, it } from "vitest";

import { listLinkedHarnessSetSlugsFromMaterializationLedger } from "../apps/live/features/projects/internal/core/listLinkedHarnessSetSlugsFromProjectFolder";

const tempRoots: string[] = [];

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

describe("listLinkedHarnessSetSlugsFromMaterializationLedger", () => {
  it("collects unique harness set slugs from ledger component ids", () => {
    const slugs = listLinkedHarnessSetSlugsFromMaterializationLedger({
      version: 1,
      entries: {
        ".cursor/rules/a/demo.mdc": {
          componentId: "harness-set:demo",
          versionId: "1",
          sha256: "abc",
          mode: "managed",
          writtenAt: new Date().toISOString(),
        },
        ".cursor/rules/b/other.mdc": {
          componentId: "harness-set:demo",
          versionId: "1",
          sha256: "def",
          mode: "managed",
          writtenAt: new Date().toISOString(),
        },
        ".cursor/rules/c/fsa.mdc": {
          componentId: "harness-set:fsa-architecture",
          versionId: "2",
          sha256: "ghi",
          mode: "managed",
          writtenAt: new Date().toISOString(),
        },
      },
    });

    expect(slugs).toEqual(["demo", "fsa-architecture"]);
  });
});
