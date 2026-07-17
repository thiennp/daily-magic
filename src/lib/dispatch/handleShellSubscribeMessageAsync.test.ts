import { beforeEach, describe, expect, it } from "vitest";

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { clearDashboardTerminalSubscriptionsForTests } from "@/lib/dispatch/dashboardTerminalSubscriptionRegistry";
import { handleShellSessionOpenMessageAsync } from "@/lib/dispatch/handleShellSessionOpenMessageAsync";
import { handleShellSubscribeMessageAsync } from "@/lib/dispatch/handleShellSubscribeMessageAsync";
import {
  clearShellSessionsForTests,
  createShellSession,
} from "@/lib/dispatch/shellSessionRegistry";

describe("shell session hub handlers", () => {
  beforeEach(() => {
    clearShellSessionsForTests();
    clearDashboardTerminalSubscriptionsForTests();
  });

  it("rejects non-dashboard shell open", async () => {
    const response = await handleShellSessionOpenMessageAsync(
      {
        findAgentClientForUser: () => undefined,
      } as never,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.SHELL_SESSION_OPEN,
        payload: {},
      },
      { role: "agent", id: "a1", userId: "u1" } as never,
    );
    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
  });

  it("allows owner subscribe with write and requester only when run linked", async () => {
    const session = createShellSession({
      ownerUserId: "owner-1",
      deviceId: "device-1",
      mode: "interactive",
    });
    const ownerAck = await handleShellSubscribeMessageAsync(
      {} as never,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.SHELL_SUBSCRIBE,
        payload: { shellSessionId: session.shellSessionId },
      },
      { role: "dashboard", id: "d1", userId: "owner-1" } as never,
    );
    expect(ownerAck?.payload).toMatchObject({
      subscribed: true,
      canWrite: true,
    });

    const requesterDenied = await handleShellSubscribeMessageAsync(
      {} as never,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.SHELL_SUBSCRIBE,
        payload: { shellSessionId: session.shellSessionId },
      },
      { role: "dashboard", id: "d2", userId: "requester-1" } as never,
    );
    expect(requesterDenied?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
  });
});
