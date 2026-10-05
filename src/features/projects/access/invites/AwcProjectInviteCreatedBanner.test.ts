import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";

function readSource(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

describe("Project Access invites: Copy prompt only", () => {
  it("created banner shows Copy prompt and Dismiss, not the raw invite URL", () => {
    const banner = readSource(
      "src/features/projects/access/invites/AwcProjectInviteCreatedBanner.tsx",
    );
    expect(banner).toContain("copy.invitesCopyPrompt");
    expect(banner).toContain("Dismiss");
    expect(banner).not.toMatch(/>\s*\{createdInviteUrl\}\s*</);
    expect(banner).not.toContain("<code");
    // The copied prompt still carries what the bot needs to redeem.
    expect(banner).toContain("inviteUrl: createdInviteUrl");
    expect(banner).toContain("token: createdInviteToken");
  });

  it("invite copy has no link wording", () => {
    const inviteCopy = [
      AWC_PROJECT_ACCESS_COPY.invitesIntro,
      AWC_PROJECT_ACCESS_COPY.invitesTokenOnceNote,
      AWC_PROJECT_ACCESS_COPY.invitesCreatedOnce,
    ].join("\n");
    expect(inviteCopy.toLowerCase()).not.toMatch(/one-time link|\blinks?\b/);
    expect(inviteCopy).not.toMatch(/specialist bots/i);
    expect(AWC_PROJECT_ACCESS_COPY.invitesIntro).toMatch(/copied prompt/i);
    expect(AWC_PROJECT_ACCESS_COPY.invitesCopyPrompt).toBe("Copy prompt");
  });
});
