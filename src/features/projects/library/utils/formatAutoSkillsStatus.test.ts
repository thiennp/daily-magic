import { describe, expect, it } from "vitest";

import type { AutoSkillsOverview } from "@/features/project-auto-skills/public-api/types";
import { formatAutoSkillsStatus } from "@/features/projects/library/utils/formatAutoSkillsStatus";

const NOW = Date.parse("2026-10-08T12:00:00Z");

const overview = (patch: Partial<AutoSkillsOverview>): AutoSkillsOverview => ({
  enabled: true,
  judgePref: "auto",
  judgeAgent: null,
  publishMode: "draft",
  judgeKind: "agent",
  judgeLabel: "your computer agent: Codex",
  pausedReason: null,
  statusNote: null,
  lastCheckedAt: "2026-10-08T11:58:00Z",
  pending: [],
  autoSkillIds: [],
  ...patch,
});

describe("formatAutoSkillsStatus", () => {
  it("shows judge, last check and waiting questions", () => {
    const status = formatAutoSkillsStatus(
      overview({ pending: [{ id: "1" } as never] }),
      NOW,
    );
    expect(status.line).toBe(
      "Auto skills are on · Judged by your computer agent: Codex · last checked 2 min ago · 1 question waiting",
    );
    expect(status.paused).toBe(false);
  });

  it("shows the paused reason instead of hiding it", () => {
    const status = formatAutoSkillsStatus(
      overview({
        pausedReason: "Auto skills paused: no coding tool is signed in.",
      }),
      NOW,
    );
    expect(status).toEqual({
      line: "Auto skills paused: no coding tool is signed in.",
      paused: true,
    });
  });

  it("says off when the owner switched it off", () => {
    expect(formatAutoSkillsStatus(overview({ enabled: false }), NOW).line).toBe(
      "Auto skills are off",
    );
  });

  it("waits for the first finished task when never checked", () => {
    expect(
      formatAutoSkillsStatus(
        overview({ lastCheckedAt: null, judgeLabel: null }),
        NOW,
      ).line,
    ).toBe("Auto skills are on · waiting for the first finished task");
  });
});
