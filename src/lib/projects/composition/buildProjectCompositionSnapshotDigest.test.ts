import { describe, expect, it } from "vitest";

import buildProjectCompositionSnapshotDigest from "@/lib/projects/composition/buildProjectCompositionSnapshotDigest";

describe("buildProjectCompositionSnapshotDigest", () => {
  it("is stable for entry order and item order", () => {
    const entriesA = [
      {
        componentId: "b",
        versionId: "v2",
        kind: "harness" as const,
        scope: "project" as const,
        items: [
          {
            itemKey: "z",
            relativePath: "rules/z.mdc",
            contentSha256: "abc",
          },
        ],
      },
      {
        componentId: "a",
        versionId: "v1",
        kind: "harness" as const,
        scope: "run" as const,
        items: [
          {
            itemKey: "a",
            relativePath: "rules/a.mdc",
            contentSha256: "def",
          },
        ],
      },
    ];

    const entriesB = [
      {
        componentId: "a",
        versionId: "v1",
        kind: "harness" as const,
        scope: "run" as const,
        items: [
          {
            itemKey: "a",
            relativePath: "rules/a.mdc",
            contentSha256: "def",
          },
        ],
      },
      {
        componentId: "b",
        versionId: "v2",
        kind: "harness" as const,
        scope: "project" as const,
        items: [
          {
            itemKey: "z",
            relativePath: "rules/z.mdc",
            contentSha256: "abc",
          },
        ],
      },
    ];

    expect(buildProjectCompositionSnapshotDigest(entriesA)).toBe(
      buildProjectCompositionSnapshotDigest(entriesB),
    );
  });
});
