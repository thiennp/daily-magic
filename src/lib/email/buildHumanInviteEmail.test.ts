import { describe, expect, it } from "vitest";

import buildHumanInviteEmailHtml from "@/lib/email/buildHumanInviteEmailHtml";
import buildHumanInviteEmailText from "@/lib/email/buildHumanInviteEmailText";
import { buildHumanInviteEmailSubject } from "@/lib/email/humanInviteEmailCopy.constant";

const content = {
  inviterName: "Thien",
  projectName: "Moon <base> & co",
  roleLabel: "Member",
  url: "https://www.agentwitch.com/invite/h/abcDEF0123456789xyz",
  expiresInDays: 7,
  requiresApproval: true,
};

describe("human invite email content (DF-025)", () => {
  it("subject + text are short plain English with AgentWitch as one word", () => {
    expect(buildHumanInviteEmailSubject(content)).toBe(
      "Thien invited you to Moon <base> & co on AgentWitch",
    );
    const text = buildHumanInviteEmailText(content);
    expect(text).toContain("join Moon <base> & co on AgentWitch as a Member.");
    expect(text).toContain(content.url);
    expect(text).toContain("works for 7 days");
    expect(text).toContain("approves new people");
    expect(text).not.toMatch(/Agent Witch/);
  });

  it("HTML escapes user text, links the accept page with the Pine button", () => {
    const html = buildHumanInviteEmailHtml(content);
    expect(html).toContain("Moon &lt;base&gt; &amp; co");
    expect(html).not.toContain("Moon <base>");
    expect(html).toContain(`href="${content.url}"`);
    expect(html).toContain("#1f6656");
    expect(html).not.toMatch(/Agent Witch/);
  });

  it("omits the approval line when the owner opted out", () => {
    const text = buildHumanInviteEmailText({
      ...content,
      requiresApproval: false,
    });
    expect(text).not.toContain("approves new people");
  });
});
