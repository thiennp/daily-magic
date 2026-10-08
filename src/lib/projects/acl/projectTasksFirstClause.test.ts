import { describe, expect, it } from "vitest";

import { buildProjectAclAgentGuidelineSection } from "@/lib/agentAccess/buildProjectAclAgentGuidelineSection";
import { PRODUCT_CONNECT_UPDATES } from "@/lib/agentAccess/productConnectUpdates.constant";
import {
  PROJECT_BRIEFING_HOW_TO_DISPATCH,
  PROJECT_BRIEFING_VIEWER_READ_ONLY,
  PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE,
} from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import { PROJECT_BRIEFING_HOW_TO_DISPATCH_POLL } from "@/lib/projects/acl/projectBriefingPollDelivery.constant";
import {
  PROJECT_TASKS_FIRST_CLAUSE,
  PROJECT_TASKS_FIRST_WAKE_POINTER,
} from "@/lib/projects/acl/projectTasksFirstClause.constant";

describe("Tasks first (8cf8f64f)", () => {
  it("is one short plain paragraph naming the task tools", () => {
    expect(PROJECT_TASKS_FIRST_CLAUSE.startsWith("Tasks first:")).toBe(true);
    expect(PROJECT_TASKS_FIRST_CLAUSE.length).toBeLessThanOrEqual(600);
    for (const tool of [
      "list_project_tasks",
      "create_project_task",
      "update_project_task",
    ]) {
      expect(PROJECT_TASKS_FIRST_CLAUSE).toContain(tool);
    }
  });

  it("is in get_agent_guide, both member briefings and the wake clause", () => {
    expect(buildProjectAclAgentGuidelineSection().body).toContain(
      PROJECT_TASKS_FIRST_CLAUSE,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      PROJECT_TASKS_FIRST_CLAUSE,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH_POLL).toContain(
      PROJECT_TASKS_FIRST_CLAUSE,
    );
    expect(PROJECT_BRIEFING_VIEWER_READ_ONLY).not.toContain("Tasks first");
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).toContain(
      PROJECT_TASKS_FIRST_WAKE_POINTER,
    );
  });

  it("is announced in check_product_updates (catalog 23)", () => {
    const entry = PRODUCT_CONNECT_UPDATES.find(
      (e) => e.id === "project-tasks-first",
    );
    expect(entry?.catalogVersion).toBe(23);
    expect(entry?.adapt).toBe(PROJECT_TASKS_FIRST_CLAUSE);
  });
});
