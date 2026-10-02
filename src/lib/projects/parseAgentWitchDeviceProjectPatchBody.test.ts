import { describe, expect, it } from "vitest";

import { parseAgentWitchDeviceProjectPatchBody } from "@/lib/projects/parseAgentWitchDeviceProjectPatchBody";

describe("parseAgentWitchDeviceProjectPatchBody", () => {
  it("rejects non-string folderPath when the field is present", () => {
    expect(
      parseAgentWitchDeviceProjectPatchBody({
        folderPath: 123,
        repoUrls: ["https://github.com/org/repo.git"],
      }),
    ).toEqual({
      ok: false,
      status: 400,
      errorMessage: "folderPath must be a string.",
    });
  });

  it("accepts repo-only updates without folderPath", () => {
    expect(
      parseAgentWitchDeviceProjectPatchBody({
        repoUrls: ["https://github.com/org/repo.git"],
        defaultBranch: "main",
      }),
    ).toEqual({
      ok: true,
      folderPath: null,
      hasRepoUpdate: true,
      repoUrls: ["https://github.com/org/repo.git"],
      defaultBranch: "main",
    });
  });
});
