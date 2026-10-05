import { describe, expect, it } from "vitest";

import { buildProjectInviteAgentPrompt } from "@/features/projects/access/invites/buildProjectInviteAgentPrompt";
import { PROJECT_UPDATED_WAKE_REPLY_CLAUSE } from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";

describe("buildProjectInviteAgentPrompt project.updated copy", () => {
  it("includes the project.updated wake reply clause", () => {
    const prompt = buildProjectInviteAgentPrompt({
      inviteUrl: "https://example.com/invite/p/tok-xyz",
      projectId: "proj-1",
    });
    expect(prompt).toContain(PROJECT_UPDATED_WAKE_REPLY_CLAUSE);
  });
});
