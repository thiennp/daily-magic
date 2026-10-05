import { describe, expect, it } from "vitest";

import { buildProjectSkillAwlRelativeDir } from "@/features/project-skill-share/internal/core/buildProjectSkillAwlRelativeDir";
import { computeProjectSkillContentHash } from "@/features/project-skill-share/internal/core/computeProjectSkillContentHash";
import { deriveProjectSkillIdFromName } from "@/features/project-skill-share/internal/core/deriveProjectSkillIdFromName";
import { formatProjectSkillVersionFileName } from "@/features/project-skill-share/internal/core/formatProjectSkillVersionFileName";
import { isValidProjectSkillId } from "@/features/project-skill-share/internal/core/isValidProjectSkillId";
import { validateProjectSkillBody } from "@/features/project-skill-share/internal/core/validateProjectSkillBody";

describe("project skill content + layout contract", () => {
  it("hashes exact UTF-8 bytes with sha256: prefix (no trim/CRLF)", () => {
    expect(computeProjectSkillContentHash("abc")).toBe(
      "sha256:ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
    expect(computeProjectSkillContentHash("a\r\n")).not.toBe(
      computeProjectSkillContentHash("a\n"),
    );
  });

  it("caps body at 64KB", () => {
    expect(validateProjectSkillBody("x".repeat(64 * 1024))).toBeNull();
    expect(validateProjectSkillBody("x".repeat(64 * 1024 + 1))).toBe(
      "body_too_large",
    );
    expect(validateProjectSkillBody("é".repeat(32 * 1024 + 1))).toBe(
      "body_too_large",
    );
    expect(validateProjectSkillBody("   ")).toBe("body_required");
  });

  it("skill ids are slugs, never _-prefixed", () => {
    expect(isValidProjectSkillId("deploy-checklist")).toBe(true);
    expect(isValidProjectSkillId("_drafts")).toBe(false);
    expect(isValidProjectSkillId("Bad Id")).toBe(false);
    expect(deriveProjectSkillIdFromName("  Deploy Checklist! ")).toBe(
      "deploy-checklist",
    );
    expect(deriveProjectSkillIdFromName("!!!")).toBeNull();
  });

  it("AWL layout: project-data/<projectId>/skills/<skillId>/v000N.md", () => {
    expect(
      buildProjectSkillAwlRelativeDir({ projectId: "p1", skillId: "s1" }),
    ).toBe("project-data/p1/skills/s1");
    expect(formatProjectSkillVersionFileName(7)).toBe("v0007.md");
  });
});
