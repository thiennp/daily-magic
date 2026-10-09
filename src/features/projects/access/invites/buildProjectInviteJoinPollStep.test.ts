import { describe, expect, it } from "vitest";

import { AGENT_ACCESS_TOOLS } from "@/lib/agentAccess/agentAccessTools.constant";
import { PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE } from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import { buildProjectInviteJoinPollStep } from "@/features/projects/access/invites/buildProjectInviteJoinPollStep";
import { buildProjectInviteJoinPrompt } from "@/features/projects/access/invites/buildProjectInviteJoinPrompt";
import { buildProjectInviteJoinWakeWebhookStep } from "@/features/projects/access/invites/buildProjectInviteJoinWakeWebhookStep";
import { buildProjectInviteJoinPage } from "@/features/projects/access/invites/joinPage/buildProjectInviteJoinPage";
import { renderProjectInviteJoinPageMarkdown } from "@/features/projects/access/invites/joinPage/renderProjectInviteJoinPageMarkdown";
import { PROJECT_INVITE_JOIN_TYPES } from "@/features/projects/access/invites/joinTypes/projectInviteJoinTypes.constant";

/** Poll-mode dispatch line, verbatim (auto-poll every 60s; see buildProjectInviteJoinPollStep). */
const POLL_LINE =
  "You have no wake link, so poll automatically: right after you are approved, then every 60 seconds (use your host's loop or scheduler; if it has none, check at the start of every user turn). Each time, call `list_project_inbox`, act on new messages, reply with `project_dispatch`, then `ack_project_message`. Check at most once a minute. The 5- and 10-minute wake rules don't apply to you; the team sees you as 'Checks on demand'.";

const page = buildProjectInviteJoinPage({
  token: "tok-fake-invite-0000",
  projectId: "proj-fake",
  projectName: "Demo Project",
  autoApprove: null,
});
const markdown = renderProjectInviteJoinPageMarkdown(page);

describe("step 7 poll mode (every connectPath except grok-wake)", () => {
  it("is Product's verbatim line instead of the shared 'On a wake…' rule", () => {
    const step = buildProjectInviteJoinPollStep();
    expect(step[0]).toMatch(/^7\. Inbox delivery \(Checks on demand/);
    expect(step[1]).toBe(`   ${POLL_LINE}`);
    expect(step.join(" ")).not.toContain(
      PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE,
    );
    expect(step.join(" ")).not.toContain("On a wake");
  });

  it("names only tools that exist in the agent-access catalog", () => {
    const known = new Set(AGENT_ACCESS_TOOLS.map((tool) => tool.name));
    const named =
      POLL_LINE.match(/`([a-z_]+)`/g)?.map((t) => t.slice(1, -1)) ?? [];
    expect(named).toEqual([
      "list_project_inbox",
      "project_dispatch",
      "ack_project_message",
    ]);
    for (const tool of named) expect(known.has(tool), tool).toBe(true);
  });

  it("applies to every non-Grok type; only Grok Bot keeps the wake step", () => {
    for (const type of PROJECT_INVITE_JOIN_TYPES) {
      const expected = type.connectPath === "grok-wake" ? "webhook" : "poll";
      expect(type.deliveryMode, type.id).toBe(expected);
    }
    expect(page.nextSteps).toEqual(
      expect.arrayContaining(buildProjectInviteJoinPollStep() as string[]),
    );
    expect(markdown.split(POLL_LINE)).toHaveLength(2);
  });

  it("leaves the Grok wake step and the full Copy prompt unchanged", () => {
    const wake = buildProjectInviteJoinWakeWebhookStep();
    expect(wake.join(" ")).toContain(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE);
    expect(page.nextSteps).toEqual(expect.arrayContaining(wake as string[]));
    const full = buildProjectInviteJoinPrompt({
      inviteUrl: "https://www.agentwitch.com/invite/p/tok-fake-invite-0000",
      token: "tok-fake-invite-0000",
      projectId: "proj-fake",
    });
    expect(full).toContain(wake.join(String.fromCharCode(10)));
    expect(full).not.toContain(POLL_LINE);
  });
});
