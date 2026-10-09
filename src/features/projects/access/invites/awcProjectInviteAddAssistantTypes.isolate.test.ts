import { describe, expect, it } from "vitest";

import { toAwcProjectInviteAddSelection } from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";

describe("add-assistant selection: isolate checkbox", () => {
  it("carries isolateBots only when ticked", () => {
    expect(toAwcProjectInviteAddSelection("muse", true).isolateBots).toBe(true);
    expect(toAwcProjectInviteAddSelection("muse")).not.toHaveProperty(
      "isolateBots",
    );
  });
});
