import { describe, expect, it } from "vitest";

import { decideProjectSkillPublishTransition } from "@/features/project-skill-share/internal/core/decideProjectSkillPublishTransition";
import type { ProjectSkillRecord } from "@/features/project-skill-share/internal/core/projectSkill.type";

const published = {
  state: "published",
  publishedVersion: 2,
  contentHash: "sha256:old",
} as ProjectSkillRecord;

describe("decideProjectSkillPublishTransition", () => {
  it("publish moves the live version", () => {
    expect(
      decideProjectSkillPublishTransition({
        existing: published,
        newVersion: 3,
        asDraft: false,
        contentHash: "h3",
      }),
    ).toEqual({ state: "published", publishedVersion: 3, contentHash: "h3" });
  });

  it("draft keeps a published skill live; new skill stays draft", () => {
    expect(
      decideProjectSkillPublishTransition({
        existing: published,
        newVersion: 3,
        asDraft: true,
        contentHash: "h3",
      }),
    ).toEqual({
      state: "published",
      publishedVersion: 2,
      contentHash: "sha256:old",
    });
    expect(
      decideProjectSkillPublishTransition({
        existing: null,
        newVersion: 1,
        asDraft: true,
        contentHash: "h1",
      }),
    ).toEqual({ state: "draft", publishedVersion: null, contentHash: null });
  });
});
