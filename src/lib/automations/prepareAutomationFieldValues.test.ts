import { describe, expect, it, vi } from "vitest";

import { prepareAutomationFieldValues } from "@/lib/automations/prepareAutomationFieldValues";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
  touchUserProjectLastUsed: vi.fn(),
}));

import {
  getUserProjectById,
  touchUserProjectLastUsed,
} from "@/lib/projects/userProjectQueries";

const capability = {
  id: "cap-1",
  workflowFields: [
    {
      key: "repoPath",
      label: "Repo",
      type: WorkflowFieldInputType.PROJECT,
      required: true,
    },
  ],
} as unknown as PublishedCapabilityRecord;

describe("prepareAutomationFieldValues", () => {
  it("requires a project when the workflow has project fields", async () => {
    const result = await prepareAutomationFieldValues({
      ownerUserId: "user-1",
      capability,
      fieldValues: {},
      projectId: null,
    });

    expect(result).toEqual({
      ok: false,
      errorMessage: "Choose a project folder.",
    });
  });

  it("merges the saved project folder into workflow field values", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "project-1",
      ownerUserId: "user-1",
      deviceId: null,
      name: "Daily Magic",
      folderPath:
        "~/.agent-witch/profiles/owner@example.com/projects/daily-magic",
      lastUsedAt: null,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    });

    const result = await prepareAutomationFieldValues({
      ownerUserId: "user-1",
      capability,
      fieldValues: {},
      projectId: "project-1",
    });

    expect(result).toEqual({
      ok: true,
      projectId: "project-1",
      fieldValues: {
        repoPath:
          "~/.agent-witch/profiles/owner@example.com/projects/daily-magic",
      },
    });
    expect(touchUserProjectLastUsed).toHaveBeenCalledWith(
      "project-1",
      "user-1",
    );
  });
});
