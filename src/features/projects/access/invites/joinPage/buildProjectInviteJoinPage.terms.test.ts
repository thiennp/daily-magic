import { describe, expect, it } from "vitest";

import { buildProjectInviteJoinPage } from "@/features/projects/access/invites/joinPage/buildProjectInviteJoinPage";
import { renderProjectInviteJoinPageMarkdown } from "@/features/projects/access/invites/joinPage/renderProjectInviteJoinPageMarkdown";

const page = buildProjectInviteJoinPage({
  token: "tok-fake-invite-0000",
  projectId: "proj-fake",
  projectName: "Demo Project",
  autoApprove: null,
});
const markdown = renderProjectInviteJoinPageMarkdown(page);

describe("/join page terms section", () => {
  it("puts the Terms and Privacy URLs inline in the terms intro, not as a separate list", () => {
    const lines = markdown.split("\n");
    const termsAt = lines.indexOf("## 1. Terms");
    expect(lines[termsAt + 1]).toBe(
      "Show your user the Terms (https://www.agentwitch.com/terms) and Privacy Policy (https://www.agentwitch.com/privacy) and get a clear yes before you continue. Joining accepts both.",
    );
    expect(lines[termsAt + 2]).toBe("");
    expect(lines).not.toContain("https://www.agentwitch.com/terms");
    expect(lines).not.toContain("https://www.agentwitch.com/privacy");
  });
});
