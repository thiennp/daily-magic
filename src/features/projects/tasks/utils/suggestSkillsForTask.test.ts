import { describe, expect, it } from "vitest";

import type { ProjectSkillView } from "@/features/project-skill-share/public-api/types";

import {
  buildSkillHintLine,
  suggestSkillsForTask,
} from "@/features/projects/tasks/utils/suggestSkillsForTask";

const skill = (patch: Partial<ProjectSkillView>): ProjectSkillView => ({
  skillId: "run-build",
  kind: "skill",
  name: "Run the production build",
  description: "Install dependencies and run npm build, fix errors",
  state: "published",
  publishedVersion: 1,
  latestVersion: 1,
  contentHash: null,
  updatedAt: "2026-10-08T10:00:00Z",
  isPublisher: true,
  canRevoke: true,
  canPublish: true,
  latestAuthorName: null,
  ...patch,
});

describe("suggestSkillsForTask", () => {
  it("suggests a published skill whose name words appear in the prompt", () => {
    const result = suggestSkillsForTask(
      "Run the production build and fix the errors",
      [
        skill({}),
        skill({
          skillId: "other",
          name: "Deploy to staging",
          description: null,
        }),
      ],
    );
    expect(result.map((s) => s.skillId)).toEqual(["run-build"]);
  });

  it("ignores drafts, playbooks and revoked skills", () => {
    const prompt = "Run the production build and fix the errors";
    expect(
      suggestSkillsForTask(prompt, [
        skill({ state: "draft" }),
        skill({ kind: "playbook" }),
        skill({ state: "revoked" }),
      ]),
    ).toEqual([]);
  });

  it("returns nothing for short prompts and weak matches", () => {
    expect(suggestSkillsForTask("build", [skill({})])).toEqual([]);
    expect(
      suggestSkillsForTask("Translate the welcome screen to German", [
        skill({}),
      ]),
    ).toEqual([]);
  });

  it("returns at most three, best match first", () => {
    const many = ["a", "b", "c", "d"].map((id, i) =>
      skill({
        skillId: id,
        name: i === 2 ? "Production build errors" : "Production build",
      }),
    );
    const result = suggestSkillsForTask(
      "Production build errors need fixing today",
      many,
    );
    expect(result).toHaveLength(3);
    expect(result[0]?.skillId).toBe("c");
  });
});

describe("buildSkillHintLine", () => {
  it("names the skill and points at skills_run", () => {
    expect(buildSkillHintLine(skill({}))).toContain("skillId: run-build");
    expect(buildSkillHintLine(skill({}))).toContain("skills_run");
  });
});
