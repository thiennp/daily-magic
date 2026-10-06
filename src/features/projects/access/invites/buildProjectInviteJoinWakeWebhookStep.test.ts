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

  it("keeps the bans, cannot-see-key rule, and never asks anyone to paste secrets into chat", () => {
    const text = lines.join("\n");
    expect(text).not.toMatch(/grokbot:\/\/|sidebar|<a\b/i);
    // Deep link to owner form is required; strip it before the generic URL ban.
    const withoutWakeDeep = text.replace(
      /https:\/\/www\.agentwitch\.com\/projects\/\{projectId\}#wake-link-\{membershipId\}/g,
      "",
    );
    expect(withoutWakeDeep).not.toMatch(/https?:\/\//i);
    expect(text).not.toMatch(/Reports pills/i);
    expect(text).toMatch(/cannot see your own wake link or key/);
    expect(text).toMatch(/never ask anyone to paste them into chat/);
  });

  it("creates the routine on active membership, posts copy links, and names the locked UI path", () => {
    const text = lines.join("\n");
    expect(text).toContain("if this project has no webhook routine yet, create one yourself");
    expect(text).toContain("Webhook URL and Webhook key links");
    expect(text).toContain("Add wake link");
    expect(text).toContain("#wake-link-{membershipId}");
    expect(text).toContain("/projects/{projectId}");
    expect(text).toContain(
      "Access › People › Members › <your nickname> › Grok wake link",
    );
    expect(text).toContain(
      "get_my_project_webhook_status({ projectId }) (agent-access Bearer only; awc_proj_ keys are rejected for this tool)",
    );
    expect(text).toMatch(/until grokWebhookRegistered is true/);
    expect(text).not.toContain("Project Access → Members");
    expect(text).not.toContain("register_project_webhook yourself");
    expect(text).not.toMatch(/member (enters|form)/i);
    expect(text).toMatch(/nobody has to open Routines/);
    expect(text).not.toMatch(/find its wake link in Routines/);
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
