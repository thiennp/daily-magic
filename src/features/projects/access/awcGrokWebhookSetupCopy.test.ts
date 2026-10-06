import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_GROK_WEBHOOK_SETUP_COPY } from "@/features/projects/access/awcGrokWebhookSetupCopy.constant";

const readSrc = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

describe("Grok wake-link setup copy", () => {
  it("points to assistant wake-routine links and the owner form, not chat", () => {
    expect(AWC_GROK_WEBHOOK_SETUP_COPY.instruction).toBe(
      "After access is active, the assistant creates its wake routine and posts links to its wake link and key in its user's chat so they can copy both. The project owner clicks Add wake link at Access › People › Members › your assistant › Grok wake link and pastes them there, never into chat.",
    );
    expect(AWC_GROK_WEBHOOK_SETUP_COPY.instruction).toMatch(/wake routine/);
    expect(AWC_GROK_WEBHOOK_SETUP_COPY.instruction).not.toMatch(
      /routine status/,
    );
    expect(AWC_GROK_WEBHOOK_SETUP_COPY.instruction).not.toMatch(
      /grokbot:\/\/|https?:\/\/|sidebar|<a\b|Slack|Discord|Cursor/i,
    );
    expect(AWC_GROK_WEBHOOK_SETUP_COPY.instruction).not.toContain(
      "Project Access → Members",
    );
  });

  it("invite page tells humans about the wake link after access is active", () => {
    const page = readSrc(
      "src/features/projects/access/invites/ProjectInviteInstructionsBody.tsx",
    );
    const copy = readSrc(
      "src/features/projects/access/invites/awcProjectInviteAutoApproveCopy.constant.ts",
    );
    const connect = readSrc(
      "src/features/projects/access/invites/ProjectInviteConnectSteps.tsx",
    );
    expect(page).toContain("AWC_PROJECT_INVITE_AUTO_APPROVE_COPY.humanPageWake");
    expect(copy).toMatch(/wake link/i);
    expect(copy).toContain("After access is active");
    expect(copy).toContain("assistant creates its wake routine");
    expect(copy).toContain("Members › your assistant › Grok wake link");
    expect(copy).not.toMatch(/Members › \{name\}/);
    expect(page).toMatch(/Approve/i);
    expect(connect).not.toContain("AWC_GROK_WEBHOOK_SETUP_COPY");
    expect(page).not.toMatch(/grokbot:\/\//i);
    expect(page).not.toMatch(/sidebar/i);
    expect(page).not.toMatch(/<a\b/i);
  });
});
