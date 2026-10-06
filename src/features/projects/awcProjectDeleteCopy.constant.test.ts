import { describe, expect, it } from "vitest";

import { AWC_PROJECT_DELETE_COPY } from "@/features/projects/awcProjectDeleteCopy.constant";

describe("AWC_PROJECT_DELETE_COPY", () => {
  it("matches layout v2 Settings danger-zone EN (ARTIFACT-STRINGS)", () => {
    expect(AWC_PROJECT_DELETE_COPY.trigger).toBe("Delete project");
    expect(AWC_PROJECT_DELETE_COPY.confirm).toBe("Delete permanently");
    expect(AWC_PROJECT_DELETE_COPY.scope).toContain("members, invites, wake links");
    expect(AWC_PROJECT_DELETE_COPY.scope).toContain("messages");
    expect(AWC_PROJECT_DELETE_COPY.scope).toContain(
      "Repos and files on computers aren't touched",
    );
  });
});
