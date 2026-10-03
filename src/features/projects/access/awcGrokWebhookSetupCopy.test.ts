import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_GROK_WEBHOOK_SETUP_COPY } from "@/features/projects/access/awcGrokWebhookSetupCopy.constant";

const readSrc = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

describe("Grok webhook setup copy", () => {
  it("tells the user to copy the POST URL and key once", () => {
    expect(AWC_GROK_WEBHOOK_SETUP_COPY.instruction).toBe(
      "Copy the routine webhook POST URL and key once. The bot registers them.",
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
