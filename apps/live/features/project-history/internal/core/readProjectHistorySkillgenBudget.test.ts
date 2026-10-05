import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { readProjectHistorySkillgenBudget } from "./readProjectHistorySkillgenBudget";
import { writeProjectHistorySkillgenBudget } from "./writeProjectHistorySkillgenBudget";
import { utcDayKey } from "./utcDayKey";

describe("readProjectHistorySkillgenBudget", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-bud-"));
    layoutState.root = tempRoot;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("returns empty default when missing and rolls day key", () => {
    const nowMs = Date.parse("2026-10-05T12:00:00.000Z");
    const budget = readProjectHistorySkillgenBudget({ projectId: "p1", nowMs });
    expect(budget.dayKey).toBe(utcDayKey(nowMs));
    expect(budget.tokensUsedToday).toBe(0);

    writeProjectHistorySkillgenBudget({
      projectId: "p1",
      budget: {
        dayKey: "2026-10-04",
        tokensUsedToday: 50_000,
        lastClosedAtMs: 1,
        updatedAt: "2026-10-04T00:00:00.000Z",
      },
    });
    const rolled = readProjectHistorySkillgenBudget({ projectId: "p1", nowMs });
    expect(rolled.tokensUsedToday).toBe(0);
    expect(rolled.lastClosedAtMs).toBe(1);
  });
});
