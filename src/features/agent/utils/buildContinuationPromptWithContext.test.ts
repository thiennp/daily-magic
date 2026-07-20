import { describe, expect, it } from "vitest";

import { buildContinuationPromptWithContext } from "@/features/agent/utils/buildContinuationPromptWithContext";
import { AGENT_RUN_NEXT_ACTIONS_MARKER } from "@/lib/dispatch/agentRunNextActions.constant";
import { AGENT_RUN_PROGRESS_MARKER } from "@/lib/dispatch/agentRunProgress.constant";

describe("buildContinuationPromptWithContext", () => {
  it("AGENT-038 wraps the follow-up with a prior transcript block", () => {
    const prompt = buildContinuationPromptWithContext({
      priorPrompt: "Summarize the repo",
      priorOutput: "The repo is a Next.js app.",
      userMessage: "Add tests for auth",
    });

    expect(prompt).toContain("<prior_context>");
    expect(prompt).toContain("User: Summarize the repo");
    expect(prompt).toContain("Assistant: The repo is a Next.js app.");
    expect(prompt).toContain("New message:\nAdd tests for auth");
  });

  it("strips progress and next-action markers from prior output", () => {
    const prompt = buildContinuationPromptWithContext({
      priorPrompt: "Plan",
      priorOutput: `Done planning.${AGENT_RUN_PROGRESS_MARKER}Step 1: Plan${AGENT_RUN_NEXT_ACTIONS_MARKER}\n1. Ship it`,
      userMessage: "Go",
    });

    expect(prompt).not.toContain(AGENT_RUN_PROGRESS_MARKER);
    expect(prompt).not.toContain(AGENT_RUN_NEXT_ACTIONS_MARKER);
    expect(prompt).not.toContain("Ship it");
    expect(prompt).toContain("Done planning.");
  });
});
