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
      tool: null,
      computerName: null,
      projectFolder: null,
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

describe("parseDispatchApprovalSocketMessage requester (S0 card)", () => {
  it("uses null, not a made-up name, when no requester is sent", () => {
    const onApprovalRequired = vi.fn();
    parseDispatchApprovalSocketMessage(message({ requesterEmail: " " }), {
      onApprovalRequired,
    });
    expect(onApprovalRequired).toHaveBeenCalledWith(
      expect.objectContaining({ requesterEmail: null }),
    );
  });
});

describe("parseDispatchApprovalSocketMessage richer card fields", () => {
  it("passes tool, computerName, and projectFolder when present", () => {
    const onApprovalRequired = vi.fn();
    parseDispatchApprovalSocketMessage(
      message({
        tool: "claude-cli",
        computerName: "Studio Mac",
        projectFolder: "/Users/me/app",
      }),
      { onApprovalRequired },
    );
    expect(onApprovalRequired).toHaveBeenCalledWith(
      expect.objectContaining({
        tool: "claude-cli",
        computerName: "Studio Mac",
        projectFolder: "/Users/me/app",
      }),
    );
  });

  it("treats blank rich fields as null so the card falls back", () => {
    const onApprovalRequired = vi.fn();
    parseDispatchApprovalSocketMessage(
      message({ tool: "  ", computerName: "", projectFolder: " " }),
      { onApprovalRequired },
    );
    expect(onApprovalRequired).toHaveBeenCalledWith(
      expect.objectContaining({
        tool: null,
        computerName: null,
        projectFolder: null,
      }),
    );
  });
});
