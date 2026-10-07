import { afterEach, describe, expect, it } from "vitest";

import { handleProjectHistoryPageResultMessage } from "@/lib/agentWitch/handleProjectHistoryPageResultMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import {
  registerProjectHistoryPageRequest,
  resetProjectHistoryPageRequestRegistryForTests,
} from "@/lib/projects/acl/messaging/messenger/projectHistoryPageRequestRegistry";

describe("handleProjectHistoryPageResultMessage", () => {
  afterEach(() => {
    resetProjectHistoryPageRequestRegistryForTests();
  });

  it("completes pending request and ACKs", async () => {
    const pending = registerProjectHistoryPageRequest("req-hub-1", 5_000);
    const ack = await handleProjectHistoryPageResultMessage(
      {} as never,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.PROJECT_HISTORY_PAGE_RESULT,
        requestId: "req-hub-1",
        payload: {
          ok: true,
          entries: [],
          nextBeforeCursor: null,
          hasMore: false,
        },
      },
      { role: "agent", userId: "owner-1" } as never,
    );
    expect(ack?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    await expect(pending).resolves.toMatchObject({ ok: true });
  });

  it("rejects non-agent sender", async () => {
    const err = await handleProjectHistoryPageResultMessage(
      {} as never,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.PROJECT_HISTORY_PAGE_RESULT,
        requestId: "x",
        payload: { ok: true, entries: [], nextBeforeCursor: null, hasMore: false },
      },
      { role: "dashboard", userId: "u1" } as never,
    );
    expect(err?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
  });
});
