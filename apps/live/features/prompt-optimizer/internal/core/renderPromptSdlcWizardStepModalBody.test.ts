import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { describePromptSdlcLocalNodeDetail } from "./describePromptSdlcLocalNodeDetail";
import { renderPromptSdlcLocalNodeModal } from "./renderPromptSdlcLocalNodeModal";

describe("wizard step timeline modal", () => {
  it("shows generalize variables and template instead of Not scored yet", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "Ship a skill.",
      sourcePrompt: "Be helpful.",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: "/tmp",
      wizard: {
        ...createInitialPromptSdlcWizardState("Be helpful."),
        phase: "evaluate",
        gate: null,
        templatedPrompt: "Reply for {{issue}}",
        variables: [
          {
            name: "issue",
            description: "Customer issue",
            sampleValue: "billing",
          },
        ],
      },
    });
    const html = renderPromptSdlcLocalNodeModal(
      describePromptSdlcLocalNodeDetail(cycle, {
        id: "wizard-1",
        label: "Step 1 — Generalize",
        state: "done",
        detail: null,
      }),
    );
    expect(html).toContain("Step 1 — Generalize");
    expect(html).toContain("<dt>Goal</dt>");
    expect(html).toContain("Ship a skill.");
    expect(html).toContain("{{issue}}");
    expect(html).toContain("Templated prompt");
    expect(html).not.toContain("Not scored yet");
  });

  it("shows evaluate target and pipeline sub-steps while step 2 is active", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Ship a skill.",
        sourcePrompt: "Be helpful.",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        workingDirectory: "/tmp",
        wizard: {
          ...createInitialPromptSdlcWizardState("Be helpful."),
          phase: "evaluate",
          gate: null,
          templatedPrompt: "Reply for {{issue}}",
          variables: [
            {
              name: "issue",
              description: "Customer issue",
              sampleValue: "billing",
            },
          ],
        },
      }),
      status: "judging" as const,
    };
    const html = renderPromptSdlcLocalNodeModal(
      describePromptSdlcLocalNodeDetail(cycle, {
        id: "wizard-2",
        label: "Step 2 — Evaluate",
        state: "active",
        detail: null,
      }),
    );
    expect(html).toContain("Sub-steps on this Mac");
    expect(html).toContain("What is being evaluated");
    expect(html).toContain("Reply for billing");
    expect(html).toContain("score round");
  });

  it("shows a prompt info icon after each evaluate round title in step 2 modal", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Save tokens",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        workingDirectory: "/tmp",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          phase: "evaluate",
          gate: "evaluate",
          templatedPrompt: "Hello",
          evaluateSelectedRound: 2,
        },
      }),
      judgePromptTextOnly: true,
      revisions: [
        {
          roundNumber: 1,
          promptText: "First revision prompt",
          judgement: {
            score: 72,
            passed: true,
            reasons: "clear",
            rawReply: "{}",
          },
        },
        {
          roundNumber: 2,
          promptText: "Second revision prompt",
          judgement: {
            score: 80,
            passed: true,
            reasons: "better",
            rawReply: "{}",
          },
        },
      ],
    };
    const html = renderPromptSdlcLocalNodeModal(
      describePromptSdlcLocalNodeDetail(cycle, {
        id: "wizard-2",
        label: "Step 2 — Evaluate",
        state: "active",
        detail: null,
      }),
    );
    expect(html).toContain("data-sdlc-revision-round-prompt-info");
    expect(html).toContain("First revision prompt");
    expect(html).toContain("Second revision prompt");
    expect(html).toContain("Prompt — Round 1");
    expect(html).toContain("Prompt — Round 2");
  });

  it("shows failure reason for the Failed end step", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Save tokens",
        sourcePrompt: "p",
        judgeModel: "codex",
        improverModel: "codex",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          phase: "evaluate",
          gate: null,
        },
      }),
      status: "failed" as const,
      errorMessage: "The judge reply needs a score and a reason.",
    };
    const html = renderPromptSdlcLocalNodeModal(
      describePromptSdlcLocalNodeDetail(cycle, {
        id: "end",
        label: "Failed",
        state: "done",
        detail: "The judge reply needs a score and a reason.",
      }),
    );
    expect(html).toContain("Failed");
    expect(html).toContain("The judge reply needs a score and a reason.");
    expect(html).not.toContain("Not scored yet");
  });
});
