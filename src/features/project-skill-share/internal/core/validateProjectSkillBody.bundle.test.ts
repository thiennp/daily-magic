import {
  buildSkillBundle,
  embedSkillBundle,
} from "@agent-witch/shared/projectSkills";
import { describe, expect, it } from "vitest";

import { PROJECT_SKILL_MAX_BODY_BYTES } from "@/features/project-skill-share/internal/core/projectSkillShare.constant";
import { validateProjectSkillBody } from "@/features/project-skill-share/internal/core/validateProjectSkillBody";

const script = (content: string) => ({
  name: "s",
  file: "s.sh",
  description: "d",
  params: [],
  permissions: { write: false, network: false },
  content,
});

const bundleOf = (content: string) => {
  const built = buildSkillBundle([script(content)]);
  if (!built.ok) throw new Error(built.reason);
  return built.bundle;
};

describe("validateProjectSkillBody with a script bundle", () => {
  it("accepts a verified bundle even when the whole body exceeds 64 KB", () => {
    const body = embedSkillBundle(
      "# Skill\n",
      bundleOf(`#${"a".repeat(60_000)}\n`),
    );
    expect(Buffer.byteLength(body)).toBeLessThan(
      PROJECT_SKILL_MAX_BODY_BYTES * 2,
    );
    const big = embedSkillBundle(
      "# Skill\n",
      bundleOf(`#${"a".repeat(60_000)}\n`),
    );
    expect(validateProjectSkillBody(big)).toBeNull();
  });

  it("still caps the SKILL.md text at 64 KB", () => {
    const body = embedSkillBundle(
      `# ${"x".repeat(70_000)}`,
      bundleOf("echo hi\n"),
    );
    expect(validateProjectSkillBody(body)).toBe("body_too_large");
  });

  it("rejects a tampered bundle", () => {
    const body = embedSkillBundle("# Skill\n", bundleOf("echo hi\n")).replace(
      "echo hi",
      "echo pwned",
    );
    expect(validateProjectSkillBody(body)).toBe("bundle_invalid");
  });

  it("keeps the plain-body behaviour", () => {
    expect(validateProjectSkillBody("# ok")).toBeNull();
    expect(
      validateProjectSkillBody("x".repeat(PROJECT_SKILL_MAX_BODY_BYTES + 1)),
    ).toBe("body_too_large");
  });
});
