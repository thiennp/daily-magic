import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { writeProjectSkillVersion } from "./writeProjectSkillVersion";
import {
  readProjectSkillTombstone,
  tombstoneProjectSkill,
} from "./tombstoneProjectSkill";

describe("tombstoneProjectSkill", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-tomb-"));
    layoutState.root = tempRoot;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("removes the skill dir, writes tombstone, and is idempotent", () => {
    writeProjectSkillVersion({
      projectId: "p1",
      skillId: "greet",
      version: 1,
      body: "x",
    });
    const first = tombstoneProjectSkill({
      projectId: "p1",
      skillId: "greet",
      lastContentHash: "sha256:abc",
    });
    expect(first.removed).toBe(true);
    const tomb = readProjectSkillTombstone({ projectId: "p1", skillId: "greet" });
    expect(tomb?.skillId).toBe("greet");
    expect(tomb?.lastContentHash).toBe("sha256:abc");

    const second = tombstoneProjectSkill({
      projectId: "p1",
      skillId: "greet",
      lastContentHash: "sha256:abc",
    });
    expect(second.removed).toBe(false);

    expect(() =>
      tombstoneProjectSkill({
        projectId: "p1",
        skillId: "_x",
        lastContentHash: "sha256:abc",
      }),
    ).toThrow(/invalid_project_skill_id/);
  });
});
