import { describe, expect, it } from "vitest";

import { buildAgentAccessGuideline } from "@/lib/agentAccess/buildAgentAccessGuideline";
import { formatAgentAccessLlmsText } from "@/lib/agentAccess/formatAgentAccessLlmsText";
import {
  PROJECT_LOCAL_FIRST_ONE_LINE,
  PROJECT_LOCAL_FIRST_STEP,
} from "@/lib/agentAccess/projectLocalFirstStep.constant";
import { buildProjectInviteJoinLocalFirstStep } from "@/features/projects/access/invites/buildProjectInviteJoinLocalFirstStep";
import { buildProjectInviteJoinPrompt } from "@/features/projects/access/invites/buildProjectInviteJoinPrompt";
import { buildProjectInviteJoinPage } from "@/features/projects/access/invites/joinPage/buildProjectInviteJoinPage";
import { buildProjectInviteJoinRedeemTypeLine } from "@/features/projects/access/invites/joinPage/buildProjectInviteJoinPollTypeSteps";

const NL = String.fromCharCode(10);
const BLOCK = buildProjectInviteJoinLocalFirstStep().join(NL);
const count = (text: string, part: string) => text.split(part).length - 1;
const INPUT = {
  inviteUrl: "https://www.agentwitch.com/invite/p/tok-local-0000",
  token: "tok-local-0000",
  projectId: "proj-local",
  projectName: "Local",
} as const;

describe("Check this project first (Product final EN, one constant)", () => {
  it("is Product's EN verbatim; only step 2 is conditional", () => {
    expect(PROJECT_LOCAL_FIRST_STEP).toEqual({
      title: "Check this project first",
      lead: "Before you answer from your own knowledge, check what this project already has.",
      steps: [
        "1. Safety rules: if you have the AgentWitch Local connector, call check_context.",
        "2. Library: search it with skills_find or list_project_skills, always with a short query for the task, then get_project_skill for any skill that fits.",
        "3. Past work: call list_runs to see your account's earlier Reports.",
        "4. Before you call send_task, run the Prompt optimizer.",
      ],
    });
    expect(PROJECT_LOCAL_FIRST_ONE_LINE).toBe(
      "Check this project first: call check_context if you have the AgentWitch Local connector, read its Library (skills_find, or list_project_skills with a short query, then get_project_skill), call list_runs for your account's earlier Reports, and run the Prompt optimizer before send_task.",
    );
    expect(BLOCK).not.toMatch(/if available/i);
    const conditional = PROJECT_LOCAL_FIRST_STEP.steps.filter((l) =>
      /\bif\b/i.test(l),
    );
    expect(conditional).toEqual([PROJECT_LOCAL_FIRST_STEP.steps[0]]);
  });

  it.each(["grok", "muse"] as const)(
    "%s full Copy prompt: once, right after redeem (before step 3)",
    (platform) => {
      const prompt = buildProjectInviteJoinPrompt({ ...INPUT, platform });
      expect(count(prompt, BLOCK)).toBe(1);
      const redeem = prompt.indexOf("2. Call redeem_project_invite");
      const at = prompt.indexOf(BLOCK);
      const step3 = prompt.indexOf(`${NL}3. `);
      expect(redeem).toBeGreaterThanOrEqual(0);
      expect(redeem < at && at < step3).toBe(true);
    },
  );

  const page = buildProjectInviteJoinPage({ ...INPUT, autoApprove: null });
  it.each(page.types.map((t) => [t.id, t]))(
    "/join %s: once, last, after its redeem line",
    (id, type) => {
      expect(type.steps.filter((s) => s === BLOCK)).toHaveLength(1);
      expect(type.steps.at(-1)).toBe(BLOCK);
      const redeemAt = type.steps.indexOf(
        buildProjectInviteJoinRedeemTypeLine(id),
      );
      if (type.deliveryMode === "poll")
        expect(redeemAt).toBeGreaterThanOrEqual(0);
      expect(redeemAt).toBeLessThan(type.steps.length - 1);
    },
  );

  it("llms.txt and /for-agents: heading + the 4 numbered lines, once", () => {
    const section = buildAgentAccessGuideline().sections.filter(
      (s) => s.heading === "Check this project first",
    );
    expect(section).toHaveLength(1);
    expect(section[0]?.body).toEqual(PROJECT_LOCAL_FIRST_STEP.steps);
    const llms = formatAgentAccessLlmsText();
    expect(count(llms, "## Check this project first")).toBe(1);
    for (const line of PROJECT_LOCAL_FIRST_STEP.steps)
      expect(count(llms, line)).toBe(1);
  });
});
