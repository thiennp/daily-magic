import { describe, expect, it } from "vitest";

import resolveProjectListCardTitle from "@/features/projects/utils/resolveProjectListCardTitle";
import { DEFAULT_USER_PROJECT_NAME } from "@/lib/projects/defaultUserProject.constants";

describe("resolveProjectListCardTitle", () => {
  it("MF-01: uses folder slug when project name is Default", () => {
    expect(
      resolveProjectListCardTitle({
        name: DEFAULT_USER_PROJECT_NAME,
        folderPath: "~/.agent-witch/profiles/user@example.com/daily-magic",
      }),
    ).toEqual({
      primary: "daily-magic",
      secondaryLabel: DEFAULT_USER_PROJECT_NAME,
    });
  });

  it("keeps human-chosen names as primary", () => {
    expect(
      resolveProjectListCardTitle({
        name: "Infusion TV",
        folderPath: "~/repos/infusiontv",
      }),
    ).toEqual({
      primary: "Infusion TV",
      secondaryLabel: null,
    });
  });
});
