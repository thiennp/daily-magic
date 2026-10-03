import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_GROK_WEBHOOK_SETUP_COPY } from "@/features/projects/access/awcGrokWebhookSetupCopy.constant";

const readSrc = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

describe("Grok webhook setup copy", () => {
  it("tells the user to open Grok Bot on desktop and paste the routine POST URL and key", () => {
    expect(AWC_GROK_WEBHOOK_SETUP_COPY.instruction).toBe(
      "Open this bot on desktop (the Grok Bot desktop app). The bot shows two inputs, POST URL and key, and the Grok routine webhook panel link already in its routine status. Copy the POST URL and the key from that panel into the two inputs. The bot registers them.",
    );
    expect(AWC_GROK_WEBHOOK_SETUP_COPY.instruction).toMatch(/Grok Bot/);
    expect(AWC_GROK_WEBHOOK_SETUP_COPY.instruction).toMatch(/Grok routine/);
    expect(AWC_GROK_WEBHOOK_SETUP_COPY.instruction).not.toMatch(
      /grokbot:\/\/|https?:\/\/|sidebar|Slack|Discord|Cursor/i,
    );
  });

  it("is on the invite connect screen without a fake href or sidebar path", () => {
    const source = readSrc(
      "src/features/projects/access/invites/ProjectInviteConnectSteps.tsx",
    );
    expect(source).toContain("AWC_GROK_WEBHOOK_SETUP_COPY");
    expect(source).not.toMatch(/grokbot:\/\//i);
    expect(source).not.toMatch(/sidebar/i);
    expect(source).not.toMatch(/<a\b/i);
  });
});
