import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { computeProjectSkillContentHash } from "@agent-witch/shared/projectSkills";
import { readProjectSkillVersion } from "./readProjectSkillVersion";
import {
  readProjectSkillTombstone,
  tombstoneProjectSkill,
} from "./tombstoneProjectSkill";
import { writeProjectSkillVersion } from "./writeProjectSkillVersion";

describe("writeProjectSkillVersion", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-skill-"));
    layoutState.root = tempRoot;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("writes version + meta, is idempotent, clears tombstone, rejects _ ids", () => {
    const body = "# hello\n";
    const hash = computeProjectSkillContentHash(body);
    tombstoneProjectSkill({
      projectId: "p1",
      skillId: "greet",
      lastContentHash: "sha256:old",
    });
    expect(
      readProjectSkillTombstone({ projectId: "p1", skillId: "greet" }),
    ).not.toBeNull();

    const first = writeProjectSkillVersion({
      projectId: "p1",
      skillId: "greet",
      version: 1,
      body,
    });
    expect(first.contentHash).toBe(hash);
    expect(
      readProjectSkillTombstone({ projectId: "p1", skillId: "greet" }),
    ).toBeNull();

    const second = writeProjectSkillVersion({
      projectId: "p1",
      skillId: "greet",
      version: 1,
      body,
    });
    expect(second.path).toBe(first.path);

    expect(
      readProjectSkillVersion({ projectId: "p1", skillId: "greet", version: 1 }),
    ).toEqual({ body, contentHash: hash });

    expect(() =>
      writeProjectSkillVersion({
        projectId: "p1",
        skillId: "_drafts",
        version: 1,
        body,
      }),
    ).toThrow(/invalid_project_skill_id/);
  });
});
