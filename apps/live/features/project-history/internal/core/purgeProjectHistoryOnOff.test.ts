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

  it("deletes _drafts and skillgen but keeps history messages, mirror and tombstones", () => {
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
      removedDrafts: true,
      removedSkillgen: true,
    });
    // Chat-retention rule: the message archive is never purged.
    expect(fs.existsSync(path.join(root, "history", "m1.json"))).toBe(true);
    expect(fs.existsSync(path.join(root, "skills", "_drafts"))).toBe(false);
    expect(fs.existsSync(path.join(root, "skillgen"))).toBe(false);
    expect(
      fs.existsSync(path.join(root, "skillgen", "learned-pitfalls.json")),
    ).toBe(false);
    expect(fs.existsSync(path.join(root, "skillgen", "flags.json"))).toBe(false);
    expect(fs.existsSync(path.join(root, "skills", "keep-me", "meta.json"))).toBe(
      true,
    );
    expect(
      fs.existsSync(path.join(root, "skills", "_tombstones", "gone.json")),
    ).toBe(true);
  });

  it("keeps every history/ message record and state.json on an OFF purge", () => {
    const root = ensureProjectDataTree("p1");
    for (const id of ["m1", "m2", "m3"]) {
      atomicWriteFile0600(path.join(root, "history", `${id}.json`), `{"messageId":"${id}"}\n`);
    }
    atomicWriteFile0600(path.join(root, "history", "state.json"), '{"state":"off"}\n');
    atomicWriteFile0600(path.join(root, "skillgen", "episodes.json"), "{}\n");

    purgeProjectHistoryOnOff({ projectId: "p1" });

    expect(fs.readdirSync(path.join(root, "history")).sort()).toEqual([
      "m1.json",
      "m2.json",
      "m3.json",
      "state.json",
    ]);
    expect(fs.readFileSync(path.join(root, "history", "m2.json"), "utf8")).toBe(
      '{"messageId":"m2"}\n',
    );
    expect(fs.existsSync(path.join(root, "skillgen"))).toBe(false);
  });

  it("is a no-op when only the message archive exists", () => {
    const root = path.join(tempRoot, "p2");
    ensureDir0700(path.join(root, "history"));
    atomicWriteFile0600(path.join(root, "history", "m1.json"), "{}\n");
    expect(purgeProjectHistoryOnOff({ projectId: "p2" })).toEqual({
      removedDrafts: false,
      removedSkillgen: false,
    });
    expect(fs.existsSync(path.join(root, "history", "m1.json"))).toBe(true);
  });
});
