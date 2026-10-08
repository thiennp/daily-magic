import { describe, expect, it } from "vitest";

import { stripAgentRunReportMarkerFragments } from "./stripAgentRunReportMarkerFragments";

describe("stripAgentRunReportMarkerFragments", () => {
  it("removes collapsed meta completely", () => {
    const input =
      "[[WAVE_PLAN]] W|1|Implement dark mode|30 A|1.1|Add dark-mode toggle to index.html|30 W|2|Document feature|20 A|2.1|Add f…";
    const result = stripAgentRunReportMarkerFragments(input);
    expect(result).not.toContain("[[");
    expect(result).not.toContain("W|");
    expect(result).not.toContain("A|");
    expect(result).toBe("");
  });

  it("cleans garbled live text", () => {
    const input =
      'agent-witch@linux ~ $ agy --sandbox -p "Run workflow"\n|1.1|Confirm vibe and folder|working 2.1|pending\n3.[PROGRESS]]\nInspected 12 files.\n[[AWAITING_INPUT]]\nCan you confirm th';
    const result = stripAgentRunReportMarkerFragments(input);
    expect(result).not.toContain("[");
    expect(result).not.toContain("|working");
    expect(result).not.toContain("|pending");
    expect(result).toContain("Inspected 12 files.");
    expect(result).toContain("Can you confirm th");

    // We expect 3 lines: the CLI string, the message, and the confirmation
    expect(result).toBe(
      'agent-witch@linux ~ $ agy --sandbox -p "Run workflow"\nInspected 12 files.\nCan you confirm th',
    );
  });

  it("leaves plain prose unchanged", () => {
    const input =
      "Added dark-mode toggle to index.html and documented it in README.";
    expect(stripAgentRunReportMarkerFragments(input)).toBe(input);
  });
});
