import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import {
  countProjectHistorySkillgenOpenDrafts,
  writeProjectHistorySkillgenDraft,
} from "./writeProjectHistorySkillgenDraft";

describe("writeProjectHistorySkillgenDraft", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-draft-"));
    layoutState.root = tempRoot;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("writes SKILL.md and meta.json under _drafts with 0600", () => {
    const result = writeProjectHistorySkillgenDraft({
      projectId: "p1",
      draftId: "draft-1",
      skillMarkdown: "---\nname: x\n---\nbody\n",
      episodeId: "ep1",
      sourceMessageIds: ["m1"],
      name: "x",
      description: "desc",
    });
    expect(fs.existsSync(result.skillPath)).toBe(true);
    expect(fs.existsSync(result.metaPath)).toBe(true);
    expect(result.contentHash.startsWith("sha256:")).toBe(true);
    const mode = fs.statSync(result.skillPath).mode & 0o777;
    expect(mode).toBe(0o600);
    expect(countProjectHistorySkillgenOpenDrafts("p1")).toBe(1);
  });

  it("rejects path-like draft ids", () => {
    expect(() =>
      writeProjectHistorySkillgenDraft({
        projectId: "p1",
        draftId: "../evil",
        skillMarkdown: "x",
        episodeId: "ep1",
        sourceMessageIds: [],
        name: "x",
        description: "d",
      }),
    ).toThrow("invalid_draft_id");
  });
});
