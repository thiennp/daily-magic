import { describe, expect, it } from "vitest";

import { computeProjectSkillContentHash } from "@/features/project-skill-share/internal/core/computeProjectSkillContentHash";
import { decideProjectSkillRehomeAction } from "@/features/project-skill-share/internal/core/decideProjectSkillRehomeAction";

describe("decideProjectSkillRehomeAction", () => {
  const body = "skill body";
  const hash = computeProjectSkillContentHash(body);
  it("verified when AWC intact", () => {
    expect(
      decideProjectSkillRehomeAction({
        expectedHash: hash,
        awcBody: body,
        local: null,
      }),
    ).toBe("verified");
    expect(
      decideProjectSkillRehomeAction({
        expectedHash: hash,
        awcBody: body,
        local: { body, contentHash: hash },
      }),
    ).toBe("verified");
  });
  it("uploads exact local bytes when AWC is missing or corrupt", () => {
    expect(
      decideProjectSkillRehomeAction({
        expectedHash: hash,
        awcBody: null,
        local: { body, contentHash: hash },
      }),
    ).toBe("upload_from_local");
    expect(
      decideProjectSkillRehomeAction({
        expectedHash: hash,
        awcBody: "corrupt",
        local: { body, contentHash: hash },
      }),
    ).toBe("upload_from_local");
  });
  it("fails when nothing restores the expected bytes or local diverged", () => {
    expect(
      decideProjectSkillRehomeAction({
        expectedHash: hash,
        awcBody: null,
        local: null,
      }),
    ).toBe("missing");
    const other = computeProjectSkillContentHash("other");
    expect(
      decideProjectSkillRehomeAction({
        expectedHash: hash,
        awcBody: body,
        local: { body: "other", contentHash: other },
      }),
    ).toBe("local_diverged");
  });
});
