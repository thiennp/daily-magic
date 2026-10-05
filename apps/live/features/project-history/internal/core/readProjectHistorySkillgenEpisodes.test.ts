import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { emptyProjectHistorySkillgenEpisodesFile } from "./emptyProjectHistorySkillgenEpisodesFile";
import { readProjectHistorySkillgenEpisodes } from "./readProjectHistorySkillgenEpisodes";
import { writeProjectHistorySkillgenEpisodes } from "./writeProjectHistorySkillgenEpisodes";

describe("readProjectHistorySkillgenEpisodes", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-ep-"));
    layoutState.root = tempRoot;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("returns empty default when missing", () => {
    expect(readProjectHistorySkillgenEpisodes("p1")).toEqual(
      emptyProjectHistorySkillgenEpisodesFile(),
    );
  });

  it("round-trips a write and treats corrupt as empty", () => {
    writeProjectHistorySkillgenEpisodes({
      projectId: "p1",
      file: {
        episodes: [],
        cursorMessageId: "m1",
        cursorSavedAtMs: 42,
        updatedAt: "2026-10-05T00:00:00.000Z",
      },
    });
    expect(readProjectHistorySkillgenEpisodes("p1").cursorMessageId).toBe("m1");
    const filePath = path.join(tempRoot, "p1", "skillgen", "episodes.json");
    fs.writeFileSync(filePath, "{not-json", { mode: 0o600 });
    expect(readProjectHistorySkillgenEpisodes("p1").episodes).toEqual([]);
  });
});
