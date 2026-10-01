import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { summarizePromptSdlcWizardCompletion } from "../../../../adapters/promptSdlcAwcCore";
import { describePromptSdlcWizardModuleTableHeadline } from "./describePromptSdlcWizardModuleTableHeadline";
import { describePromptSdlcLocalActivity } from "./buildPromptSdlcLocalActivity";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { confirmedPromptSdlcCostControlsForTests } from "./promptSdlcCostControlTestFixtures";
import { buildPromptSdlcLocalCycleSection } from "./buildPromptSdlcLocalCycleSection";
import { renderPromptSdlcWizardGate } from "./renderPromptSdlcWizardGate";
import { renderPromptSdlcWizardRevisionRoundList } from "./renderPromptSdlcWizardRevisionRoundList";

describe("wizard UX consistency fixes", () => {
  it("uses wizard pass score in scoring guide during step 4", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        passScore: 90,
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          gate: "optimize_modules",
          phase: "optimize_modules",
          modules: [],
        },
      }),
      status: "judging" as const,
    };
    const html = buildPromptSdlcLocalCycleSection(cycle);
    expect(html).toContain("90 or higher passes");
    expect(html).not.toContain("70 or higher passes");
  });

  it("describes step 4 runner activity instead of classic judge loop", () => {
    const activity = describePromptSdlcLocalActivity({
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        runnerModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          gate: "optimize_modules",
          phase: "optimize_modules",
          modules: [
            {
              moduleId: "m1",
              title: "A",
              prompt: "p",
              status: "running",
              selectedRevisionRound: null,
              statistics: null,
            },
          ],
        },
      }),
      status: "judging",
    });
    expect(activity.title).toContain("running module 1 of 1");
    expect(activity.detail).toContain("pass ≥ 90");
  });

  it("omits no-scored alert when module statistics already have a best score", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          gate: "optimize_modules",
          phase: "optimize_modules",
          currentModuleIndex: 0,
          modules: [
            {
              moduleId: "m1",
              title: "A",
              prompt: "p",
              status: "passed",
              selectedRevisionRound: null,
              statistics: {
                bestScore: 82,
                bestRound: 0,
                bestRunOutput: "out",
                rounds: [],
              },
            },
          ],
        },
      }),
      status: "wizard_paused" as const,
      revisions: [
        {
          roundNumber: 0,
          promptText: "p",
          judgement: null,
        },
      ],
    };
    const html = renderPromptSdlcWizardRevisionRoundList({
      cycle,
      interactive: false,
    });
    expect(html).not.toContain("No scored revisions yet");
    expect(html).toContain("Trial run");
  });

  it("shows module stats against wizard pass threshold", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        passScore: 90,
        costControls: confirmedPromptSdlcCostControlsForTests(),
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          gate: "optimize_modules",
          phase: "optimize_modules",
          modules: [
            {
              moduleId: "m1",
              title: "A",
              prompt: "p",
              status: "passed",
              selectedRevisionRound: null,
              statistics: {
                bestScore: 82,
                bestRound: 0,
                bestRunOutput: "out",
                rounds: [],
              },
            },
          ],
        },
      }),
      status: "wizard_paused" as const,
      costControls: confirmedPromptSdlcCostControlsForTests({ moduleCount: 1 }),
    };
    const html = renderPromptSdlcWizardGate(cycle);
    expect(html).toContain("best 82 / ≥90");
  });

  it("headline names below-pass modules explicitly", () => {
    const wizard = {
      ...createInitialPromptSdlcWizardState("p"),
      gate: null,
      phase: "complete" as const,
      modules: [
        {
          moduleId: "m1",
          title: "A",
          prompt: "p",
          status: "passed" as const,
          selectedRevisionRound: null,
          statistics: {
            bestScore: 82,
            bestRound: 0,
            bestRunOutput: "o",
            rounds: [],
          },
        },
        {
          moduleId: "m2",
          title: "B",
          prompt: "p2",
          status: "passed" as const,
          selectedRevisionRound: null,
          statistics: {
            bestScore: 66,
            bestRound: 0,
            bestRunOutput: "o2",
            rounds: [],
          },
        },
      ],
    };
    summarizePromptSdlcWizardCompletion(wizard);
    const headline = describePromptSdlcWizardModuleTableHeadline(
      summarizePromptSdlcWizardCompletion(wizard),
      90,
    );
    expect(headline).toContain("2 modules scored below 90");
  });
});
