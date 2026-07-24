import { describe, expect, it } from "vitest";

import { applyProjectFolderToWorkflowFieldValues } from "@/lib/workflows/applyProjectFolderToWorkflowFieldValues";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldDefinition.type";

describe("applyProjectFolderToWorkflowFieldValues", () => {
  it("fills project workflow fields with the selected folder path", () => {
    expect(
      applyProjectFolderToWorkflowFieldValues(
        [
          {
            key: "repoPath",
            label: "Project",
            type: WorkflowFieldInputType.PROJECT,
            required: true,
          },
          {
            key: "branch",
            label: "Branch",
            type: WorkflowFieldInputType.TEXT,
            required: true,
          },
        ],
        "~/.agent-witch/profiles/owner@example.com/projects/daily-magic",
        { branch: "main" },
      ),
    ).toEqual({
      branch: "main",
      repoPath:
        "~/.agent-witch/profiles/owner@example.com/projects/daily-magic",
    });
  });
});
