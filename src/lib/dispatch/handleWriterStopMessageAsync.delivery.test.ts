import { beforeEach, describe, expect, it, vi } from "vitest";

import { cancelQueuedAgentRunOutbox } from "@/lib/agentWitch/cancelQueuedAgentRunOutbox";
import { enqueueAgentRunStopRelay } from "@/lib/agentWitch/enqueueAgentRunStopRelay";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { handleWriterStopMessageAsync } from "@/lib/dispatch/handleWriterStopMessageAsync";
import { isAgentRunStopAllowed } from "@/lib/dispatch/isAgentRunStopAllowed";
import { requestAgentRunStop } from "@/lib/dispatch/requestAgentRunStop";
import {
  type SentMessage,
  stopTestDashboard,
  stopTestMessage,
  mockActiveStop,
  stopTestRuntime,
} from "@/lib/dispatch/handleWriterStopMessageAsync.testHelper";

vi.mock("@/lib/dispatch/agentRunQueries", () => ({ getAgentRunById: vi.fn() }));
vi.mock("@/lib/dispatch/isAgentRunStopAllowed", () => ({
  isAgentRunStopAllowed: vi.fn(async () => true),
}));
vi.mock("@/lib/dispatch/requestAgentRunStop", () => ({
  requestAgentRunStop: vi.fn(),
}));
vi.mock("@/lib/agentWitch/cancelQueuedAgentRunOutbox", () => ({
  cancelQueuedAgentRunOutbox: vi.fn(async () => 0),
}));
vi.mock("@/lib/agentWitch/enqueueAgentRunStopRelay", () => ({
  enqueueAgentRunStopRelay: vi.fn(async () => false),
}));

describe("handleWriterStopMessageAsync delivery (S0-7)", () => {
  beforeEach(() => {
    vi.mocked(getAgentRunById).mockReset();
    vi.mocked(isAgentRunStopAllowed).mockReset().mockResolvedValue(true);
    vi.mocked(requestAgentRunStop).mockReset();
    vi.mocked(cancelQueuedAgentRunOutbox).mockClear();
    vi.mocked(enqueueAgentRunStopRelay).mockReset().mockResolvedValue(false);
  });

  it("stores the stop, cancels queued starts, forwards to the local socket", async () => {
    mockActiveStop();
    const sent: SentMessage[] = [];
    const response = await handleWriterStopMessageAsync(
      stopTestRuntime(sent),
      stopTestMessage,
      stopTestDashboard("user-1"),
    );
    expect(requestAgentRunStop).toHaveBeenCalledWith({
      runId: "run-1",
      requestedByUserId: "user-1",
    });
    expect(cancelQueuedAgentRunOutbox).toHaveBeenCalledWith("run-1");
    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(response?.payload).toMatchObject({
      stopped: true,
      delivery: "sent",
    });
    expect(sent).toEqual([
      {
        type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP,
        payload: { agentRunId: "run-1" },
        requestId: "req-stop-1",
      },
    ]);
  });

  it("relays the stop when another instance owns the computer socket", async () => {
    mockActiveStop();
    vi.mocked(enqueueAgentRunStopRelay).mockResolvedValue(true);
    const response = await handleWriterStopMessageAsync(
      stopTestRuntime([], false),
      stopTestMessage,
      stopTestDashboard("owner-9"),
    );
    expect(enqueueAgentRunStopRelay).toHaveBeenCalledWith({
      agentRunId: "run-1",
      executorUserId: "user-1",
      requesterUserId: "owner-9",
      deviceId: "device-1",
    });
    expect(response?.payload).toMatchObject({
      stopped: false,
      stopRequested: true,
      delivery: "relayed",
    });
  });

  it("acks on_next_check_in when no instance holds the socket", async () => {
    mockActiveStop();
    const response = await handleWriterStopMessageAsync(
      stopTestRuntime([], false),
      stopTestMessage,
      stopTestDashboard("user-1"),
    );
    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(response?.payload).toMatchObject({ delivery: "on_next_check_in" });
  });

  it("ends a pending-approval run without contacting the computer", async () => {
    mockActiveStop(AgentRunStatus.PENDING_APPROVAL);
    const sent: SentMessage[] = [];
    const response = await handleWriterStopMessageAsync(
      stopTestRuntime(sent),
      stopTestMessage,
      stopTestDashboard("user-1"),
    );
    expect(sent).toHaveLength(0);
    expect(cancelQueuedAgentRunOutbox).not.toHaveBeenCalled();
    expect(response?.payload).toMatchObject({
      stopped: true,
      delivery: "ended",
    });
  });
});
