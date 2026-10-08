import { describe, expect, it } from "vitest";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  mapAgentRunToTaskStatus,
  pickRunFailureReason,
} from "@/lib/projects/tasks/mapAgentRunToTaskStatus";

describe("mapAgentRunToTaskStatus", () => {
  it("maps running and completed", () => {
    expect(mapAgentRunToTaskStatus({ status: AgentRunStatus.RUNNING })).toEqual(
      { status: "in_progress", note: null },
    );
    expect(
      mapAgentRunToTaskStatus({ status: AgentRunStatus.COMPLETED }),
    ).toEqual({ status: "done", note: null });
  });

  it("blocks failed, denied and expired runs with the reason", () => {
    expect(
      mapAgentRunToTaskStatus({
        status: AgentRunStatus.FAILED,
        exitCode: 1,
        reason: "boom",
      }),
    ).toEqual({ status: "blocked", note: "boom" });
    expect(
      mapAgentRunToTaskStatus({ status: AgentRunStatus.DENIED })?.note,
    ).toBe("Run denied.");
    expect(
      mapAgentRunToTaskStatus({ status: AgentRunStatus.EXPIRED })?.status,
    ).toBe("blocked");
  });

  it("returns a stopped run to To do", () => {
    expect(
      mapAgentRunToTaskStatus({ status: AgentRunStatus.FAILED, exitCode: 130 }),
    ).toEqual({ status: "queued", note: null });
  });

  it("ignores pending approval", () => {
    expect(
      mapAgentRunToTaskStatus({ status: AgentRunStatus.PENDING_APPROVAL }),
    ).toBeNull();
  });
});

describe("pickRunFailureReason", () => {
  it("prefers the denial reason, else the last non-marker line", () => {
    expect(pickRunFailureReason("no", "x")).toBe("no");
    expect(
      pickRunFailureReason(
        null,
        "[[AGENT_RUN_WRITER_EXECUTION]]\nagentRunWriterExecutionBackend=x\nreal error",
      ),
    ).toBe("real error");
    expect(pickRunFailureReason(null, null)).toBeNull();
  });
});
