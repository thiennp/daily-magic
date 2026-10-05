import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { readProjectHistoryLearnedPitfalls } from "./readProjectHistoryLearnedPitfalls";
import { writeProjectHistoryLearnedPitfalls } from "./writeProjectHistoryLearnedPitfalls";
import { readProjectHistorySkillgenFlags } from "./readProjectHistorySkillgenFlags";
import { writeProjectHistorySkillgenFlags } from "./writeProjectHistorySkillgenFlags";

describe("learned pitfalls + flags IO", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-pit-"));
    layoutState.root = tempRoot;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("round-trips learned pitfalls and flags at 0600", () => {
    writeProjectHistoryLearnedPitfalls({
      projectId: "p1",
      file: {
        items: [
          {
            id: "hist-ep-1",
            symptom: "too few steps",
            avoidance: "Avoid repeating this history failure (failed validate).",
            sourceEpisodeId: "ep1",
            sourceState: "FAILED_VALIDATE",
            contentHash: "sha256:abc",
            createdAt: "2026-10-05T12:00:00.000Z",
          },
        ],
        updatedAt: "2026-10-05T12:00:00.000Z",
      },
    });
    expect(readProjectHistoryLearnedPitfalls("p1").items).toHaveLength(1);
    const learnedPath = path.join(
      tempRoot,
      "p1",
      "skillgen",
      "learned-pitfalls.json",
    );
    expect(fs.statSync(learnedPath).mode & 0o777).toBe(0o600);

    writeProjectHistorySkillgenFlags({
      projectId: "p1",
      file: {
        historyLearnedPitfalls: {
          active: true,
          count: 1,
          updatedAt: "2026-10-05T12:00:00.000Z",
          summary: "1 recent pitfalls from project history (local)",
        },
        updatedAt: "2026-10-05T12:00:00.000Z",
      },
    });
    expect(readProjectHistorySkillgenFlags("p1").historyLearnedPitfalls?.count).toBe(
      1,
    );
  });
});
