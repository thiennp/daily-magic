import { describe, expect, it } from "vitest";

import { parseAgentLiveWavePlan } from "@/features/agent/utils/parseAgentLiveWavePlan";

describe("parseAgentLiveWavePlan", () => {
  it("returns empty when no wave plan marker is present", () => {
    expect(parseAgentLiveWavePlan("hello\n[[PROGRESS]]\nStep")).toEqual([]);
  });

  it("parses the latest WAVE_PLAN block with waves and agents (AGENT-054)", () => {
    const output = [
      "[[WAVE_PLAN]]",
      "W|1|Explore|60",
      "A|1.1|Map auth|30",
      "W|2|Implement|120",
      "A|2.1|Write UI|90",
      "[[PROGRESS]]",
      "Reading",
      "[[WAVE_PLAN]]",
      "W|1|Explore codebase|45",
      "A|1.1|Find routes|20",
      "A|1.2|Find tests|25",
    ].join("\n");

    expect(parseAgentLiveWavePlan(output)).toEqual([
      {
        kind: "wave",
        id: "1",
        title: "Explore codebase",
        estimateSeconds: 45,
        parentWaveId: null,
      },
      {
        kind: "agent",
        id: "1.1",
        title: "Find routes",
        estimateSeconds: 20,
        parentWaveId: "1",
      },
      {
        kind: "agent",
        id: "1.2",
        title: "Find tests",
        estimateSeconds: 25,
        parentWaveId: "1",
      },
    ]);
  });

  it("skips invalid plan lines", () => {
    const output = [
      "[[WAVE_PLAN]]",
      "not-a-plan",
      "W|1|Valid|30",
      "A||Missing title|10",
      "W|2|Zero|0",
    ].join("\n");

    expect(parseAgentLiveWavePlan(output)).toEqual([
      {
        kind: "wave",
        id: "1",
        title: "Valid",
        estimateSeconds: 30,
        parentWaveId: null,
      },
    ]);
  });
});
