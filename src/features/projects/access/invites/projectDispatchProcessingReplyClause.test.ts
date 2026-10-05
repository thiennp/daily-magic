import { describe, expect, it } from "vitest";

import { buildProjectInviteAgentPrompt } from "@/features/projects/access/invites/buildProjectInviteAgentPrompt";
import { buildProjectAclAgentGuidelineSection } from "@/lib/agentAccess/buildProjectAclAgentGuidelineSection";
import {
  PROJECT_BRIEFING_HOW_TO_DISPATCH,
  PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE,
} from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import {
  PROJECT_B2B_SILENCE_BLOCK_MS,
  PROJECT_B2B_SILENCE_NOTIFY_MS,
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

describe("PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE", () => {
  it("shares one processing reply clause with the invite prompt and guideline", () => {
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).not.toMatch(/AgentWitch/);
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).toContain(
      `kind "${PROJECT_MESSAGE_KIND_TASK_PROCESSING}" to that sender with summary "processing <messageId>"`,
    );
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).toContain(
      `kind "${PROJECT_MESSAGE_KIND_TASK_STATUS}"`,
    );
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).toContain(
      `every ${PROJECT_B2B_SILENCE_NOTIFY_MS / 60_000} minutes while working`,
    );
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).toContain(
      `kind "${PROJECT_MESSAGE_KIND_TASK_DONE}" or "${PROJECT_MESSAGE_KIND_TASK_BLOCKED}"`,
    );
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).toContain(
      `after ${PROJECT_B2B_SILENCE_BLOCK_MS / 60_000} minutes the delivery is blocked`,
    );
    const steps = [
      PROJECT_MESSAGE_KIND_TASK_PROCESSING,
      PROJECT_MESSAGE_KIND_TASK_STATUS,
      PROJECT_MESSAGE_KIND_TASK_DONE,
      "then ack",
    ].map((step) => PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE.indexOf(step));
    expect(steps.every((at) => at >= 0)).toBe(true);
    expect([...steps].sort((x, y) => x - y)).toEqual(steps);
    const deliveryAt = PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE.indexOf(
      "On each delivery:",
    );
    expect(deliveryAt).toBeGreaterThanOrEqual(0);
    const delivery = PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE.slice(deliveryAt);
    const receiptAt = delivery.indexOf(
      "one short line in your own window that the message was received, before the task",
    );
    const taskAt = delivery.indexOf("Then do the task");
    expect(receiptAt).toBeGreaterThanOrEqual(0);
    expect(taskAt).toBeGreaterThan(receiptAt);
    expect(delivery).not.toContain("read the sender, do the task");
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).toContain(
      "before the task and before ack",
    );
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).toContain(
      "post the same reply in your own window, then ack",
    );
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).toContain("Do not ack only.");
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).toContain(
      'toProjectDisplayName is "Owner"',
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE,
    );
    const prompt = buildProjectInviteAgentPrompt({
      inviteUrl: "https://example.com/invite/p/tok-xyz",
      projectId: "proj-1",
    });
    expect(prompt).toContain(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE);
    expect(buildProjectAclAgentGuidelineSection().body.join("\n")).toContain(
      PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE,
    );
  });
});
