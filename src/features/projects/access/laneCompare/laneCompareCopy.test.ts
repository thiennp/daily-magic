import { describe, expect, it } from "vitest";

import { LANE_COMPARE_COPY } from "@/features/projects/access/laneCompare/laneCompareCopy.constant";

const FORBIDDEN =
  /\bLane A\b|\bLane B\b|\bMCP\b|\bOAuth\b|\btoken\b|\bCLI\b|\bbot\b/i;

function collectStrings(value: unknown, out: string[]): void {
  if (typeof value === "string") {
    out.push(value);
    return;
  }
  if (value && typeof value === "object") {
    for (const child of Object.values(value as Record<string, unknown>)) {
      collectStrings(child, out);
    }
  }
}

describe("LANE_COMPARE_COPY (§2a)", () => {
  it("matches Product EN keys exactly", () => {
    expect(LANE_COMPARE_COPY.title).toBe("Two ways to use local AI tools");
    expect(LANE_COMPARE_COPY.codingTools.label).toBe(
      "Coding tools on this computer",
    );
    expect(LANE_COMPARE_COPY.codingTools.when).toBe(
      "AgentWitch Local starts the tool for a task on this computer. You may need to approve the run.",
    );
    expect(LANE_COMPARE_COPY.codingTools.where).toBe(
      "Team → Computers → Add to project",
    );
    expect(LANE_COMPARE_COPY.assistant.label).toBe("Connect as an assistant");
    expect(LANE_COMPARE_COPY.assistant.when).toContain("Cursor Desktop");
    expect(LANE_COMPARE_COPY.assistant.where).toBe("Invite / Connect assistant");
    expect(LANE_COMPARE_COPY.diff.results).toContain("computer limits");
    expect(LANE_COMPARE_COPY.diff.approvals).toContain(
      "Allow runs without approval",
    );
    expect(LANE_COMPARE_COPY.help.computers).toContain("coding tools");
    expect(LANE_COMPARE_COPY.help.invite).toContain(
      "join as assistants here",
    );
  });

  it("has no forbidden jargon in visible strings", () => {
    const strings: string[] = [];
    collectStrings(LANE_COMPARE_COPY, strings);
    for (const s of strings) {
      expect(s, s).not.toMatch(FORBIDDEN);
    }
    expect(strings.some((s) => s.includes("AgentWitch"))).toBe(true);
  });
});
