import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/projects/access/invites/joinTypes/claude", () => ({
  joinType: {
    id: "claude",
    label: "Claude",
    match: ["Claude"],
    connectPath: "mcp-bearer",
    deliveryMode: "poll",
    steps: ["EDITED-CLAUDE-STEP"],
  },
}));

import { buildProjectInviteShortPrompt } from "@/features/projects/access/invites/buildProjectInviteShortPrompt";
import { buildProjectInviteJoinPage } from "@/features/projects/access/invites/joinPage/public-api/infrastructure";
import { renderProjectInviteJoinPageMarkdown } from "@/features/projects/access/invites/joinPage/public-api/infrastructure";

describe("editing one type module", () => {
  it("changes the /join page but not the short Copy prompt (snapshot)", () => {
    const markdown = renderProjectInviteJoinPageMarkdown(
      buildProjectInviteJoinPage({
        token: "tok-snapshot-123",
        projectId: "proj-snapshot",
        projectName: "Snapshot Project",
        autoApprove: null,
      }),
    );
    expect(markdown).toContain("1. EDITED-CLAUDE-STEP");
    expect(
      buildProjectInviteShortPrompt({
        token: "tok-snapshot-123",
        projectName: "Snapshot Project",
      }),
    ).toBe(
      `Join my AgentWitch project "Snapshot Project": read https://www.agentwitch.com/join/tok-snapshot-123 and follow it. Start with the terms, and tell me when you're waiting for my approval.`,
    );
  });
});
