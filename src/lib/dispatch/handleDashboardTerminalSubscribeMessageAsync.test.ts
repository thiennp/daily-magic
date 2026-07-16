import { afterEach, describe, expect, it } from "vitest";

import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  buildRunTerminalSubscriptionKey,
  clearDashboardTerminalSubscriptionsForTests,
  isDashboardTerminalSubscribed,
} from "@/lib/dispatch/dashboardTerminalSubscriptionRegistry";
import {
  registerAgentRunSession,
  removeAgentRunSession,
} from "@/lib/dispatch/agentRunSessionRegistry";
import { handleDashboardTerminalSubscribeMessageAsync } from "@/lib/dispatch/handleDashboardTerminalSubscribeMessageAsync";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import {
  clearWriterSessionsForTests,
  createWriterSession,
} from "@/lib/dispatch/writerSessionRegistry";

const RUN_ID = "run-subscribe-1";

describe("handleDashboardTerminalSubscribeMessageAsync", () => {
  afterEach(() => {
    removeAgentRunSession(RUN_ID);
    clearWriterSessionsForTests();
    clearDashboardTerminalSubscriptionsForTests();
  });

  it("subscribes dashboard clients to a run they participate in", async () => {
    registerAgentRunSession({
      id: RUN_ID,
      groupId: null,
      requesterUserId: "owner-1",
      executorUserId: "owner-1",
      prompt: "run tests",
      status: AgentRunStatus.RUNNING,
      dispatchPolicy: DispatchPolicy.OPEN,
      resultOutput: null,
      resultExitCode: null,
      denialReason: null,
      createdAt: "2026-07-14T20:00:00.000Z",
      updatedAt: "2026-07-14T20:00:00.000Z",
      startedAt: "2026-07-14T20:00:00.000Z",
      completedAt: null,
      approvalExpiresAt: null,
      capabilityId: null,
      capabilityVersionId: null,
      deviceId: null,
      writerAgent: "claude-cli",
    });

    const response = await handleDashboardTerminalSubscribeMessageAsync(
      {} as never,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.DASHBOARD_TERMINAL_SUBSCRIBE,
        payload: { runId: RUN_ID },
      },
      {
        id: "dash-1",
        role: "dashboard",
        userId: "owner-1",
        send: () => undefined,
      },
    );

    expect(response?.payload?.subscribed).toBe(true);
    expect(
      isDashboardTerminalSubscribed(
        "dash-1",
        buildRunTerminalSubscriptionKey(RUN_ID),
      ),
    ).toBe(true);
  });

  it("subscribes dashboard clients to an owned writer session", async () => {
    const session = createWriterSession({
      ownerUserId: "owner-1",
      executorUserId: "owner-1",
      deviceId: "device-1",
      writerAgent: "claude-cli",
      dashboardClientId: "dash-1",
    });

    const response = await handleDashboardTerminalSubscribeMessageAsync(
      {} as never,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.DASHBOARD_TERMINAL_SUBSCRIBE,
        payload: { writerSessionId: session.writerSessionId },
      },
      {
        id: "dash-1",
        role: "dashboard",
        userId: "owner-1",
        send: () => undefined,
      },
    );

    expect(response?.payload?.subscribed).toBe(true);
  });
});
