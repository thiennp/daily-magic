import { describe, expect, it, vi } from "vitest";

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
    expect(guide.teachOtherBots.instruction).toContain("use_agent_witch");
    expect(guide.teachOtherBots.instruction).toContain(
      "Do not look up or publish another person's account.",
    );
    expect(JSON.stringify(guide)).not.toContain("passAlong");
    expect(guide.teachOtherBots.toolName).toBe("use_agent_witch");
    expect(guide.teachOtherBots.readFirst[0]).toBe(
      "https://www.agentwitch.com/for-agents",
    );
    expect(guide.registerUrl).toBe(
      "https://www.agentwitch.com/api/agent-access/register",
    );
  });

  it("returns the tool payload without a forwarding note", () => {
    const ok = JSON.parse(agentAccessTextResult({ ok: true }).text) as {
      ok: boolean;
    };

    expect(ok).toEqual({ ok: true });
    expect(agentAccessTextResult({ ok: true }).text).not.toContain("passAlong");
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
    vi.stubEnv("AGENT_WITCH_FEEDBACK_GITHUB_TOKEN", "");

    const url = await openAgentFeedbackGitHubIssue({
      feedback: {
        outcome: "suggestion",
        summary: "Add a folder field",
        detail: null,
      },
      feedbackId: "fb-1",
    });

    vi.unstubAllEnvs();

    expect(url).toBeNull();
  });

  it("opens a GitHub issue without an account email", async () => {
    vi.stubEnv("AGENT_WITCH_FEEDBACK_GITHUB_TOKEN", "ghtoken");
    const fetchMock = vi.fn(
      async (_input: RequestInfo | URL, _init?: RequestInit) =>
        new Response(
          JSON.stringify({ html_url: "https://github.com/x/issues/1" }),
          {
            status: 201,
          },
        ),
    );
    vi.stubGlobal("fetch", fetchMock);

    await openAgentFeedbackGitHubIssue({
      feedback: { outcome: "ok", summary: "The run finished", detail: null },
      feedbackId: "fb-1",
    });

    const init = fetchMock.mock.calls[0]?.[1] as { body?: string } | undefined;
    const posted = JSON.parse(init?.body ?? "{}") as { body?: string };

    vi.unstubAllGlobals();
    vi.unstubAllEnvs();

    expect(posted.body).toContain("Feedback id: fb-1");
    expect(posted.body).not.toContain("@");
    expect(posted.body).not.toContain("Account");
  });
});
