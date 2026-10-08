import { describe, expect, it } from "vitest";

import { HUMAN_INVITE_PERSON_FLOW_COPY } from "@/features/projects/access/humanInvites/humanInvitePersonFlowCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

describe("invite person Claude Soft HOLD copy", () => {
  it("uses Assistant not bot in visible role lines", () => {
    expect(HUMAN_INVITE_UI_COPY.roleMemberOneLiner).toContain("assistants");
    expect(HUMAN_INVITE_UI_COPY.roleMemberOneLiner.toLowerCase()).not.toContain(
      "bot",
    );
    expect(HUMAN_INVITE_UI_COPY.roleViewerOneLiner.toLowerCase()).not.toContain(
      "bot",
    );
    expect(HUMAN_INVITE_UI_COPY.botsPeopleTitle).toBe("Assistants & people");
  });

  it("keeps the Invite person card copy from the design", () => {
    expect(HUMAN_INVITE_UI_COPY.invitePersonTitle).toBe("Invite person");
    expect(HUMAN_INVITE_PERSON_FLOW_COPY.tabEmail).toBe("Email");
    expect(HUMAN_INVITE_PERSON_FLOW_COPY.tabLink).toBe("Link");
    expect(HUMAN_INVITE_PERSON_FLOW_COPY.emailTip).toContain("comma");
  });
});
