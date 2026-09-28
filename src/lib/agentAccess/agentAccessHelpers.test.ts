import { describe, expect, it } from "vitest";

import {
  AgentMailUnavailableError,
  createAgentMailInboxWithFetch,
} from "@/lib/agentAccess/createAgentMailInbox";
import { readClientIp } from "@/lib/agentAccess/readClientIp";
import { summarizeAgentAccessMac } from "@/lib/agentAccess/summarizeAgentAccessMac";
import { summarizeAgentAccessRun } from "@/lib/agentAccess/summarizeAgentAccessRun";
import { executeAgentAccessSendTask } from "@/lib/agentAccess/executeAgentAccessSendTask";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";

const actor: AgentAccessActor = {
  id: "user-1",
  email: "agt@agents.agentwitch.com",
  globalRole: "user",
  name: "Scout",
  registrationMethod: "none",
};

describe("agent access helpers", () => {
  it("reads the first forwarded client ip", () => {
    const request = new Request("https://www.agentwitch.com", {
      headers: { "x-forwarded-for": "203.0.113.4, 10.0.0.1" },
    });

    expect(readClientIp(request)).toBe("203.0.113.4");
    expect(readClientIp(new Request("https://www.agentwitch.com"))).toBe(
      "unknown",
    );
  });

  it("creates an Agent Mail inbox and surfaces HTTP failures", async () => {
    const created = await createAgentMailInboxWithFetch({
      username: "aw1",
      displayName: "Scout",
      apiKey: "key",
      fetchImpl: async () =>
        new Response(JSON.stringify({ email: "aw1@agentmail.to" }), {
          status: 200,
        }),
    });
    const failed = createAgentMailInboxWithFetch({
      username: "aw1",
      displayName: "Scout",
      apiKey: "key",
      fetchImpl: async () => new Response("no", { status: 500 }),
    });

    expect(created.email).toBe("aw1@agentmail.to");
    await expect(failed).rejects.toBeInstanceOf(AgentMailUnavailableError);
  });

  it("summarizes a Mac and clips a long Run prompt", () => {
    expect(
      summarizeAgentAccessMac({
        id: "mac-1",
        userId: "user-1",
        deviceLabel: null,
        displayName: null,
        dispatchPolicy: null,
        claimedAt: "2026-09-24T00:00:00.000Z",
        lastSeenAt: null,
        revokedAt: null,
      }).name,
    ).toBe("Mac");

    const summary = summarizeAgentAccessRun({
      id: "run-1",
      groupId: null,
      requesterUserId: "user-1",
      executorUserId: "user-1",
      prompt: "p".repeat(600),
      status: "completed",
      dispatchPolicy: "open",
      resultOutput: null,
      resultExitCode: 0,
      resultOutcomeCode: null,
      denialReason: null,
      createdAt: "2026-09-24T00:00:00.000Z",
      updatedAt: "2026-09-24T00:00:00.000Z",
      startedAt: null,
      completedAt: null,
      approvalExpiresAt: null,
      capabilityId: null,
      capabilityVersionId: null,
      deviceId: null,
      projectId: null,
      compositionSnapshotId: null,
      writerAgent: "claude",
      lastRunHeartbeatAt: null,
    });

    expect(summary.prompt.endsWith("…")).toBe(true);
    expect(summary.resultOutput).toBeNull();
  });

  it("rejects an empty Task prompt before dispatch", async () => {
    const result = await executeAgentAccessSendTask(actor, { prompt: " " });

    expect(result.isError).toBe(true);
    expect(result.text).toContain("invalid_arguments");
  });
});
