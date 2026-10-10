import { describe, expect, it } from "vitest";

import {
  INTERRUPTED_SCAN_NOTE,
  visibleAutoSkillsNote,
} from "@/features/projects/library/utils/visibleAutoSkillsNote";

const NOW = Date.parse("2026-10-10T12:00:00Z");
const base = { scanning: false, nowMs: NOW };

describe("visibleAutoSkillsNote", () => {
  it("keeps a final summary", () => {
    const note =
      "Scanned 3 commits on this computer · nothing worth saving as a skill yet.";
    expect(
      visibleAutoSkillsNote({
        ...base,
        note,
        lastCheckedAt: "2026-10-10T10:00:00Z",
      }),
    ).toBe(note);
  });

  it("keeps a fresh progress line and any progress line while scanning", () => {
    const note = "Checking commit 2 of 5…";
    expect(
      visibleAutoSkillsNote({
        ...base,
        note,
        lastCheckedAt: "2026-10-10T11:59:00Z",
      }),
    ).toBe(note);
    expect(
      visibleAutoSkillsNote({
        note,
        lastCheckedAt: "2026-10-10T08:00:00Z",
        scanning: true,
        nowMs: NOW,
      }),
    ).toBe(note);
  });

  it("turns an old progress line into an interrupted hint", () => {
    for (const note of ["Checking commit 3 of 3…", "Starting: 5 commits…"]) {
      expect(
        visibleAutoSkillsNote({
          ...base,
          note,
          lastCheckedAt: "2026-10-10T11:50:00Z",
        }),
      ).toBe(INTERRUPTED_SCAN_NOTE);
    }
  });
});
