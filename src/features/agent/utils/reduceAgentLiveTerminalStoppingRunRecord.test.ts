import { describe, expect, it } from "vitest";

import {
  beginAgentLiveTerminalSession,
  reduceAgentLiveTerminalMessage,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import { resolveAgentLiveRunOutcome } from "@/features/agent/utils/resolveAgentLiveRunOutcome";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const RUN_ID = "1a5f003f-0000-4000-8000-000000000001";

/**
 * 662eae04 (Testi run 3): the floater stayed on "Stopping… waiting for the
 * first alive signal" while the server already had the run Stopped. The
 * stopping re-read delivers this AGENT_RUN_RECORD; it must end the floater.
 */
describe("stopping floater + server run record (662eae04)", () => {
  it("ends a stopping session as Stopped, not stuck and not Failed", () => {
    const stopping = {
      ...beginAgentLiveTerminalSession("agy -p task", "antigravity", "dev-1"),
      activeRunId: RUN_ID,
      status: "stopping" as const,
    };

    const next = reduceAgentLiveTerminalMessage(stopping, {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD,
      payload: {
        run: {
          id: RUN_ID,
          status: "failed",
          resultOutput: "error: interrupted Stopped by user.",
          resultExitCode: 130,
        },
      },
    });

    expect(next.status).toBe("finished");
    expect(
      resolveAgentLiveRunOutcome({ status: next.status, output: next.output })
        .kind,
    ).toBe("stopped");
  });
});
