import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { persistProjectHistorySkillgenReviewFlag } from "./persistProjectHistorySkillgenReviewFlag";
import { readProjectHistorySkillgenFlags } from "./readProjectHistorySkillgenFlags";
import { writeProjectHistorySkillgenFlags } from "./writeProjectHistorySkillgenFlags";

describe("persistProjectHistorySkillgenReviewFlag", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "skillgen-flag-"));
    layoutState.root = tempRoot;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("writes miningPaused notify when cap reached and preserves pitfalls", () => {
    writeProjectHistorySkillgenFlags({
      projectId: "p-cap",
      file: {
        historyLearnedPitfalls: {
          active: true,
          count: 2,
          updatedAt: "2026-01-01T00:00:00.000Z",
          summary: "keep me",
        },
        skillgenDraftsReview: null,
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    });
    persistProjectHistorySkillgenReviewFlag({
      projectId: "p-cap",
      reviewFlag: {
        draftWaitingCount: 20,
        capReached: true,
        miningPaused: true,
      },
      nowMs: Date.parse("2026-10-06T12:00:00.000Z"),
    });
    const flags = readProjectHistorySkillgenFlags("p-cap");
    expect(flags.historyLearnedPitfalls?.summary).toBe("keep me");
    expect(flags.skillgenDraftsReview?.miningPaused).toBe(true);
    expect(flags.skillgenDraftsReview?.openDraftCount).toBe(20);
    expect(flags.skillgenDraftsReview?.summary).toMatch(/Mining paused/);
  });

  it("writes waiting flag under the cap and clears when zero", () => {
    persistProjectHistorySkillgenReviewFlag({
      projectId: "p-wait",
      reviewFlag: {
        draftWaitingCount: 3,
        capReached: false,
        miningPaused: false,
      },
      nowMs: 1_000,
    });
    expect(
      readProjectHistorySkillgenFlags("p-wait").skillgenDraftsReview
        ?.openDraftCount,
    ).toBe(3);

    persistProjectHistorySkillgenReviewFlag({
      projectId: "p-wait",
      reviewFlag: {
        draftWaitingCount: 0,
        capReached: false,
        miningPaused: false,
      },
      nowMs: 2_000,
    });
    expect(readProjectHistorySkillgenFlags("p-wait").skillgenDraftsReview).toBeNull();
  });
});
