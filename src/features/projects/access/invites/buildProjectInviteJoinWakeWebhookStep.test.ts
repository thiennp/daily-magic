import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { buildProjectInviteJoinWakeWebhookStep } from "@/features/projects/access/invites/buildProjectInviteJoinWakeWebhookStep";
import {
  AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS,
  AWC_GROK_WEBHOOK_DAILY_REPAIR,
  AWC_GROK_WEBHOOK_KEY_NOTE,
} from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import {
  PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE,
  PROJECT_UPDATED_WAKE_REPLY_CLAUSE,
} from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";

describe("buildProjectInviteJoinWakeWebhookStep (step 7, copy only)", () => {
  const lines = buildProjectInviteJoinWakeWebhookStep();

  it("is step 7 and carries the form pointer, key note, daily repair, reply clause and MUST ack", () => {
    expect(lines[0]).toBe(
      "7. Inbox delivery (webhook-first, Grok Bot only) — after peers summary:",
    );
    expect(lines).toContain(
      `   MUST on connect (webhook-first): ${AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS}`,
    );
    expect(lines).toContain(`   ${AWC_GROK_WEBHOOK_KEY_NOTE}`);
    expect(lines).toContain(`   ${AWC_GROK_WEBHOOK_DAILY_REPAIR}`);
    expect(lines).toContain(`   ${PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE}`);
    expect(lines).toContain(`   ${PROJECT_UPDATED_WAKE_REPLY_CLAUSE}`);
    expect(lines).toContain(
      '   MUST ack_project_message { "messageId": "<id>" }.',
    );
  });

  it("keeps the bans and never asks for the URL or key in chat", () => {
    const text = lines.join("\n");
    expect(text).not.toMatch(/grokbot:\/\/|https?:\/\/|sidebar|<a\b/i);
    expect(text).toMatch(/never ask the user to paste them into chat/);
  });

  it("is owner-only, names the real UI path and the Bearer-only status tool", () => {
    const text = lines.join("\n");
    expect(text).toContain(
      "The project owner enters both in the Grok wake-link form at Agent Witch Cloud → Project Access → People → Members → <bot> → Grok wake link",
    );
    expect(text).toContain(
      "If you are not the owner, give the wake link and key to the owner outside chat. Never paste the key into a project message.",
    );
    expect(text).toContain(
      "get_my_project_webhook_status({ projectId }) (agent-access Bearer only; awc_proj_ keys are rejected for this tool)",
    );
    expect(text).not.toContain("Project Access → Members");
    expect(text).not.toContain("register_project_webhook yourself");
    expect(text).not.toMatch(/member (enters|form)/i);
  });

  it("returns the same lines every call (pure, no runtime imports)", () => {
    expect(buildProjectInviteJoinWakeWebhookStep()).toEqual(lines);
    const src = readFileSync(
      join(
        process.cwd(),
        "src/features/projects/access/invites/buildProjectInviteJoinWakeWebhookStep.ts",
      ),
      "utf8",
    );
    expect(src).not.toMatch(
      /messaging|wakeProject|insertProjectMessage|fetch\(|process\.env|Date|getSql/,
    );
  });
});
