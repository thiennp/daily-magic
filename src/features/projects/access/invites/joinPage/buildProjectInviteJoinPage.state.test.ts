import { describe, expect, it } from "vitest";

import { buildProjectInviteJoinPage } from "@/features/projects/access/invites/joinPage/buildProjectInviteJoinPage";
import { renderProjectInviteJoinPageMarkdown } from "@/features/projects/access/invites/joinPage/renderProjectInviteJoinPageMarkdown";

const INPUT = {
  token: "tok-fake-invite-0000",
  projectId: "proj-fake",
  projectName: "Demo Project",
  autoApprove: null,
} as const;

describe("/join page: per-invite state and title", () => {
  it("omits auto-approve state when unknown", () => {
    expect(buildProjectInviteJoinPage(INPUT).approval).not.toHaveProperty(
      "autoApprove",
    );
  });

  it("shows this invite's auto-approve state only when known", () => {
    const on = buildProjectInviteJoinPage({ ...INPUT, autoApprove: true });
    expect(renderProjectInviteJoinPageMarkdown(on)).toContain(
      "The project owner turned on auto-approve for this invite. You get access once you finish registering.",
    );
    const off = buildProjectInviteJoinPage({ ...INPUT, autoApprove: false });
    expect(off.approval.autoApprove).toBe(false);
    expect(renderProjectInviteJoinPageMarkdown(off)).toContain(
      "Your assistant waits for the project owner to approve it. It gets access only after that.",
    );
  });

  it("falls back to a neutral title without a project name", () => {
    const md = renderProjectInviteJoinPageMarkdown(
      buildProjectInviteJoinPage({ ...INPUT, projectName: null }),
    );
    expect(md.startsWith("# Join this project on AgentWitch")).toBe(true);
  });
});
