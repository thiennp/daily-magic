import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectInviteAddAssistantControl from "@/features/projects/access/invites/AwcProjectInviteAddAssistantControl";
import { AWC_PROJECT_INVITE_TYPE_OPTIONS } from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";

const TYPES_IN_ORDER = [
  "Grok Bot",
  "Muse",
  "Claude",
  "ChatGPT",
  "Cursor",
  "Codex",
  "Gemini",
  "Copilot",
  "Mistral",
  "OpenClaw",
  "n8n/Zapier",
  "Messengers",
  "custom HTTPS",
  "Other",
];

describe("Add assistant: type picker", () => {
  it("picker lists every types[] label in order, Muse included", () => {
    expect(AWC_PROJECT_INVITE_TYPE_OPTIONS.map((o) => o.label)).toEqual(
      TYPES_IN_ORDER,
    );
    const html = renderToStaticMarkup(
      createElement(AwcProjectInviteAddAssistantControl, {
        buttonClassName: "btn",
        onCreate: () => undefined,
      }),
    );
    expect(html).toContain(">Add assistant<");
    expect(html).toContain(
      '<option value="" selected="">Any assistant</option>',
    );
    expect(html).toContain('<option value="muse">Muse</option>');
    const visible = html.replace(/<[^>]+>/g, " ");
    expect(visible).not.toMatch(/\bbot\b|right away/);
  });
});
