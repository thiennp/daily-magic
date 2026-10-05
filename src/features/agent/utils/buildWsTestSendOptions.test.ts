import { describe, expect, it } from "vitest";

import { buildWsTestSendOptions } from "@/features/agent/utils/buildWsTestSendOptions";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const selectedProjectFixture: UserProjectRecord = {
  id: "proj-1",
  ownerUserId: "user-1",
  deviceId: "mac-1",
  name: "Launch",
  folderPath: "~/projects/launch",
  repoUrls: [],
  defaultBranch: null,
  lastUsedAt: null,
  createdAt: "2026-09-17T00:00:00.000Z",
  updatedAt: "2026-09-17T00:00:00.000Z",
};

const buildComposer = (
  overrides: Partial<ReturnType<typeof useWsTestTaskComposer>> = {},
): ReturnType<typeof useWsTestTaskComposer> =>
  ({
    isTeamDispatch: false,
    isLibraryPlaybook: true,
    libraryCapabilityId: "cap-1",
    isWorkflowTask: true,
    workflowFieldValues: { topic: "Launch" },
    harnessSetSlug: "template-weekly-team-status",
    operatorSteps: [{ id: "op-1", title: "Review", content: "Check draft" }],
    selectedProject: null,
    selectedProjectId: "",
    ...overrides,
  }) as ReturnType<typeof useWsTestTaskComposer>;

describe("buildWsTestSendOptions (official workflow orchestration)", () => {
  it("enables orchestration start payload for library workflows with operator steps", () => {
    const options = buildWsTestSendOptions(
      buildComposer(),
      "claude-cli",
      "mac-1",
    );

    expect(options.useOfficialWorkflowOrchestration).toBe(true);
    expect(options.fieldValues).toEqual({ topic: "Launch" });
    expect(options.capabilityId).toBe("cap-1");
  });

  it("does not enable orchestration for non-workflow tasks", () => {
    const options = buildWsTestSendOptions(
      buildComposer({
        isWorkflowTask: false,
        operatorSteps: [],
      }),
      "claude-cli",
      "mac-1",
    );

    expect(options.useOfficialWorkflowOrchestration).toBeUndefined();
    expect(options.fieldValues).toBeUndefined();
  });

  it("includes selected project id alongside orchestration fields", () => {
    const options = buildWsTestSendOptions(
      buildComposer({
        selectedProject: selectedProjectFixture,
        selectedProjectId: selectedProjectFixture.id,
      }),
      "claude-cli",
      "mac-1",
    );

    expect(options.projectId).toBe("proj-1");
    expect(options.useOfficialWorkflowOrchestration).toBe(true);
  });
});

describe("buildWsTestSendOptions (project required)", () => {
  it("always sends the current project id even before projects load", () => {
    const options = buildWsTestSendOptions(
      buildComposer({ selectedProjectId: "proj-from-url" }),
      "claude-cli",
      "mac-1",
    );

    expect(options.projectId).toBe("proj-from-url");
    expect(options.projectFolderPath).toBeUndefined();
  });

  it("does not fall back to a Default project folder", () => {
    const options = buildWsTestSendOptions(
      buildComposer(),
      "claude-cli",
      "mac-1",
    );

    expect(options.projectId).toBe("");
    expect(options.projectFolderPath).toBeUndefined();
  });

  it("sends the selected project folder with its id", () => {
    const options = buildWsTestSendOptions(
      buildComposer({
        selectedProject: selectedProjectFixture,
        selectedProjectId: selectedProjectFixture.id,
      }),
      "claude-cli",
      "mac-1",
    );

    expect(options.projectId).toBe("proj-1");
    expect(options.projectFolderPath).toBe("~/projects/launch");
  });
});
