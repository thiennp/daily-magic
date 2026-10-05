import { describe, expect, it } from "vitest";

import { decideProjectSkillPullAction } from "@/features/project-skill-share/internal/core/decideProjectSkillPullAction";

describe("decideProjectSkillPullAction", () => {
  it("skips when local meta hash matches AWC", () => {
    expect(
      decideProjectSkillPullAction({
        expectedHash: "sha256:abc",
        localContentHash: "sha256:abc",
      }),
    ).toBe("skip");
  });

  it("fetch_write when missing or hash differs", () => {
    expect(
      decideProjectSkillPullAction({
        expectedHash: "sha256:abc",
        localContentHash: null,
      }),
    ).toBe("fetch_write");
    expect(
      decideProjectSkillPullAction({
        expectedHash: "sha256:abc",
        localContentHash: "sha256:other",
      }),
    ).toBe("fetch_write");
  });
});
