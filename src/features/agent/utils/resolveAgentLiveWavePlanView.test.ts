import { describe, expect, it } from "vitest";

import { resolveAgentLiveWavePlanView } from "@/features/agent/utils/resolveAgentLiveWavePlanView";

describe("resolveAgentLiveWavePlanView", () => {
  it("derives wave status from child agents when wave has no direct status (AGENT-054)", () => {
    const output = [
      "[[WAVE_PLAN]]",
      "W|1|Explore|60",
      "A|1.1|Map auth|30",
      "A|1.2|Map UI|30",
      "[[WAVE_STATUS]]",
      "1.1|done",
      "1.2|working",
    ].join("\n");

    expect(resolveAgentLiveWavePlanView(output)).toEqual([
      {
        kind: "wave",
        id: "1",
        title: "Explore",
        estimateSeconds: 60,
        parentWaveId: null,
        status: "working",
      },
      {
        kind: "agent",
        id: "1.1",
        title: "Map auth",
        estimateSeconds: 30,
        parentWaveId: "1",
        status: "done",
      },
      {
        kind: "agent",
        id: "1.2",
        title: "Map UI",
        estimateSeconds: 30,
        parentWaveId: "1",
        status: "working",
      },
    ]);
  });

  it("marks wave done when all child agents are done", () => {
    const output = [
      "[[WAVE_PLAN]]",
      "W|1|Explore|60",
      "A|1.1|Map auth|30",
      "[[WAVE_STATUS]]",
      "1.1|done",
    ].join("\n");

    const [wave] = resolveAgentLiveWavePlanView(output);
    expect(wave?.status).toBe("done");
  });
});
