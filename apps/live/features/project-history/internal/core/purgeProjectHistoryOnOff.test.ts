import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { ensureProjectDataTree } from "./resolveProjectDataDir";
import { purgeProjectHistoryOnOff } from "./purgeProjectHistoryOnOff";
import { atomicWriteFile0600, ensureDir0700 } from "./atomicWriteFile0600";

describe("purgeProjectHistoryOnOff", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-purge-"));
    layoutState.root = tempRoot;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("deletes history, _drafts, and skillgen but keeps mirror and tombstones", () => {
    const root = ensureProjectDataTree("p1");
    atomicWriteFile0600(path.join(root, "history", "m1.json"), "{}\n");
    ensureDir0700(path.join(root, "skills", "_drafts", "d1"));
    atomicWriteFile0600(
      path.join(root, "skills", "_drafts", "d1", "SKILL.md"),
      "x\n",
    );
    ensureDir0700(path.join(root, "skillgen"));
    atomicWriteFile0600(path.join(root, "skillgen", "budget.json"), "{}\n");
    ensureDir0700(path.join(root, "skills", "keep-me"));
    atomicWriteFile0600(
      path.join(root, "skills", "keep-me", "meta.json"),
      "{}\n",
    );
    ensureDir0700(path.join(root, "skills", "_tombstones"));
    atomicWriteFile0600(
      path.join(root, "skills", "_tombstones", "gone.json"),
      "{}\n",
    );

    const result = purgeProjectHistoryOnOff({ projectId: "p1" });
    expect(result).toEqual({
      removedHistory: true,
      removedDrafts: true,
      removedSkillgen: true,
    });
    expect(fs.existsSync(path.join(root, "history"))).toBe(false);
    expect(fs.existsSync(path.join(root, "skills", "_drafts"))).toBe(false);
    expect(fs.existsSync(path.join(root, "skillgen"))).toBe(false);
    expect(fs.existsSync(path.join(root, "skills", "keep-me", "meta.json"))).toBe(
      true,
    );
    expect(
      fs.existsSync(path.join(root, "skills", "_tombstones", "gone.json")),
    ).toBe(true);
  });
});
