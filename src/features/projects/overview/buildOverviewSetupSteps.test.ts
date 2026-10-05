import { describe, expect, it } from "vitest";

import buildOverviewSetupSteps from "@/features/projects/overview/buildOverviewSetupSteps";

describe("buildOverviewSetupSteps", () => {
  it("marks create done and leaves others incomplete with honest nav actions", () => {
    const steps = buildOverviewSetupSteps({
      members: [],
      folderRefs: [],
      repoUrlCount: 0,
      composition: { harness: 0, workflow: 0, agent: 0 },
      deviceDisplayName: "Grey",
    });
    expect(steps.map((s) => [s.id, s.done, s.action.kind])).toEqual([
      ["create", true, "none"],
      ["bot", false, "tab"],
      ["playbook", false, "mac"],
      ["folder", false, "tab"],
      ["git", false, "tab"],
      ["people", false, "tab"],
    ]);
  });

  it("marks bot/playbook/folder/git/people done from real signals", () => {
    const steps = buildOverviewSetupSteps({
      members: [
        {
          id: "1",
          userId: "u1",
          teamLabel: null,
          scopes: [],
          createdAt: "",
          projectDisplayName: "WB",
          isAgent: true,
        },
        {
          id: "2",
          userId: "u2",
          teamLabel: null,
          scopes: [],
          createdAt: "",
          projectDisplayName: "Thien",
          isAgent: false,
        },
      ],
      folderRefs: [
        { id: "f1", machineOrDeviceRef: "d", folderPath: "~/x" },
      ],
      repoUrlCount: 1,
      composition: { harness: 2, workflow: 0, agent: 0 },
      deviceDisplayName: "Grey",
    });
    expect(steps.every((s) => s.done)).toBe(true);
  });
});
