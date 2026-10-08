import { describe, expect, it } from "vitest";

import { createWsTestComposerWizardResets } from "@/features/agent/utils/createWsTestComposerWizardResets";
import { resolveWsTestComposerPickerCompleted } from "@/features/agent/utils/resolveWsTestComposerPickerCompleted";
import { resolveWsTestComposerProjectStepCompletion } from "@/features/agent/utils/resolveWsTestComposerProjectStepCompletion";

describe("LLM CLI pencil (2331ef53)", () => {
  it("goes straight to the AI choice and keeps a prefilled project and workflow", () => {
    const flags = {
      rewound: false,
      mac: false,
      picker: false,
      project: false,
      writer: true,
    };
    createWsTestComposerWizardResets(
      (value) => {
        flags.rewound = value;
      },
      {
        setHasConfirmedMacSelection: (value) => {
          flags.mac = value;
        },
        setHasConfirmedPickerSelection: (value) => {
          flags.picker = value;
        },
        setHasConfirmedProjectSelection: (value) => {
          flags.project = value;
        },
        setHasConfirmedWriterAgentSelection: (value) => {
          flags.writer = value;
        },
      },
    ).resetWriterAgentStep();

    expect(flags).toMatchObject({ rewound: true, mac: true, writer: false });
    expect(
      resolveWsTestComposerPickerCompleted({
        hasConfirmedPickerSelection: flags.picker,
        isSteppedComposer: true,
        hasPrefilledLibraryCapability: true,
        hasContinueSessionPrefill: false,
        hasCustomTaskPrefill: false,
        hasRewoundWizard: flags.rewound,
      }),
    ).toBe(true);
    expect(
      resolveWsTestComposerProjectStepCompletion({
        hasConfirmedProjectSelection: flags.project,
        requiresProjectStep: true,
        urlProjectId: "p1",
        selectedProjectId: "p1",
        hasRewoundWizard: flags.rewound,
      }),
    ).toBe(true);
  });
});
