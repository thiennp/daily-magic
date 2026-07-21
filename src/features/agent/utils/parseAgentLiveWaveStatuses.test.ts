import { describe, expect, it } from "vitest";

import { parseAgentLiveWaveStatuses } from "@/features/agent/utils/parseAgentLiveWaveStatuses";

describe("parseAgentLiveWaveStatuses", () => {
  it("returns empty when no status marker is present", () => {
    expect(parseAgentLiveWaveStatuses("[[WAVE_PLAN]]\nW|1|A|10")).toEqual(
      new Map(),
    );
  });

  it("merges status blocks with later lines winning (AGENT-054)", () => {
    const output = [
      "[[WAVE_STATUS]]",
      "1.1|working",
      "1.2|pending",
      "[[PROGRESS]]",
      "Working",
      "[[WAVE_STATUS]]",
      "1.1|done",
      "1.2|working",
    ].join("\n");

    expect(parseAgentLiveWaveStatuses(output)).toEqual(
      new Map([
        ["1.1", "done"],
        ["1.2", "working"],
      ]),
    );
  });
});
