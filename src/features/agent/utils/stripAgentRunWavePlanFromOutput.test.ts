import { describe, expect, it } from "vitest";

import { stripAgentRunWavePlanFromOutput } from "@/features/agent/utils/stripAgentRunWavePlanFromOutput";

describe("stripAgentRunWavePlanFromOutput", () => {
  it("removes WAVE_PLAN and WAVE_STATUS blocks (AGENT-054)", () => {
    const output = [
      "hello",
      "[[WAVE_PLAN]]",
      "W|1|Explore|60",
      "A|1.1|Map|30",
      "[[WAVE_STATUS]]",
      "1.1|working",
      "[[PROGRESS]]",
      "Reading files",
    ].join("\n");

    const stripped = stripAgentRunWavePlanFromOutput(output);
    expect(stripped).not.toContain("[[WAVE_PLAN]]");
    expect(stripped).not.toContain("[[WAVE_STATUS]]");
    expect(stripped).not.toContain("W|1|Explore|60");
    expect(stripped).toContain("hello");
    expect(stripped).toContain("[[PROGRESS]]");
    expect(stripped).toContain("Reading files");
  });

  it("handles a WAVE_PLAN-only output, returning empty string", () => {
    const output = ["[[WAVE_PLAN]]", "W|1|Explore|60", "A|1.1|Map|30"].join(
      "\n",
    );

    const stripped = stripAgentRunWavePlanFromOutput(output);
    expect(stripped).toBe("");
  });

  it("keeps the final answer after the last wave block (FAIL2 a76d46ac)", () => {
    const output = [
      "[[WAVE_PLAN]] W|1|Setup and specification|60",
      "A|1.1|Confirm vibe and app folder|30",
      "[[WAVE_STATUS]]",
      "1.1|done",
      "  2.1|working",
      "Feature Complete: Dark Mode Toggle",
      "Added the toggle to index.html.",
    ].join("\n");

    expect(stripAgentRunWavePlanFromOutput(output)).toBe(
      "Feature Complete: Dark Mode Toggle\nAdded the toggle to index.html.",
    );
  });
});
