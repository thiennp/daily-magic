import { describe, expect, it } from "vitest";

import { projectUpdatedNotifyFieldsForUserProjectPatch } from "@/lib/projects/acl/messaging/projectUpdatedNotifyFieldsForUserProjectPatch";

describe("projectUpdatedNotifyFieldsForUserProjectPatch", () => {
  it("tags project_info and repo_urls from patch keys", () => {
    expect(
      projectUpdatedNotifyFieldsForUserProjectPatch({ name: "N" }),
    ).toEqual(["project_info"]);
    expect(
      projectUpdatedNotifyFieldsForUserProjectPatch({
        folderPath: "/x",
        repoUrls: ["https://example.com/r.git"],
      }),
    ).toEqual(["project_info", "repo_urls"]);
    expect(
      projectUpdatedNotifyFieldsForUserProjectPatch({
        defaultBranch: "main",
      }),
    ).toEqual(["repo_urls"]);
    expect(projectUpdatedNotifyFieldsForUserProjectPatch({})).toEqual([]);
  });
});
