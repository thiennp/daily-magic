import { describe, expect, it } from "vitest";

import { formatAgentLiveProgressCheckpointRecord } from "@/features/agent/utils/formatAgentLiveProgressCheckpointRecord";
import { parseAgentLiveProgressCheckpointExchanges } from "@/features/agent/utils/parseAgentLiveProgressCheckpointExchanges";

describe("parseAgentLiveProgressCheckpointExchanges", () => {
  it("parses structured checkpoint Q&A records", () => {
    const output = formatAgentLiveProgressCheckpointRecord({
      question: "Which folder?",
      answer: "src/features",
    });

    expect(parseAgentLiveProgressCheckpointExchanges(output)).toEqual([
      {
        question: "Which folder?",
        answer: "src/features",
        offset: expect.any(Number),
      },
    ]);
  });
});
