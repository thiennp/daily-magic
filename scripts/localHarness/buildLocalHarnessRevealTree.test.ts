import { describe, expect, it } from "vitest";

import { buildLocalHarnessRevealTreeFromItems } from "./buildLocalHarnessRevealTree";
import type { LocalHarnessCandidateItem } from "./revealLocalHarnessCandidates.types";

describe("buildLocalHarnessRevealTreeFromItems", () => {
  it("nests items by relative path segments", () => {
    const items: LocalHarnessCandidateItem[] = [
      {
        id: "a",
        kind: "rule",
        title: "api",
        sourcePath: "/home/p/.cursor/rules/api.mdc",
        relativePath: "rules/api.mdc",
        selected: true,
      },
      {
        id: "b",
        kind: "command",
        title: "readme",
        sourcePath: "/home/p/.cursor/commands/readme.md",
        relativePath: "commands/readme.md",
        selected: true,
      },
    ];

    const tree = buildLocalHarnessRevealTreeFromItems(items);
    expect(tree.length).toBe(2);
    expect(tree[0]?.type).toBe("folder");
    if (tree[0]?.type === "folder") {
      expect(tree[0].name).toBe("commands");
    }
  });
});
