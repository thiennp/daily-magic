import { describe, expect, it } from "vitest";

import { AGENT_RUN_NEXT_ACTIONS_MARKER } from "@/lib/dispatch/agentRunNextActions.constant";
import { splitAgentRunResultForDisplay } from "@/features/reports/utils/splitAgentRunResultForDisplay";

describe("splitAgentRunResultForDisplay", () => {
  it("REPORTS-002 strips next-actions marker and returns button labels", () => {
    const resultOutput = [
      "AGENT-024 verify ok.",
      "",
      AGENT_RUN_NEXT_ACTIONS_MARKER,
      "1. Ask what task you'd like help with today",
      "2. Check current project status on the Daily Magic dashboard",
    ].join("\n");

    expect(splitAgentRunResultForDisplay(resultOutput)).toEqual({
      body: "AGENT-024 verify ok.",
      nextActions: [
        "Ask what task you'd like help with today",
        "Check current project status on the Daily Magic dashboard",
      ],
    });
  });

  it("returns empty next actions when the marker is absent", () => {
    expect(splitAgentRunResultForDisplay("Plain result only.")).toEqual({
      body: "Plain result only.",
      nextActions: [],
    });
  });
});
