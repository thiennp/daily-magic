import { describe, expect, it } from "vitest";

import { PROJECT_PAGE_MEMBERS_COPY } from "@/features/projects/projectPageMembersCopy.constant";

describe("PROJECT_PAGE_MEMBERS_COPY.invitePrompt", () => {
  it("reads outcome-first when no assistant type is picked", () => {
    expect(PROJECT_PAGE_MEMBERS_COPY.invitePrompt(null)).toBe(
      "Paste this prompt into your assistant. It shows once, so copy it now.",
    );
  });
});
