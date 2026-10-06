import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ProjectInviteInstructionsBody from "@/features/projects/access/invites/ProjectInviteInstructionsBody";

describe("ProjectInviteInstructionsBody EN", () => {
  it("uses assistant wording, invite code, and your-assistant wake path", () => {
    const html = renderToStaticMarkup(
      createElement(ProjectInviteInstructionsBody, {
        token: "a".repeat(22),
        hasToken: true,
        autoApprove: false,
      }),
    );
    expect(html).toContain("AI assistant");
    expect(html).toContain("your assistant");
    expect(html).toContain("Your invite code is in the link above.");
    expect(html).toContain(
      "Access › People › Members › your assistant › Grok wake link",
    );
    expect(html).not.toContain("{name}");
    expect(html).not.toMatch(/AI bot|your bot|invite token/i);
  });

  it("renders the auto-approve wait line when autoApprove is on", () => {
    const html = renderToStaticMarkup(
      createElement(ProjectInviteInstructionsBody, {
        token: "a".repeat(22),
        hasToken: true,
        autoApprove: true,
      }),
    );
    expect(html).toContain(
      "The project owner turned on auto-approve for this invite",
    );
  });

  it("explains the invite code location when the token is missing", () => {
    const html = renderToStaticMarkup(
      createElement(ProjectInviteInstructionsBody, {
        token: "",
        hasToken: false,
      }),
    );
    expect(html).toMatch(/the code is the part after/);
  });
});
