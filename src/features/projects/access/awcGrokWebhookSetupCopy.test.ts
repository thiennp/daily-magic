import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_GROK_WEBHOOK_SETUP_COPY } from "@/features/projects/access/awcGrokWebhookSetupCopy.constant";

const readSrc = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

describe("Grok webhook setup copy", () => {
  it("points to the bot info pane and the owner secret form, not chat", () => {
    expect(AWC_GROK_WEBHOOK_SETUP_COPY.instruction).toBe(
      "The bot cannot see its own routine webhook POST URL or key. Open this bot in the Grok Bot desktop app, open its info pane (click the bot's name in the chat header), find its webhook routine in Routines, and copy the POST URL and key. The project owner enters both in Agent Witch Cloud → Project Access → Members → this bot → Grok webhook (secret fields). Do not paste them into chat.",
    );
    expect(AWC_GROK_WEBHOOK_SETUP_COPY.instruction).toMatch(/Grok Bot/);
    expect(AWC_GROK_WEBHOOK_SETUP_COPY.instruction).not.toMatch(/routine status/);
    expect(AWC_GROK_WEBHOOK_SETUP_COPY.instruction).not.toMatch(
      /grokbot:\/\/|https?:\/\/|sidebar|Slack|Discord|Cursor/i,
    );
  });

  it("is on the invite page after access is active, not before redeem", () => {
    const page = readSrc(
      "src/features/projects/access/invites/ProjectInviteInstructionsBody.tsx",
    );
    const connect = readSrc(
      "src/features/projects/access/invites/ProjectInviteConnectSteps.tsx",
    );
    expect(page).toContain("AWC_GROK_WEBHOOK_SETUP_COPY");
    expect(page).toContain("After access is active");
    expect(page).toMatch(/active[\s\S]*owner[\s\S]*skip the Approve wait/i);
    expect(connect).not.toContain("AWC_GROK_WEBHOOK_SETUP_COPY");
    expect(page).not.toMatch(/grokbot:\/\//i);
    expect(page).not.toMatch(/sidebar/i);
    expect(page).not.toMatch(/<a\b/i);
  });
});
