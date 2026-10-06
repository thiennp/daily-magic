import { describe, expect, it, vi } from "vitest";

import { parseDispatchApprovalSocketMessage } from "@/features/dispatch/utils/agentRunInputSocket";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const message = (payload: Record<string, unknown>) => ({
  type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_REQUIRED,
  payload: { runId: "r1", prompt: "Fix it", requesterEmail: "sam", ...payload },
});

describe("parseDispatchApprovalSocketMessage approval expiry (S0)", () => {
  it("passes approvalExpiresAt through", () => {
    const onApprovalRequired = vi.fn();
    parseDispatchApprovalSocketMessage(
      message({ approvalExpiresAt: "2026-10-06T14:15:00.000Z" }),
      { onApprovalRequired },
    );
    expect(onApprovalRequired).toHaveBeenCalledWith({
      runId: "r1",
      prompt: "Fix it",
      requesterEmail: "sam",
      approvalExpiresAt: "2026-10-06T14:15:00.000Z",
    });
  });

  it("uses null when the server sends no expiry", () => {
    const onApprovalRequired = vi.fn();
    parseDispatchApprovalSocketMessage(message({}), { onApprovalRequired });
    expect(onApprovalRequired).toHaveBeenCalledWith(
      expect.objectContaining({ approvalExpiresAt: null }),
    );
  });
});
