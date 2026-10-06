import { describe, expect, it } from "vitest";

import buildOverviewSetupSteps from "@/features/projects/overview/buildOverviewSetupSteps";

describe("buildOverviewSetupSteps", () => {
  it("marks create done; incomplete steps link to live targets only", () => {
    const steps = buildOverviewSetupSteps({
      members: [],
      folderRefs: [],
      repoUrlCount: 0,
      composition: { harness: 0, workflow: 0, agent: 0 },
    });
    expect(steps.map((s) => [s.id, s.done, s.action.kind])).toEqual([
      ["create", true, "none"],
      ["assistant", false, "tab"],
      ["playbook", false, "mac"],
      ["folder", false, "tab"],
      ["git", false, "tab"],
      ["people", false, "tab"],
    ]);
    const assistant = steps.find((s) => s.id === "assistant");
    expect(assistant?.action).toMatchObject({ kind: "tab", tab: "team" });
    expect(steps.every((s) => s.id !== undefined)).toBe(true);
    expect(steps.filter((s) => s.done).map((s) => s.id)).toContain("create");
  });

  it("keeps done steps in the list when signals are complete", () => {
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
      folderRefs: [{ id: "f1", machineOrDeviceRef: "d", folderPath: "~/x" }],
      repoUrlCount: 1,
      composition: { harness: 2, workflow: 0, agent: 0 },
    });
    expect(steps).toHaveLength(6);
    expect(steps.every((s) => s.done)).toBe(true);
  });
});
