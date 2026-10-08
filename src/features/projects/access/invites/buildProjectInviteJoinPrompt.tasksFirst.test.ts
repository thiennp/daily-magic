import { describe, expect, it } from "vitest";

import { buildProjectInviteJoinPrompt } from "@/features/projects/access/invites/buildProjectInviteJoinPrompt";
import { PROJECT_TASKS_FIRST_CLAUSE } from "@/lib/projects/acl/projectTasksFirstClause.constant";

describe("join prompt: Tasks first (8cf8f64f)", () => {
  it.each(["grok", "muse"] as const)(
    "%s prompt requires list_project_tasks and create_project_task",
    (platform) => {
      const prompt = buildProjectInviteJoinPrompt({
        inviteUrl: "https://www.agentwitch.com/invite/p/tok-1",
        token: "tok-1",
        projectId: "p1",
        projectName: "P",
        platform,
      });
      expect(prompt).toContain(
        `REQUIRED from now on — ${PROJECT_TASKS_FIRST_CLAUSE}`,
      );
      expect(prompt).toContain("list_project_tasks");
      expect(prompt).toContain("create_project_task");
    },
  );
});
