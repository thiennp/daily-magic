import { describe, expect, it } from "vitest";

import {
  buildAgentRunTimelineSummary,
  mapAgentRunToMessengerTimelineEntry,
} from "@/lib/projects/acl/messaging/messenger/mapAgentRunToMessengerTimelineEntry";
import {
  PROJECT_MESSENGER_ENTRY_KIND_SESSION,
  PROJECT_MESSENGER_KIND_AI_SESSION,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

describe("mapAgentRunToMessengerTimelineEntry", () => {
  it("maps raw run id with entryKind session and agentRunId set", () => {
    const runId = "11111111-1111-4111-8111-111111111111";
    const entry = mapAgentRunToMessengerTimelineEntry({
      id: runId,
      createdAt: "2026-10-07T10:00:00.000000Z",
      status: "completed",
      writerAgent: "claude-cli",
      prompt: "Summarize the weekly notes",
    });
    expect(entry.messageId).toBe(runId);
    expect(entry.createdAt).toBe("2026-10-07T10:00:00.000000Z");
    expect(entry.kind).toBe(PROJECT_MESSENGER_KIND_AI_SESSION);
    expect(entry.entryKind).toBe(PROJECT_MESSENGER_ENTRY_KIND_SESSION);
    expect(entry.needsReply).toBe(false);
    expect(entry.inReplyTo).toBeNull();
    expect(entry.states).toEqual([]);
    expect(entry.author).toEqual({
      kind: "bot",
      membershipId: null,
      displayName: "claude-cli",
    });
    expect(entry.session).toEqual({
      status: "completed",
      writerAgent: "claude-cli",
      agentRunId: runId,
    });
    expect(entry.text).toContain("completed:");
    expect(entry.text).toContain("Summarize the weekly notes");
  });

  it("truncates and scrubs prompt; never uses result_output", () => {
    const long = `API_KEY=sk-secret-value ${"x".repeat(200)}`;
    const text = buildAgentRunTimelineSummary("failed", long);
    expect(text).not.toContain("sk-secret-value");
    expect(text.length).toBeLessThanOrEqual("failed: ".length + 120);
  });
});
