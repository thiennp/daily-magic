import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectInviteCreatedBanner from "@/features/projects/access/invites/AwcProjectInviteCreatedBanner";

const render = (joinTypeId?: string | null) =>
  renderToStaticMarkup(
    createElement(AwcProjectInviteCreatedBanner, {
      createdInviteUrl: "https://example.com/invite/p/tok",
      createdInviteToken: "tok",
      projectId: "p1",
      projectName: null,
      joinTypeId,
      onClearCreatedUrl: () => undefined,
    }),
  );

describe("Created invite banner: no type picked", () => {
  it("shows the any-assistant line and never falls back to Grok", () => {
    for (const html of [render(), render(null)]) {
      expect(html).toContain('data-invite-platform="any"');
      expect(html).toContain(
        "Assistant invite — this Copy prompt works for any assistant.",
      );
      expect(html).not.toContain("Grok Bot");
    }
  });
});
