import { describe, expect, it } from "vitest";

import { resolveProjectSkillReadVersion } from "@/features/project-skill-share/internal/core/resolveProjectSkillReadVersion";

describe("resolveProjectSkillReadVersion", () => {
  it("members get published; managers fall back to latest draft", () => {
    const base = { requestedVersion: undefined, latestVersion: 3 };
    expect(
      resolveProjectSkillReadVersion({
        ...base,
        publishedVersion: 2,
        canManage: false,
      }),
    ).toBe(2);
    expect(
      resolveProjectSkillReadVersion({
        ...base,
        publishedVersion: null,
        canManage: false,
      }),
    ).toBeNull();
    expect(
      resolveProjectSkillReadVersion({
        ...base,
        publishedVersion: null,
        canManage: true,
      }),
    ).toBe(3);
  });
});
