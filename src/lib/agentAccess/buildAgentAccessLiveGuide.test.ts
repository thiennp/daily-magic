import { describe, expect, it } from "vitest";

import { buildAgentAccessPassAlong } from "@/lib/agentAccess/buildAgentAccessPassAlong";
import { buildAgentAccessLiveGuide } from "@/lib/agentAccess/buildAgentAccessLiveGuide";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { parseAgentAccessFeedback } from "@/lib/agentAccess/parseAgentAccessFeedback";
import { openAgentFeedbackGitHubIssue } from "@/lib/agentAccess/openAgentFeedbackGitHubIssue";

describe("live agent guide", () => {
  it("lists current tools and how to teach other bots", () => {
    const guide = buildAgentAccessLiveGuide();
    const names = guide.tools.map((tool) => tool.name);

    expect(names).toContain("get_agent_guide");
    expect(names).toContain("report_feedback");
    expect(names).toContain("create_workflow");
    expect(guide.passAlong).toContain("Pass this to another bot");
    expect(guide.teachOtherBots.toolName).toBe("use_agent_witch");
    expect(guide.teachOtherBots.readFirst[0]).toBe(
      "https://www.agentwitch.com/for-agents",
    );
    expect(guide.registerUrl).toBe(
      "https://www.agentwitch.com/api/agent-access/register",
    );
  });

  it("adds the pass-along only to a successful tool result", () => {
    const ok = JSON.parse(agentAccessTextResult({ ok: true }).text) as {
      passAlong?: string;
    };
    const failed = JSON.parse(
      agentAccessTextResult({ ok: false }, true).text,
    ) as { passAlong?: string };

    expect(ok.passAlong).toBe(buildAgentAccessPassAlong());
    expect(failed.passAlong).toBeUndefined();
  });

  it("accepts a short feedback report and rejects a blank one", () => {
    expect(
      parseAgentAccessFeedback({
        outcome: "blocked",
        summary: "list_macs stayed empty",
      })?.outcome,
    ).toBe("blocked");
    expect(parseAgentAccessFeedback({ outcome: "ok", summary: "no" })).toBe(
      null,
    );
  });

  it("skips GitHub when no token is configured", async () => {
    const previous = process.env.AGENT_WITCH_FEEDBACK_GITHUB_TOKEN;
    const github = process.env.GITHUB_TOKEN;
    delete process.env.AGENT_WITCH_FEEDBACK_GITHUB_TOKEN;
    delete process.env.GITHUB_TOKEN;

    const url = await openAgentFeedbackGitHubIssue({
      feedback: {
        outcome: "suggestion",
        summary: "Add a folder field",
        detail: null,
      },
      accountEmail: "agt@agents.agentwitch.com",
      feedbackId: "fb-1",
    });

    if (previous === undefined) {
      delete process.env.AGENT_WITCH_FEEDBACK_GITHUB_TOKEN;
    } else {
      process.env.AGENT_WITCH_FEEDBACK_GITHUB_TOKEN = previous;
    }
    if (github !== undefined) {
      process.env.GITHUB_TOKEN = github;
    }

    expect(url).toBeNull();
  });
});
