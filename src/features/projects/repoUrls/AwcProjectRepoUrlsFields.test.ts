import { describe, expect, it } from "vitest";

import { buildRepoUrlsPayload } from "@/features/projects/repoUrls/AwcProjectRepoUrlsFields";

describe("buildRepoUrlsPayload", () => {
  it("drops blank URL rows and maps empty branch to null", () => {
    expect(
      buildRepoUrlsPayload({
        repoUrls: ["", " https://github.com/org/a.git ", ""],
        defaultBranch: "  ",
      }),
    ).toEqual({
      repoUrls: ["https://github.com/org/a.git"],
      defaultBranch: null,
    });
  });

  it("keeps trimmed defaultBranch", () => {
    expect(
      buildRepoUrlsPayload({
        repoUrls: ["git@github.com:org/b.git"],
        defaultBranch: " main ",
      }),
    ).toEqual({
      repoUrls: ["git@github.com:org/b.git"],
      defaultBranch: "main",
    });
  });
});
