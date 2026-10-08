import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_PROJECT_INVITE_SHORT_PROMPT_COPY } from "@/features/projects/access/invites/awcProjectInviteShortPromptCopy.constant";

const banner = readFileSync(
  join(
    process.cwd(),
    "src/features/projects/access/invites/AwcProjectInviteCreatedBanner.tsx",
  ),
  "utf8",
);

describe("invite created banner: short Copy prompt + full-prompt fallback", () => {
  it("uses Product's locked control label and toasts", () => {
    expect(AWC_PROJECT_INVITE_SHORT_PROMPT_COPY).toEqual({
      fallbackLink: "Assistant can't open links? Copy full prompt",
      copiedToast: "Prompt copied",
      promptPreviewLabel: "Invite prompt",
      done: "Done",
      fullCopiedToast: "Full prompt copied",
    });
  });

  it("Copy prompt copies the short prompt; the fallback copies today's full prompt", () => {
    expect(banner).toContain(
      "buildProjectInviteShortPrompt({ token: joinToken, projectName })",
    );
    expect(banner).toContain("shortCopy.copiedToast");
    expect(banner).toContain("shortCopy.fallbackLink");
    expect(banner).toContain("buildFullPrompt()");
    expect(banner).toContain("shortCopy.fullCopiedToast");
    expect(banner).toMatch(
      /buildFullPrompt = \(\) =>\s+buildProjectInviteAgentPrompt\(/,
    );
  });
});
